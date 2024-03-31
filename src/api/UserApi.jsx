import instance from "./config/axiosUtils";

const userEndpoint = "/users";
const jwt = localStorage.getItem("jwt");


export const UserAPi = {
    RegisterUser: async (payload) => {
        let url = `${userEndpoint}/register`;
        let res = await instance.post(url, payload);
        return {
            statusCode: res?.status,
            dsta: res?.data
        }
    },
    LoginUser: async (payload) => {
        let url = `${userEndpoint}/login`;
        let res = await instance.post(url, payload);
        return {
            statusCode: res?.status,
            data: res?.data
        }
    },
    getOrgFormData: async () => {
        let url = `${userEndpoint}/getForm`;
        let config = {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        };
        let res = await instance.get(url, config);
        return {
            statusCode: res?.status,
            data: res?.data
        }
    },
    submitUserForm: async (payload) => {
        let url = `${userEndpoint}/postForm`;
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
    }
}