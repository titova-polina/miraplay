import { useState } from "react";
import {
  StyledCloseWrapper,
  StyledModalButton,
  StyledModalContent,
  StyledModalForm,
  StyledModalHeader,
  StyledModalHeaderBtn,
  StyledModalInput,
  StyledModalLabel,
  StyledModalSubtitle,
  StyledModalTitle,
  StyledTextWrapper,
} from "./styled";
import { login, register } from "../../../../API";
import { useDispatch } from "react-redux";
import { setUserData } from "../../../../Redux/store";
import { default as CloseIcon } from "../../../../Static/icons/x-altx-alt.svg";
import { ErrorModal } from "../ErrorModal";
import { Loader } from "../../Preloader";

export const AuthModal = ({ onSuccess, onClose }) => {
  const [{ email, password }, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const onChangeEmail = (e) => {
    setFormData((prev) => {
      return { ...prev, email: e.target.value };
    });
  };

  const onChangePassword = (e) => {
    setFormData((prev) => {
      return { ...prev, password: e.target.value };
    });
  };

  const handleSubmit = async () => {
    const handler = isLogin ? login : register;
    setIsLoading(true);
    try {
      const { data } = await handler({ email, password });
      dispatch(
        setUserData({
          user: data.user,
          tokenAccess: data.tokenAccess,
          tokenRefresh: data.tokenRefresh,
        })
      );
      onSuccess();
    } catch (err) {
      setError(
        err.response?.data?.message || "Щось пішло не так. Спробуйте пізніше"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <StyledModalContent>
        <StyledCloseWrapper onClick={onClose}>
          <CloseIcon />
        </StyledCloseWrapper>
        <StyledModalHeader>
          <StyledModalHeaderBtn
            $active={isLogin}
            onClick={() => {
              setIsLogin(true);
            }}
          >
            ВХІД
          </StyledModalHeaderBtn>
          <StyledModalHeaderBtn
            $active={!isLogin}
            onClick={() => {
              setIsLogin(false);
            }}
          >
            РЕЄСТРАЦІЯ
          </StyledModalHeaderBtn>
        </StyledModalHeader>
        <StyledModalForm>
          <StyledTextWrapper>
            <StyledModalTitle>СПРОБУЙ НОВІ ВІДЧУТТЯ</StyledModalTitle>
            <StyledModalSubtitle>
              {isLogin ? <span>Увійдіть</span> : <span>Зареєструйтеся</span>},
              щоб грати в свої улюблені ігри на максимумі налаштувань
            </StyledModalSubtitle>
          </StyledTextWrapper>
          <StyledModalLabel>
            введіть ваш email:
            <StyledModalInput
              onChange={onChangeEmail}
              value={email}
              type="email"
              placeholder="YOUREMAIL@MIRAPLAY.COM"
              autoComplete="email"
            />
          </StyledModalLabel>
          <StyledModalLabel>
            введіть ваш пароль:
            <StyledModalInput
              onChange={onChangePassword}
              value={password}
              type="password"
              placeholder="ВАШ ПАРОЛЬ"
              autoComplete="current-password"
            />
          </StyledModalLabel>
        </StyledModalForm>
        {isLoading ? <Loader loading={isLoading} /> : null}
        <StyledModalButton onClick={handleSubmit} disabled={isLoading}>
          {isLogin ? <span>ВХІД</span> : <span>РЕЄСТРАЦІЯ</span>}
        </StyledModalButton>
      </StyledModalContent>
      <ErrorModal message={error} setMessage={setError} />
    </>
  );
};
