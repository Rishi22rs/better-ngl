import { useEffect, useState } from "react";
import {
  checkUserNameExists,
  generatingPinForUser,
  getAllQuestionsByUser,
  gettingUserBasedOnPin,
} from "../service/api";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";

const Home = () => {
  const [username, setUsername] = useState("");
  const [loginDetails, setLoginDetails] = useState({});
  const [usernameExists, setUsernameExists] = useState(false);
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
    setLoginDetails({
      ...loginDetails,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmitUserName = (event) => {
    event.preventDefault();
    if (username !== "") {
      checkUserNameExists({ username }).then((response) => {
        setUsernameExists(response.data.exists);
        !response.data.exists &&
          generatingPinForUser({ username })
            .then((res) =>
              navigate("/dashboard", {
                state: {
                  pin: res.data.pin,
                  userId: res.data.userId,
                  username: res.data.username,
                },
              })
            )
            .catch((error) => console.log(error));
      });
    }
  };

  const handleLogin = (event) => {
    event.preventDefault();
    loginDetails &&
      gettingUserBasedOnPin(loginDetails)
        .then((response) => navigate("/dashboard", { state: response.data }))
        .catch((error) => console.log(error));
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
              <button className="btni p-3 w-50" type="submit">
                letss goo
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
                letss goo
              </button>
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
