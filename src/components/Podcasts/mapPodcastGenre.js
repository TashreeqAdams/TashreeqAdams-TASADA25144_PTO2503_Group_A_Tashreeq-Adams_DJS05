/**
 * Maps podcast genre IDs or strings to readable titles.
 *
 * @param {Array<number|string>} podcastGenres - Array of genre IDs or strings from the API.
 * @param {Array<{id: number|string, title: string}>} allGenres - Array of genre objects to map IDs to titles.
 * @returns {Array<string>} Array of genre titles (or Unknown if no match)
 */
export function mapPodcastGenres(podcastGenres = [], allGenres = []) {
  if (!Array.isArray(podcastGenres)) return [];

  return podcastGenres.map((id) => {
    const match = allGenres.find(
      (g) =>
        g.id === id || g.id === Number(id) || g.id === String(id).toLowerCase()
    );
    return match ? match.title : `Unknown (${id})`;
  });
}
