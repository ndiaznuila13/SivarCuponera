import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function getPrecioFromQuery(search) {
  const params = new URLSearchParams(search);
  return params.get('precio') || '--.--';
}

const PagoCupon = () => {
  const [success, setSuccess] = useState(false);
  const [codigo, setCodigo] = useState('');
  const [errorFecha, setErrorFecha] = useState('');
  const location = useLocation();
  const precio = getPrecioFromQuery(location.search);
  const navigate = useNavigate();

  const generarCodigo = () => {
    let code = '';
    for (let i = 0; i < 16; i++) {
      code += Math.floor(Math.random() * 10);
    }
    return code;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorFecha('');
    const formData = new FormData(e.target);
    const fecha = formData.get('fecha');
    // Validar formato MM/AA
    const match = /^\d{2}\/\d{2}$/.test(fecha);
    if (!match) {
      setErrorFecha('La fecha debe estar en formato MM/AA');
      return;
    }
    const [mes, anio] = fecha.split('/').map(Number);
    if (mes < 1 || mes > 12) {
      setErrorFecha('El mes debe estar entre 01 y 12');
      return;
    }
    const actual = new Date().getFullYear() % 100;
    if (anio < actual || anio > 99) {
      setErrorFecha(`El año debe ser igual o mayor a ${actual.toString().padStart(2, '0')} y menor a 100`);
      return;
    }
    setSuccess(true);
    setCodigo(generarCodigo());
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
          {errorFecha && <div className="text-red-600 text-sm mt-1">{errorFecha}</div>}
        </label>
        <label className="block font-medium">
          CVV
          <input type="text" name="cvv" maxLength={4} required className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
        </label>
        <button type="submit" className="w-full mt-2 py-3 bg-primary text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">Pagar</button>
        {success && (
          <>
            <div className="mt-4 text-green-600 font-bold text-center">Pago realizado correctamente.</div>
            <div className="mt-4 flex justify-center">
              <div className="bg-gray-200 rounded-lg px-6 py-4 text-center text-lg font-mono text-gray-700 shadow">
                Código de cupón:<br />
                <span className="tracking-widest text-xl">
                  {codigo.replace(/(.{4})/g, '$1-').replace(/-$/, '')}
                </span>
              </div>
            </div>
          </>
        )}
      </form>
      <button
        className="w-full mt-4 py-3 bg-gray-200 text-primary font-bold rounded-lg hover:bg-gray-300 transition-colors"
        onClick={() => navigate('/')}
      >
        Regresar a la página principal
      </button>
    </div>
  );
};

export default PagoCupon;
