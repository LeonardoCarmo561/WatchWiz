import { useAuthContext } from "../shared/contexts/AuthContext";
import AuthRoutes from "./AuthRoutes";
import AppRoutes from "./AppRoutes";

export default function Routes() {
  const { signed } = useAuthContext()
  return signed ? <AppRoutes /> : <AuthRoutes />
}
