import { useNavigate } from "react-router-dom";

import { useRedirectStore } from "../store/useRedirectStore";

/**
 * Custom hook to handle login redirection.
 *
 * @function useLoginRedirect
 * @returns A function to navigate to the stored redirect path.
 */

const useLoginRedirect = () => {
  const navigate = useNavigate();
  const redirectPath = useRedirectStore((state) => state.redirect);

  function handleNavigation() {
    navigate(redirectPath);
  }
  return handleNavigation;
};

export default useLoginRedirect;
