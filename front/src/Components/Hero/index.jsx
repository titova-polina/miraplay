import { useCallback, useState } from "react";
import {
  StyledHero,
  StyledHeroButton,
  StyledHeroSubtitle,
  StyledHeroTitle,
  StyledHeroWrapper,
} from "./styled";
import { Modal } from "../UI/Modal";
import { AuthModal } from "../UI/Modal/AuthModal";
import { useSelector } from "react-redux";
import { getUserData } from "../../Redux/Actions";

export const Hero = () => {
  const user = useSelector(getUserData);

  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleOpenLoginModal = () => setShowLoginModal(true);

  const onHideLoginModal = useCallback(() => setShowLoginModal(false), []);

  return user ? null : (
    <>
      <StyledHero>
        <StyledHeroWrapper>
          <StyledHeroTitle>
            ГРАЙ У УЛЮБЛЕНІ <span>ШУТЕРИ, СТРАТЕГІЇ, ГОНКИ</span> В ХМАРІ
          </StyledHeroTitle>
          <StyledHeroSubtitle>
            Топові ігри на <span>будь-якому ПК</span> вже зараз, реєструйся і
            грай 30 хв безкоштовно
          </StyledHeroSubtitle>
          <StyledHeroButton onClick={handleOpenLoginModal}>
            ПОЧАТИ ГРАТИ
          </StyledHeroButton>
        </StyledHeroWrapper>
      </StyledHero>
      <Modal show={showLoginModal} onHide={onHideLoginModal}>
        <AuthModal onSuccess={onHideLoginModal} onClose={onHideLoginModal} />
      </Modal>
    </>
  );
};
