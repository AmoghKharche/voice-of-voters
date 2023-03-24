import axiosInstance from '../utils/Axios';

export const fetchComplaints = async () => {
  try {
    const response = await axiosInstance.get('/api/complaints');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateStatus = async (ticketId, status) => {
  try {
    const response = await axiosInstance.patch(`/api/complaint-status-update/${ticketId}`, {
      status,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchComplaint = async ticketId => {
  try {
    const response = await axiosInstance.get(`/api/complaints/${ticketId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
