import apiService from "./apiService";

export const submitProjectFormStatus = async (data) => {
  try {
    const result = await apiService.post('/submitProjectFormStatus', data);
    console.log("This is the RESULT:::", result)
    if (!result) {
      console.error('Status submission failed');
    }
    return result;
  } catch (error) {
    console.error('Error changing status:', error);
    return null;
  }
};
