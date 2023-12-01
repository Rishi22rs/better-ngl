import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import Face3Icon from "@mui/icons-material/Face3";

import gify from "../graphics/giphy.gif";
import gify1 from "../graphics/giphy1.gif";
import gify2 from "../graphics/giphy2.gif";
import { useState } from "react";

const HowToShare = () => {
  const [selectedSocialMedia, setSelectedSocialMedia] = useState(0);

  const handleClickSocialMedia = (index) => {
    setSelectedSocialMedia(index);
  };

  return (
    <div>
      <h1>how to share</h1>
      <div className="w-100 d-flex justify-content-around">
        <button
          className="btni p-3 d-flex align-items-center"
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
          className="btni p-3"
          style={
            selectedSocialMedia === 1
              ? { background: "rgb(23,161,183)" }
              : { background: "rgb(23,161,183,0.5)" }
          }
          onClick={() => handleClickSocialMedia(1)}
        >
          <TwitterIcon />X (formerly Twitter)
        </button>
        <button
          className="btni p-3"
          style={
            selectedSocialMedia === 2
              ? { background: "rgb(23,161,183)" }
              : { background: "rgb(23,161,183,0.5)" }
          }
          onClick={() => handleClickSocialMedia(2)}
        >
          <Face3Icon />
          Snapchat
        </button>
      </div>
      <div className="mt-2">
        {selectedSocialMedia === 0 && <img width={"100%"} src={gify} />}
        {selectedSocialMedia === 1 && <img width={"100%"} src={gify1} />}
        {selectedSocialMedia === 2 && <img width={"100%"} src={gify2} />}
      </div>
    </div>
  );
};

export default HowToShare;
