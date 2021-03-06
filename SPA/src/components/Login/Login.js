import { Link, useNavigate } from "react-router-dom";
import { onLogin } from "../../services/server";
import { AuthContexts } from "../../contexts/AuthContext";
import { useContext, useState } from "react";
import styles from "../Login/Login.module.css";
import { Errors } from "../Erorrs/Errors";
import { matchEmail } from "../../helpers/Form-Validate";

const Login = () => {
  const { userLogin } = useContext(AuthContexts);
  const [errors, setErrors] = useState({});
  const [userErr, setUserErr] = useState([]);

  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  const changeHendler = (e) => {
    setValue((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const minLength = (e, length) => {
    setErrors((state) => ({
      ...state,
      [e.target.name]: value[e.target.name].length < length,
    }));
  };

  const navigation = useNavigate();
  const formHandler = (e) => {
    e.preventDefault();
    const { email, password } = value;
    const ctx = { email, password };
    login(ctx);
    async function login(ctx) {
      try {
        let match = matchEmail(ctx.email);

        if (match === null) {
          throw new Error(
            "Email must includes @ and .  valid email (asd@sds.bg)"
          );
        }
        let user = await onLogin(ctx);
        if (user.message) {
          throw new Error(user.message);
        }

        userLogin(user);
        navigation("/catalog");
      } catch (error) {
        setUserErr(error.message);
      }
    }
  };

  return (
    <>
      <article className={styles["art"]}>
        <h1>Sing In</h1>
      </article>

      <div className={styles["signupSection"]}>
        <div className={styles["info-form"]}>
          <h2>Sign In Form.</h2>
          <i
            className={styles["icon ion-ios-ionic-outline"]}
            aria-hidden="true"
          ></i>
          <img
            className={styles["icon"]}
            src="https://3.bp.blogspot.com/-EYhzbgX3eqA/WNPf3EX0AlI/AAAAAAAAQR4/818HP3L1tYoq0f_pl3foqoqdhX5qHdcswCLcB/s1600/spider-read.jpg"
            alt="..."
          ></img>
        </div>
        <form
          action="#"
          method="POST"
          className={styles["signupForm"]}
          onSubmit={formHandler}
        >
          <ul className={styles["noBullet"]}>
            <li>
              <label htmlFor="email"></label>
              <input
                type="email"
                className={styles["inputFields"]}
                id="email"
                name="email"
                placeholder="Email: batman@red.gmail"
                value={value.email}
                onChange={changeHendler}
                onBlur={(e) => minLength(e, 8)}
              />
              {errors.email && (
                <p className={styles["error-form"]}>
                  Email should be at least 8 characters long!
                </p>
              )}
            </li>
            <li>
              <label htmlFor="password"></label>
              <input
                type="password"
                className={styles["inputFields"]}
                id="password"
                name="password"
                placeholder="Password"
                value={value.password}
                onChange={changeHendler}
                onBlur={(e) => minLength(e, 4)}
              />
              {errors.password && (
                <p className={styles["error-form"]}>
                  Password should be at least 4 characters long!
                </p>
              )}
            </li>
            <li id="center-btn">
              <button
                type="submit"
                className={styles["join-btn"]}
                name="join"
                alt=""
              >
                {" "}
                Login
              </button>
            </li>
            <li>
              <h1 className={styles["click"]}>
                For registration -
                <Link className={styles["link-form"]} to="/register">
                  click here!
                </Link>
              </h1>
            </li>
          </ul>
        </form>
      </div>
      {userErr.length > 0 && <Errors error={userErr}></Errors>}
    </>
  );
};
export default Login;
