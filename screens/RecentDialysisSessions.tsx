
import Sessions from "../components/Sessions";
import { SessionsContext } from "../store/session-context";
import { useContext, useLayoutEffect } from "react";
import { getDateMinusDays } from "../util/date";
import { useNavigation } from "@react-navigation/native";
import Button from "../components/HeaderButton";
import Info from "../components/Info";

function RecentDialysisSessions() {
  const { sessions } = useContext(SessionsContext);

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          name="add"
          size={18}
          color="white"
          onPress={() => navigation.navigate("Manage Session")}
        />
      ),
    });
  }, []);

  const recentSessions = sessions.filter((session) => {
    const today = new Date();
    const days7Ago = getDateMinusDays(today, 7);

    return new Date(session.date) > days7Ago;
  });

  return recentSessions.length > 0 ? (
    <Sessions sessions={recentSessions} />
  ) : (
    <Info info="No recent sessions " />
  );
}

export default RecentDialysisSessions;
