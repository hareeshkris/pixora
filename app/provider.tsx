"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { userDetailcontext } from "@/context/userDetailContext";
import { settingsContext } from "@/context/settingContext";
import { RefreshDataContext } from "@/context/refreshDataContext";

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [userDetails, setUserDetails] = useState<any>(null);
  const [settingsDetails, setSettingsDetails] = useState<any>(null);
  const [refreshData, setRefreshData] = useState(null);
  useEffect(() => {
    createNewUser();
  }, []);
  const createNewUser = async () => {
    const res = await axios.post("/api/users");
    setUserDetails(res.data);
  };
  return (
    <userDetailcontext.Provider value={{ userDetails, setUserDetails }}>
      <settingsContext.Provider value={{ settingsDetails, setSettingsDetails }}>
        <RefreshDataContext.Provider value={{ refreshData, setRefreshData }}>
          <>{children}</>
        </RefreshDataContext.Provider>
      </settingsContext.Provider>
    </userDetailcontext.Provider>
  );
};

export default Provider;
