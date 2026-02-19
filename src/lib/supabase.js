import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Faltan las variables de entorno de Supabase')
  console.error('Asegúrate de crear un archivo .env.local con:')
  console.error('VITE_SUPABASE_URL=tu_url')
  console.error('VITE_SUPABASE_ANON_KEY=tu_key')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
