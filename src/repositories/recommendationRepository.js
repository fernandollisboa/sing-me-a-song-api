/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import connection from '../database/connection.js';

export async function insert({ name, youtubeLink, genresIds }) {
  const newRecommendation = await connection.query(
    'INSERT INTO recommendations (name,youtube_link) values ($1,$2) RETURNING *;',
    [name, youtubeLink],
  );

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

export async function selectById({ id }) {
  const query = await connection.query('SELECT * FROM recommendations WHERE id = $1;', [id]);
  return query.rows[0];
}

export async function increaseScore({ id }) {
  const query = await connection.query(
    'UPDATE recommendations SET score = score + 1 WHERE id = $1 RETURNING *;',
    [id],
  );

  return query.rows[0];
}

export async function decreaseScore({ id }) {
  const query = await connection.query(
    'UPDATE recommendations SET score = score - 1 WHERE id = $1 RETURNING *;',
    [id],
  );

  return query.rows[0];
}

export async function selectAll() {
  const query = await connection.query('SELECT * FROM recommendations;');
  return query.rows;
}

export async function selectWhereScoreGreaterThanTen() {
  const query = await connection.query(`SELECT id, 
                                               name, 
                                               youtube_link as "youtubeLink",
                                               score
                                        FROM recommendations
                                        WHERE score > 10;`);
  return query.rows;
}

export async function selectWhereScoreBetweenMinusFiveAndTen() {
  const query = await connection.query(`SELECT id, 
                                               name, 
                                               youtube_link as "youtubeLink",
                                               score
                                        FROM recommendations
                                        WHERE score BETWEEN -5 AND 10;`);
  return query.rows;
}

export async function selectOrderByScoreLimitDesc({ limit }) {
  const query = await connection.query(
    `SELECT  id, 
            name, 
            youtube_link as "youtubeLink",
            score 
    FROM recommendations ORDER BY score DESC LIMIT $1;`,
    [limit],
  );

  return query.rows;
}
