import InsertLinkIcon from "@mui/icons-material/InsertLink";
import CloseIcon from "@mui/icons-material/Close";
import { useRef, useState } from "react";
import { IconButton, Snackbar } from "@mui/material";
import { toBlob } from "html-to-image";
import { APP_BASE_URL } from "../service/api";
import bg0 from "../graphics/bg0.jpg";
import bg1 from "../graphics/bg1.png";
import bg2 from "../graphics/bg2.jpg";
import bg3 from "../graphics/bg3.jpg";
import bg4 from "../graphics/bg4.jpg";
import bg5 from "../graphics/bg5.jpg";
import bg6 from "../graphics/bg6.jpg";
import bg7 from "../graphics/bg7.jpg";
import bg8 from "../graphics/bg8.jpg";
import bg9 from "../graphics/bg9.jpg";
import bg10 from "../graphics/bg10.jpg";

const ShareResponse = ({ userId, questionId, question, selectedResponse }) => {
  const bgProps = [
    {
      bg: bg0,
      color: "white",
    },
    {
      bg: bg1,
      color: "white",
    },
    {
      bg: bg2,
      color: "white",
    },
    {
      bg: bg3,
      color: "white",
    },
    {
      bg: bg4,
      color: "white",
    },
    {
      bg: bg5,
      color: "white",
    },
    {
      bg: bg6,
      color: "white",
    },
    {
      bg: bg7,
      color: "white",
    },
    {
      bg: bg8,
      color: "white",
    },
    {
      bg: bg9,
      color: "white",
    },
    {
      bg: bg10,
      color: "white",
    },
  ];
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [bgImg, setBgImg] = useState(bgProps[0].bg);

  const link = `${APP_BASE_URL}${userId}/${questionId}`;

  const [themeColor, setThemeColor] = useState({
    background: "#FFCCC3",
    text: "#FFFFFF",
  });

  const questionsRef = useRef();
  const fileRef = useRef();

  const handleColorChange = (e) => {
    setThemeColor({ ...themeColor, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setBgImg(URL.createObjectURL(e.target.files[0]));
  };

  const handleCopyQuestionLink = () => {
    navigator.clipboard.writeText(link);
    setSnackbarMessage("copied link: " + link);
    setOpen(true);
  };

  const handleBgChange = (index) => {
    setBgImg(bgProps[index].bg);
  };

  const openFullscreen = () => {
    var elem = document.getElementById("preview");
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen();
    }
  };

  const handleShare = async () => {
    handleCopyQuestionLink();
    const newFile = await toBlob(questionsRef.current);
    const data = {
      files: [
        new File([newFile], "anonify.png", {
          type: newFile.type,
        }),
      ],
      title: "anonify",
      text: link,
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
      <h1>share your response</h1>
      <div
        style={{
          maxHeight: window.innerHeight - 200,
          overflow: "auto",
        }}
      >
        <div className="d-flex mt-5 flex-column">
          <div className="d-flex flex-column">
            <div
              className="d-flex"
              style={{ maxWidth: 500, overflowY: "auto" }}
            >
              {bgProps.map((bgProp, key) => (
                <div
                  onClick={() => handleBgChange(key)}
                  key={key}
                  style={{
                    backgroundImage: `url(${bgProp.bg})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    width: 100 * (9 / 16),
                    height: 100,
                  }}
                ></div>
              ))}
            </div>
            <div className="mx-2">
              <p>
                upload a <b>background pic</b>
              </p>
              <input
                type="file"
                className="w-100 btn"
                onChange={handleFileChange}
                name="text"
                style={{ display: "none" }}
                ref={fileRef}
                accept="image/*"
              />
              {!bgImg ? (
                <button
                  className="btni w-100"
                  style={{ background: "rgb(0,0,255,0.2)", color: "white" }}
                  onClick={() => fileRef.current.click()}
                >
                  upload
                </button>
              ) : (
                <button
                  className="btni w-100"
                  style={{ background: "rgb(255,0,0,0.7)", color: "white" }}
                  onClick={() => setBgImg(undefined)}
                >
                  remove background
                </button>
              )}
            </div>
          </div>
          <div className="mt-5">
            <b>tap below image for preview</b>
            <div
              onClick={openFullscreen}
              className="d-flex flex-column align-items-center p-4 justify-content-center"
              style={
                bgImg
                  ? {
                      backgroundImage: `url(${bgImg})`,
                      backgroundSize: "cover",
                    }
                  : {
                      background: themeColor.background,
                    }
              }
            >
              <h3 style={{ color: themeColor.text }}>{selectedResponse}</h3>
              <div
                className="rounded px-4 mt-3"
                style={{
                  background: "rgb(255,255,255,0.3)",
                  height: 50,
                  width: 200,
                }}
              >
                {" "}
                <b className="d-flex m-2 rounded">your reply here</b>
              </div>
            </div>
          </div>
        </div>
        <button
          className="btni mt-4 p-3 w-100 h-100"
          style={{ background: "rgb(0,105,218,0.7)", color: "white" }}
          onClick={handleShare}
        >
          share it on your story
        </button>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={() => setOpen(false)}
          message={snackbarMessage}
          action={action}
        />
        <div className="preview">
          <div
            ref={questionsRef}
            className="d-flex flex-column align-items-center p-4 justify-content-center"
            id="preview"
            style={
              bgImg
                ? {
                    backgroundImage: `url(${bgImg})`,
                    backgroundSize: "100% 100%",
                    position: "relative",
                    height: window.innerHeight,
                  }
                : {
                    background: themeColor.background,
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                  }
            }
          >
            <div
              className="d-flex flex-column align-items-center p-4 justify-content-center rounded mb-5"
              style={{ background: "rgb(0,0,0,0.7)" }}
            >
              <h3 style={{ color: themeColor.text }}>{selectedResponse}</h3>
              <div
                className="rounded px-4 mt-3"
                style={{
                  background: "rgb(255,255,255,0.3)",
                  height: 100,
                  width: 200,
                }}
              ></div>
            </div>
            <span
              className="mt-5 p-3 rounded"
              style={{
                color: themeColor.text,
                background: "rgb(0,0,0,0.9)",
                position: "absolute",
                bottom: 200,
                fontSize: 25,
              }}
            >
              powered by <b>Anonify.in</b>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareResponse;
