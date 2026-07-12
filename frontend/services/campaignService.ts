import { deleteFromBff, getFromBff, postToBff, putToBff } from "@/lib/bff";

export type CampaignRequest = {
  title: string;
  description: string;
  campaignType: "ALIMENTOS" | "ROPA" | "INSUMOS_MEDICOS";
  goalAmount: number;
  endDate: string;
};

export type CampaignResponse = {
  id: number;
  title: string;
  description: string;
  campaignType: "ALIMENTOS" | "ROPA" | "INSUMOS_MEDICOS";
  goalAmount: number;
  collectedAmount: number;
  status: "ACTIVA" | "FINALIZADA" | "CANCELADA";
  createdAt: string;
  endDate: string;
};

export const campaignService = {
  async getAllCampaigns() {
    return getFromBff<CampaignResponse[]>("/api/campaigns");
  },

  async createCampaign(payload: CampaignRequest) {
    return postToBff<CampaignResponse>("/api/campaigns", payload);
  },

  async updateCampaign(id: number, payload: CampaignRequest) {
    return putToBff<CampaignResponse>(`/api/campaigns/${id}`, payload);
  },

  async deleteCampaign(id: number) {
    return deleteFromBff<null>(`/api/campaigns/${id}`);
  },
};
