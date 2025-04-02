import styled from "styled-components";
import S from "../UI/variables";

export const StyledHeader = styled.header`
  padding: 0 20px;
`;

export const StyledHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1170px;
  margin: 0 auto;
  height: 90px;
`;

export const StyledLogoWrapper = styled.div``;

export const StyledLogoLink = styled.a`
  cursor: pointer;
`;

export const StyledLogoTitle = styled.h5`
  color: #faf9f7;
  font-size: 18px;
  font-weight: 800;
  margin: 0;
`;

export const StyledLogoSubtitle = styled.p`
  color: #faf9f7;
  font-size: 14px;
  font-weight: 300;
  margin: 0;
  margin-top: 3px;
`;

export const StyledButtonsWrapper = styled.div`
  display: flex;
  gap: 24px;
`;

export const StyledHeaderButton = styled.button`
  height: 56px;
  width: 56px;
  border-radius: 10px;
  border: 1px solid hsl(0deg 0% 100% / 10%);
  cursor: pointer;
  transition:
    background-color ${S.trMid},
    border ${S.trFast};

  & svg {
    fill: #fff;
    max-height: 25px;
    max-width: 25px;
  }

  &:hover {
    background-color: ${S.mainGreen};
    border: 1px solid ${S.mainGreen};
  }
`;
