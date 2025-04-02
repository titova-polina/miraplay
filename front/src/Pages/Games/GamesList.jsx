import {
  StyledGamesImg,
  StyledGamesImgTitle,
  StyledGamesList,
  StyledGamesListItem,
  StyledCommentWrapper,
  StyledCommentButton,
  StyledCommentCount,
  StyledCountWrapper,
} from "./styled";
import { default as CommentsIcon } from "../../Static/icons/chat.svg";

export const GamesList = ({
  games,
  commentCounts,
  handleOpenCommentModal,
}) => {
  return (
      <StyledGamesList>
        {games.map(({ _id, commonGameName, gameImage }) => (
          <StyledGamesListItem key={_id}>
            <StyledGamesImg src={gameImage} alt={commonGameName} />
            <StyledGamesImgTitle>{commonGameName}</StyledGamesImgTitle>
            <StyledCommentWrapper>
              <StyledCommentButton onClick={() => handleOpenCommentModal(_id)}>
                <CommentsIcon />
                {commentCounts[_id] ? (
                  <StyledCountWrapper>
                    <StyledCommentCount>
                      {commentCounts[_id]}
                    </StyledCommentCount>
                  </StyledCountWrapper>
                ) : null}
              </StyledCommentButton>
            </StyledCommentWrapper>
          </StyledGamesListItem>
        ))}
      </StyledGamesList>
  );
};
