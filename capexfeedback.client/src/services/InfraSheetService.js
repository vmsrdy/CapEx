import apiService from './apiService';

const InfraSheetService = {
  uploadInfraSheetFile: async (response) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await apiService.post(`/UploadInfraSheetFile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response ? error.response.data : 'Failed to upload file');
    }
  },

  uploadIeDetails: async (response) => {
    if (response === "Received IeDetails") {
      return response;
    } else {
      throw new Error("Invalid IE details response");
    }
  }
};

export default InfraSheetService;
