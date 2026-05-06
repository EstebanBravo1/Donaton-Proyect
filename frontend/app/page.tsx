"use client"; // Importante: Necesario para usar hooks como useState

import React, { useState } from 'react';
import { UserCircle, LogIn, LogOut, Heart } from 'lucide-react';

export default function HomePage() {
  // Estado para simular si el usuario está logueado o no
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <main className="min-h-screen bg-white">
      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-8 py-4 border-b bg-white sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">D</div>
          <span className="text-xl font-bold tracking-tight text-gray-800">Donaton</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
            <a href="#" className="hover:text-blue-600 transition">Proyectos</a>
            <a href="#" className="hover:text-blue-600 transition">Transparencia</a>
          </div>

          <div className="flex items-center gap-3 border-l pl-6">
            {/* Cambiamos los botones del Navbar según el estado */}
            {!isLoggedIn ? (
              <>
                <button 
                  onClick={() => setIsLoggedIn(true)} // Simulación de login
                  className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition"
                >
                  <LogIn size={18} />
                  Iniciar sesión
                </button>
                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition shadow-sm">
                  <UserCircle size={18} />
                  Registrarse
                </button>
              </>
            ) : (
              <button 
                onClick={() => setIsLoggedIn(false)} // Simulación de logout
                className="flex items-center gap-2 text-sm font-medium text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg transition"
              >
                <LogOut size={18} />
                Cerrar sesión
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* LÓGICA CONDICIONAL DE HEROS */}
      {isLoggedIn ? (
        /* HERO ANTERIOR - AHORA CON FONDO AZUL (USUARIO LOGUEADO) */
        <section className="relative bg-blue-600 py-20 px-6 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6 backdrop-blur-sm">
              <Heart className="text-yellow-400" size={32} fill="currentColor" />
            </div>
            <h1 className="text-4xl font-extrabold mb-4">
              ¡Hola de nuevo, Donante!
            </h1>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Tu compromiso hace la diferencia. Estas son las campañas activas donde tu ayuda es vital hoy mismo.
            </p>
            <div className="flex justify-center gap-4">
              <button className="bg-yellow-400 text-blue-900 px-8 py-3 rounded-xl font-bold hover:bg-yellow-300 transition shadow-lg">
                Gestionar Donación
              </button>
              <button className="bg-transparent border-2 border-white/40 px-8 py-3 rounded-xl font-bold hover:bg-white/10 transition">
                Mi Impacto Social
              </button>
            </div>
          </div>
        </section>
      ) : (
        /* HERO NUEVO (USUARIO VISITANTE) */
        <section className="relative bg-blue-600 py-24 px-6 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-extrabold mb-4 leading-tight">
              Transforma tu intención <br /> en ayuda real
            </h1>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Únete a la red de Donaton. Regístrate para gestionar tus donaciones y hacer seguimiento del impacto de tu ayuda.
            </p>
            <button className="bg-yellow-400 text-blue-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 transition shadow-xl">
              Comenzar a ayudar
            </button>
          </div>
        </section>
      )}

      {/* SECCIÓN DE CATEGORÍAS (Visible para todos) */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">¿Cómo puedes ayudar?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 border rounded-xl hover:shadow-lg transition text-center">
            <div className="text-4xl mb-4">🍎</div>
            <h3 className="text-xl font-bold mb-2">Alimentos</h3>
            <p className="text-gray-600">Productos no perecederos y canastas básicas.</p>
          </div>
          <div className="p-6 border rounded-xl hover:shadow-lg transition text-center">
            <div className="text-4xl mb-4">👕</div>
            <h3 className="text-xl font-bold mb-2">Ropa y Abrigo</h3>
            <p className="text-gray-600">Prendas en buen estado para zonas vulnerables.</p>
          </div>
          <div className="p-6 border rounded-xl hover:shadow-lg transition text-center opacity-75">
            <div className="text-4xl mb-4">⚕️</div>
            <h3 className="text-xl font-bold mb-2 text-gray-400">Insumos Médicos</h3>
            <p className="text-gray-400 text-sm">Próximamente disponible.</p>
          </div>
        </div>
      </section>
    </main>
  );
}