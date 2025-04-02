import { default as PersonIcon } from "../../Static/icons/person.svg";
import {
  StyledButtonsWrapper,
  StyledHeader,
  StyledHeaderButton,
  StyledHeaderWrapper,
  StyledLogoLink,
  StyledLogoSubtitle,
  StyledLogoTitle,
  StyledLogoWrapper,
} from "./styled";
import { Link } from "react-router-dom";
import { useCallback, useState } from "react";
import { Modal } from "../UI/Modal";
import { AuthModal } from "../UI/Modal/AuthModal";
import { useSelector } from "react-redux";
import { LogoutModal } from "../UI/Modal/LogoutModal";
import { getUserData } from "../../Redux/Actions";

export const Header = () => {
  const user = useSelector(getUserData);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const handleOpenLoginModal = () => setShowLoginModal(true);
  const onHideLoginModal = useCallback(() => setShowLoginModal(false), []);

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleOpenLogoutModal = () => setShowLogoutModal(true);

  const onHideLogoutModal = useCallback(() => setShowLogoutModal(false), []);

  return (
    <>
      <StyledHeader>
        <StyledHeaderWrapper>
          <StyledLogoWrapper>
            <StyledLogoLink as={Link} href="/">
              <StyledLogoTitle>MIRAPLAY</StyledLogoTitle>
              <StyledLogoSubtitle>Cloud Gaming</StyledLogoSubtitle>
            </StyledLogoLink>
          </StyledLogoWrapper>
          <StyledButtonsWrapper>
            <StyledHeaderButton
              onClick={user ? handleOpenLogoutModal : handleOpenLoginModal}
            >
              <PersonIcon />
            </StyledHeaderButton>
          </StyledButtonsWrapper>
        </StyledHeaderWrapper>
      </StyledHeader>

      <Modal show={showLoginModal} onHide={onHideLoginModal}>
        <AuthModal onSuccess={onHideLoginModal} onClose={onHideLoginModal} />
      </Modal>
      <Modal show={showLogoutModal} onHide={onHideLogoutModal}>
        <LogoutModal
          onSuccess={onHideLogoutModal}
          onClose={onHideLogoutModal}
        />
      </Modal>
    </>
  );
};
