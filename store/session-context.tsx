import React, { createContext, useState, ReactNode, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import 'react-native-get-random-values';
import { DialysisSession } from "../types";
import * as SecureStore from 'expo-secure-store';

import CryptoJS from 'crypto-js';

interface SessionsContextType {
  sessions: DialysisSession[];
  addSession: (session: DialysisSession) => void;
  deleteSession: (id: string) => void;
  updateSession:(session:DialysisSession,id:string)=>void;
}


export const SessionsContext = createContext<SessionsContextType>({
  sessions: [],
  addSession: () => {},
  updateSession:()=>{},
  deleteSession: () => {},
});


const STORAGE_KEY = "dialysis_sessions";
const ENCRYPTION_KEY = 'suraj-fusion-1234'; 



interface SessionsProviderProps {
  children: ReactNode;
}


export function SessionsContextProvider({ children }: SessionsProviderProps) {
  const [sessions, setSessionsState] = useState<DialysisSession[]>([]);

   // 🔹 Load from AsyncStorage on mount
  useEffect(() => {
    const loadSessions = async () => {
      try {
       const encrypted = await AsyncStorage.getItem(STORAGE_KEY);
      
        if (encrypted) {
          const bytes = CryptoJS.AES.decrypt(encrypted, ENCRYPTION_KEY);

         const decrypted = bytes.toString(CryptoJS.enc.Utf8); 
         setSessionsState(JSON.parse(decrypted));
        }
      } catch (error) {
        console.error("Failed to load sessions from storage:", error);
      }
    };

    loadSessions();
  }, []);

  // 🔹 Save to AsyncStorage whenever sessions change
  useEffect(() => {
    const saveSessions = async () => {
      try {
        const data = JSON.stringify(sessions);
        const encrypted = CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString();
        await AsyncStorage.setItem(STORAGE_KEY, encrypted);
      } catch (error) {
        console.error("Failed to save sessions to storage:", error);
      }
    };

    saveSessions();
  }, [sessions]);


  function addSession(sessionData: DialysisSession) {
    setSessionsState((prevSessions) => [{id:sessions.length+1, ...sessionData},...prevSessions]);
  }

  function updateSession(sessionData:DialysisSession,id:String){
   setSessionsState((prevSessions)=>{
    const sessionToBeUpdatedIndex=prevSessions.findIndex((session)=>session.id===id)

    const newSessions=[...prevSessions]

    newSessions[sessionToBeUpdatedIndex]={...sessionData};


    
    return newSessions;


   })
  }

  function deleteSession(id: string) {
    setSessionsState((prevSessions) => prevSessions.filter((item) => item.id !== id));
  }

  const value: SessionsContextType = {
    sessions,
    addSession,
    deleteSession,
    updateSession
  };

  return <SessionsContext.Provider value={value}>{children}</SessionsContext.Provider>;
}
