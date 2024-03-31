import React from "react";
import { useMutation } from "@tanstack/react-query";
import { OrgAPi } from "../api/OrgApi";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  orgRegister: {
    name: "",
    email: "",
    password: "",
  },
  orgLogin: {
    email: "",
    password: "",
  },
  orgInfo: {},
  userFormSubmission: {},
};

const useOrgApi = () => {
  const navigate = useNavigate();
  const [state, setState] = React.useState({ ...initialState });

  const mutations = {
    orgRegister: useMutation(OrgAPi.RegisterOrg, {
      onSuccess: ({ statusCode, data }) => {
        if (statusCode === 200) {
          console.log("Registered");
          alert("Registered successfully")
        }
      },
    }),
    orgLogin: useMutation(OrgAPi.LoginOrg, {
      onSuccess: ({ statusCode, data }) => {
        if (statusCode === 200) {
          localStorage.setItem("jwt", data?.token);
          const orgData = data?.org;
          navigate("/orgDashboard", { state: { orgData } });
          setState((prev) => ({
            ...prev,
            orgInfo: {
              ...prev.orgInfo,
              orgData,
            },
          }));
        }
      },
      onError: (err) => {
        alert(err?.response?.data?.message)
      },
    }),
    orgPostForm: useMutation(OrgAPi.PostOrgForm, {
      onSuccess: ({ statusCode, data }) => {
        console.log("submitted");
        alert("Submitted Successfully")
      },
    }),
    getUserSubmission: useMutation(OrgAPi.GetUserSubmission, {
      onSuccess: ({ statusCode, data }) => {
        if (statusCode === 201) {
          setState((prev) => ({
            ...prev,
            userFormSubmission: data?.forms,
          }));
        }
      },
    }),
  };

  const orgHandleMutation = (mtnKey, data) => {
    mutations[mtnKey].mutate(data);
  };

  const orgHandleOrgRegisterChange = (event) => {
    const { value, name } = event.target;
    setState((prev) => ({
      ...prev,
      orgRegister: {
        ...prev.orgRegister,
        [name]: value,
      },
    }));
  };

  const orgHandleRegisterSubmit = () => {
    const { name, email, password } = state?.orgRegister;
    const payload = {
      username: name,
      email: email,
      password: password,
    };
    orgHandleMutation("orgRegister", payload);
  };

  const orgHandleOrgLoginChange = (event) => {
    const { value, name } = event.target;
    setState((prev) => ({
      ...prev,
      orgLogin: {
        ...prev.orgLogin,
        [name]: value,
      },
    }));
  };

  const orgHandleOrgPostForm = (formData, orgId) => {
    const form_name = formData[0]?.formName;

    const field_type = formData
      .slice(1)
      .map((data, index) => {
        switch (data.type) {
          case "input":
            return `${index + 1}:textbox`;
          case "radio":
            return `${index + 1}:radiobutton`;
          case "dropDown":
            return `${index + 1}:dropdown`;
          case "checkbox":
            return `${index + 1}:checkbox`;
          default:
            return `${index + 1}:textbox`;
        }
      })
      .join(",");

    const field_label = formData
      .slice(1)
      .map((data, index) => `${index + 1}:${data.label}`)
      .join(",");

    const field_options = formData
      .slice(1)
      .map((data, index) => {
        if (data.options && data.options.length > 0) {
          const nonEmptyOptions = data.options.filter(
            (option) => Object.keys(option).length > 0
          );
          if (nonEmptyOptions.length > 0) {
            const labelValues = nonEmptyOptions.map((option) => option.label);
            return `${index + 1}:${labelValues.join(",")}`;
          }
        }
        return null;
      })
      .filter(Boolean)
      .join(";");

    const payload = {
      org_id: orgId,
      form_name,
      field_type,
      field_label,
      field_options,
    };

    orgHandleMutation("orgPostForm", payload);
  };

  const orgHandleLoginSubmit = () => {
    const { email, password } = state?.orgLogin;
    const payload = {
      email: email,
      password: password,
    };
    orgHandleMutation("orgLogin", payload);
  };

  return [
    {
      orgHandleMutation,
      orgHandleRegisterSubmit,
      orgHandleOrgRegisterChange,
      orgHandleOrgLoginChange,
      orgHandleLoginSubmit,
      orgHandleOrgPostForm,
    },
    state,
  ];
};

export default useOrgApi;
