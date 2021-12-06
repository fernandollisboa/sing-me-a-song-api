export function generateRecommendationDbResponse({ id, score } = {}) {
  return {
    id: id || 1,
    name: 'Lofi - Lofi Girl',
    genres: [
      { id: 1, name: 'rock' },
      { id: 2, name: 'lofi' },
    ],
    youtubeLink: 'https://www.youtube.com/watch?v=5qap5aO4i9A&ab_channel=LofiGirl',
    score: score || 0,
  };
}

export function generateRecommendationBody() {
  return {
    name: 'Lofi - Lofi Girl',
    genresIds: [1, 2],
    youtubeLink: 'https://www.youtube.com/watch?v=5qap5aO4i9A&ab_channel=LofiGirl',
  };
}
