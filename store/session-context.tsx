import React, { createContext, useState, ReactNode, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { DialysisSession } from "../types";

interface SessionsContextType {
  sessions: DialysisSession[];
  addSession: (session: DialysisSession) => void;
  deleteSession: (id: string) => void;
  updateSession: (session: DialysisSession, id: string) => void;
}

export const SessionsContext = createContext<SessionsContextType>({
  sessions: [],
  addSession: () => {},
  updateSession: () => {},
  deleteSession: () => {},
});

const STORAGE_KEY = "dialysis_sessions";

interface SessionsProviderProps {
  children: ReactNode;
}

export function SessionsContextProvider({ children }: SessionsProviderProps) {
  const [sessions, setSessionsState] = useState<DialysisSession[]>([]);

  // 🔹 Load from AsyncStorage on mount
  useEffect(() => {
    const loadSessions = async () => {
      try {
        const storedData = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedData) {
          setSessionsState(JSON.parse(storedData));
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
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
      } catch (error) {
        console.error("Failed to save sessions to storage:", error);
      }
    };

    saveSessions();
  }, [sessions]);

  function addSession(sessionData: DialysisSession) {
    setSessionsState((prevSessions) => [
      { id: sessions.length + 1, ...sessionData },
      ...prevSessions,
    ]);
  }

  function updateSession(sessionData: DialysisSession, id: String) {
    setSessionsState((prevSessions) => {
      const sessionToBeUpdatedIndex = prevSessions.findIndex(
        (session) => session.id === id
      );

      const newSessions = [...prevSessions];

      newSessions[sessionToBeUpdatedIndex] = { ...sessionData };

      return newSessions;
    });
  }

  function deleteSession(id: string) {
    setSessionsState((prevSessions) =>
      prevSessions.filter((item) => item.id !== id)
    );
  }

  const value: SessionsContextType = {
    sessions,
    addSession,
    deleteSession,
    updateSession,
  };

  return (
    <SessionsContext.Provider value={value}>
      {children}
    </SessionsContext.Provider>
  );
}
