"use client";

import Link from "next/link";
import { ArrowLeft, PencilLine, Trash2 } from "lucide-react";
import { useDonationCrud } from "@/hooks/useDonationCrud";

type ResourceType = "ALIMENTOS" | "ROPA" | "INSUMOS_MEDICOS";

const resourceTypeLabels: Record<ResourceType, string> = {
  ALIMENTOS: "Alimentos",
  ROPA: "Ropa",
  INSUMOS_MEDICOS: "Insumos médicos",
};

export default function DonationCrudPage() {
  const {
    donations,
    users,
    formData,
    editingDonationId,
    loading,
    statusMessage,
    isSuccess,
    campaignType,
    allowedResourceTypes,
    handleChange,
    handleSubmit,
    startEdit,
    handleDelete,
    resetForm,
  } = useDonationCrud();

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
            href="/gestionar-donacion"
            className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            <ArrowLeft size={16} />
            Ver donaciones
          </Link>
        </div>
      </nav>

      <section className="bg-blue-600 px-6 py-12 text-white">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-4xl font-extrabold">
            {campaignType ? `Donaciones de ${resourceTypeLabels[campaignType]}` : "Donaciones Donaton"}
          </h1>
          <p className="mt-3 max-w-3xl text-white/90">
            {campaignType
              ? `Solo se muestran y registran donaciones de ${resourceTypeLabels[campaignType].toLowerCase()}.`
              : "Crea, actualiza o elimina donaciones conectadas al flujo de Donaton."}
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-10 lg:grid-cols-[380px_1fr]">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">
            {editingDonationId ? `Editar donación #${editingDonationId}` : "Crear donación"}
          </h2>

          <p
            role="status"
            aria-live="polite"
            className={`mt-4 rounded-md border px-3 py-2 text-sm ${
              statusMessage
                ? isSuccess
                  ? "border-green-300 bg-green-50 text-green-800"
                  : "border-red-300 bg-red-50 text-red-800"
                : "sr-only"
            }`}
          >
            {statusMessage}
          </p>

          <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="donorId" className="mb-1.5 block text-sm font-semibold text-gray-700">
                Cliente (donorId)
              </label>
              <select
                id="donorId"
                value={formData.donorId}
                onChange={(event) => handleChange("donorId", Number(event.target.value))}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-700"
              >
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name} (ID {user.id})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="resourceName" className="mb-1.5 block text-sm font-semibold text-gray-700">
                Nombre del recurso
              </label>
              <input
                id="resourceName"
                value={formData.resourceName}
                onChange={(event) => handleChange("resourceName", event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-700"
                placeholder="Ej: Canasta de alimentos"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="donorType" className="mb-1.5 block text-sm font-semibold text-gray-700">
                  Tipo donante
                </label>
                <select
                  id="donorType"
                  value={formData.donorType}
                  onChange={(event) =>
                    handleChange("donorType", event.target.value as "PERSONA" | "EMPRESA")
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-700"
                >
                  <option value="PERSONA">PERSONA</option>
                  <option value="EMPRESA">EMPRESA</option>
                </select>
              </div>

              <div>
                <label htmlFor="resourceType" className="mb-1.5 block text-sm font-semibold text-gray-700">
                  Tipo recurso
                </label>
                <select
                  id="resourceType"
                  value={formData.resourceType}
                  onChange={(event) =>
                    handleChange(
                      "resourceType",
                      event.target.value as "ALIMENTOS" | "ROPA" | "INSUMOS_MEDICOS",
                    )
                  }
                  disabled={Boolean(campaignType)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-700"
                >
                    {(campaignType ? [campaignType] : allowedResourceTypes).map((resourceType) => (
                      <option key={resourceType} value={resourceType}>
                        {resourceTypeLabels[resourceType]}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="quantity" className="mb-1.5 block text-sm font-semibold text-gray-700">
                Cantidad
              </label>
              <input
                id="quantity"
                type="number"
                min={1}
                value={formData.quantity}
                onChange={(event) => handleChange("quantity", Number(event.target.value))}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-700"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
              >
                {editingDonationId ? "Actualizar" : "Crear"}
              </button>

              {editingDonationId ? (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
                >
                  Cancelar edición
                </button>
              ) : null}
            </div>
          </form>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">Donaciones registradas</h2>
          {campaignType ? (
            <p className="mt-2 text-sm text-gray-600">
              Filtro activo: {resourceTypeLabels[campaignType]}.
            </p>
          ) : null}

          {loading ? (
            <p className="mt-5 text-sm text-gray-600">Cargando donaciones...</p>
          ) : (
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="border-b text-left text-sm text-gray-700">
                    <th className="px-3 py-3 font-semibold">ID</th>
                    <th className="px-3 py-3 font-semibold">Donor ID</th>
                    <th className="px-3 py-3 font-semibold">Recurso</th>
                    <th className="px-3 py-3 font-semibold">Cantidad</th>
                    <th className="px-3 py-3 font-semibold">Estado</th>
                    <th className="px-3 py-3 font-semibold">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.length === 0 ? (
                    <tr>
                      <td className="px-3 py-6 text-sm text-gray-500" colSpan={6}>
                        No hay donaciones registradas.
                      </td>
                    </tr>
                  ) : (
                    donations.map((donation) => (
                      <tr key={donation.id} className="border-b text-sm text-gray-800">
                        <td className="px-3 py-3">{donation.id}</td>
                        <td className="px-3 py-3">{donation.donorId}</td>
                        <td className="px-3 py-3">{donation.resourceType}</td>
                        <td className="px-3 py-3">{donation.quantity}</td>
                        <td className="px-3 py-3">{donation.status}</td>
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => startEdit(donation)}
                              className="inline-flex items-center gap-1 rounded-md border border-blue-200 px-2.5 py-1.5 text-xs font-semibold text-blue-700 transition hover:bg-blue-50"
                            >
                              <PencilLine size={14} />
                              Editar
                            </button>
                            <button
                              type="button"
                              onClick={() => void handleDelete(donation.id)}
                              className="inline-flex items-center gap-1 rounded-md border border-red-200 px-2.5 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-50"
                            >
                              <Trash2 size={14} />
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
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
