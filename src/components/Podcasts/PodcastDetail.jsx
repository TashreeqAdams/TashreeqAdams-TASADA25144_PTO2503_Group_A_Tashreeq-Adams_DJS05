import { fetchSinglePodcast } from "../../api/fetchPodcasts";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";
import styles from "./PodcastDetail.module.css";

const genres = [
  { id: 1, title: "Personal Growth" },
  { id: 2, title: "Investigative Journalism" },
  { id: 3, title: "History" },
  { id: 4, title: "Comedy" },
  { id: 5, title: "Entertainment" },
  { id: 6, title: "Business" },
  { id: 7, title: "Fiction" },
  { id: 8, title: "News" },
  { id: 9, title: "Kids and Family" },
];

export default function PodcastDetail() {
  const { id } = useParams();
  const [podcast, setPodcast] = useState(null);
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

  console.log("podcast.genres:", podcast.genres);
  console.log("genres:", genres);

  const genreSpans = podcast.genres.map((genre) => (
    <span key={genre} className={styles.tag}>
      {genre}
    </span>
  )) ?? <span className={styles.tag}>No genres</span>;

  return (
    <div className={styles.detailContainer}>
      <div className={styles.detailInfo}>
        <h1>{podcast.title}</h1>

        <img
          className={styles.detailImage}
          src={podcast.image}
          alt={podcast.title}
        />
        <p>{podcast.description}</p>
        <p>Last updated: {formatDate(podcast.updated)}</p>
        <div className={styles.tags}>{genreSpans}</div>
        <p>Total seasons: {podcast.seasons?.length}</p>
        <p>
          Total episodes:{""}
          {podcast.seasons.reduce(
            (total, season) => total + (season.episodes?.length || 0),
            0
          )}
        </p>
      </div>

      <div className={styles.seasonSection}>
        <h2>Current Season</h2>

        {/* Season filter */}

        <label className={styles.label}>
          <select
            className={styles.select}
            value={selectedSeason?.season || ""}
            onChange={(e) => {
              const seasonNum = Number(e.target.value);
              const season = podcast?.seasons?.find(
                (s) => s.season === seasonNum
              );
              setSelectedSeason(season);
            }}
          >
            {podcast.seasons.map((s) => (
              <option key={s.season} value={s.season}>
                {s.title}
              </option>
            ))}
          </select>
        </label>
      </div>
      {/* Selected season and episodes */}
      {selectedSeason && (
        <div className={styles.seasonBlock}>
          <h2>{selectedSeason.title}</h2>
          <ol className={styles.episodeList}>
            {selectedSeason?.episodes?.map((ep, index) => (
              <li key={`${ep.id}-${index}`} className={styles.episodeTile}>
                <img
                  className={styles.episodeImage}
                  src={selectedSeason.image}
                  alt={ep.title}
                />
                {ep.episode}
                {" • "}
                {ep.title} {ep.description.slice(0, 100) + "..."}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
