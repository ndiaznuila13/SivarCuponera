-- =====================================================
-- SCHEMA SUPABASE - SIVAR CUPONERA (FASE 1)
-- =====================================================

-- Tabla: rubros (restaurantes, entretenimiento, salones, etc.)
CREATE TABLE rubros (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre VARCHAR(100) NOT NULL UNIQUE,
  descripcion TEXT,
  icono VARCHAR(50),
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla: empresas (empresas ofertantes)
CREATE TABLE empresas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  codigo VARCHAR(6) NOT NULL UNIQUE, -- Formato: 3 letras + 3 dígitos (ej: RES001)
  nombre VARCHAR(200) NOT NULL,
  direccion TEXT,
  telefono VARCHAR(20),
  correo VARCHAR(255) NOT NULL UNIQUE,
  password_hash TEXT, -- Para Fase 2 (login de empresas)
  contacto_nombre VARCHAR(200),
  rubro_id UUID REFERENCES rubros(id) ON DELETE SET NULL,
  porcentaje_comision DECIMAL(5,2) DEFAULT 10.00,
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla: ofertas
CREATE TABLE ofertas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  empresa_id UUID REFERENCES empresas(id) ON DELETE CASCADE,
  titulo VARCHAR(255) NOT NULL,
  descripcion TEXT NOT NULL,
  detalles TEXT,
  precio_regular DECIMAL(10,2) NOT NULL,
  precio_oferta DECIMAL(10,2) NOT NULL,
  fecha_inicio DATE NOT NULL,
  fecha_fin DATE NOT NULL,
  fecha_limite_canje DATE NOT NULL,
  cantidad_limite INTEGER, -- NULL = sin límite
  cantidad_vendida INTEGER DEFAULT 0,
  imagen_url TEXT,
  estado VARCHAR(50) DEFAULT 'en_espera', 
  -- Estados: en_espera, aprobada, rechazada, descartada
  razon_rechazo TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT precio_oferta_menor CHECK (precio_oferta < precio_regular),
  CONSTRAINT cantidad_vendida_check CHECK (cantidad_vendida >= 0),
  CONSTRAINT fechas_validas CHECK (fecha_fin >= fecha_inicio AND fecha_limite_canje >= fecha_fin)
);

-- Tabla: clientes (extiende auth.users de Supabase)
CREATE TABLE clientes (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nombres VARCHAR(100) NOT NULL,
  apellidos VARCHAR(100) NOT NULL,
  telefono VARCHAR(20),
  direccion TEXT,
  dui VARCHAR(10) NOT NULL UNIQUE, -- 9 dígitos + 1 verificador
  email VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla: cupones
CREATE TABLE cupones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  codigo VARCHAR(13) NOT NULL UNIQUE, -- Formato: código empresa (6) + 7 dígitos random
  cliente_id UUID REFERENCES clientes(id) ON DELETE RESTRICT,
  fecha_compra TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  fecha_canje TIMESTAMP WITH TIME ZONE,
  estado VARCHAR(50) DEFAULT 'disponible',
  -- Estados: disponible, canjeado, vencido
  dui_canje VARCHAR(10), -- DUI de quien canjea (debe coincidir con DUI del cliente)
  empleado_canje_id UUID, -- Para Fase 2
  metodo_pago VARCHAR(50), -- tarjeta_credito, tarjeta_debito, etc
  monto_pagado DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT estado_canje_check CHECK (
    (estado = 'canjeado' AND fecha_canje IS NOT NULL) OR 
    (estado != 'canjeado' AND fecha_canje IS NULL)
  )
);

