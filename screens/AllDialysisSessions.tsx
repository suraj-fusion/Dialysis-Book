
import { useContext } from "react";


import { SessionsContext } from "../store/session-context";
import Sessions from "../components/Sessions";

const AllDialysisSessions = () => {
  const { sessions } = useContext(SessionsContext);

  return <Sessions sessions={sessions} />;
};

export default AllDialysisSessions;
