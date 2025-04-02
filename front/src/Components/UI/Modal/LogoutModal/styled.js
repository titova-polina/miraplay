import styled from "styled-components";

export const StyledModalContent = styled.div`
  padding: 50px;
`;

export const StyledLogoutButton = styled.button`
  background: 0;
  border: 0;
  font-size: 12px;
  color: #696969;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  & svg {
    width: 15px;
    height: 15px;
    fill: #696969;
  }
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
