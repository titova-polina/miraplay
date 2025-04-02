import styled from "styled-components";
import S from "../../Components/UI/variables";

export const StyledGamesContent = styled.section`
  padding: 0 16px;
  padding-bottom: 50px;
  @media screen and (min-width: ${S.desktop}) {
    max-width: 1170px;
    margin: 0 auto;
  }
`;

export const StyledAllGamesWrapper = styled.div`
  @media screen and (min-width: ${S.desktop}) {
    width: 1170px;
  }
`;

export const StyledGamesTitle = styled.h3`
  font-size: 58px;
  font-weight: 800;
  color: ${S.whiteText};
  margin-bottom: 42px;
`;

export const StyledFilterWrapper = styled.div`
  display: flex;
  gap: 40px;
`;

export const StyledGenreBtnWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  max-width: 800px;
`;

export const StyledSortBtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const StyledSortTitle = styled.h3`
  font-size: 14px;
  font-weight: 300;
  color: #afafaf;
  margin: 0;
`;

export const StyledSortButton = styled.button`
  background-color: ${({ $active }) =>
    $active ? `${S.mainGreen}` : "#1e1e1e"};
  border: 1px solid #454545;
  border-radius: 10px;
  padding: 10px;
  color: ${({ $active }) => ($active ? "#fff" : "#6d6d6d")};
  transition:
    background-color ${S.trMid},
    border ${S.trFast};
  cursor: pointer;

  &:hover {
    background-color: ${S.mainGreen};
    border: 1px solid ${S.mainGreen};
    color: #fff;
  }
`;

export const StyledGenreButton = styled.button`
  background-color: ${({ $active }) =>
    $active ? `${S.mainGreen}` : "#242424"};
  border: 1px solid #454545;
  border-radius: 10px;
  cursor: pointer;
  color: ${S.whiteText};
  font-size: 14px;
  font-weight: 800;
  padding: 15px 25px;
  transition:
    background-color ${S.trMid},
    border ${S.trFast};
  cursor: pointer;

  &:hover {
    background-color: ${S.mainGreen};
    border: 1px solid ${S.mainGreen};
    color: #fff;
  }
`;

export const StyledGamesList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  padding: 0;
  min-height: 470px;
`;

export const StyledGamesListItem = styled.li`
  position: relative;
  border-radius: 10px;
  height: 220px;
`;

export const StyledGamesImg = styled.img`
  width: 170px;
  height: 170px;
  object-fit: cover;
  border-radius: 10px;
  border: 1px solid #454545;
  margin-bottom: 8px;
`;

export const StyledGamesImgTitle = styled.h3`
  font-size: 15px;
  font-weight: 800;
  text-align: center;
  max-width: 175px;
  color: ${S.whiteText};
  text-transform: uppercase;
  margin: 0;
`;

export const StyledCommentWrapper = styled.div``;

export const StyledCommentButton = styled.button`
  position: absolute;
  bottom: 52px;
  right: 8px;
  background: transparent;
  border: none;
  cursor: pointer;

  & svg {
    width: 20px;
    height: 20px;
    fill: #fff;
  }
`;

export const StyledCountWrapper = styled.div`
  position: absolute;
  top: -2px;
  right: -1px;
  background-color: red;
  min-width: 12px;
  height: 12px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 2px;
`;

export const StyledCommentCount = styled.p`
  color: #fff;
  font-size: 9px;
  font-weight: 600;
  padding: 0;
  margin: 0;
`;

export const StyledLoadMoreBtn = styled.button`
  background-color: #242424;
  border: 1px solid #454545;
  color: ${S.whiteText};
  border-radius: 20px;
  font-size: 14px;
  font-weight: 800;
  height: 78px;
  text-align: center;
  width: 370px;
  margin: 41px auto 0;
  transition:
    background-color ${S.trMid},
    border ${S.trFast};
  cursor: pointer;

  &:hover {
    background-color: ${S.mainGreen};
    border: 1px solid ${S.mainGreen};
    color: #fff;
  }
`;
