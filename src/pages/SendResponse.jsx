import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuestionByQuestionId, saveViewerResponse } from "../service/api";
import { Snackbar, TextField, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const SendResponse = () => {
  const [userResponse, setUserResponse] = useState("");
  const [question, setQuestion] = useState();
  const [open, setOpen] = useState(false);
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
        })
        .catch((error) => console.log(error));
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
    <div className="p-3">
      <h1>send Response</h1>
      <div className="w-100">
        <form onSubmit={onSubmitResponse} className="d-flex flex-column mt-5">
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
        </form>
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
