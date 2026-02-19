# 🎯 Guía de Configuración de Supabase - Sivar Cuponera

## 📋 Pasos para configurar Supabase

### 1. Crear cuenta y proyecto en Supabase

1. Ve a [https://supabase.com](https://supabase.com) y crea una cuenta
2. Crea un nuevo proyecto
3. Guarda las credenciales que aparecerán (URL y anon key)

### 2. Configurar variables de entorno

1. Copia el archivo `.env.example` a `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edita `.env.local` y reemplaza con tus credenciales:
   ```env
   VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
   VITE_SUPABASE_ANON_KEY=tu-anon-key-aqui
   ```

### 3. Crear el esquema de base de datos

1. Ve al Dashboard de Supabase → SQL Editor
2. Abre el archivo `supabase-schema.sql` de este proyecto
3. Copia todo el contenido y pégalo en el SQL Editor
4. Haz clic en "Run" para ejecutar el script

Esto creará:
- ✅ Todas las tablas necesarias (rubros, empresas, ofertas, clientes, cupones)
- ✅ Índices para optimización
- ✅ Funciones auxiliares (generar códigos, verificar disponibilidad)
- ✅ Triggers automáticos
- ✅ Políticas de seguridad (RLS)
- ✅ Datos de ejemplo para desarrollo

### 4. Configurar autenticación de email

1. Ve a Authentication → Providers
2. Habilita "Email"
3. Configura las plantillas de email en "Email Templates" (opcional)
4. Para desarrollo, puedes deshabilitar "Confirm email" temporalmente

### 5. Verificar instalación

Ejecuta el proyecto:
```bash
npm run dev
```

Si todo está bien configurado, no deberías ver errores en la consola relacionados con Supabase.

## 📊 Estructura de la Base de Datos

### Tablas principales (Fase 1):

- **rubros**: Categorías de ofertas (restaurantes, deportes, etc.)
- **empresas**: Empresas que ofrecen cupones
- **ofertas**: Promociones con descuentos
- **clientes**: Usuarios registrados (extiende auth.users)
- **cupones**: Cupones comprados por clientes

### Relaciones:
```
rubros
  └── empresas
        └── ofertas
              └── cupones
                    └── clientes (auth.users)
```

### Estados de ofertas:
- `en_espera`: Pendiente de aprobación (Fase 2)
- `aprobada`: Visible públicamente
- `rechazada`: No aprobada (Fase 2)
- `descartada`: Cancelada por la empresa (Fase 2)

### Estados de cupones:
- `disponible`: Puede canjearse
- `canjeado`: Ya fue usado
- `vencido`: Pasó la fecha límite

## 🔐 Seguridad (RLS)

El esquema incluye Row Level Security activado:

- Los clientes solo pueden ver sus propios cupones
- Las ofertas públicas solo son visibles si están aprobadas
- Los clientes solo pueden editar su propia información

## 🧪 Datos de Ejemplo

El script incluye datos de ejemplo:
- 6 rubros precargados
- 1 empresa de ejemplo (Restaurante El Buen Sabor)
- 1 oferta de ejemplo ya aprobada

## 📝 Próximos Pasos

Ahora puedes continuar con:
1. ✅ Crear componentes de Login/Registro
2. ✅ Mostrar ofertas desde la base de datos
3. ✅ Implementar compra de cupones
4. ✅ Visualizar cupones del cliente

## 🐛 Solución de Problemas

### Error: "Missing supabase environment variables"
- Verifica que el archivo `.env.local` existe
- Asegúrate de que las variables comienzan con `VITE_`
- Reinicia el servidor de desarrollo (`npm run dev`)

### Error al ejecutar el SQL
- Asegúrate de copiar TODO el contenido del archivo
- Verifica que no haya errores de sintaxis
- Intenta ejecutar en secciones más pequeñas

### Los datos no se muestran
- Verifica que ejecutaste el script SQL completo
- Revisa las políticas RLS en Authentication → Policies
- Verifica que las ofertas de ejemplo tengan estado 'aprobada'

## 📚 Recursos

- [Documentación de Supabase](https://supabase.com/docs)
- [Guía de Auth en Supabase](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
