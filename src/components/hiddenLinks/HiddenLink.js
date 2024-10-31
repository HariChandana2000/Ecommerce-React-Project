import { selectIsLoggerIn } from "../../redux/slice/authSlice";
import { useSelector } from "react-redux";

const ShowOnLogin = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggerIn);

  if (isLoggedIn) {
    return children;
  }
  return null;
};

export const ShowOnLogout = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggerIn);

  if (!isLoggedIn) {
    return children;
  }
  return null;
};

export default ShowOnLogin;
