-- =====================================================
-- SCHEMA DE BASE DE DATOS PARA SIVAR CUPONERA
-- Ejecutar este script en Supabase SQL Editor
-- =====================================================

-- Crear extensión para UUID (si no existe)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- ELIMINAR TABLAS EXISTENTES (CUIDADO EN PRODUCCIÓN)
-- =====================================================
DROP TABLE IF EXISTS "CuponesComprados" CASCADE;
DROP TABLE IF EXISTS "Cupones" CASCADE;
DROP TABLE IF EXISTS "Categorias" CASCADE;
DROP TABLE IF EXISTS "Usuarios" CASCADE;

-- =====================================================
-- TABLA: Usuarios (extiende auth.users)
-- =====================================================
CREATE TABLE "Usuarios" (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    dui VARCHAR(20) UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- TABLA: Categorias (Rubros)
-- =====================================================
CREATE TABLE "Categorias" (
    id_categoria SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    icono VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- TABLA: Cupones (Ofertas)
-- =====================================================
CREATE TABLE "Cupones" (
    id_cupones SERIAL PRIMARY KEY,
    id_categoria INTEGER REFERENCES "Categorias"(id_categoria) ON DELETE SET NULL,
    titulo VARCHAR(200) NOT NULL,
    descripcion TEXT,
    "Tienda" VARCHAR(150),
    precio_regular DECIMAL(10,2) NOT NULL,
    precio_oferta DECIMAL(10,2) NOT NULL,
    cantidad_cupon INTEGER NOT NULL DEFAULT 0,
    fecha_inicio TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    fecha_fin TIMESTAMPTZ NOT NULL,
    fecha_vencimiento_canje TIMESTAMPTZ,
    imagen VARCHAR(255),
    estado VARCHAR(50) DEFAULT 'aprobada',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT check_precio_valido CHECK (precio_oferta <= precio_regular),
    CONSTRAINT check_cantidad_positiva CHECK (cantidad_cupon >= 0),
    CONSTRAINT check_fechas_validas CHECK (fecha_fin >= fecha_inicio)
);

-- =====================================================
-- TABLA: CuponesComprados
-- =====================================================
CREATE TABLE "CuponesComprados" (
    id_cupon_comprado SERIAL PRIMARY KEY,
    id_cupon INTEGER REFERENCES "Cupones"(id_cupones) ON DELETE CASCADE,
    id_usuario UUID REFERENCES "Usuarios"(id) ON DELETE CASCADE,
    codigo VARCHAR(50) UNIQUE,
    estado VARCHAR(50) DEFAULT 'disponible',
    fecha_compra TIMESTAMPTZ DEFAULT NOW(),
    fecha_canje TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- ÍNDICES PARA OPTIMIZACIÓN
-- =====================================================
CREATE INDEX idx_cupones_categoria ON "Cupones"(id_categoria);
CREATE INDEX idx_cupones_fecha_fin ON "Cupones"(fecha_fin);
CREATE INDEX idx_cupones_estado ON "Cupones"(estado);
CREATE INDEX idx_cupones_comprados_usuario ON "CuponesComprados"(id_usuario);
CREATE INDEX idx_cupones_comprados_estado ON "CuponesComprados"(estado);
CREATE INDEX idx_cupones_tienda ON "Cupones"("Tienda");

-- =====================================================
-- FUNCIÓN: Generar código único para cupones
-- =====================================================
CREATE OR REPLACE FUNCTION generar_codigo_cupon()
RETURNS TEXT AS $$
DECLARE
    codigo TEXT;
    existe BOOLEAN;
BEGIN
    LOOP
        codigo := UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 16));
        SELECT EXISTS(SELECT 1 FROM "CuponesComprados" WHERE codigo = codigo) INTO existe;
        EXIT WHEN NOT existe;
    END LOOP;
    RETURN codigo;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- TRIGGER: Auto-generar código al comprar cupón
-- =====================================================
CREATE OR REPLACE FUNCTION set_codigo_cupon()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.codigo IS NULL THEN
        NEW.codigo := generar_codigo_cupon();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_codigo_cupon
    BEFORE INSERT ON "CuponesComprados"
    FOR EACH ROW
    EXECUTE FUNCTION set_codigo_cupon();

-- =====================================================
-- TRIGGER: Reducir stock automáticamente al comprar
-- =====================================================
CREATE OR REPLACE FUNCTION reducir_stock_cupon()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE "Cupones"
    SET cantidad_cupon = cantidad_cupon - 1
    WHERE id_cupones = NEW.id_cupon
    AND cantidad_cupon > 0;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_reducir_stock
    AFTER INSERT ON "CuponesComprados"
    FOR EACH ROW
    EXECUTE FUNCTION reducir_stock_cupon();

-- =====================================================
-- TRIGGER: Crear perfil de usuario automáticamente
-- =====================================================
CREATE OR REPLACE FUNCTION crear_perfil_usuario()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO "Usuarios" (id, nombres, apellidos, telefono, dui)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'nombres', ''),
        COALESCE(NEW.raw_user_meta_data->>'apellidos', ''),
        COALESCE(NEW.raw_user_meta_data->>'telefono', ''),
        COALESCE(NEW.raw_user_meta_data->>'dui', '')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trigger_crear_perfil_usuario
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION crear_perfil_usuario();

