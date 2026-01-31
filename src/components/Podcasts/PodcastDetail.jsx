import { fetchSinglePodcast } from "../../api/fetchPodcasts";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./PodcastDetail.module.css";

export default function PodcastDetail() {
  const { id } = useParams();
  const [podcast, setPodcast] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSinglePodcast(id, setPodcast, setError, setLoading);
  }, [id]);

  useEffect(() => {
    if (podcast?.seasons?.length) {
      setSelectedSeason(podcast.seasons[0]);
    }
  }, [podcast]);

  if (loading) return <p>Loading podcast...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!podcast) return <p>Podcast not found</p>;

  return (
    <div>
      <h1>{podcast.title}</h1>
      <img src={podcast.image} alt={podcast.title} />
      <p>{podcast.description}</p>
      <p>Last updated: {podcast.updated}</p>
      <p>Genres: {podcast.genres?.join(", ")}</p>
      <p>Total seasons: {podcast.seasons?.length}</p>
      <p>
        Total episodes:{""}
        {podcast.seasons.reduce(
          (total, season) => total + season.episodes.length,
          0
        )}
      </p>
      <h2>Current Season</h2>
    </div>
  );
}
