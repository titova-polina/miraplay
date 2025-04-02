import { useDispatch } from "react-redux";
import { logout } from "../../../../API";
import { default as LogoutIcon } from "../../../../Static/icons/logout.svg";
import { default as CloseIcon } from "../../../../Static/icons/x-altx-alt.svg";
import {
  StyledCloseWrapper,
  StyledLogoutButton,
  StyledModalContent,
} from "./styled";
import { clearUserData } from "../../../../Redux/store";

export const LogoutModal = ({ onSuccess, onClose }) => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const { data } = await logout();
    if (data.status === "success") {
      dispatch(clearUserData());
      onSuccess();
    }
  };
  return (
    <StyledModalContent>
      <StyledCloseWrapper onClick={onClose}>
        <CloseIcon />
      </StyledCloseWrapper>
      <StyledLogoutButton onClick={handleLogout}>
        <LogoutIcon />
        Вийти
      </StyledLogoutButton>
    </StyledModalContent>
  );
};
