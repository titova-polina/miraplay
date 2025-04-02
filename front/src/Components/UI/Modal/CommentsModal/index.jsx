import {
  StyledCloseWrapper,
  StyledCommentDate,
  StyledCommentForm,
  StyledCommentInput,
  StyledCommentLabel,
  StyledCommentSendBtn,
  StyledCommentsList,
  StyledCommentsListItem,
  StyledCommentText,
  StyledCommentTitle,
  StyledCommentUser,
  StyledModalContent,
} from "./styled";
import { default as CloseIcon } from "../../../../Static/icons/x-altx-alt.svg";
import { default as SendIcon } from "../../../../Static/icons/send.svg";
import { getGameComments, sendComment } from "../../../../API";
import { useCallback, useEffect, useState } from "react";
import { ErrorModal } from "../ErrorModal";
import { useSocket } from "../../../../Socket";
import { INCOMMING_MESSAGES } from "../../../../Socket/constants";
import { Loader } from "../../Preloader";

export const CommentsModal = ({ gameId, onClose }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [error, setError] = useState("");

  const { subscribe, unsubscribe } = useSocket();

  useEffect(() => {
    subscribe({
      event: INCOMMING_MESSAGES.game_comments_updated,
      id: gameId,
      cb: (data) => setComments(data),
    });

    return () => {
      unsubscribe(gameId);
    };
  }, [subscribe, unsubscribe, gameId]);

  const onChangeText = (e) => {
    setText(e.target.value);
  };

  const fetchComments = useCallback(async () => {
    if (gameId) {
      setIsLoadingComments(true);
      try {
        const { data } = await getGameComments(gameId);
        setComments(data?.comments || []);
      } finally {
        setIsLoadingComments(false);
      }
    }
  }, [gameId]);

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      const { data } = await sendComment(text, gameId);
      if (data.status === "success") {
        fetchComments();
        setText("");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Щось пішло не так. Спробуйте пізніше"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return (
    <>
      <StyledModalContent>
        <StyledCloseWrapper onClick={onClose}>
          <CloseIcon />
        </StyledCloseWrapper>
        <StyledCommentTitle>Коментарі</StyledCommentTitle>
        <StyledCommentsList>
          {comments.map(({ _id, user, text, created }) => (
            <StyledCommentsListItem key={_id}>
              <StyledCommentUser>{user.email}</StyledCommentUser>
              <StyledCommentText>{text}</StyledCommentText>
              <StyledCommentDate>
                {new Date(created).toLocaleTimeString("ua", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </StyledCommentDate>
            </StyledCommentsListItem>
          ))}
        </StyledCommentsList>
        <StyledCommentForm>
          <StyledCommentLabel>
            <StyledCommentInput
              value={text}
              placeholder="Залиште коментар..."
              onChange={onChangeText}
            />
          </StyledCommentLabel>
          <StyledCommentSendBtn
            onClick={handleSend}
            disabled={isLoading || isLoadingComments || !text}
          >
            <SendIcon />
          </StyledCommentSendBtn>
        </StyledCommentForm>
        {isLoading ? <Loader loading={isLoading} /> : null}
      </StyledModalContent>
      <ErrorModal message={error} setMessage={setError} />
    </>
  );
};
