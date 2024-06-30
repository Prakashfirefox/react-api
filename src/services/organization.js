import axios from 'axios';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:5000'; 
console.log(API_BASE_URL);
export const fetchOrganization = async (organizationId, authToken) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/organizations/${organizationId}`,
    {
        headers: {
          Authorization: `${authToken}`
        }
      });
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};


export const fetchAllOrganizations = async (authToken) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/organizations`, {
        headers: {
          Authorization: `${authToken}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching organizations:', error);
      throw error;
    }
  };


  export const updateOrganizations = async (orgId, payLoad, authToken) => {
    try {
      const response = await axios. put(`${API_BASE_URL}/api/organizations/${orgId}`, payLoad, {
        headers: {
          Authorization: `${authToken}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching organizations:', error);
      throw error;
    }
  };


  export const addOrganization = async (payLoad, authToken) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/organizations/`, payLoad, {
        headers: {
          Authorization: `${authToken}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching organizations:', error);
      throw error;
    }
  };
