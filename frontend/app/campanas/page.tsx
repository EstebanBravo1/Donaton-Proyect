"use client";

import Link from "next/link";
import { ArrowLeft, HandHeart, PencilLine, Trash2 } from "lucide-react";
import { useCampaignCrud } from "@/hooks/useCampaignCrud";

const campaignTypeLabels: Record<"ALIMENTOS" | "ROPA" | "INSUMOS_MEDICOS", string> = {
  ALIMENTOS: "Alimentos",
  ROPA: "Ropa",
  INSUMOS_MEDICOS: "Insumos médicos",
};

export default function CampanasPage() {
  const {
    campaigns,
    formData,
    editingCampaignId,
    loading,
    statusMessage,
    isSuccess,
    handleChange,
    handleSubmit,
    startEdit,
    handleDelete,
    resetForm,
  } = useCampaignCrud();

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

        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
        >
          <ArrowLeft size={16} />
          Volver al inicio
        </Link>
      </nav>

      <section className="bg-blue-600 px-6 py-12 text-white">
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
            <HandHeart className="text-yellow-300" size={22} />
          </div>
          <h1 className="text-4xl font-extrabold">Campañas Donaton</h1>
          <p className="mt-3 max-w-3xl text-white/90">
            Revisa campañas activas, elige el tipo de ayuda y administra campañas conectadas al microservicio ms-campaign.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-10 lg:grid-cols-[380px_1fr]">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">
            {editingCampaignId ? `Editar campaña #${editingCampaignId}` : "Crear campaña"}
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
              <label htmlFor="campaignType" className="mb-1.5 block text-sm font-semibold text-gray-700">
                Tipo de campaña
              </label>
              <select
                id="campaignType"
                value={formData.campaignType}
                onChange={(event) =>
                  handleChange(
                    "campaignType",
                    event.target.value as "ALIMENTOS" | "ROPA" | "INSUMOS_MEDICOS",
                  )
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-700"
              >
                <option value="ALIMENTOS">Alimentos</option>
                <option value="ROPA">Ropa</option>
                <option value="INSUMOS_MEDICOS">Insumos médicos</option>
              </select>
            </div>

            <div>
              <label htmlFor="title" className="mb-1.5 block text-sm font-semibold text-gray-700">
                Título
              </label>
              <input
                id="title"
                value={formData.title}
                onChange={(event) => handleChange("title", event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-700"
                placeholder="Ej: Campaña invierno solidario"
              />
            </div>

            <div>
              <label htmlFor="description" className="mb-1.5 block text-sm font-semibold text-gray-700">
                Descripción
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(event) => handleChange("description", event.target.value)}
                className="min-h-[120px] w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-700"
                placeholder="Describe el objetivo de la campaña"
              />
            </div>

            <div>
              <label htmlFor="goalAmount" className="mb-1.5 block text-sm font-semibold text-gray-700">
                Meta de recaudación
              </label>
              <input
                id="goalAmount"
                type="number"
                min={1}
                value={formData.goalAmount}
                onChange={(event) => handleChange("goalAmount", Number(event.target.value))}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-700"
              />
            </div>

            <div>
              <label htmlFor="endDate" className="mb-1.5 block text-sm font-semibold text-gray-700">
                Fecha de término
              </label>
              <input
                id="endDate"
                type="datetime-local"
                value={formData.endDate}
                onChange={(event) => handleChange("endDate", event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-700"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
              >
                {editingCampaignId ? "Actualizar" : "Crear"}
              </button>

              {editingCampaignId ? (
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
          <h2 className="text-xl font-bold text-gray-900">Campañas disponibles para donar</h2>

          {loading ? (
            <p className="mt-5 text-sm text-gray-600">Cargando campañas...</p>
          ) : (
            <div className="mt-5 grid grid-cols-1 gap-4">
              {campaigns.length === 0 ? (
                <p className="rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-600">
                  Aún no hay campañas registradas.
                </p>
              ) : (
                campaigns.map((campaign) => (
                  <article
                    key={campaign.id}
                    className="rounded-xl border border-gray-200 p-4 transition hover:shadow-md"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{campaign.title}</h3>
                        <p className="mt-1 text-sm text-gray-600">{campaign.description}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
                          {campaign.status}
                        </span>
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                          {campaignTypeLabels[campaign.campaignType]}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-2 text-sm text-gray-700 sm:grid-cols-2">
                      <p>
                        <span className="font-semibold">Meta:</span> ${campaign.goalAmount}
                      </p>
                      <p>
                        <span className="font-semibold">Recaudado:</span> ${campaign.collectedAmount}
                      </p>
                      <p>
                        <span className="font-semibold">Creada:</span>{" "}
                        {new Date(campaign.createdAt).toLocaleString("es-CL")}
                      </p>
                      <p>
                        <span className="font-semibold">Término:</span>{" "}
                        {new Date(campaign.endDate).toLocaleString("es-CL")}
                      </p>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <Link
                        href={`/gestionar-donacion/crud?campaignType=${campaign.campaignType}`}
                        className="inline-flex items-center rounded-md bg-yellow-400 px-3 py-2 text-xs font-bold text-blue-900 transition hover:bg-yellow-300"
                      >
                        Donar a esta campaña
                      </Link>
                      <button
                        type="button"
                        onClick={() => startEdit(campaign)}
                        className="inline-flex items-center gap-1 rounded-md border border-blue-200 px-2.5 py-1.5 text-xs font-semibold text-blue-700 transition hover:bg-blue-50"
                      >
                        <PencilLine size={14} />
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={() => void handleDelete(campaign.id)}
                        className="inline-flex items-center gap-1 rounded-md border border-red-200 px-2.5 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-50"
                      >
                        <Trash2 size={14} />
                        Eliminar
                      </button>
                    </div>
                  </article>
                ))
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
