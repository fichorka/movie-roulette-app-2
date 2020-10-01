# Movie Roulette App 2

_A frontend app for browsing movies deployed_ ***[here](https://filibit-mvr.netlify.app/)***. _It uses [TMDB API](https://developers.themoviedb.org/3)_ to fetch all the data.

User can see a list of movies, load more movies through an infinite scroll, filter movies by genre (inclusive / exclusive), sort results by multiple keys, rate movies, see all rated movies and delete own ratings. Session is saved in `localStorage` and persists through reload. Original task [is here](https://github.com/cobeisfresh/frontend-tasks/blob/movie-api/README.md).

| Tools        |
| ------------ |
| React        |
| Redux        |
| React-router |
| Webpack      |
| Babel        |
| Typescript   |
| Eslint       |
| Prettier     |

## Usage

1. rename `./config/api.example.ts` file into `api.ts` (it should remain in the `config` folder) and assign your Api key into API_KEY variable in said file
2. `npm install`
3. `npm start`
4. App should run on http://localhost:3000

### Author

Filip Bterski

filip.biterski@gmail.com
