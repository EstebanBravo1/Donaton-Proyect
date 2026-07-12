"use client";

import Link from "next/link";
import { ArrowLeft, ClipboardList } from "lucide-react";
import { useDonationManager } from "@/hooks/useDonationManager";

export default function GestionarDonacionPage() {
  const {
    donations,
    users,
    loading,
    errorMessage,
    selectedDonorId,
    setSelectedDonorId,
  } = useDonationManager();

  return (
    <main className="min-h-screen bg-white">
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b bg-white px-8 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 font-bold text-white">
            D
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-800">Donaton</span>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            <ArrowLeft size={16} />
            Volver al inicio
          </Link>
        </div>
      </nav>

      <section className="bg-blue-600 px-6 py-14 text-white">
        <div className="mx-auto max-w-6xl">
          <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
            <ClipboardList size={22} className="text-yellow-300" />
          </div>
          <h1 className="text-4xl font-extrabold">Gestionar Donación</h1>
          <p className="mt-3 max-w-2xl text-white/90">
            Verifica las donaciones actuales realizadas por un cliente y revisa su estado en tiempo real.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <label htmlFor="client-filter" className="mb-1.5 block text-sm font-semibold text-gray-700">
                Filtrar por cliente
              </label>
              <select
                id="client-filter"
                value={selectedDonorId ?? ""}
                onChange={(event) => {
                  const value = event.target.value;
                  setSelectedDonorId(value ? Number(value) : null);
                }}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-700"
              >
                <option value="">Todos los clientes</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name} ({user.email})
                  </option>
                ))}
              </select>
            </div>

            <Link
              href="/gestionar-donacion/crud"
              className="inline-flex items-center justify-center rounded-lg border border-blue-600 px-4 py-2.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
            >
              Crear, editar o eliminar
            </Link>
          </div>

          {errorMessage ? (
            <p className="mt-6 rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-800">
              {errorMessage}
            </p>
          ) : null}

          {loading ? (
            <p className="mt-6 text-sm text-gray-600">Cargando donaciones...</p>
          ) : (
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="border-b text-left text-sm text-gray-700">
                    <th className="px-3 py-3 font-semibold">ID</th>
                    <th className="px-3 py-3 font-semibold">Cliente</th>
                    <th className="px-3 py-3 font-semibold">Tipo Donante</th>
                    <th className="px-3 py-3 font-semibold">Recurso</th>
                    <th className="px-3 py-3 font-semibold">Cantidad</th>
                    <th className="px-3 py-3 font-semibold">Estado</th>
                    <th className="px-3 py-3 font-semibold">Creada</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.length === 0 ? (
                    <tr>
                      <td className="px-3 py-6 text-sm text-gray-500" colSpan={7}>
                        No hay donaciones para el cliente seleccionado.
                      </td>
                    </tr>
                  ) : (
                    donations.map((donation) => {
                      const user = users.find((candidate) => candidate.id === donation.donorId);

                      return (
                        <tr key={donation.id} className="border-b text-sm text-gray-800">
                          <td className="px-3 py-3">{donation.id}</td>
                          <td className="px-3 py-3">
                            {user ? `${user.name} (${user.email})` : `Donor ID ${donation.donorId}`}
                          </td>
                          <td className="px-3 py-3">{donation.donorType}</td>
                          <td className="px-3 py-3">{donation.resourceType}</td>
                          <td className="px-3 py-3">{donation.quantity}</td>
                          <td className="px-3 py-3">{donation.status}</td>
                          <td className="px-3 py-3">
                            {new Date(donation.createdAt).toLocaleString("es-CL")}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
