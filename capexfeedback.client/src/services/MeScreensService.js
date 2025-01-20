import apiService from "./apiService";

const MeScreenService = {
  fetchIeDetails: async (prNumber) => {
    try {
      const response = await apiService.post(`/fetchIeDetails?prNumber=${prNumber}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("From MEScreenService ", response)
      return response;
    } catch (error) {
      throw new Error(error.response ? error.response.data : 'Failed to fetch IeDetails');
    }
  }
};

export default MeScreenService;
