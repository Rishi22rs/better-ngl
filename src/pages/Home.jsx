import { useState } from "react";
import {
  generatingPinForUser,
  getAllQuestionsByUser,
  gettingUserBasedOnPin,
} from "../service/api";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [username, setUsername] = useState("");
  const [loginDetails, setLoginDetails] = useState({});

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
    username !== "" &&
      generatingPinForUser({ username })
        .then((response) =>
          navigate("/questions", {
            state: { pin: response.data.pin, userId: response.data.userId },
          })
        )
        .catch((error) => console.log(error));
  };

  const handleLogin = (event) => {
    event.preventDefault();
    loginDetails &&
      gettingUserBasedOnPin(loginDetails)
        .then((response) => navigate("/dashboard", { state: response.data }))
        .catch((error) => console.log(error));
  };

  return (
    <div>
      <h1>Home</h1>
      <form onSubmit={onSubmitUserName}>
        <label htmlFor="username">Username</label>
        <input id="username" onChange={handleUserInput} />
        <button>Submit</button>
      </form>
      <hr />
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Username</label>
        <input name="username" id="username" onChange={handleLoginUserInput} />
        <label htmlFor="pin">Pin</label>
        <input name="pin" id="pin" onChange={handleLoginUserInput} />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Home;
