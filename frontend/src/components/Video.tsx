import React from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import ReactHlsPlayer from "react-hls-player";

export interface IProps {
  options?: Options;
  onReady?: Function;
  className?: string;
}

interface Options {
  autoplay: boolean;
  controls: boolean;
  aspectRatio: string;
  sources: [
    {
      src: string;
      type: string;
    }
  ];
}
export const VideoJS = (props: IProps) => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  let { options, onReady, className } = props;

  if (!options) {
    options = {
      autoplay: true,
      controls: true,
      aspectRatio: "16:9",
      sources: [
        {
          src: "https://bafybeifwdmdpc7e7qmctqc5d5a2ybycojzpqag7ubxkdyviw4p2m6zxzpq.ipfs.w3s.link/sea-138588.mp4?download=1",
          type: "video/mp4",
        },
      ],
    };
  }

  React.useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement("video-js");

      videoElement.classList.add("vjs-big-play-centered");
      // @ts-ignore
      videoRef.current.appendChild(videoElement);
      // @ts-ignore
      const player = (playerRef.current = videojs(videoElement, options, () => {
        onReady && onReady(player);
      }));

      // You could update an existing player in the `else` block here
      // on prop change, for example:
    } else {
      const player = playerRef.current;
      // @ts-ignore
      player.autoplay(options.autoplay);
      // @ts-ignore
      player.src(options.sources);
    }
  }, [videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      // @ts-ignore
      if (player && !player.isDisposed()) {
        // @ts-ignore
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player className={`rounded-lg overflow-hidden ${className}`}>
      <div ref={videoRef} />
    </div>
  );
};
