import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { extractErrorMessage } from "@/lib/bff";
import {
  donationService,
  type DonationRequest,
  type DonationResponse,
  type UserResponse,
} from "@/services/donationService";

const initialFormData: DonationRequest = {
  donorId: 0,
  resourceName: "",
  resourceType: "ALIMENTOS",
  donorType: "PERSONA",
  quantity: 1,
};

type CampaignType = "ALIMENTOS" | "ROPA" | "INSUMOS_MEDICOS";

const allowedResourceTypes = ["ALIMENTOS", "ROPA", "INSUMOS_MEDICOS"] as const;

function normalizeCampaignType(value: string | null): CampaignType | null {
  if (value === "ROPA" || value === "INSUMOS_MEDICOS" || value === "ALIMENTOS") {
    return value;
  }

  return null;
}

export function useDonationCrud() {
  const [campaignType, setCampaignType] = useState<CampaignType | null>(null);
  const [donations, setDonations] = useState<DonationResponse[]>([]);
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [formData, setFormData] = useState<DonationRequest>({
    ...initialFormData,
    resourceType: initialFormData.resourceType,
  });
  const [editingDonationId, setEditingDonationId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);

    try {
      const [usersResponse, donationsResponse] = await Promise.all([
        donationService.getAllUsers(),
        donationService.getAllDonations(),
      ]);

      if (!usersResponse.ok) {
        setStatusMessage(
          extractErrorMessage(usersResponse.body, "No se pudo cargar el listado de usuarios."),
        );
        setIsSuccess(false);
        setLoading(false);
        return;
      }

      if (!donationsResponse.ok) {
        setStatusMessage(
          extractErrorMessage(donationsResponse.body, "No se pudo cargar el listado de donaciones."),
        );
        setIsSuccess(false);
        setLoading(false);
        return;
      }

      const userList = Array.isArray(usersResponse.body) ? usersResponse.body : [];
      const donationList = Array.isArray(donationsResponse.body)
        ? donationsResponse.body
        : [];

      setUsers(userList);
      setDonations(donationList);

      setFormData((prev) => {
        if (prev.donorId === 0 && userList.length > 0) {
          return {
            ...prev,
            donorId: userList[0].id,
          };
        }

        return prev;
      });
    } catch {
      setStatusMessage("Hubo un problema al conectar con el BFF.");
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setCampaignType(normalizeCampaignType(searchParams.get("campaignType")));

    void loadData();
  }, [loadData]);

  useEffect(() => {
    if (!campaignType) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      resourceType: campaignType,
    }));
  }, [campaignType]);

  const handleChange = <K extends keyof DonationRequest>(field: K, value: DonationRequest[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setEditingDonationId(null);
    setFormData({
      ...initialFormData,
      resourceType: campaignType ?? initialFormData.resourceType,
      donorId: users.length > 0 ? users[0].id : 0,
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatusMessage("");

    if (!formData.donorId || formData.quantity <= 0 || formData.resourceName.trim() === "") {
      setStatusMessage("Completa donorId, nombre de recurso y una cantidad mayor a cero.");
      setIsSuccess(false);
      return;
    }

    if (campaignType && formData.resourceType !== campaignType) {
      setStatusMessage("La donación debe coincidir con el tipo de la campaña seleccionada.");
      setIsSuccess(false);
      return;
    }

    try {
      const payload = {
        ...formData,
        resourceName: formData.resourceName.trim(),
      };

      const response = editingDonationId
        ? await donationService.updateDonation(editingDonationId, payload)
        : await donationService.createDonation(payload);

      if (!response.ok) {
        setStatusMessage(
          extractErrorMessage(response.body, "No se pudo guardar la donación."),
        );
        setIsSuccess(false);
        return;
      }

      setStatusMessage(
        editingDonationId
          ? "Donación actualizada correctamente."
          : "Donación creada correctamente.",
      );
      setIsSuccess(true);
      resetForm();
      await loadData();
    } catch {
      setStatusMessage("Hubo un problema al conectar con el BFF.");
      setIsSuccess(false);
    }
  };

  const startEdit = (donation: DonationResponse) => {
    setEditingDonationId(donation.id);
    setFormData({
      donorId: donation.donorId,
      donorType: donation.donorType,
      resourceType: donation.resourceType,
      quantity: donation.quantity,
      resourceName: donation.description,
    });
    setStatusMessage("");
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await donationService.deleteDonation(id);

      if (!response.ok) {
        setStatusMessage(
          extractErrorMessage(response.body, "No se pudo eliminar la donación."),
        );
        setIsSuccess(false);
        return;
      }

      setStatusMessage("Donación eliminada correctamente.");
      setIsSuccess(true);

      if (editingDonationId === id) {
        resetForm();
      }

      await loadData();
    } catch {
      setStatusMessage("Hubo un problema al conectar con el BFF.");
      setIsSuccess(false);
    }
  };

  return {
    donations: useMemo(() => {
      if (!campaignType) {
        return donations;
      }

      return donations.filter((donation) => donation.resourceType === campaignType);
    }, [campaignType, donations]),
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
  };
}
