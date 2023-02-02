import { useLocation } from "react-router-dom";
import Song from "./Song.jsx";

const Show = ({ setShowData, getTrackInfo, setCurrentTrack, showInfo }) => {
  const location = useLocation();
  let set = "";

  console.log(location.state);
  console.log(showInfo);

  const checkSet = (setNum, num) => {
    if (setNum !== num) {
      set = setNum;
      return setNum === "E" ? (
        <div className="border-b-4 text-2xl">Encore</div>
      ) : (
        <div className="border-b-4 text-2xl">Set {setNum}</div>
      );
    }
  };
  // useEffect(() => {
  //   setShowData(location.state);

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  if (!location.state) {
    return null;
  }

  return (
    <div className="p-2">
      <div className="flex justify-center gap-1">
        <div className="">
          {location.state.date.slice(5, 7)}.{location.state.date.slice(-2)}.
          {location.state.date.slice(0, 4)}
        </div>
        <div>|</div>
        <div className="">{location.state.venue.name} </div>
        <div>|</div>
        <div className="">{location.state.venue.location} </div>
      </div>

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
            />
          </div>
        );
      })}
    </div>
  );
};

export default Show;
