import { campaignApi } from '@/lib/api';

export const useCreateCampaign = () => {
  return {
    mutateAsync: async (data: any) => {
      const response = await campaignApi.create(data);
      return response.data.campaign;
    },
    isPending: false,
    isSuccess: false,
    isError: false,
    error: null,
  };
};

export const useCampaignList = (input?: { limit?: number; offset?: number }) => {
  return {
    data: [],
    isLoading: false,
    error: null,
  };
};

export const useCampaignById = (input: { id: number }) => {
  return {
    data: null,
    isLoading: false,
    error: null,
  };
};

export const useUpdateCampaign = () => {
  return {
    mutateAsync: async (data: any) => data,
    isPending: false,
    isSuccess: false,
    isError: false,
    error: null,
  };
};

export const useDeleteCampaign = () => {
  return {
    mutateAsync: async (data: { id: number }) => {
      await campaignApi.delete(data.id);
      return { success: true };
    },
    isPending: false,
    isSuccess: false,
    isError: false,
    error: null,
  };
};

export const useAddContactsToCampaign = () => {
  return {
    mutateAsync: async (data: any) => data,
    isPending: false,
    isSuccess: false,
    isError: false,
    error: null,
  };
};

export const useCampaignStats = (input: { id: number }) => {
  return {
    data: { total: 0, sent: 0, opened: 0, clicked: 0, replied: 0, failed: 0 },
    isLoading: false,
    error: null,
  };
};

export const useStartCampaign = () => {
  return {
    mutateAsync: async (data: { id: number }) => {
      const response = await campaignApi.start(data.id);
      return response.data;
    },
    isPending: false,
    isSuccess: false,
    isError: false,
    error: null,
  };
};

export const useUpdateCampaignStatus = () => {
  return {
    mutateAsync: async (data: any) => data,
    isPending: false,
    isSuccess: false,
    isError: false,
    error: null,
  };
};
