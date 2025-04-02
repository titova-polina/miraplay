import styled from "styled-components";
import S from "../UI/variables";

export const StyledHero = styled.section`
  padding: 0 20px;
`;

export const StyledHeroWrapper = styled.div`
  max-width: 1170px;
  margin: 0 auto;
  margin-top: 75px;
  margin-bottom: 130px;
`;

export const StyledHeroTitle = styled.h1`
  color: #fff;
  font-size: 54px;
  font-weight: 100;
  max-width: 620px;
  margin-bottom: 32px;
  & span {
    font-weight: 900;
  }
`;

export const StyledHeroSubtitle = styled.p`
  color: #afafaf;
  font-size: 20px;
  font-weight: 300;
  max-width: 575px;
  margin-bottom: 50px;
  & span {
    color: #fff;
    font-weight: 900;
  }
`;

export const StyledHeroButton = styled.button`
  width: 274px;
  height: 78px;
  font-size: 15px;
  font-weight: 800;
  color: #eaeaea;
  border-radius: 10px;
  transform: skew(-10deg);
  box-shadow: 0px 20px 40px rgba(63, 156, 20, 0.3);
  cursor: pointer;
  filter: drop-shadow(0px 20px 40px rgba(63, 156, 20, 0.3));
  box-shadow:
    0 0 40px 40px ${S.mainGreen} inset,
    0 0 0 0 ${S.mainGreen};
  transition: all 200ms ease-in-out;

  &:hover {
    box-shadow:
      0 0 10px 0 ${S.mainGreen} inset,
      0 0 10px 4px ${S.mainGreen};
  }
`;
