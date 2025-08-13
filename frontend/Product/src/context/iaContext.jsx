import React, { createContext, useContext, useState } from 'react';
import { ChatIARequest } from '../api/axios.ia.js';

const IAContext = createContext();

export const useIA = () => {
  const context = useContext(IAContext);
  if (!context) {
    throw new Error('useIA debe ser usado dentro de un IAProvider');
  }
  return context;
};

export const IAProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessageToIA = async (question) => {
    setIsLoading(true);
    setError(null);
  
    try {
      const response = await ChatIARequest(question);
      setIsLoading(false);
      console.log(response.data)
      return response.data;
    } catch (err) {
      setIsLoading(false);
      setError(err.response?.data?.message || 'Error al comunicarse con la IA');
      throw err;
    }
  };
  

  const value = {
    isLoading,
    error,
    sendMessageToIA
  };

  return (
    <IAContext.Provider value={value}>
      {children}
    </IAContext.Provider>
  );
};