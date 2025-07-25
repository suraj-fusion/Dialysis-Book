import React, { createContext, useState, ReactNode } from "react";

import { DialysisSession } from "../types";

// 2. Define the context value type
interface SessionsContextType {
  sessions: DialysisSession[];
  addSession: (session: DialysisSession) => void;
  deleteSession: (id: string) => void;
  updateSession:(session:DialysisSession,id:string)=>void;
}

// 3. Create the context with default empty values (using type assertion)
export const SessionsContext = createContext<SessionsContextType>({
  sessions: [],
  addSession: () => {},
  updateSession:()=>{},
  deleteSession: () => {},
});

// 4. Mock data (same as before)
const mockDialysisSessions: DialysisSession[] = [
  {
    id: "1",
    date: "2025-07-01",
    startTime: "Sat Jul 26 2025 00:55:43 GMT+0530 (India Standard Time)",
    endTime: "Sat Jul 26 2025 00:59:43 GMT+0530 (India Standard Time)",
    weightBefore: 72.5,
    weightAfter: 70.1,
    notes: "Mild cramping during session",
  },
  // {
  //   id: "2",
  //   date: "2025-07-03",
  //   startTime: "09:05",
  //   endTime: "12:00",
  //   weightBefore: 70.6,
  //   weightAfter: 68.9,
  //   notes: "Felt tired after session",
  // },
  // {
  //   id: "3",
  //   date: "2025-07-05",
  //   startTime: "08:50",
  //   endTime: "11:45",
  //   weightBefore: 71.2,
  //   weightAfter: 69.4,
  //   notes: "",
  // },
  // {
  //   id: "4",
  //   date: "2025-07-08",
  //   startTime: "09:00",
  //   endTime: "12:00",
  //   weightBefore: 72.1,
  //   weightAfter: 70.0,
  //   notes: "Normal session",
  // },
  // {
  //   id: "5",
  //   date: "2025-07-10",
  //   startTime: "09:15",
  //   endTime: "12:10",
  //   weightBefore: 72.8,
  //   weightAfter: 70.5,
  //   notes: "Felt dizzy after dialysis",
  // },
  // {
  //   id: "6",
  //   date: "2025-07-24",
  //   startTime: "09:00",
  //   endTime: "12:00",
  //   weightBefore: 72.0,
  //   weightAfter: 70.2,
  //   notes: "",
  // },
  //  {
  //   id: "7",
  //   date: "2025-07-25",
  //   startTime: "09:00",
  //   endTime: "12:00",
  //   weightBefore: 72.0,
  //   weightAfter: 70.2,
  //   notes: "",
  // }
];

// 5. Define props for the provider
interface SessionsProviderProps {
  children: ReactNode;
}

// 6. The provider component
export function SessionsContextProvider({ children }: SessionsProviderProps) {
  const [sessions, setSessionsState] = useState<DialysisSession[]>(mockDialysisSessions);


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
