import { Grid, LinearProgress, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Loader.css";

interface LoaderProps {
  text: string;
  isCaching: boolean;
  isLoading: boolean;
}

const Loader: React.FC<LoaderProps> = ({ isCaching, isLoading, text }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [showCachingLoader, setShowCachingLoader] = useState(true);

  useEffect(() => {
    setShowCachingLoader(true);
    setTimeout(() => {
      new Promise((resolve) => {
        resolve(setShowCachingLoader(false));
      });
    }, 500);
  }, [isLoading]);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;
      if (index === text.length) clearInterval(timer);
    }, 25);

    return () => clearInterval(timer);
  }, [text]);

  return (
    <>
      {isLoading && (
        <div className="playerList__loading">
          <span>{displayedText}</span>
          <span className="typing-cursor">|</span> <CircularProgress />
        </div>
      )}
      {isCaching && showCachingLoader && (
        <div className="playerList__loading">
          <span>{displayedText}</span>
          <span className="typing-cursor">|</span>{" "}
          <Grid spacing={1} container>
            <Grid xs item>
              <LinearProgress />
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
};

export default Loader;
