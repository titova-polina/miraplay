import styled from "styled-components";
import S from "../../variables";

export const StyledModalContent = styled.div`
  padding: 25px;
`;

export const StyledCloseWrapper = styled.button`
  cursor: pointer;
  position: absolute;
  top: 8px;
  right: 8px;
  & svg {
    width: 20px;
    height: 20px;
    fill: #696969;
  }
`;

export const StyledModalHeader = styled.div`
  display: flex;
  justify-content: center;
  gap: 47px;
  margin: 0 -25px;
  border-bottom: 1px solid #a0a0a0;
`;

export const StyledModalHeaderBtn = styled.button`
  font-size: 20px;
  font-weight: 800;
  color: #181818;
  text-transform: uppercase;
  padding-bottom: 25px;
  cursor: pointer;
  transition: border 200ms ease-in;

  border-bottom: 3px solid
    ${({ $active }) => ($active ? S.mainGreen : "transparent")};
`;

export const StyledModalForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const StyledTextWrapper = styled.div``;

export const StyledModalTitle = styled.h3`
  font-size: 22px;
  font-weight: 800;
  margin-bottom: 16px;
`;

export const StyledModalSubtitle = styled.p`
  font-size: 14px;
  font-weight: 300;
  margin-bottom: 40px;
  max-width: 340px;
`;

export const StyledModalLabel = styled.label`
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 40px;
`;

export const StyledModalInput = styled.input`
  background-color: transparent;
  border: 1px solid #a0a0a0;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 300;
  padding: 25px;
`;

export const StyledModalButton = styled.button`
  width: 274px;
  height: 78px;
  font-size: 15px;
  font-weight: 800;
  color: #eaeaea;
  border-radius: 10px;
  background-color: ${S.mainGreen};
  box-shadow: 0 20px 40px rgba(63, 156, 20, 0.3);
  width: 100%;
  cursor: pointer;
  transition: box-shadow ${S.trMid};

  &:hover {
    box-shadow: 0 0 45px rgba(63, 156, 20, 0.3);
  }
`;
