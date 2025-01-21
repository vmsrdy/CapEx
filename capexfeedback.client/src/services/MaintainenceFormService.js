import apiService from "./apiService";

const MaintenanceFormService = {
  async fetchIEDetails() {
    try {
      const data = await apiService.get('/IEDetails');
      return data;
    } catch (error) {
      console.error('Error fetching IE Details:', error);
      return null;
    }
  },

  async submitMaintenanceFormStatus(status) {
    try {
      const result = await apiService.post('/MaintenanceFormStatus', { status });
      return result;
    } catch (error) {
      console.error('Error submitting Maintenance Form Status:', error);
      return null;
    }
  }
}

export default MaintenanceFormService;
