import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../pages/Firebase/firebase";

export default function PrivateRoute({ children }) {
  const [user] = useAuthState(auth);
  return user ? children : <Navigate to="/Vite-E-commerce/login" />;
}

// PropTypes validation
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
