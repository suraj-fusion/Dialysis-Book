import { Text, View } from "react-native";
import Sessions from "../components/Sessions";
import { SessionsContext } from "../store/session-context";
import { useContext } from "react";
import { getDateMinusDays } from "../util/date";

function RecentDialysisSessions() {
  const { sessions } = useContext(SessionsContext);

  const recentSessions=sessions.filter((session)=>{
    const today = new Date();
    const days7Ago=getDateMinusDays(today,7)

    return new Date(session.date) > days7Ago;
  })

  return <Sessions sessions={recentSessions} />;
}

export default RecentDialysisSessions;
