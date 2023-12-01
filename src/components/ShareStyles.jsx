import InsertLinkIcon from "@mui/icons-material/InsertLink";
import CloseIcon from "@mui/icons-material/Close";
import { useRef, useState } from "react";
import { IconButton, Snackbar } from "@mui/material";
import { toBlob } from "html-to-image";
import { APP_BASE_URL } from "../service/api";

const ShareStyles = ({ userId, questionId, question }) => {
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [themeColor, setThemeColor] = useState({
    background: "#FFCCC3",
    text: "#FFFFFF",
  });

  const questionsRef = useRef();

  const handleColorChange = (e) => {
    setThemeColor({ ...themeColor, [e.target.name]: e.target.value });
  };

  const handleCopyQuestionLink = () => {
    const link = `${APP_BASE_URL}${userId}/${questionId}`;
    navigator.clipboard.writeText(link);
    setSnackbarMessage("copied link: " + link);
    setOpen(true);
  };

  const handleShare = async () => {
    handleCopyQuestionLink();
    const newFile = await toBlob(questionsRef.current);
    const data = {
      files: [
        new File([newFile], "ngl2.png", {
          type: newFile.type,
        }),
      ],
      title: "ngl2",
      text: "ngl2",
    };

    try {
      if (!navigator.canShare(data)) {
        console.error("Can't share");
      }
      await navigator.share(data);
    } catch (err) {
      console.error(err);
    }
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
      <h1>preview on your story</h1>
      <div className="d-flex align-items-center mt-5 flex-column">
        <div className="d-flex">
          <div className="mx-2">
            <p>
              pick a <b>background</b> color
            </p>
            <input
              defaultValue={themeColor.background}
              type="color"
              className="w-100"
              onChange={handleColorChange}
              name="background"
            />
          </div>
          <div className="mx-2">
            <p>
              pick a <b>text</b> color
            </p>
            <input
              defaultValue={themeColor.text}
              type="color"
              className="w-100"
              onChange={handleColorChange}
              name="text"
            />
          </div>
        </div>
        <div className="mt-5">
          <div
            ref={questionsRef}
            className="d-flex flex-column align-items-center p-4"
            style={{ background: themeColor.background }}
          >
            <h3 style={{ color: themeColor.text }}>{question}</h3>
            <div
              className="rounded px-2 mt-3"
              style={{
                border: "2px dotted #7990AE",
                background: "white",
              }}
            >
              <p
                className="d-flex flex-row align-items-center"
                style={{ color: "#7990AE" }}
              >
                add your{" "}
                <span
                  className="p-1 d-flex align-items-center m-2 rounded"
                  style={{ border: "2px solid #7990AE" }}
                >
                  <InsertLinkIcon style={{ transform: "rotate(-45deg)" }} />
                  link
                </span>
                here
              </p>
            </div>
          </div>
        </div>
      </div>
      <button
        className="btni mt-4 p-3 w-100"
        style={{ background: "rgb(0,105,218,0.7)", color: "white" }}
        onClick={handleShare}
      >
        share it on your story
      </button>
      <hr />
      <button className="btni p-3 w-100" onClick={handleCopyQuestionLink}>
        tap her to copy link and share your QnA anywhere
      </button>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        message={snackbarMessage}
        action={action}
      />
    </div>
  );
};

export default ShareStyles;
