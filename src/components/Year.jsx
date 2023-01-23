import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchShowsFromYear from "../methods/fetchShowsFromYear";
import Show from "./Show.jsx";

const Year = () => {
  const { id } = useParams();
  console.log("ID INSIDE YEAR", id);
  const results = useQuery(["year", id], () => fetchShowsFromYear(id));

  if (results.isLoading) {
    return (
      <div>
        <h2>Loading</h2>
      </div>
    );
  }

  let data = results.data.data;

  let ordered = [...data].reverse();

  return (
    <div className="p-1">
      {ordered.map((show, i) => {
        return (
          <Link
            to={`/show/${show.date}`}
            className="flex justify-between p-1"
            key={i}
            state={{
              duration: show.duration,
              tracks: show.tracks,
              venue: show.venue,
            }}
          >
            <span>
              {show.date.slice(5, 7)}.{show.date.slice(-2)}.
              {show.date.slice(0, 4)}
            </span>
            {show.venue_name.length >= 30 ? (
              <span>{show.venue_name.slice(0, 30)}...</span>
            ) : (
              <span>{show.venue_name}</span>
            )}
          </Link>
        );
      })}
    </div>
  );
};

export default Year;
