import { useCallback, useEffect, useRef, useState } from "react";
import {
  fetchAllGames,
  fetchGamesByPage,
  getGamesCommentsCounts,
  PER_PAGE,
} from "../../API";
import {
  StyledGamesContent,
  StyledGamesTitle,
  StyledAllGamesWrapper,
  StyledLoadMoreBtn,
} from "./styled";
import { Loader } from "../../Components/UI/Preloader";
import { useSelector } from "react-redux";
import { getUserData } from "../../Redux/Actions";
import { CommentsModal } from "../../Components/UI/Modal/CommentsModal";
import { Modal } from "../../Components/UI/Modal";
import { GamesList } from "./GamesList";
import { GamesFilter } from "./GamesFilter";
import { useSocket } from "../../Socket";
import { INCOMMING_MESSAGES } from "../../Socket/constants";

const GamesPage = () => {
  const [popularGames, setPopularGames] = useState([]);
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [fresh, setFresh] = useState(true);
  const [genre, setGenere] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingPopular, setLoadingPopular] = useState(false);
  const [total, setTotal] = useState(0);
  const [showCommentModal, setShowCommentModal] = useState(null);
  const [commentCounts, setCommentCounts] = useState({});
  const [usersOnline, setUsersOnline] = useState(0);

  const handleOpenCommentModal = (gameId) => setShowCommentModal(gameId);

  const onHideCommentModal = useCallback(() => setShowCommentModal(null), []);

  const user = useSelector(getUserData);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const loadPopularGames = useCallback(async () => {
    setLoadingPopular(true);
    try {
      const { data } = await getGamesCommentsCounts();
      setCommentCounts(
        (data?.comments || []).reduce((acc, { _id, count }) => {
          acc[_id] = count;
          return acc;
        }, {})
      );
      const games = await fetchAllGames();
      setPopularGames(games.filter(({ inTop }) => inTop));
    } finally {
      setLoadingPopular(false);
    }
  }, []);

  const loadGames = useCallback(async () => {
    setLoading(true);
    try {
      const { games, gamesListLength } = await fetchGamesByPage({
        page,
        isFreshGamesFirst: fresh,
        genre,
      });
      setGames(games);
      setTotal(gamesListLength);
    } finally {
      setLoading(false);
    }
  }, [genre, fresh, page]);

  const loadingRef = useRef(loading);
  loadingRef.current = loading;

  useEffect(() => {
    loadPopularGames();
  }, [loadPopularGames]);

  useEffect(() => {
    if (!loadingRef.current) {
      loadGames();
    }
  }, [loadGames]);

  const { subscribe, unsubscribe } = useSocket();

  useEffect(() => {
    subscribe({
      event: INCOMMING_MESSAGES.game_comments_updated,
      id: "games_list",
      cb: (data) => {
        if (data.length) {
          setCommentCounts((prev) => ({
            ...prev,
            [data[0].game]: data.length,
          }));
        }
      },
    });

    subscribe({
      event: INCOMMING_MESSAGES.user_count,
      id: "games_list_page",
      cb: (data) => setUsersOnline(data || 0),
    });

    return () => {
      unsubscribe("games_list");
      unsubscribe("game_list_page");
    };
  }, [subscribe, unsubscribe]);

  const handleChangeGenre = (nextGenre) => {
    if (genre === nextGenre || nextGenre === "ALL") {
      setGenere(false);
    } else {
      setGenere(nextGenre);
    }
  };

  const handleChangeSort = (isFresh) => {
    setFresh(isFresh);
  };

  return user ? (
    <>
      <StyledGamesContent>
        <div>
          <StyledGamesTitle>ОНЛАЙН: {usersOnline}</StyledGamesTitle>
        </div>
        <div>
          <StyledGamesTitle>ПОПУЛЯРНІ</StyledGamesTitle>
          <GamesList
            games={popularGames}
            handleOpenCommentModal={handleOpenCommentModal}
            commentCounts={commentCounts}
          />
        </div>
        <StyledAllGamesWrapper>
          <StyledGamesTitle>ВСІ ІГРИ</StyledGamesTitle>
          <GamesFilter
            genre={genre}
            fresh={fresh}
            handleChangeGenre={handleChangeGenre}
            handleChangeSort={handleChangeSort}
          />
          <GamesList
            games={games}
            handleOpenCommentModal={handleOpenCommentModal}
            commentCounts={commentCounts}
          />
          {loading ? <Loader loading={loading || loadingPopular} /> : null}
          {PER_PAGE * page < total && (
            <StyledLoadMoreBtn onClick={handleLoadMore}>
              ПОКАЗАТИ ЩЕ
            </StyledLoadMoreBtn>
          )}
        </StyledAllGamesWrapper>
      </StyledGamesContent>

      <Modal show={!!showCommentModal} onHide={onHideCommentModal}>
        <CommentsModal gameId={showCommentModal} onClose={onHideCommentModal} />
      </Modal>
    </>
  ) : null;
};

export default GamesPage;
