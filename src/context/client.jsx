// MyContext.js
import React, { createContext, useContext, useState } from 'react';

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [client, setClient] = useState(null);
  const [user, setUser] = useState("");

  return (
    <MyContext.Provider value={{ client, setClient, user, setUser }}>
      {children}
    </MyContext.Provider>
  );
};


export const useMyClientContext = () => {
  return useContext(MyContext);
};
