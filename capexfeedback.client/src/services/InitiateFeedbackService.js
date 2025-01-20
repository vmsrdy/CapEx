import apiService from './apiService';

const InitiateFeedbackService = {
  // POST FEEDBACK DETAILS (Initiate the Feedback)
  async postFeedbackData(isSubmitted) {
    try {
      const response = await apiService.post('/initiateFeedback', { isSubmitted });
      console.log("Feedback successfully initiated.");
      return response;
    } catch (error) {
      console.error("Error initiating feedback:", error);
      throw error;
    }
  },

  // GET PR DETAILS
  async getPRDetails(prNumber) {
    try {
      const response = await apiService.get(`/getPrDetails?prnum=${prNumber}`, {
        headers: {
          customHeader: "CAP-15-MON-2024",
        },
      });
      console.log("PR details fetched successfully:", response);

      return response;

    } catch (error) {
      console.error("Error fetching PR details:", error);
      return null;
    }
  },
};

export default InitiateFeedbackService;
