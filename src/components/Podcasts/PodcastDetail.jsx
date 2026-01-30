import { fetchSinglePodcast } from "../../api/fetchPodcasts";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./PodcastDetail.module.css";

export default function PodcastDetail() {
  const { id } = useParams();
  const [podcast, setPodcast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSinglePodcast(id, setPodcast, setError, setLoading);
  }, [id]);

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
      <p>Total seasons:</p>
      <p>Total episodes:</p>
    </div>
  );
}
