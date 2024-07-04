// UserContext.js
import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userRole, setUserRole] = useState("");
  const [userId, setUserId] = useState("");

  return (
    <UserContext.Provider value={{ userRole, setUserRole, userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};
