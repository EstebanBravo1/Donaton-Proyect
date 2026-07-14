import { useEffect, useMemo, useState } from "react";
import { getCurrentSessionUser } from "@/lib/session";
import {
  donationService,
  type DonationResponse,
  type UserResponse,
} from "@/services/donationService";
import { extractErrorMessage } from "@/lib/bff";

export function useDonationManager() {
  const [donations, setDonations] = useState<DonationResponse[]>([]);
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedDonorId, setSelectedDonorId] = useState<number | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setErrorMessage("");

      try {
        const [usersResponse, donationsResponse] = await Promise.all([
          donationService.getAllUsers(),
          donationService.getAllDonations(),
        ]);

        if (!usersResponse.ok) {
          setErrorMessage(
            extractErrorMessage(usersResponse.body, "No se pudo cargar el listado de usuarios."),
          );
          setLoading(false);
          return;
        }

        if (!donationsResponse.ok) {
          setErrorMessage(
            extractErrorMessage(donationsResponse.body, "No se pudo cargar el listado de donaciones."),
          );
          setLoading(false);
          return;
        }

        const userList = Array.isArray(usersResponse.body) ? usersResponse.body : [];
        const donationList = Array.isArray(donationsResponse.body)
          ? donationsResponse.body
          : [];

        setUsers(userList);
        setDonations(donationList);

        const sessionUser = getCurrentSessionUser();
        if (sessionUser) {
          const currentUser = userList.find(
            (user) => user.email.toLowerCase() === sessionUser.email.toLowerCase(),
          );

          if (currentUser) {
            setSelectedDonorId(currentUser.id);
          }
        }
      } catch {
        setErrorMessage("Hubo un problema al conectar con el BFF.");
      } finally {
        setLoading(false);
      }
    };

    void loadData();
  }, []);

  const filteredDonations = useMemo(() => {
    if (!selectedDonorId) {
      return donations;
    }

    return donations.filter((donation) => donation.donorId === selectedDonorId);
  }, [donations, selectedDonorId]);

  return {
    donations: filteredDonations,
    users,
    loading,
    errorMessage,
    selectedDonorId,
    setSelectedDonorId,
  };
}