-- =====================================================
-- POLÍTICAS RLS (ROW LEVEL SECURITY)
-- =====================================================

-- Habilitar RLS en todas las tablas
ALTER TABLE "Usuarios" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Categorias" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Cupones" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "CuponesComprados" ENABLE ROW LEVEL SECURITY;

-- Políticas para Usuarios
CREATE POLICY "Los usuarios pueden ver su propio perfil"
    ON "Usuarios" FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Los usuarios pueden actualizar su propio perfil"
    ON "Usuarios" FOR UPDATE
    USING (auth.uid() = id);

-- Políticas para Categorías (público lectura)
CREATE POLICY "Cualquiera puede ver categorías"
    ON "Categorias" FOR SELECT
    TO PUBLIC
    USING (true);

-- Políticas para Cupones (público lectura de aprobadas)
CREATE POLICY "Cualquiera puede ver cupones aprobados"
    ON "Cupones" FOR SELECT
    TO PUBLIC
    USING (estado = 'aprobada' AND fecha_fin >= NOW());

-- Políticas para CuponesComprados
CREATE POLICY "Los usuarios solo pueden ver sus cupones"
    ON "CuponesComprados" FOR SELECT
    USING (auth.uid() = id_usuario);

CREATE POLICY "Los usuarios autenticados pueden comprar cupones"
    ON "CuponesComprados" FOR INSERT
    WITH CHECK (auth.uid() = id_usuario);

CREATE POLICY "Los usuarios pueden actualizar solo sus cupones"
    ON "CuponesComprados" FOR UPDATE
    USING (auth.uid() = id_usuario);

-- =====================================================
-- DATOS DE EJEMPLO (CATEGORÍAS)
-- =====================================================
INSERT INTO "Categorias" (nombre, descripcion, icono) VALUES
('Alimentos y Bebidas', 'Restaurantes, cafeterías y lugares para comer', '🍔'),
('Moda y Accesorios', 'Ropa, calzado y complementos', '👕'),
('Tecnología', 'Electrónica, gadgets y accesorios tecnológicos', '💻'),
('Salud y Belleza', 'Centros de belleza, spa y productos de cuidado personal', '💅'),
('Deportes y Fitness', 'Gimnasios, equipamiento deportivo', '⚽'),
('Entretenimiento', 'Cines, eventos y actividades recreativas', '🎬'),
('Servicios', 'Servicios profesionales y mantenimiento', '🔧'),
('Hogar y Jardín', 'Muebles, decoración y artículos para el hogar', '🏠');

-- =====================================================
-- DATOS DE EJEMPLO (CUPONES)
-- =====================================================
INSERT INTO "Cupones" (id_categoria, titulo, descripcion, "Tienda", precio_regular, precio_oferta, cantidad_cupon, fecha_inicio, fecha_fin, imagen, estado) VALUES
(1, '2x1 en Hamburguesas Premium', 'Disfruta de dos deliciosas hamburguesas premium por el precio de una', 'Burger King', 12.99, 6.50, 50, NOW(), NOW() + INTERVAL '30 days', 'burger.jpg', 'aprobada'),
(2, '50% descuento en Zapatillas Deportivas', 'Hasta 50% de descuento en toda la línea de zapatillas deportivas', 'Sportline', 89.99, 44.99, 30, NOW(), NOW() + INTERVAL '15 days', 'zapatillas.jpg', 'aprobada'),
(3, 'Café Gratis con cualquier compra', 'Un café latte de cortesía con cualquier compra mayor a $10', 'Starbucks', 5.00, 0.00, 100, NOW(), NOW() + INTERVAL '20 days', 'coffee.jpg', 'aprobada'),
(4, '30% dto en Audífonos Bluetooth', 'Descuento especial en audífonos inalámbricos de última generación', 'RadioShack', 45.00, 31.50, 25, NOW(), NOW() + INTERVAL '25 days', 'audifonos.jpg', 'aprobada'),
(5, 'Masaje Relajante + Facial', 'Paquete spa completo: masaje de 60min + limpieza facial', 'Spa Relax', 75.00, 49.99, 15, NOW(), NOW() + INTERVAL '40 days', 'spa.jpg', 'aprobada');

-- =====================================================
-- VERIFICACIÓN
-- =====================================================
SELECT 'Schema creado exitosamente!' AS status;
SELECT 'Categorías insertadas: ' || COUNT(*) FROM "Categorias";
SELECT 'Cupones de ejemplo: ' || COUNT(*) FROM "Cupones";
