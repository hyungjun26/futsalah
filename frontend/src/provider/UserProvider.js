import React, { useEffect, useReducer } from "react";

import UserContext from "../contexts/UserContext";

const initialState = {
  socialID: "",
  name: "",
  profileURL: "",
  provider: "",
  logged: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      console.log("LOGGED!");
      return {
        ...state,
        socialID: action.id,
        name: action.name,
        provider: action.provider,
        profileURL: action.profileURL,
        logged: true,
      };
    case "LOGOUT_USER":
      console.log("LOGOUT!");
      window.sessionStorage.removeItem("id");
      window.sessionStorage.removeItem("name");
      window.sessionStorage.removeItem("provider");
      window.sessionStorage.removeItem("profileURL");
      window.location.href = "/";
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const UserProvider = ({ children }) => {
  //Hook을 통한 state, setState를 정의합니다.
  const [userinfo, userDispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const id = window.sessionStorage.getItem("id");
    if (id) {
      const name = window.sessionStorage.getItem("name");
      const provider = window.sessionStorage.getItem("provider");
      const profileURL = window.sessionStorage.getItem("profileURL");
      userDispatch({
        type: "LOGIN_USER",
        id,
        name,
        provider,
        profileURL,
      });
    }
  }, []);

  return (
    <UserContext.Provider value={{ userinfo, userDispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
