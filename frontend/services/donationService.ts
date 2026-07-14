import { deleteFromBff, getFromBff, postToBff, putToBff } from "@/lib/bff";

export type DonationRequest = {
  donorId: number;
  resourceName: string;
  resourceType: "ALIMENTOS" | "ROPA" | "INSUMOS_MEDICOS";
  donorType: "PERSONA" | "EMPRESA";
  quantity: number;
};

export type DonationResponse = {
  id: number;
  donorId: number;
  donorType: "PERSONA" | "EMPRESA";
  resourceType: "ALIMENTOS" | "ROPA" | "INSUMOS_MEDICOS";
  quantity: number;
  description: string;
  status: "PENDIENTE" | "VALIDADO" | "RECHAZADO";
  createdAt: string;
};

export type UserResponse = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  region: string;
  comuna: string;
  role: string;
};

export const donationService = {
  async getAllDonations() {
    return getFromBff<DonationResponse[]>("/api/donations");
  },

  async getDonationById(id: number) {
    return getFromBff<DonationResponse>(`/api/donations/${id}`);
  },

  async createDonation(payload: DonationRequest) {
    return postToBff<DonationResponse>("/api/donations", payload);
  },

  async updateDonation(id: number, payload: DonationRequest) {
    return putToBff<DonationResponse>(`/api/donations/${id}`, payload);
  },

  async deleteDonation(id: number) {
    return deleteFromBff<null>(`/api/donations/${id}`);
  },

  async getAllUsers() {
    return getFromBff<UserResponse[]>("/api/users");
  },
};
