import styled from "styled-components";

export const StyledFooter = styled.footer`
  background: rgb(24, 24, 24);
  background: linear-gradient(
    180deg,
    rgba(24, 24, 24, 1) 37%,
    rgba(63, 156, 20, 1) 300%
  );
`;

export const StyledFooterWrapper = styled.div`
  display: flex;
  align-items: center;
  max-width: 1170px;
  margin: 0 auto;
  height: 200px;
  padding: 0 20px;
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
