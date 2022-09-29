import { useState } from "react";
import getYoutubePlaylistId from "get-youtube-playlist-id";

const Modal = ({ open, handleClose, getPlaylistId }) => {
  const [state, setState] = useState("");
  const submitHandle = () => {
    if (!state) {
      alert("Invalid your youtube playlist id or link");
    } else {
      const urlOrLink = getYoutubePlaylistId(state);
      if (urlOrLink) {
        getPlaylistId(urlOrLink);
        setState("");
        handleClose();
      } else {
        getPlaylistId(state);
        setState("");
        handleClose();
      }
    }
  };
  console.log(state);
  return (
    <>
      {open ? (
        <section
          className="fixed inset-0 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            ></div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom  rounded-lg text-left overflow-hidden transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="mt-10 bg-white rounded-lg overflow-hidden shadow-xl">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3
                        className="text-2xl leading-6 font-bold  text-gray-900 text-center"
                        id="modal-title"
                      >
                        Clean Youtube
                      </h3>
                      <div className="mt-2 w-full">
                        <label
                          for="playlistId"
                          class="leading-7 text-sm text-gray-600"
                        >
                          Playlist Or Playlist ID
                        </label>
                        <input
                          type="text"
                          id="playlistId"
                          name="playlistId"
                          onChange={(e) => setState(e.target.value)}
                          class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          placeholder="playlistid or playlist link"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    onClick={submitHandle}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-teal-600 text-base font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleClose}
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
};
export default Modal;
