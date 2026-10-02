"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { userDetailcontext } from "@/context/userDetailContext";

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [userDetails, setUserDetails] = useState<any>(null);
  useEffect(() => {
    createNewUser();
  }, []);
  const createNewUser = async () => {
    const res = await axios.post("/api/users");
    setUserDetails(res.data);
  };
  return (
    <userDetailcontext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </userDetailcontext.Provider>
  );
};

export default Provider;
