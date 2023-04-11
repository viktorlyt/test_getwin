import { Formik, Form, Field } from "formik";
import { Schema } from "./schema";
import { SchemaLogin } from "./schemaLogin";
import { MyFormValues, MyFormValuesLogin } from "./types";
import "./Register.css";
import listIcon from "../../assets/images/listIcon.svg";
import work from "../../assets/images/work.png";
import keyIcon from "../../assets/images/keyIcon.svg";
import eyeIcon from "../../assets/images/eyeIcon.svg";
import eyeOpen from "../../assets/images/eyeOpen.svg";
import google from "../../assets/images/google.svg";
import fb from "../../assets/images/fb.svg";
import linkedIn from "../../assets/images/linkedIn.svg";
import { useState } from "react";
import axios from "axios";

function Register() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const [activeTabLogin, setActiveTabLogin] = useState(false);
  const [activeTabReg, setActiveTabReg] = useState(true);

  const data: MyFormValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const dataLogin: MyFormValuesLogin = {
    email: "",
    password: "",
  };

  const handleActiveTabLogin = () => {
    setActiveTabLogin(true);
    setActiveTabReg(false);
  };

  const handleActiveTabReg = () => {
    setActiveTabLogin(false);
    setActiveTabReg(true);
  };

  const handleSubmit = () => {
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement)
      .value;
    const confirmPassword = (
      document.getElementById("confirmPassword") as HTMLInputElement
    ).value;

    if (password !== confirmPassword) {
      alert("Passwords are different!");

      return;
    }

    const newUser = {
      email,
      password,
      ref: "link[http://example.com]",
    };

    axios
      .post(
        "https://api.prof.world/v2.0/profile/registration/",
        JSON.stringify(newUser)
      )
      .then((res) => {
        localStorage.setItem("token", res.data.user_data.token);
      });

    const token = localStorage.getItem('token');

    axios
      .get(
        `https://api.prof.world/v2.0/profile/confirmEmail/?data={"token":"${token}","ref":"url"}`)
      .then((res) => {
        console.log(res.data);
      });

    (document.getElementById("form") as HTMLFormElement).reset();
  };

  const handleSubmitLogin = () => {
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement)
      .value;

    const User = {
      email,
      password,
    };

    axios
      .post(
        "https://api.prof.world/v2.0/profile/loginUser/",
        JSON.stringify(User)
      )
      .then((res) => {
        localStorage.setItem("token", res.data.user_data.token);
      });

    (document.getElementById("form") as HTMLFormElement).reset();
  };

  return (
    <>
      <main className="main">
        <section className="section1">
          <div className="content">
            <div className="content__next">
              <h1 className="title">Войти в аккаунт</h1>
              <p className="description">
                Введите ваш E-mail и пароль, чтобы начать использовать все
                преимущества платформы:
              </p>
            </div>
            <div className="steps">
              <div className="steps__next">
                <div className="step">
                  <img src={listIcon} alt="listIcon" className="listIcon"></img>
                  <p className="listP">Автоматизация HR</p>
                </div>
                <div className="step">
                  <img src={listIcon} alt="listIcon" className="listIcon"></img>
                  <p className="listP">Оценка персонала</p>
                </div>
                <div className="step">
                  <img src={listIcon} alt="listIcon" className="listIcon"></img>
                  <p className="listP">Безопасность данных</p>
                </div>
                <div className="step">
                  <img src={listIcon} alt="listIcon" className="listIcon"></img>
                  <p className="listP">Мультиязычность</p>
                </div>
              </div>
              <div className="steps__next">
                <div className="step">
                  <img src={listIcon} alt="listIcon" className="listIcon"></img>
                  <p className="listP">Интеграция с job-порталами</p>
                </div>
                <div className="step">
                  <img src={listIcon} alt="listIcon" className="listIcon"></img>
                  <p className="listP">Синхронизация с Outlook</p>
                </div>
                <div className="step">
                  <img src={listIcon} alt="listIcon" className="listIcon"></img>
                  <p className="listP">Парсинг резюме</p>
                </div>
                <div className="step">
                  <img src={listIcon} alt="listIcon" className="listIcon"></img>
                  <p className="listP">Конструктор отчетности</p>
                </div>
              </div>
            </div>
          </div>
          <img src={work} className="work" alt="work"></img>
        </section>

        <section className="section2">
          <select name="langs" id="langs" className="langs">
            <option label="En" value="eng">
              En
            </option>
            <option label="Ру" value="rus">
              Ру
            </option>
            <option label="Укр" value="ukr">
              Укр
            </option>
          </select>

          <div className="contentRight">
            <div className="menu">
              <div className="tab" onClick={handleActiveTabLogin}>
                <p>Вход</p>
                {activeTabLogin ? <div className="bottomLine"></div> : null}
              </div>
              <div className="tab" onClick={handleActiveTabReg}>
                <p>Регистрация</p>
                {activeTabReg ? <div className="bottomLine"></div> : null}
              </div>
            </div>

            {activeTabReg ? (
              <Formik
                initialValues={data}
                validationSchema={Schema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched }) => (
                  <Form id="form" className="form">
                    <label className="form__label" htmlFor="email">
                      E-mail
                    </label>
                    <Field
                      className={
                        errors.email ? "form__input errorInput" : "form__input"
                      }
                      name="email"
                      type="email"
                      id="email"
                      placeholder="Адрес эл. почты"
                    />
                    {errors.email && touched.email ? (
                      <div className="error">{errors.email}</div>
                    ) : null}
                    <label className="form__label" htmlFor="password">
                      Придумайте пароль
                    </label>
                    <div className="inputWithIcon">
                      <Field
                        className={
                          errors.password
                            ? "form__input errorInput"
                            : "form__input"
                        }
                        name="password"
                        type={passwordShown ? "text" : "password"}
                        id="password"
                        placeholder="Укажите ваш пароль"
                      />
                      <img src={keyIcon} alt="keyIcon" className="keyIcon" />
                      {!passwordShown ? (
                        <img
                          src={eyeIcon}
                          alt="eyeIcon"
                          className="eyeIcon"
                          onClick={(e) => setPasswordShown(!passwordShown)}
                        />
                      ) : null}
                      {passwordShown ? (
                        <img
                          src={eyeOpen}
                          alt="eyeOpen"
                          className="eyeOpen"
                          onClick={(e) => setPasswordShown(!passwordShown)}
                        />
                      ) : null}
                    </div>
                    {errors.password && touched.password ? (
                      <div className="error">{errors.password}</div>
                    ) : null}
                    <label className="form__label" htmlFor="confirmPassword">
                      Повторите пароль
                    </label>
                    <div className="inputWithIcon">
                      <Field
                        className={
                          errors.confirmPassword
                            ? "form__input errorInput"
                            : "form__input"
                        }
                        name="confirmPassword"
                        type={confirmPasswordShown ? "text" : "password"}
                        id="confirmPassword"
                        placeholder="Повторите ваш пароль"
                      />
                      {!confirmPasswordShown ? (
                        <img
                          src={eyeIcon}
                          alt="eyeIcon"
                          className="eyeIcon"
                          onClick={(e) =>
                            setConfirmPasswordShown(!confirmPasswordShown)
                          }
                        />
                      ) : null}
                      {confirmPasswordShown ? (
                        <img
                          src={eyeOpen}
                          alt="eyeOpen"
                          className="eyeOpen"
                          onClick={(e) =>
                            setConfirmPasswordShown(!confirmPasswordShown)
                          }
                        />
                      ) : null}
                    </div>
                    {errors.confirmPassword && touched.confirmPassword ? (
                      <div className="error">{errors.confirmPassword}</div>
                    ) : null}
                    <input
                      className="form__button form__submit"
                      type="submit"
                      value="Зарегистрироваться"
                    />
                  </Form>
                )}
              </Formik>
            ) : null}

            {activeTabLogin ? (
              <Formik
                initialValues={dataLogin}
                validationSchema={SchemaLogin}
                onSubmit={handleSubmitLogin}
              >
                {({ errors, touched }) => (
                  <Form id="form" className="form">
                    <label className="form__label" htmlFor="email">
                      E-mail
                    </label>
                    <Field
                      className={
                        errors.email ? "form__input errorInput" : "form__input"
                      }
                      name="email"
                      type="email"
                      id="email"
                      placeholder="Адрес эл. почты"
                    />
                    {errors.email && touched.email ? (
                      <div className="error">{errors.email}</div>
                    ) : null}
                    <label className="form__label" htmlFor="password">
                      Введите пароль
                    </label>
                    <div className="inputWithIcon">
                      <Field
                        className={
                          errors.password
                            ? "form__input errorInput"
                            : "form__input"
                        }
                        name="password"
                        type={passwordShown ? "text" : "password"}
                        id="password"
                        placeholder="Укажите ваш пароль"
                      />
                      <img src={keyIcon} alt="keyIcon" className="keyIcon" />
                      {!passwordShown ? (
                        <img
                          src={eyeIcon}
                          alt="eyeIcon"
                          className="eyeIcon"
                          onClick={(e) => setPasswordShown(!passwordShown)}
                        />
                      ) : null}
                      {passwordShown ? (
                        <img
                          src={eyeOpen}
                          alt="eyeOpen"
                          className="eyeOpen"
                          onClick={(e) => setPasswordShown(!passwordShown)}
                        />
                      ) : null}
                    </div>
                    {errors.password && touched.password ? (
                      <div className="error">{errors.password}</div>
                    ) : null}
                    <input
                      className="form__button form__submit"
                      type="submit"
                      value="Войти"
                    />
                  </Form>
                )}
              </Formik>
            ) : null}

            <div className="contentLines">
              <div className="line"></div>
              <p className="lineText">Или войдите с помощью</p>
              <div className="line"></div>
            </div>

            <div className="social">
              <a href="https://www.google.com/" className="socialLink">
                <button className="social__button">
                  <img src={google} className="google" alt="google" />
                </button>
              </a>
              <a href="https://www.facebook.com/" className="socialLink">
                <button className="social__button">
                  <img src={fb} className="fb" alt="fb" />
                </button>
              </a>
              <a href="https://www.linkedin.com/" className="socialLink">
                <button className="social__button">
                  <img src={linkedIn} className="linkedIn" alt="linkedIn" />
                </button>
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Register;
