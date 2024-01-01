import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  APP_BASE_URL,
  getQuestionByQuestionId,
  saveViewerResponse,
} from "../service/api";
import { Snackbar, TextField, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const SendResponse = () => {
  const [userResponse, setUserResponse] = useState("");
  const [question, setQuestion] = useState();
  const [open, setOpen] = useState(false);
  const [responseReplyURL, setResponseReplyURL] = useState();

  const navigate = useNavigate();

  const { userId, questionId } = useParams();

  useEffect(() => {
    getQuestionByQuestionId({ questionId })
      .then((response) => setQuestion(response.data.question))
      .catch((error) => console.log(error));
  }, []);

  const handleUserInput = (event) => {
    setUserResponse(event.target.value);
  };

  const onSubmitResponse = (event) => {
    event.preventDefault();
    userResponse !== "" &&
      saveViewerResponse({ userId, questionId, response: userResponse })
        .then((response) => {
          setUserResponse("");
          setOpen(true);
          setResponseReplyURL(
            createGetResponseReplyURL(response.data.responseId)
          );
        })
        .catch((error) => console.log(error));
  };

  const createGetResponseReplyURL = (responseId) => {
    return `${APP_BASE_URL}${responseId}/${questionId}`;
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
    <div className="p-3 dashboard-container">
      <h1>send response</h1>
      <p>its completely anonymous...🕵️🕵️🕵️</p>
      <div className="w-100">
        <b className="mx-2">❓ {question}</b>
        <form onSubmit={onSubmitResponse} className="d-flex flex-column mt-4">
          <TextField
            id="response"
            label="response"
            multiline
            maxRows={4}
            onChange={handleUserInput}
            required
            value={userResponse}
          />
          <button className="btni p-2 mt-3" type="submit">
            submit
          </button>
          <button
            className="btni p-2 mt-3"
            style={{ background: "rgb(0,0,255,0.7)", color: "white" }}
            onClick={() => navigate("/")}
          >
            get your own anonify link
          </button>
        </form>
        {/* <div className="mt-4">
          {responseReplyURL && (
            <div>
              <b>you can see the reply to your response here on this URL...</b>
              <p>{responseReplyURL}</p>
            </div>
          )}
        </div> */}
      </div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        message="response sent..."
        action={action}
      />
    </div>
  );
};

export default SendResponse;
