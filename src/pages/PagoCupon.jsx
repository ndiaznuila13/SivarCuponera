import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

function getPrecioFromQuery(search) {
  const params = new URLSearchParams(search);
  return params.get('precio') || '--.--';
}

const PagoCupon = () => {
  const [success, setSuccess] = useState(false);
  const location = useLocation();
  const precio = getPrecioFromQuery(location.search);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Pagar Cupón</h2>
      <div className="text-lg font-semibold mb-4 text-center">Precio: <span className="text-primary">${precio}</span></div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block font-medium">
          Nombre del titular
          <input type="text" name="nombre" required className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
        </label>
        <label className="block font-medium">
          Número de tarjeta
          <input type="text" name="numero" maxLength={16} required className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
        </label>
        <label className="block font-medium">
          Fecha de expiración (MM/AA)
          <input type="text" name="fecha" placeholder="MM/AA" required className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
        </label>
        <label className="block font-medium">
          CVV
          <input type="text" name="cvv" maxLength={4} required className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
        </label>
        <button type="submit" className="w-full mt-2 py-3 bg-primary text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">Pagar</button>
        {success && <div className="mt-4 text-green-600 font-bold text-center">Pago realizado correctamente.</div>}
      </form>
    </div>
  );
};

export default PagoCupon;
