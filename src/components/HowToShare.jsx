import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import Face3Icon from "@mui/icons-material/Face3";

import instagram from "../graphics/instagram.gif";
import snapchat from "../graphics/snapchat.gif";
import { useState } from "react";

const HowToShare = () => {
  const [selectedSocialMedia, setSelectedSocialMedia] = useState(0);

  const handleClickSocialMedia = (index) => {
    setSelectedSocialMedia(index);
  };

  return (
    <div
      style={{
        maxHeight: window.innerHeight - 200,
        overflowY: "auto",
      }}
    >
      <h1>how to share</h1>
      <div className="w-100 d-flex justify-content-around">
        <button
          className="btni p-3 d-flex align-items-center w-50"
          style={
            selectedSocialMedia === 0
              ? { background: "rgb(23,161,183)" }
              : { background: "rgb(23,161,183,0.5)" }
          }
          onClick={() => handleClickSocialMedia(0)}
        >
          <InstagramIcon />
          Instagram
        </button>
        <button
          className="btni p-3 w-50"
          style={
            selectedSocialMedia === 1
              ? { background: "rgb(23,161,183)" }
              : { background: "rgb(23,161,183,0.5)" }
          }
          onClick={() => handleClickSocialMedia(1)}
        >
          <Face3Icon />
          Snapchat
        </button>
      </div>
      <div className="mt-2 d-flex justify-content-center">
        {selectedSocialMedia === 0 && <img width={"80%"} src={instagram} />}
        {selectedSocialMedia === 1 && <img width={"80%"} src={snapchat} />}
      </div>
    </div>
  );
};

export default HowToShare;
