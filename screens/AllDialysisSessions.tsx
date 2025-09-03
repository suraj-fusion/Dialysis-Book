import { useContext, useLayoutEffect } from "react";

import { SessionsContext } from "../store/session-context";
import Sessions from "../components/Sessions";
import Info from "../components/Info";
import Button from "../components/HeaderButton";
import { useNavigation } from "@react-navigation/native";
import { generateAndSharePDF } from "../util/pdfGeneration";

const AllDialysisSessions = () => {
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

        headerLeft: () => (
        <Button
          name="share"
          size={18}
          color="white"
          onPress={()=>generateAndSharePDF(sessions,"All")} 
        />
      ),
    });
  }, []);

  return sessions.length > 0 ? (
    <Sessions sessions={sessions} />
  ) : (
    <Info info="No sessions added yet" />
  );
};

export default AllDialysisSessions;
