import { useEffect, useState } from "react";
import { StyledModalBody, StyledModalWrapper } from "./styled";
import { createPortal } from "react-dom";

export const Modal = ({ show, onHide, children }) => {
  const [shown, setShown] = useState(show);

  useEffect(() => {
    setTimeout(() => setShown(show), show ? 100 : 400);
    if (show) {
      const onClose = (e) => {
        if (e.key === "Escape") {
          onHide();
        }
      };

      document.addEventListener("keyup", onClose);
      document.body.style = "height: 100vh; overflow: hidden;";

      return () => {
        document.removeEventListener("keyup", onClose);
      };
    }
    document.body.style = "";
  }, [show, onHide]);

  const onBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onHide();
    }
  };

  return show || shown
    ? createPortal(
        <StyledModalWrapper $show={show && shown} onClick={onBackdropClick}>
          <StyledModalBody $show={show && shown}>{children}</StyledModalBody>
        </StyledModalWrapper>,
        document.getElementById("root")
      )
    : null;
};
