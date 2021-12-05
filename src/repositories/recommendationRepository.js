/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import connection from '../database/connection.js';

export async function insert({ name, youtubeLink, genresIds }) {
  const newRecommendation = await connection.query(
    'INSERT INTO recommendations (name,youtube_link) values ($1,$2) RETURNING *;',
    [name, youtubeLink],
  );

  // TO-DO ver se funciona direito essa parada dos awaits
  await Promise.all(
    genresIds.map(async (genreId) =>
      connection.query(
        `INSERT INTO recommendation_genres 
              VALUES ($1,$2) RETURNING *;`,
        [newRecommendation.rows[0].id, genreId],
      ),
    ),
  );

  return newRecommendation.rows[0];
}

export async function selectByName({ name }) {
  const query = await connection.query('SELECT * FROM recommendations WHERE name = $1;', [name]);
  return query.rows[0];
}

export async function selectByYoutubeLink({ youtubeLink }) {
  const query = await connection.query('SELECT * FROM recommendations WHERE youtube_link = $1;', [
    youtubeLink,
  ]);
  return query.rows[0];
}
