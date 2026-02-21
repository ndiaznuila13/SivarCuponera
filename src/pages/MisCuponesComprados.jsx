import React, { useEffect, useState } from 'react';
import { obtenerMisCupones } from '../lib/api';

const MisCuponesComprados = () => {
  const [cupones, setCupones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCupones = async () => {
      setLoading(true);
      const result = await obtenerMisCupones();
      if (result.success) {
        setCupones(result.data);
      } else {
        setCupones([]);
      }
      setLoading(false);
    };
    fetchCupones();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Cargando cupones comprados...</div>;
  }

  if (!cupones || cupones.length === 0) {
    return <div className="text-center py-8 text-slate-500">No tienes ningún cupón comprado de momento.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Cupones Comprados</h2>
      <ul className="space-y-4">
        {cupones.map((cupon) => (
          <li key={cupon.id_cupon} className="bg-gray-100 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="font-bold text-primary text-lg">{cupon.Cupones?.Tienda || 'Tienda'}</div>
              <div className="text-slate-700">{cupon.Cupones?.titulo || 'Cupón'}</div>
            </div>
            <div className="mt-2 sm:mt-0 font-mono text-gray-700 text-base">
              Código: {cupon.codigo || 'N/A'}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MisCuponesComprados;
