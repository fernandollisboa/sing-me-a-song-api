import connection from '../database/connection.js';

export async function insert({ name }) {
  const insertion = await connection.query('INSERT INTO genres (name) VALUES ($1) RETURNING *;', [
    name,
  ]);

  return insertion.rows[0];
}

export async function selectByName({ name }) {
  const query = await connection.query('SELECT * FROM genres WHERE name = $1;', [name]);

  return query.rows[0];
}

export async function selectById({ id }) {
  const query = await connection.query('SELECT * FROM genres WHERE id = $1;', [id]);

  return query.rows[0];
}

export async function selectAllByRecommendationId({ recommendationId }) {
  const query = await connection.query(
    `SELECT id,name
     FROM genres g 
        INNER JOIN recommendation_genres recgen
        ON recgen.genre_id = g.id
     WHERE recgen.recommendation_id = $1;`,
    [recommendationId],
  );

  return query.rows;
}
