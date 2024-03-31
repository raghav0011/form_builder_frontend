import React from "react";
import { useMutation } from "@tanstack/react-query";
import { UserAPi } from "../api/UserApi";
import { Link, useNavigate } from "react-router-dom";
import ToastBarComponent from "../sharedComponents/Toastbar";

const initialState = {
  userRegister: {
    name: "",
    email: "",
    password: "",
  },
  userLogin: {
    email: "",
    password: "",
  },
  userInfo: {},
  orgForm: {},
};

const useUserApi = () => {
  const navigate = useNavigate();
  const [state, setState] = React.useState({ ...initialState });

  const mutations = {
    userRegister: useMutation(UserAPi.RegisterUser, {
      onSuccess: ({ statusCode, data }) => {
        if (statusCode === 200) {
          console.log("Registered");
          alert("Registered successfully")
        }
      },
    }),
    userLogin: useMutation(UserAPi.LoginUser, {
      onSuccess: ({ statusCode, data }) => {
        if (statusCode === 200) {
          localStorage.setItem("jwt", data?.token);
          const userData = data?.user;
          navigate("/userDashboard", { state: { userData } });
          setState((prev) => ({
            ...prev,
            userInfo: {
              ...prev.userInfo,
              userData,
            },
          }));
        }
      },
      onError: (err) => {
        alert(err?.response?.data?.message);
      },
    }),
    getOrgFormData: useMutation(UserAPi.getOrgFormData, {
      onSuccess: ({ statusCode, data }) => {
        if (statusCode === 200) {
          setState((prev) => ({
            ...prev,
            orgForm: data?.forms,
          }));
        }
      },
    }),
    submitUserForm: useMutation(UserAPi.submitUserForm, {
      onSuccess: ({ statusCode, data }) => {
        console.log("Submitted");
        alert("Submitted Successfully")
      },
      onError: (err) => {
        alert("Error");
      },
    }),
  };

  const userHandleMutation = (mtnKey, data) => {
    mutations[mtnKey].mutate(data);
  };

  const userHandleUserRegisterChange = (event) => {
    const { value, name } = event.target;
    setState((prev) => ({
      ...prev,
      userRegister: {
        ...prev.userRegister,
        [name]: value,
      },
    }));
  };

  const userHandleUserLoginChange = (event) => {
    const { value, name } = event.target;
    setState((prev) => ({
      ...prev,
      userLogin: {
        ...prev.userLogin,
        [name]: value,
      },
    }));
  };

  const userHandleRegisterSubmit = () => {
    const { name, email, password } = state?.userRegister;
    const payload = {
      username: name,
      email: email,
      password: password,
    };
    userHandleMutation("userRegister", payload);
  };

  const userHandleLoginSubmit = () => {
    const { email, password } = state?.userLogin;
    const payload = {
      email: email,
      password: password,
    };
    userHandleMutation("userLogin", payload);
  };

  const userHandlePostForm = (formData, formId, userId) => {
    const filteredData = Object.entries(formData).reduce(
      (acc, [key, value]) => {
        if (
          value !== undefined &&
          !(Array.isArray(value) && value.every((val) => val === undefined))
        ) {
          acc[key] = value;
        }
        return acc;
      },
      {}
    );

    const userData = { user_data: filteredData };

    const userDataString = JSON.stringify(userData, null, 2);

    const payload = {
      form_id: formId,
      user_id: userId,
      user_data: userDataString,
    };

    userHandleMutation("submitUserForm", payload);
  };

  return [
    {
      userHandleMutation,
      userHandleRegisterSubmit,
      userHandleUserRegisterChange,
      userHandleUserLoginChange,
      userHandleLoginSubmit,
      userHandlePostForm,
    },
    state,
  ];
};

export default useUserApi;
