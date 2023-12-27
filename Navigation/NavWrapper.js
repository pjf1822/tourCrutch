import { useUser } from "../UserContext";
import { SignedInNav } from "./SignedInNav";
import { AuthNavigation } from "./AuthNavigation";

export const NavWrapper = () => {
  const { user } = useUser();

  return user ? <SignedInNav /> : <AuthNavigation />;
};
