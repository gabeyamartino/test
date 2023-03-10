import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Song from "./Song.jsx";

import ReactGA from "react-ga";

const TRACKING_ID = "UA-256965728-1";
ReactGA.initialize(TRACKING_ID);

const Show = ({ setShowData, getTrackInfo, setCurrentTrack, currentTrack }) => {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  const location = useLocation();
  let set = "";

  const checkSet = (setNum, num) => {
    if (setNum !== num) {
      set = setNum;
      return setNum === "E" ? (
        <div className="-ml-2 -mr-2 mt-4 border-b-2 border-gray-600 p-2 font-comfortaa text-2xl">
          Encore
        </div>
      ) : (
        <div className="-ml-2 -mr-2 mt-4 border-b-2 border-gray-600 p-2 font-comfortaa text-2xl">
          Set {setNum}
        </div>
      );
    }
  };

  if (!location.state) {
    return null;
  }

  return (
    <div className="min-h-screen p-2 pt-48">
      <div className="flex-col font-comfortaa text-2xl">
        <div className="font-bold">
          {location.state.date.slice(5, 7)}.{location.state.date.slice(-2)}.
          {location.state.date.slice(0, 4)}
        </div>
        <div className="font-bold">{location.state.venue.name} </div>
        <div className="font-bold">{location.state.venue.location} </div>
      </div>
      <br />
      {location.state.tracks.map((track, i) => {
        return (
          <div key={i}>
            {checkSet(track.set, set)}
            <Song
              title={track.title}
              duration={track.duration}
              mp3={track.mp3}
              currentShow={{
                venue_name: track.venue_name,
                venue_location: track.venue_location,
                date: track.show_date,
                tracks: location.state.tracks,
              }}
              setShowData={setShowData}
              getTrackInfo={getTrackInfo}
              setCurrentTrack={setCurrentTrack}
              currentTrack={currentTrack}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Show;
