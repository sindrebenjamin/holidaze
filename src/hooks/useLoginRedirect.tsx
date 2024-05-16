import { useNavigate } from "react-router-dom";

import { useRedirectStore } from "../store/useRedirectStore";

const useLoginRedirect = () => {
  const navigate = useNavigate();
  const redirectPath = useRedirectStore((state) => state.redirect);

  function handleNavigation() {
    console.log(redirectPath);
    navigate(redirectPath);
  }
  return handleNavigation;
};

export default useLoginRedirect;
