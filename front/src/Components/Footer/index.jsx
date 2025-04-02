import { Link } from "react-router-dom";
import {
  StyledFooter,
  StyledFooterWrapper,
  StyledLogoLink,
  StyledLogoSubtitle,
  StyledLogoTitle,
  StyledLogoWrapper,
} from "./styled";

export const Footer = () => {
  return (
    <StyledFooter>
      <StyledFooterWrapper>
        <StyledLogoWrapper>
          <StyledLogoLink as={Link} href="/">
            <StyledLogoTitle>MIRAPLAY</StyledLogoTitle>
            <StyledLogoSubtitle>Cloud Gaming</StyledLogoSubtitle>
          </StyledLogoLink>
        </StyledLogoWrapper>
      </StyledFooterWrapper>
    </StyledFooter>
  );
};
