import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { extractErrorMessage } from "@/lib/bff";
import {
  campaignService,
  type CampaignRequest,
  type CampaignResponse,
} from "@/services/campaignService";

type CampaignFormData = {
  title: string;
  description: string;
  campaignType: "ALIMENTOS" | "ROPA" | "INSUMOS_MEDICOS";
  goalAmount: number;
  endDate: string;
};

const initialFormData: CampaignFormData = {
  title: "",
  description: "",
  campaignType: "ALIMENTOS",
  goalAmount: 1000,
  endDate: "",
};

function toApiDateTime(value: string) {
  if (value.length === 16) {
    return `${value}:00`;
  }

  return value;
}

function toInputDateTime(value: string) {
  if (!value) {
    return "";
  }

  const normalized = value.replace("Z", "");
  return normalized.length >= 16 ? normalized.slice(0, 16) : normalized;
}

export function useCampaignCrud() {
  const [campaigns, setCampaigns] = useState<CampaignResponse[]>([]);
  const [formData, setFormData] = useState<CampaignFormData>(initialFormData);
  const [editingCampaignId, setEditingCampaignId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const loadCampaigns = useCallback(async () => {
    setLoading(true);

    try {
      const response = await campaignService.getAllCampaigns();

      if (!response.ok) {
        setStatusMessage(
          extractErrorMessage(response.body, "No se pudo cargar el listado de campañas."),
        );
        setIsSuccess(false);
        setLoading(false);
        return;
      }

      setCampaigns(Array.isArray(response.body) ? response.body : []);
    } catch {
      setStatusMessage("Hubo un problema al conectar con el BFF.");
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    queueMicrotask(() => {
      void loadCampaigns();
    });
  }, [loadCampaigns]);

  const sortedCampaigns = useMemo(
    () => [...campaigns].sort((a, b) => b.id - a.id),
    [campaigns],
  );

  const handleChange = <K extends keyof CampaignFormData>(
    field: K,
    value: CampaignFormData[K],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setEditingCampaignId(null);
    setFormData(initialFormData);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatusMessage("");

    if (
      formData.title.trim().length === 0 ||
      formData.description.trim().length === 0 ||
      formData.goalAmount <= 0 ||
      formData.endDate.trim().length === 0
    ) {
      setStatusMessage("Completa título, descripción, meta y fecha de término.");
      setIsSuccess(false);
      return;
    }

    const payload: CampaignRequest = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      campaignType: formData.campaignType,
      goalAmount: formData.goalAmount,
      endDate: toApiDateTime(formData.endDate),
    };

    try {
      const response = editingCampaignId
        ? await campaignService.updateCampaign(editingCampaignId, payload)
        : await campaignService.createCampaign(payload);

      if (!response.ok) {
        setStatusMessage(
          extractErrorMessage(response.body, "No se pudo guardar la campaña."),
        );
        setIsSuccess(false);
        return;
      }

      setStatusMessage(
        editingCampaignId
          ? "Campaña actualizada correctamente."
          : "Campaña creada correctamente.",
      );
      setIsSuccess(true);
      resetForm();
      await loadCampaigns();
    } catch {
      setStatusMessage("Hubo un problema al conectar con el BFF.");
      setIsSuccess(false);
    }
  };

  const startEdit = (campaign: CampaignResponse) => {
    setEditingCampaignId(campaign.id);
    setFormData({
      title: campaign.title,
      description: campaign.description,
      campaignType: campaign.campaignType,
      goalAmount: campaign.goalAmount,
      endDate: toInputDateTime(campaign.endDate),
    });
    setStatusMessage("");
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await campaignService.deleteCampaign(id);

      if (!response.ok) {
        setStatusMessage(
          extractErrorMessage(response.body, "No se pudo eliminar la campaña."),
        );
        setIsSuccess(false);
        return;
      }

      setStatusMessage("Campaña eliminada correctamente.");
      setIsSuccess(true);

      if (editingCampaignId === id) {
        resetForm();
      }

      await loadCampaigns();
    } catch {
      setStatusMessage("Hubo un problema al conectar con el BFF.");
      setIsSuccess(false);
    }
  };

  return {
    campaigns: sortedCampaigns,
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
  };
}
