import { useUser } from "../UserContext";
import { AppNavigation } from "./AppNavigation";
import { AuthNavigation } from "./AuthNavigation";

export const NavWrapper = () => {
  const { user } = useUser();

  return user ? <AppNavigation /> : <AuthNavigation />;
};