-- Tabla: empleados (Para Fase 2 - empleados de empresas ofertantes)
CREATE TABLE empleados (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  empresa_id UUID REFERENCES empresas(id) ON DELETE CASCADE,
  nombres VARCHAR(100) NOT NULL,
  apellidos VARCHAR(100) NOT NULL,
  correo VARCHAR(255) NOT NULL UNIQUE,
  password_hash TEXT,
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- INDICES PARA OPTIMIZACIÓN
-- =====================================================

CREATE INDEX idx_ofertas_empresa ON ofertas(empresa_id);
CREATE INDEX idx_ofertas_estado ON ofertas(estado);
CREATE INDEX idx_ofertas_fechas ON ofertas(fecha_inicio, fecha_fin);
CREATE INDEX idx_cupones_cliente ON cupones(cliente_id);
CREATE INDEX idx_cupones_oferta ON cupones(oferta_id);
CREATE INDEX idx_cupones_estado ON cupones(estado);
CREATE INDEX idx_cupones_codigo ON cupones(codigo);
CREATE INDEX idx_empresas_rubro ON empresas(rubro_id);

-- =====================================================
-- FUNCIONES Y TRIGGERS
-- =====================================================

-- Trigger: Actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_empresas_updated_at BEFORE UPDATE ON empresas
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ofertas_updated_at BEFORE UPDATE ON ofertas
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_clientes_updated_at BEFORE UPDATE ON clientes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Función: Verificar disponibilidad de cupones antes de compra
CREATE OR REPLACE FUNCTION verificar_disponibilidad_oferta(oferta_uuid UUID)
RETURNS BOOLEAN AS $$
DECLARE
  oferta_record RECORD;
BEGIN
  SELECT * INTO oferta_record FROM ofertas WHERE id = oferta_uuid;
  
  -- Verificar que la oferta existe y está aprobada
  IF oferta_record IS NULL OR oferta_record.estado != 'aprobada' THEN
    RETURN FALSE;
  END IF;
  
  -- Verificar fechas de vigencia
  IF CURRENT_DATE < oferta_record.fecha_inicio OR CURRENT_DATE > oferta_record.fecha_fin THEN
    RETURN FALSE;
  END IF;
  
  -- Verificar límite de cupones
  IF oferta_record.cantidad_limite IS NOT NULL AND 
     oferta_record.cantidad_vendida >= oferta_record.cantidad_limite THEN
    RETURN FALSE;
  END IF;
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- Función: Generar código único de cupón
CREATE OR REPLACE FUNCTION generar_codigo_cupon(codigo_empresa VARCHAR)
RETURNS VARCHAR AS $$
DECLARE
  codigo_random VARCHAR(7);
  codigo_completo VARCHAR(13);
  existe BOOLEAN;
BEGIN
  LOOP
    -- Generar 7 dígitos aleatorios
    codigo_random := LPAD(FLOOR(RANDOM() * 10000000)::TEXT, 7, '0');
    codigo_completo := codigo_empresa || codigo_random;
    
    -- Verificar que no existe
    SELECT EXISTS(SELECT 1 FROM cupones WHERE codigo = codigo_completo) INTO existe;
    
    IF NOT existe THEN
      RETURN codigo_completo;
    END IF;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Trigger: Actualizar cantidad_vendida cuando se crea un cupón
CREATE OR REPLACE FUNCTION incrementar_cantidad_vendida()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE ofertas 
  SET cantidad_vendida = cantidad_vendida + 1 
  WHERE id = NEW.oferta_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_incrementar_vendida AFTER INSERT ON cupones
  FOR EACH ROW EXECUTE FUNCTION incrementar_cantidad_vendida();

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Habilitar RLS en todas las tablas
ALTER TABLE rubros ENABLE ROW LEVEL SECURITY;
ALTER TABLE empresas ENABLE ROW LEVEL SECURITY;
ALTER TABLE ofertas ENABLE ROW LEVEL SECURITY;
ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE cupones ENABLE ROW LEVEL SECURITY;
ALTER TABLE empleados ENABLE ROW LEVEL SECURITY;

-- Políticas: Rubros (lectura pública)
CREATE POLICY "Rubros son visibles para todos" ON rubros
  FOR SELECT USING (activo = true);

-- Políticas: Empresas (lectura pública solo si están activas)
CREATE POLICY "Empresas activas son visibles" ON empresas
  FOR SELECT USING (activo = true);

-- Políticas: Ofertas (lectura pública de ofertas aprobadas)
CREATE POLICY "Ofertas aprobadas son visibles" ON ofertas
  FOR SELECT USING (estado = 'aprobada');

-- Políticas: Clientes (solo pueden ver y editar su propia información)
CREATE POLICY "Clientes pueden ver su propia info" ON clientes
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Clientes pueden actualizar su propia info" ON clientes
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Registro de clientes permitido" ON clientes
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Políticas: Cupones (clientes solo ven sus propios cupones)
CREATE POLICY "Clientes ven sus propios cupones" ON cupones
  FOR SELECT USING (auth.uid() = cliente_id);

CREATE POLICY "Clientes pueden comprar cupones" ON cupones
  FOR INSERT WITH CHECK (auth.uid() = cliente_id);

-- =====================================================
-- DATOS DE EJEMPLO (Para desarrollo)
-- =====================================================

-- Insertar rubros
INSERT INTO rubros (nombre, descripcion, icono) VALUES
  ('Restaurantes', 'Restaurantes y lugares de comida', '🍽️'),
  ('Entretenimiento', 'Cine, teatro, eventos', '🎭'),
  ('Salones de Belleza', 'Peluquerías y spas', '💇'),
  ('Deportes', 'Gimnasios y tiendas deportivas', '⚽'),
  ('Tecnología', 'Electrónica y gadgets', '💻'),
  ('Moda', 'Ropa, zapatos y accesorios', '👗');

-- Insertar una empresa de ejemplo
INSERT INTO empresas (codigo, nombre, direccion, telefono, correo, contacto_nombre, rubro_id, porcentaje_comision)
SELECT 
  'RES001',
  'Restaurante El Buen Sabor',
  'San Salvador, Centro',
  '2222-3333',
  'contacto@elbuensabor.com',
  'Juan Pérez',
  id,
  15.00
FROM rubros WHERE nombre = 'Restaurantes' LIMIT 1;

-- Insertar una oferta de ejemplo (deberás aprobarla manualmente en Fase 2)
INSERT INTO ofertas (
  empresa_id, 
  titulo, 
  descripcion, 
  detalles,
  precio_regular, 
  precio_oferta, 
  fecha_inicio, 
  fecha_fin, 
  fecha_limite_canje,
  cantidad_limite,
  estado
)
SELECT 
  id,
  '2x1 en plato fuerte',
  'Compra un plato fuerte y lleva otro completamente gratis',
  'Válido de lunes a viernes. No aplica en días festivos.',
  25.00,
  12.50,
  CURRENT_DATE,
  CURRENT_DATE + INTERVAL '30 days',
  CURRENT_DATE + INTERVAL '60 days',
  100,
  'aprobada'
FROM empresas WHERE codigo = 'RES001' LIMIT 1;

-- =====================================================
-- NOTAS IMPORTANTES PARA EL DESARROLLO
-- =====================================================

-- 1. Configurar autenticación de Supabase:
--    - Habilitar Email Auth en el Dashboard
--    - Configurar Email Templates
--    - Habilitar confirmación por email

-- 2. Para crear un cliente, primero se registra en auth.users (Supabase Auth)
--    y luego se crea el registro en la tabla clientes con el mismo UUID

-- 3. Variables de entorno necesarias en .env.local:
--    VITE_SUPABASE_URL=tu_url_de_proyecto
--    VITE_SUPABASE_ANON_KEY=tu_anon_key

-- 4. Para generar un cupón:
--    a. Verificar disponibilidad con verificar_disponibilidad_oferta()
--    b. Obtener código de empresa desde la oferta
--    c. Generar código con generar_codigo_cupon()
--    d. Insertar en tabla cupones
--    e. Enviar email de confirmación

-- 5. Estados de cupones se actualizan automáticamente:
--    - 'disponible': recién comprado
--    - 'canjeado': cuando se canjea en el establecimiento
--    - 'vencido': cuando pasa la fecha_limite_canje (puede ser un CRON job)
