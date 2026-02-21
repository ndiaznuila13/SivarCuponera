import React from 'react'
import { useState } from 'react'

export default function SignUp() {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--color-background-light)] px-4">

            <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden md:grid md:grid-cols-2">

                {/* Lado izquierdo - Branding (solo visible en desktop) */}
                <div className="hidden md:flex flex-col justify-center items-center bg-[var(--color-oxford-navy)] text-white p-12">
                    <h2 className="text-4xl font-bold mb-4">
                        Únete a SivarCuponera
                    </h2>
                    <p className="text-lg text-gray-200 text-center">
                        Crea tu cuenta y empieza a ahorrar en tus compras favoritas.
                    </p>
                </div>

                {/* Lado derecho - Formulario */}
                <div className="w-full p-8 md:p-12">

                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-[var(--color-oxford-navy)]">
                            Crear Cuenta
                        </h1>
                        <p className="text-gray-500 mt-2">
                            Completa tus datos para registrarte
                        </p>
                    </div>

                    <form className="space-y-5">

                        {/* Nombre y Apellido */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    placeholder="Juan"
                                    required
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Apellido
                                </label>
                                <input
                                    type="text"
                                    placeholder="Pérez"
                                    required
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                                />
                            </div>

                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Correo electrónico
                            </label>
                            <input
                                type="email"
                                placeholder="correo@email.com"
                                required
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Contraseña
                            </label>

                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                                />

                                {/* Botón ojito */}
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 hover:text-gray-700 hover:cursor-pointer"
                                >
                                    {showPassword ? (
                                        // Ojo abierto
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7
                      -1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    ) : (
                                        // Ojo cerrado
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M13.875 18.825A10.05 10.05 0 0112 19
                      c-4.478 0-8.268-2.943-9.542-7a9.956 9.956 0 012.223-3.592M6.18 6.18A9.953 9.953 0 0112 5
                      c4.478 0 8.268 2.943 9.542 7a9.96 9.96 0 01-4.293 5.067M15 12a3 3 0 00-4.243-2.828M3 3l18 18" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* DUI y Teléfono */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    DUI
                                </label>
                                <input
                                    type="text"
                                    placeholder="00000000-0"
                                    pattern="[0-9]{8}-[0-9]{1}"
                                    required
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Teléfono
                                </label>
                                <input
                                    type="tel"
                                    placeholder="0000-0000"
                                    pattern="[0-9]{4}-[0-9]{4}"
                                    required
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                                />
                            </div>

                        </div>

                        {/* Botón */}
                        <button
                            type="button"
                            className="w-full bg-[var(--color-primary)] hover:opacity-90 text-white font-semibold py-3 rounded-lg transition duration-200"
                        >
                            Registrarse
                        </button>

                    </form>

                    {/* Link a login */}
                    <p className="text-sm text-center text-gray-500 mt-6">
                        ¿Ya tienes cuenta?{" "}
                        <span className="text-[var(--color-primary)] font-medium cursor-pointer hover:underline">
                            Inicia sesión
                        </span>
                    </p>

                </div>
            </div>
        </div>
    );
}
