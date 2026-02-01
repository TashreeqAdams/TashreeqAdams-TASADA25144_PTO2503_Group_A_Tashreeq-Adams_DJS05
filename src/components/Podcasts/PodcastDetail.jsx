import { fetchSinglePodcast } from "../../api/fetchPodcasts";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./PodcastDetail.module.css";
import { formatDate } from "../../utils/formatDate";
import PodcastCard from "./PodcastCard";

export default function PodcastDetail({ genres = [] }) {
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

  const GENRES = {
    1: "Personal Growth",
    2: "Investigative Journalism",
    3: "History",
    4: "Comedy",
    5: "Entertainment",
    6: "Business",
    7: "Fiction",
    8: "News",
    9: "Kids and Family",
  };

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
        <p>
          Genres:{" "}
          {podcast.genres.map((title) => (
            <span key={title} className={styles.genreTag}>
              {title}
            </span>
          ))}
        </p>
        <p>Total seasons: {podcast.seasons?.length}</p>
        <p>
          Total episodes:{""}
          {podcast.seasons.reduce(
            (total, season) => total + season.episodes.length,
            0
          )}
        </p>
      </div>

      <div className={styles.seasonSection}>
        <h2>Current Season</h2>

        <label className={styles.label}>
          <select
            className={styles.select}
            value={selectedSeason?.season || ""}
            onChange={(e) => {
              const seasonNum = Number(e.target.value);
              const season = podcast.seasons.find(
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

      {selectedSeason && (
        <div className={styles.seasonBlock}>
          <h2>{selectedSeason.title}</h2>
          <p>{selectedSeason.description}</p>
          <ul className={styles.episodeList}>
            {selectedSeason.episodes.map((ep) => (
              <li key={ep.id} className={styles.episodeTile}>
                <img
                  className={styles.episodeImage}
                  src={podcast.image}
                  alt={ep.title}
                />
                {ep.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
