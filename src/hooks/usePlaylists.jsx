import { useEffect, useState } from "react";
import getPlayList from "../api";
import storage from "../utils/Storage";

const STORAGE_KEY = "cy_youtube_local_state";

const INIT_STATE = {
  playlists: {},
  recents: [],
  favorites: [],
};

const usePlaylists = () => {
  const [state, setState] = useState(INIT_STATE);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Data fetching from local state
  useEffect(() => {
    const localState = storage.get(STORAGE_KEY);
    console.log("local state: ", localState);
    if (localState) {
      setState({ ...localState });
    }
  }, []);

  // data save local storage
  useEffect(() => {
    if (state !== INIT_STATE) {
      storage.save(STORAGE_KEY, state);
    }
  }, [state]);

  // data query from local storage
  const getPlaylistById = async (playListId, force = false) => {
    if (state.playlists[playListId] && !force) {
      return;
    }
    // data query fetching
    setLoading(true);

    try {
      const playlist = await getPlayList(playListId);
      setError("");
      setState((prev) => ({
        ...prev,
        playlists: {
          ...prev.playlists,
          [playListId]: playlist,
        },
      }));
    } catch (e) {
      setError(
        e.response?.data?.error?.message ||
          "Invalid youtube playlist id or Link"
      );
    } finally {
      setLoading(false);
    }
  };
  // palylist add to favorite local storage
  const addToFavorite = (playListId) => {
    setState((prev) => ({
      ...prev,
      favorites: [...prev.favorites, playListId],
    }));
  };

  // playlist add to recents local storage
  const addToRecent = (playlistId) => {
    console.log("i am alredy exists", state.recents[playlistId]);
    setState((prev) => ({
      ...prev,
      recents: [...prev.recents, playlistId],
    }));
  };
  // favorites and recents data query fetching many ids one time
  const getPlaylistsByIds = (ids = []) => {
    return ids.map((id) => {
      state.playlists[id];
    });
  };
  return {
    playlists: state.playlists,
    favorites: getPlaylistsByIds(state.favorites),
    recents: getPlaylistsByIds(state.recents),
    error,
    loading,
    getPlaylistById,
    addToRecent,
    addToFavorite,
  };
};

export default usePlaylists;
