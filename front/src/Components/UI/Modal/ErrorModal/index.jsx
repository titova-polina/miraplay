import { useCallback, useEffect, useState } from "react";
import { Modal } from "..";

export const ErrorModal = ({ message, setMessage }) => {
  const [show, setShow] = useState(!!message);
  const [innerMessage, setInnerMessage] = useState(message);

  useEffect(() => {
    setShow(!!message);

    let timeout;

    if (message) {
      setInnerMessage(message);
      timeout = setTimeout(() => {
        setShow(false);
        setMessage("");
      }, 3000);
    }

    return () => clearTimeout(timeout);
  }, [message, setMessage]);

  const onHide = useCallback(() => {
    setShow(false);
    setMessage("");
  }, [setMessage]);

  return (
    <Modal show={show} onHide={onHide}>
      <span
        style={{
          color: "red",
          background: "palered",
          padding: "24px",
          minWidth: "140px",
        }}
      >
        {innerMessage || "AAAAAAAAAAAAAAAAAAAAAA"}
      </span>
    </Modal>
  );
};
