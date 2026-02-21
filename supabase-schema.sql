-- =============================================
-- PASO 1: ELIMINAR TODO (si existe)
-- =============================================
DROP TRIGGER IF EXISTS trigger_crear_perfil_usuario ON auth.users CASCADE;
DROP TRIGGER IF EXISTS trigger_generar_codigo_cupon ON public."CuponesComprados" CASCADE;
DROP TRIGGER IF EXISTS trigger_reducir_stock ON public."CuponesComprados" CASCADE;
DROP FUNCTION IF EXISTS crear_perfil_usuario() CASCADE;
DROP FUNCTION IF EXISTS generar_codigo_cupon() CASCADE;
DROP FUNCTION IF EXISTS reducir_stock_cupon() CASCADE;

DROP TABLE IF EXISTS public."CuponesComprados" CASCADE;
DROP TABLE IF EXISTS public."Cupones" CASCADE;
DROP TABLE IF EXISTS public."Categorias" CASCADE;
DROP TABLE IF EXISTS public."Usuarios" CASCADE;

-- =============================================
-- PASO 2: CREAR TABLAS
-- =============================================

-- Tabla Usuarios (perfil extendido de auth.users)
CREATE TABLE public."Usuarios" (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    dui VARCHAR(10),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla Categorias
CREATE TABLE public."Categorias" (
    id_categoria SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE
);

-- Tabla Cupones (ofertas)
CREATE TABLE public."Cupones" (
    id_cupones SERIAL PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    descripcion TEXT,
    "Tienda" VARCHAR(150) NOT NULL,
    precio_regular NUMERIC(10, 2) NOT NULL,
    precio_oferta NUMERIC(10, 2) NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    fecha_vencimiento_cupon DATE,
    cantidad_cupon INTEGER NOT NULL DEFAULT 0,
    imagen VARCHAR(255),
    id_categoria INTEGER REFERENCES public."Categorias"(id_categoria),
    otros_detalles TEXT,
    estado VARCHAR(20) DEFAULT 'aprobada' CHECK (estado IN ('pendiente', 'aprobada', 'rechazada')),
    etiqueta TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla CuponesComprados
CREATE TABLE public."CuponesComprados" (
    id_cupones SERIAL PRIMARY KEY,
    id UUID NOT NULL REFERENCES public."Usuarios"(id) ON DELETE CASCADE,
    id_cupon INTEGER NOT NULL REFERENCES public."Cupones"(id_cupones) ON DELETE CASCADE,
    codigo VARCHAR(50) UNIQUE NOT NULL,
    estado VARCHAR(20) DEFAULT 'disponible' CHECK (estado IN ('disponible', 'usado', 'vencido')),
    fecha_compra TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- PASO 3: INSERTAR DATOS DE EJEMPLO
-- =============================================

INSERT INTO public."Categorias" (nombre) VALUES
('Restaurantes'),
('Entretenimiento'),
('Belleza y Spa'),
('Deportes'),
('Tecnología'),
('Moda'),
('Salud'),
('Viajes');

INSERT INTO public."Cupones" (
    titulo, descripcion, "Tienda", precio_regular, precio_oferta,
    fecha_inicio, fecha_fin, cantidad_cupon, id_categoria, estado, imagen
) VALUES
('2x1 en Hamburguesas', 'Lleva 2 hamburguesas al precio de 1', 'Burger King', 12.00, 6.00, '2024-01-01', '2025-12-31', 50, 1, 'aprobada', 'burger.jpg'),
('50% en Pizza Familiar', 'Gran descuento en pizza grande', 'Pizza Hut', 20.00, 10.00, '2024-01-01', '2025-12-31', 30, 1, 'aprobada', 'pizza.jpg'),
('Entrada 2x1 al Cine', 'Dos entradas por el precio de una', 'Cinemark', 10.00, 5.00, '2024-01-01', '2025-12-31', 100, 2, 'aprobada', 'cine.jpg'),
('Masaje Relajante 30% OFF', 'Descuento en masaje de 60 minutos', 'Spa Relax', 50.00, 35.00, '2024-01-01', '2025-12-31', 20, 3, 'aprobada', 'spa.jpg'),
('Laptop Gamer 15% OFF', 'Descuento en laptops gaming', 'TechStore', 1200.00, 1020.00, '2024-01-01', '2025-12-31', 10, 5, 'aprobada', 'laptop.jpg');

-- =============================================
-- PASO 4: CREAR TRIGGER PARA AUTO-CREAR PERFIL
-- =============================================

CREATE OR REPLACE FUNCTION crear_perfil_usuario()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public."Usuarios" (id, nombres, apellidos, telefono, dui)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'nombres', 'Usuario'),
        COALESCE(NEW.raw_user_meta_data->>'apellidos', 'Nuevo'),
        COALESCE(NEW.raw_user_meta_data->>'telefono', NULL),
        COALESCE(NEW.raw_user_meta_data->>'dui', NULL)
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trigger_crear_perfil_usuario
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION crear_perfil_usuario();

-- =============================================
-- PASO 5: POLÍTICAS DE SEGURIDAD (RLS)
-- =============================================

ALTER TABLE public."Usuarios" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Categorias" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Cupones" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."CuponesComprados" ENABLE ROW LEVEL SECURITY;

-- Usuarios: solo pueden ver/editar su propio perfil
CREATE POLICY "Usuarios pueden ver su perfil" ON public."Usuarios"
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Usuarios pueden actualizar su perfil" ON public."Usuarios"
    FOR UPDATE USING (auth.uid() = id);

-- Categorías: todos pueden leer
CREATE POLICY "Todos pueden ver categorías" ON public."Categorias"
    FOR SELECT TO authenticated, anon USING (true);

-- Cupones: todos pueden ver ofertas aprobadas
CREATE POLICY "Todos pueden ver cupones aprobados" ON public."Cupones"
    FOR SELECT TO authenticated, anon 
    USING (estado = 'aprobada');

-- CuponesComprados: solo el dueño puede ver sus cupones
CREATE POLICY "Ver solo mis cupones comprados" ON public."CuponesComprados"
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Insertar mis cupones comprados" ON public."CuponesComprados"
    FOR INSERT WITH CHECK (auth.uid() = id);

-- =============================================
-- CONFIRMACIÓN
-- =============================================
SELECT 'Schema creado exitosamente!' AS mensaje;