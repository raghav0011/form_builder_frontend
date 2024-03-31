import instance from "./config/axiosUtils";

const orgEndpoint = "/org";
const jwt = localStorage.getItem("jwt");

export const OrgAPi = {
  RegisterOrg: async (payload) => {
    let url = `${orgEndpoint}/register`;
    let res = await instance.post(url, payload);
    return {
      statusCode: res?.status,
      dsta: res?.data,
    };
  },
  LoginOrg: async (payload) => {
    let url = `${orgEndpoint}/login`;
    let res = await instance.post(url, payload);
    return {
      statusCode: res?.status,
      data: res?.data,
    };
  },
  PostOrgForm: async (payload) => {
    let url = `${orgEndpoint}/postForm`;
    let config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    try {
      let res = await instance.post(url, payload, config);
      return {
        statusCode: res?.status,
        data: res?.data,
      };
    } catch (error) {
      console.error("Error posting form:", error);
      return {
        statusCode: error.response?.status,
        error: error.message,
      };
    }
  },
  GetUserSubmission: async () => {
    let url = `${orgEndpoint}/getUserSubmission`;
    let config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    try {
      let res = await instance.get(url, config);
      return {
        statusCode: res?.status,
        data: res?.data,
      };
    } catch (error) {
      console.error("Error posting form:", error);
      return {
        statusCode: error.response?.status,
        error: error.message,
      };
    }
  }
};
