import {
  StyledGenreBtnWrapper,
  StyledGenreButton,
  StyledSortBtnWrapper,
  StyledSortTitle,
  StyledSortButton,
  StyledFilterWrapper,
} from "./styled";
import { genres } from "../../Configs/constants";

export const GamesFilter = ({
  genre,
  fresh,
  handleChangeGenre,
  handleChangeSort,
}) => {
  return (
    <StyledFilterWrapper>
      <StyledGenreBtnWrapper>
        {genres.map(({ label, value }) => {
          return (
            <StyledGenreButton
              key={value}
              onClick={() => {
                handleChangeGenre(value);
              }}
              $active={value === genre || (value === "ALL" && !genre)}
            >
              {label}
            </StyledGenreButton>
          );
        })}
      </StyledGenreBtnWrapper>
      <StyledSortBtnWrapper>
        <StyledSortTitle>Сортувати:</StyledSortTitle>
        <StyledSortButton
          onClick={() => {
            handleChangeSort(true);
          }}
          $active={fresh}
        >
          спочатку нові
        </StyledSortButton>
        <StyledSortButton
          onClick={() => handleChangeSort(false)}
          $active={!fresh}
        >
          спочатку старі
        </StyledSortButton>
      </StyledSortBtnWrapper>
    </StyledFilterWrapper>
  );
};
