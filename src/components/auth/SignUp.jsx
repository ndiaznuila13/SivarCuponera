import React from 'react'

export default function SignUp() {
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
                                    placeholder="Alexander"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Apellido
                                </label>
                                <input
                                    type="text"
                                    placeholder="Martínez"
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
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                            />
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
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Teléfono
                                </label>
                                <input
                                    type="tel"
                                    placeholder="7000-0000"
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
