import React from 'react';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* SECCIÓN HERO */}
      <section className="relative bg-blue-600 py-20 px-6 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-extrabold mb-4">
            Tu ayuda llega donde más se necesita
          </h1>
          <p className="text-xl mb-8 opacity-90">
            En Donaton coordinamos logística y corazón para llevar alimentos, ropa e insumos médicos a comunidades en emergencia.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-yellow-400 text-blue-900 px-8 py-3 rounded-full font-bold hover:bg-yellow-300 transition">
              Donar Ahora
            </button>
            <button className="border-2 border-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-blue-600 transition">
              Ver Emergencias Activas
            </button>
          </div>
        </div>
      </section>

      {/* CATEGORÍAS DE DONACIÓN */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">¿Cómo puedes ayudar?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card: Alimentos */}
          <div className="p-6 border rounded-xl hover:shadow-lg transition text-center">
            <div className="text-4xl mb-4">🍎</div>
            <h3 className="text-xl font-bold mb-2">Alimentos</h3>
            <p className="text-gray-600">Productos no perecederos y canastas básicas para familias.</p>
          </div>

          {/* Card: Ropa */}
          <div className="p-6 border rounded-xl hover:shadow-lg transition text-center">
            <div className="text-4xl mb-4">👕</div>
            <h3 className="text-xl font-bold mb-2">Ropa y Abrigo</h3>
            <p className="text-gray-600">Prendas en buen estado para niños y adultos en zonas vulnerables.</p>
          </div>

          {/* Card: Insumos Médicos */}
          <div className="p-6 border rounded-xl hover:shadow-lg transition text-center">
            <div className="text-4xl mb-4">⚕️</div>
            <h3 className="text-xl font-bold mb-2">Insumos Médicos</h3>
            <p className="text-gray-400 text-sm italic">Próximamente disponible para centros de salud.</p>
          </div>
          
        </div>
      </section>

      {/* IMPACTO (Social Proof) */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-6">Nuestra transparencia en números</h2>
          <div className="flex justify-around">
            <div>
              <p className="text-4xl font-black text-blue-600">+12k</p>
              <p className="text-gray-500 uppercase text-sm tracking-widest">Kilos entregados</p>
            </div>
            <div>
              <p className="text-4xl font-black text-blue-600">45</p>
              <p className="text-gray-500 uppercase text-sm tracking-widest">Comunidades</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}