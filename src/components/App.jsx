import Header from "./Header.jsx";
import Years from "./Years.jsx";
import Year from "./Year.jsx";
import Show from "./Show.jsx";
import Player from "./Player.jsx";
import ScrollToTop from "./ScrollToTop.jsx";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  const [showInfo, setShowInfo] = useState({});
  const [currentTrack, setCurrentTrack] = useState({});

  const onEnd = (array) => {
    array.shift();
    if (!array.length) return;
    setCurrentTrack(array[0]);
  };

  const onPrevious = (curr, prev) => {
    if (!prev.length) return;
    curr.unshift(prev[prev.length - 1]);
    setCurrentTrack(curr[0]);
  };
  console.log("CURRENT TRACK", currentTrack);

  const setShowData = (data) => {
    setShowInfo(data);
    //console.log(showInfo);
  };

  const getTrackInfo = (track) => {
    setCurrentTrack(track);
    //console.log(trackInfo);
  };

  document.body.style.backgroundColor = "#F5F5DC";

  return (
    <div className="min-w-screen min-h-screen flex-col bg-background font-display text-gray-900 lg:m-auto lg:max-w-screen-md">
      <ScrollToTop />
      <QueryClientProvider client={queryClient}>
        <Header showInfo={showInfo} currentTrack={currentTrack} />
        <Routes>
          <Route path="/" element={<Years />} />
          <Route path="/years" element={<Years />} />
          <Route path="year/:id" element={<Year />} />
          <Route
            path="show/:date"
            element={
              <Show
                setShowData={setShowData}
                showInfo={showInfo}
                getTrackInfo={getTrackInfo}
                setCurrentTrack={setCurrentTrack}
                currentTrack={currentTrack}
              />
            }
          />
        </Routes>
        {currentTrack.mp3 && (
          <Player
            showInfo={showInfo}
            currentTrack={currentTrack}
            onEnd={onEnd}
            onPrevious={onPrevious}
          />
        )}
      </QueryClientProvider>
    </div>
  );
};

export default App;
