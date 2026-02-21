import React, { useEffect, useState } from 'react';
import { obtenerMisCupones } from '../lib/api';

const MisCuponesComprados = () => {
  const [cupones, setCupones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('todos');

  useEffect(() => {
    const fetchCupones = async () => {
      setLoading(true);
      const result = await obtenerMisCupones(filtro);

      if (result.success) {
        setCupones(result.data);
      } else {
        setCupones([]);
      }

      setLoading(false);
    };

    fetchCupones();
  }, [filtro]);

  if (loading) {
    return (
      <div className="text-center py-8">
        Cargando cupones comprados...
      </div>
    );
  }

  if (!cupones || cupones.length === 0) {
    return (
      <div className="text-center py-8 text-slate-500">
        No tienes ningún cupón comprado, aún...
      </div>
    );
  }

 
  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Cupones Comprados
      </h2>

      {/* Filtros */}
      <div className="flex gap-2 mb-6 justify-center">
        {['todos', 'disponible', 'canjeado', 'vencido'].map((estado) => (
          <button
            key={estado}
            onClick={() => setFiltro(estado)}
            className={`px-4 py-2 rounded-lg capitalize ${
              filtro === estado
                ? 'bg-primary text-white'
                : 'bg-gray-200'
            }`}
          >
            {estado}
          </button>
        ))}
      </div>

      {/* Lista */}
      <ul className="space-y-4">
        {cupones.map((cupon) => {
          // Detectar si está vencido
          const vencido =
            new Date(cupon.Cupones?.fecha_vencimiento_cupon) < new Date();

          // Estado que se mostrará
          const estadoMostrar =
            vencido && cupon.estado === 'disponible'
              ? 'vencido'
              : cupon.estado;
          
          return (
            <li
              key={cupon.id}
              className="bg-gray-100 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <div className="font-bold text-primary text-lg">
                  {cupon.Cupones?.Tienda || 'Tienda'}
                </div>

                <div className="text-slate-700">
                  {cupon.Cupones?.titulo || 'Cupón'}
                </div>

                {/* Estado */}
                <div className="text-sm mt-1 capitalize">
                  Estado: {estadoMostrar}
                </div>
              </div>

              <div className="mt-2 sm:mt-0 flex flex-col items-end gap-2">
                <div className="font-mono text-gray-700 text-base">
                  Código: {cupon.codigo || 'N/A'}
                </div>

                <button
                  className="px-3 py-1 text-sm bg-primary text-white rounded-lg hover:opacity-90"
                  onClick={() => alert('Función de descarga PDF pendiente')}
                >
                  Descargar PDF
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MisCuponesComprados;