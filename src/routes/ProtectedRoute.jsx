import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function ProtectedRoute() {
    const [session, setSession] = useState(undefined);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });
    }, []);

    if (session === undefined) {
        return <div className="text-center mt-10">Cargando...</div>;
    }

    // Si hay sesión → mostrar las rutas hijas 
    if (session) {
         return <Outlet />; } 
         
    // Si no hay sesión → login 
    return <Navigate to="/login" replace />;
}