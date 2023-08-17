import { createContext } from "react";

const authState = {
  name: "",
  familyName: "",
  username: "",
  password: "",
  email: "",
  type: "",
  phoneNumber: "",
};

const authMutator = (action) => {
  switch (action.type) {
    case "SET_NAME":
      authState.name = action.payload;
      return;
    case "SET_FAMILY_NAME":
      authState.familyName = action.payload;
      return;
    case "SET_USERNAME":
      authState.username = action.payload;
      return;
    case "SET_PASSWORD":
      authState.password = action.payload;
      return;
    case "SET_EMAIL":
      authState.email = action.payload;
      return;
    case "SET_TYPE":
      authState.type = action.payload;
      return;
    case "SET_PHONE_NUMBER":
      authState.phoneNumber = action.payload;
      return;
  }
};

const mutateUsername = (payload) => {
  return {
    type: "SET_USERNAME",
    payload,
  };
};

const mutatePassword = (payload) => {
  return {
    type: "SET_PASSWORD",
    payload,
  };
};

const mutateEmail = (payload) => {
  return {
    type: "SET_EMAIL",
    payload,
  };
};

const mutateType = (payload) => {
  return {
    type: "SET_TYPE",
    payload,
  };
};

const mutateName = (payload) => {
  return {
    type: "SET_NAME",
    payload,
  };
};

const mutateFamilyName = (payload) => {
  return {
    type: "SET_FAMILY_NAME",
    payload,
  };
};

const mutatePhoneNumber = (payload) => {
  return {
    type: "SET_PHONE_NUMBER",
    payload,
  };
};

const context = {
  authState,
  authMutator,
  authActions: {
    mutateName,
    mutateFamilyName,
    mutateUsername,
    mutateEmail,
    mutatePassword,
    mutateType,
    mutatePhoneNumber,
  },
};

export const AuthContext = createContext(context);
