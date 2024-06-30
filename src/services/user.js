import axios from 'axios';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:5000'; 
console.log(API_BASE_URL);
export const signIn = async (payLoad) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/users/login`,payLoad);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const fetchOrganizationUsers = async (organizationId, authToken) => {
    console.log("authToken", authToken);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/users/userlist/${organizationId}`, {
        headers: {
          Authorization: `${authToken}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching organization users:', error);
      throw error;
    }
  };


  export const registerUsers = async (payLoad, authToken) => {
    console.log("authToken", authToken);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/users/register`, payLoad,{
        headers: {
          Authorization: `${authToken}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching organization users:', error);
      throw error;
    }
  };

  export const deleteUsers = async (userId, authToken) => {
    console.log("authToken", authToken);
    try {
      const response = await axios.delete(`${API_BASE_URL}/api/users/${userId}`,{
        headers: {
          Authorization: `${authToken}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching organization users:', error);
      throw error;
    }
  };


  export const updateUsers = async (userId, payLoad, authToken) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/api/users/${userId}`,payLoad, {
        headers: {
          Authorization: `${authToken}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching organization users:', error);
      throw error;
    }
  };
