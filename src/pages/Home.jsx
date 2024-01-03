import { useEffect, useState } from "react";
import {
  checkUserNameExists,
  generatingPinForUser,
  getAllQuestionsByUser,
  gettingUserBasedOnPin,
} from "../service/api";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { HashLoader } from "react-spinners";
import icon from "../graphics/icon.png";

const Home = () => {
  const [username, setUsername] = useState("");
  const [loginDetails, setLoginDetails] = useState({});
  const [usernameExists, setUsernameExists] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [wrongCredentials, setWrongCredentials] = useState(false);
  const [styles, setStyles] = useState({
    top: 100,
    fontSize: 50,
    topText: -10,
  });
  const [popup, setPopup] = useState(0);

  const navigate = useNavigate();

  const handleUserInput = (event) => {
    setUsername(event.target.value);
  };

  const handleLoginUserInput = (event) => {
    setWrongCredentials(false);
    setLoginDetails({
      ...loginDetails,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmitUserName = (event) => {
    event.preventDefault();
    if (username !== "") {
      setIsLoading(true);
      checkUserNameExists({ username }).then((response) => {
        setUsernameExists(response.data.exists);
        setIsLoading(false);
        !response.data.exists &&
          generatingPinForUser({ username })
            .then((res) => {
              setIsLoading(false);
              navigate("/dashboard", {
                state: {
                  pin: res.data.pin,
                  userId: res.data.userId,
                  username: res.data.username,
                },
              });
            })
            .catch((error) => {
              setIsLoading(false);
              console.log(error);
            });
      });
    }
  };

  const handleLogin = (event) => {
    event.preventDefault();
    setIsLoading(true);
    loginDetails &&
      gettingUserBasedOnPin(loginDetails)
        .then((response) => {
          setIsLoading(false);
          navigate("/dashboard", { state: response.data });
        })
        .catch((error) => {
          setIsLoading(false);
          setWrongCredentials(true);
          console.log(error);
        });
  };

  const handleClick = (popupId) => {
    setStyles({ top: 10, fontSize: 25, topText: -35 });
    setPopup(popupId);
  };

  return (
    <div>
      <div className="master-containeri">
        <div className="containeri">
          <h1
            className="texti"
            style={{
              top: `${styles.topText}%`,
              fontSize: `${styles.fontSize}px`,
            }}
            onClick={() => setStyles({ top: 100, fontSize: 50, topText: -10 })}
          >
            <span>
              <img className="icon" src={icon} height={50} />
            </span>
            anonify
          </h1>
          <br />
          <button
            className="btni mb-2 p-3 w-50"
            // id="desk-btn"
            onClick={() => handleClick(0)}
          >
            new user??
          </button>
          <button
            className="btni p-3 w-50"
            //   id="desk-btn"
            onClick={() => handleClick(1)}
          >
            existing user??
          </button>
        </div>

        <div className="form-containeri p-5" style={{ top: `${styles.top}%` }}>
          {popup === 0 && (
            <form className="formi" onSubmit={onSubmitUserName}>
              <p
                className="font-weight-bold"
                style={{ marginBottom: 30, fontSize: 25 }}
              >
                new user??? claim your user name and get started...
              </p>
              <div style={{ display: "flex" }}>
                <div className="mb-2">
                  <TextField
                    required
                    id="outlined-required"
                    label="username"
                    onChange={handleUserInput}
                  />
                  {usernameExists && (
                    <p className="text-danger">
                      username already in use!!!🥲🥲🥲
                    </p>
                  )}
                </div>
              </div>
              <button
                className="btni p-3 w-50 d-flex justify-content-center align-items-center"
                type="submit"
              >
                {isLoading ? (
                  <HashLoader size={35} color="#000000" />
                ) : (
                  "letss goo"
                )}
              </button>
              <button
                onClick={() => setPopup(1)}
                className="btni mt-5 p-2 px-5"
                style={{ background: "rgb(0,255,0,0.4)" }}
              >
                already a user???
              </button>
            </form>
          )}
          {popup === 1 && (
            <form className="formi" onSubmit={handleLogin}>
              <p
                className="font-weight-bold"
                style={{ marginBottom: 30, fontSize: 25 }}
              >
                already a user login using your PIN
              </p>
              <div style={{ display: "flex" }}>
                <span>&#9821;</span>
                <TextField
                  required
                  label="username"
                  name="username"
                  className="mb-4"
                  onChange={handleLoginUserInput}
                />
              </div>
              <div style={{ display: "flex" }}>
                <span>&#9797;</span>
                <TextField
                  required
                  label="pin"
                  name="pin"
                  className="mb-4"
                  onChange={handleLoginUserInput}
                  type="password"
                />
              </div>

              <button className="btni p-3 w-50" type="submit">
                {isLoading ? (
                  <HashLoader size={35} color="#000000" />
                ) : (
                  "letss goo"
                )}
              </button>
              {wrongCredentials && (
                <p className="text-danger mt-1">invalid credentials!!!</p>
              )}
              <button
                onClick={() => setPopup(0)}
                className="btni mt-5 p-2 px-5"
                style={{ background: "rgb(0,255,0,0.4)" }}
              >
                new user???
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
