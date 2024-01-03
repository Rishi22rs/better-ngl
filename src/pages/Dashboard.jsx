import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  APP_BASE_URL,
  getAllQuestionsByUser,
  getAllResponseByViewer,
} from "../service/api";
import Questions from "../components/Questions";
import { Avatar, IconButton } from "@mui/material";
import Responses from "../components/Responses";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CancelIcon from "@mui/icons-material/Cancel";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ShareIcon from "@mui/icons-material/Share";
import HowToShare from "../components/HowToShare";
import ShareStyles from "../components/ShareStyles";
import ShareResponse from "../components/ShareResponse";
import { HashLoader } from "react-spinners";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [styles, setStyles] = useState({
    top: 100,
    fontSize: 50,
    topText: -10,
  });
  const [questionList, setQuestionList] = useState();
  const [selectedQuestion, setSelectedQuestion] = useState();
  const [responseList, setResponseList] = useState();
  const [selectedPopup, setSelectedPopup] = useState();
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [selectedResponse, setSelectedResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (location.state === null) {
      navigate("/");
      return;
    }
    handleGetAllQuestionsByUser();
  }, []);

  const handleOpen = (selected) => {
    setSelectedPopup(selected);
    setStyles({ top: 10, fontSize: 25, topText: -35 });
  };

  const handleClose = () => {
    setStyles({
      top: 100,
      fontSize: 50,
      topText: -10,
    });
    setSelectedPopup(-1);
  };

  const handleGetAllQuestionsByUser = () => {
    setIsLoading(true);
    getAllQuestionsByUser({
      userId: location.state.userId,
      pin: location.state.pin,
    })
      .then((response) => {
        setIsLoading(false);
        setQuestionList(response.data);
      })
      .catch((error) => {
        isLoading(false);
        console.log(error);
      });
  };

  const handleQuestionClick = (question) => {
    setSelectedQuestion(question.question);
    getAllResponseByViewer({
      userId: location.state.userId,
      questionId: question.questionId,
    })
      .then((response) => {
        setResponseList(response.data);
        handleOpen(1);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCopyQuestionLink = (questionId) => {
    const link = `${APP_BASE_URL}${location.state.userId}/${questionId}`;
    navigator.clipboard.writeText(link);
    setSnackbarMessage("Copied the link: " + link);
    setOpen(true);
  };

  const handleLogout = () => {
    navigate("/");
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => setOpen(false)}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <div>
      <div className="dashboard-container p-4">
        <div className="d-flex justify-content-between">
          <h1>anonify</h1>
          <Avatar
            sx={{ bgcolor: "rgb(0,105,218,0.7)" }}
            onClick={() => handleOpen(3)}
          >
            {location.state.username[0]}
          </Avatar>
        </div>
        <hr />
        {location.state !== null && <h4>welcome {location.state.username}</h4>}
        {location.state !== null && (
          <p className="d-flex- justify-content-center">
            <b className="font-weight-bold ">pin: ****</b>
            <VisibilityIcon className="mx-2" onClick={() => handleOpen(2)} />
            {`Remember this while logging in.`}
          </p>
        )}
        {isLoading && <HashLoader size={35} color="#000000" />}
        {questionList && questionList.length === 0 ? (
          <b>no QnA asked</b>
        ) : (
          <b>already asked QnA</b>
        )}
        <div
          className="mt-4"
          style={{
            maxHeight: window.innerHeight - 400,
            overflowY: "auto",
          }}
        >
          {questionList &&
            questionList.map((question, key) => (
              <div
                className="list mb-2 px-4 p-1 pb-3 d-flex align-items-center justify-content-between"
                key={key}
              >
                <span onClick={() => handleQuestionClick(question)}>
                  {question.question}
                </span>
                <div>
                  <span
                    onClick={() => {
                      setSelectedQuestion(question);
                      handleOpen(5);
                    }}
                  >
                    <ShareIcon />
                  </span>
                  <span
                    onClick={() => handleCopyQuestionLink(question.questionId)}
                  >
                    <ContentCopyIcon />
                  </span>
                </div>
              </div>
            ))}
        </div>
        <button className="btni mt-4 p-3 w-100" onClick={() => handleOpen(0)}>
          ask a QnA
        </button>
        <button
          className="btni mt-4 p-3 w-100"
          style={{ background: "rgb(0,105,218,0.7)" }}
          onClick={() => handleOpen(4)}
        >
          how to share QnA
        </button>
      </div>
      <div
        className="dashboard-form-container p-4"
        style={{ top: `${styles.top}%` }}
      >
        <CancelIcon
          fontSize="large"
          style={{ position: "absolute", top: 30, right: 30 }}
          onClick={handleClose}
        />
        <div className="mt-2">
          {selectedPopup === 0 && (
            <Questions
              userId={location.state.userId}
              handleGetAllQuestionsByUser={handleGetAllQuestionsByUser}
            />
          )}
          {selectedPopup === 1 && (
            <div>
              <Responses
                setSelectedResponse={setSelectedResponse}
                setSelectedPopup={setSelectedPopup}
                responseList={responseList}
                question={selectedQuestion}
              />
            </div>
          )}
          {selectedPopup === 2 && (
            <div className="d-flex flex-column align-items-center p-5">
              <h2>{location.state.pin}</h2>
              <b>
                Do not share it with anyone and always remember this as you'll
                be needing your username and pin for login.
              </b>
            </div>
          )}
          {selectedPopup === 3 && (
            <div className="d-flex flex-column align-items-center p-5">
              <button
                style={{ background: "rgb(255,0,0,0.7)" }}
                className="btni p-3 w-50"
                onClick={handleLogout}
              >
                <b>logout???</b>
              </button>
            </div>
          )}
          {selectedPopup === 4 && <HowToShare />}
          {selectedPopup === 5 && (
            <ShareStyles
              questionId={selectedQuestion.questionId}
              question={selectedQuestion.question}
              userId={location.state.userId}
            />
          )}
          {selectedPopup === 6 && (
            <ShareResponse
              questionId={selectedQuestion.questionId}
              question={selectedQuestion.question}
              userId={location.state.userId}
              selectedResponse={selectedResponse}
            />
          )}
        </div>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={() => setOpen(false)}
          message={snackbarMessage}
          action={action}
        />
      </div>
    </div>
  );
};

export default Dashboard;
