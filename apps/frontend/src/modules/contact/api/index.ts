import { contactApi } from '@/lib/api';

export const useCreateContact = () => {
  return {
    mutateAsync: async (data: any) => {
      const response = await contactApi.create(data);
      return response.data.contact;
    },
    isPending: false,
    isSuccess: false,
    isError: false,
    error: null,
  };
};

export const useCreateBulkContact = () => {
  return {
    mutateAsync: async (data: any[]) => {
      return data;
    },
    isPending: false,
    isSuccess: false,
    isError: false,
    error: null,
  };
};

export const useImportCSV = () => {
  return {
    mutateAsync: async (data: { csv: string }) => {
      const response = await contactApi.importCSV(data.csv);
      return response.data;
    },
    isPending: false,
    isSuccess: false,
    isError: false,
    error: null,
  };
};

export const useContactList = (input?: { limit?: number; offset?: number }) => {
  return {
    data: [],
    isLoading: false,
    error: null,
  };
};

export const useContactById = (input: { id: number }) => {
  return {
    data: null,
    isLoading: false,
    error: null,
  };
};

export const useContactByEmail = (input: { email: string }) => {
  return {
    data: null,
    isLoading: false,
    error: null,
  };
};

export const useUpdateContact = () => {
  return {
    mutateAsync: async (data: any) => data,
    isPending: false,
    isSuccess: false,
    isError: false,
    error: null,
  };
};

export const useDeleteContact = () => {
  return {
    mutateAsync: async (data: { id: number }) => {
      await contactApi.delete(data.id);
      return { success: true };
    },
    isPending: false,
    isSuccess: false,
    isError: false,
    error: null,
  };
};
