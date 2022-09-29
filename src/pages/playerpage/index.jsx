import { useState } from "react";
import YouTube from "react-youtube";
import { useParams } from "react-router-dom";
import { useStoreActions } from "easy-peasy";

export const PlayerPage = ({ playlists, addToRecent }) => {
  const [state, setState] = useState("");
  const { playlistId } = useParams();
  const current = playlists[playlistId];
  const { recents } = useStoreActions((actins) => actins);
  // const { addToRecent } = usePlaylists();

  if (!current) return;

  const onReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  const opts = {
    playerVars: {
      height: "390",
      width: "640",
      autoplay: 1,
    },
  };

  const handleVideoPlay = (videoId) => {
    setState(videoId);
    addToRecent(playlistId);
  };

  return (
    <div className="px-4 py-5 mx-auto max-w-screen-xl md:px-24 lg:px-8">
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12">
          <YouTube
            videoId={
              state ? state : current.playlistItems[0].contentDetails.videoId
            }
            opts={opts}
            onReady={onReady}
          />
          <div>
            <h1 className="text-2xl font-bold text-teal-600 mt-3">
              {current.playlistTitle}
            </h1>
          </div>
        </div>
        <div className="w-full lg:w-4/12">
          <div className="w-full">
            <div className="mb-4">
              <h5 className="text-xl leading-normal font-bold text-slate-800">
                {current.playlistTitle}
              </h5>
            </div>
            <div className="space-y-2">
              {current.playlistItems.map((item) => (
                <div key={item.contentDetails.videoId} className="flex gap-2">
                  <div className="flex-shrink-0">
                    <img
                      className="w-[170px] h-full cursor-pointer"
                      src={item.thumbnail.url}
                      alt={item.title}
                    />
                  </div>
                  <div>
                    <p
                      onClick={() =>
                        handleVideoPlay(item.contentDetails.videoId)
                      }
                      className="text-base font-medium text-slate-800 cursor-pointer"
                    >
                      {item.title.substring(0, 40)}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {item.description.substring(0, 80)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
