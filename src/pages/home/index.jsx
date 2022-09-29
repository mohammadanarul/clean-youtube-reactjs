import { NavLink } from "react-router-dom";

export const HomePage = ({ playlistArray }) => {
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      {playlistArray.length > 0 && (
        <div className="grid gap-5 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
          {playlistArray.map((item) => (
            <div
              key={item.playlistId}
              className="overflow-hidden transition-shadow duration-300 bg-white rounded"
            >
              <NavLink to={`player/${item.playlistId}`} aria-label="Article">
                <img
                  src={item.playlistThumbnail.url}
                  className="object-cover w-full h-64 rounded"
                  alt=""
                />
              </NavLink>
              <div className="py-5">
                <p className="mb-2  text-xs font-semibold text-gray-600 uppercase">
                  {item.channelTitle}
                </p>
                <div
                  aria-label="Article"
                  className="inline-block mb-3 text-slate-900 transition-colors duration-200 hover:text-deep-purple-accent-700"
                >
                  <p className="text-2xl leading-tight font-bold">
                    {item.playlistTitle}
                  </p>
                </div>
                <p className="mb-4 text-gray-700">
                  {item.playlistDescription.substring(0, 150)}
                </p>
                <NavLink to={`player/${item.playlistId}`}>
                  <div className="w-32 flex items-center justify-start transition-all text-primary-600 hover:text-white cursor-pointer border-2 border-primary-600 hover:bg-primary-600 rounded duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="currentColor"
                      className="bi bi-play"
                      viewBox="0 0 16 16"
                    >
                      <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z" />
                    </svg>
                    <p className="font-semibold">Play</p>
                  </div>
                </NavLink>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
