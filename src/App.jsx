import { Routes, Route, Router } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";
import { HomePage } from "./pages/home";
import { PlayerPage } from "./pages/playerpage";
import { RecentPage } from "./pages/recent";
import { FavoritePage } from "./pages/favorite";
import { NotFound } from "./pages/errorHandle";
import usePlaylists from "./hooks/usePlaylists";

function App() {
  const { playlists, error, getPlaylistById, addToRecent } = usePlaylists();
  const playlistArray = Object.values(playlists);

  return (
    <>
      <Navbar getPlaylistById={getPlaylistById} />
      <Routes>
        <Route path="/" element={<HomePage playlistArray={playlistArray} />} />
        <Route
          path="player/:playlistId"
          element={
            <PlayerPage playlists={playlists} addToRecent={addToRecent} />
          }
        />
        <Route path="recents/" element={<RecentPage />} />
        <Route path="favorites/" element={<FavoritePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
