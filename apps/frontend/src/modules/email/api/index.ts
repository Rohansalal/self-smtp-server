import { emailApi } from '@/lib/api';

export const useSendEmail = () => {
  return {
    mutateAsync: async (data: any) => {
      const response = await emailApi.send(data);
      return response.data;
    },
    isPending: false,
    isSuccess: false,
    isError: false,
    error: null,
  };
};

export const useSendBatchEmail = () => {
  return {
    mutateAsync: async (data: any[]) => {
      const results = [];
      for (const email of data) {
        const response = await emailApi.send(email);
        results.push(response.data);
      }
      return { count: results.length };
    },
    isPending: false,
    isSuccess: false,
    isError: false,
    error: null,
  };
};

export const useEmailList = (input: { campaignId?: number; limit?: number; offset?: number }) => {
  return {
    data: [],
    isLoading: false,
    error: null,
  };
};

export const useEmailStatus = (input: { id: number }) => {
  return {
    data: null,
    isLoading: false,
    error: null,
  };
};

export const useVerifyConnection = () => {
  return {
    mutateAsync: async () => ({ status: 'ok' }),
    isPending: false,
    isSuccess: false,
    isError: false,
    error: null,
  };
};
