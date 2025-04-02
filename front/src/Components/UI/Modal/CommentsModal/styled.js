import styled from "styled-components";

export const StyledModalContent = styled.div`
  padding: 25px 0;
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

export const StyledCommentTitle = styled.h3`
  font-size: 22px;
  font-weight: 800;
  text-transform: uppercase;
  margin: 0;
  padding: 0 25px;
`;

export const StyledCommentsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0;
  height: fit-content;
  max-height: calc(100vh - 400px);
  overflow-y: auto;
  padding: 0 25px;
`;

export const StyledCommentsListItem = styled.li`
  display: flex;
  flex-direction: column;
`;

export const StyledCommentUser = styled.h3`
  font-size: 16px;
  font-weight: 800;
  margin: 0;
`;

export const StyledCommentText = styled.p`
  font-size: 14px;
  font-weight: 400;
  margin: 0;
  white-space: pre;
  border-bottom: 1px solid #717171;
`;

export const StyledCommentDate = styled.span`
  width: 100%;
  text-align: end;
  color: #717171;
  font-size: 10px;
`;

export const StyledCommentForm = styled.form`
  display: flex;
  justify-content: center;
  padding: 0 25px;
`;

export const StyledCommentLabel = styled.label``;

export const StyledCommentInput = styled.textarea`
  background-color: transparent;
  border: 1px solid #a0a0a0;
  border-right: none;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  font-size: 16px;
  font-weight: 300;
  padding: 12px;
  resize: none;
  display: block;
  outline: none;
`;

export const StyledCommentSendBtn = styled.button`
  border: 1px solid #a0a0a0;
  padding: 0 12px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  cursor: pointer;
`;
