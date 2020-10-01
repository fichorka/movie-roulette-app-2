# App specification

- User can see a list of movies through an infinite scroll
- User can filter by genres (multiple options) and switch between includes and without
- User can change sort setting
- User can select a movie to see the details
- user can rate a movie
- user can see a list of rated movies and delete the ratings

## App Design

on page load:

- check localStorage for guest_session_id. If no guest_session_id fetch one and store it in localStorage.
- fetch all the genres from the API

### Home page

route: `/`

- List Movies, show load/error indication
- Display filter and sort settings at the top
- User can remove selected genres from filter by clicking 'x' near the label of each genre name
- Available sort settings through dropdown menu: title, popularity(default), release date, rating, vote count, and thee order: asc \ desc(default)
- LOAD button loads more movies

### MovieDetails page

route: `/:id/`

- Fields: title, cover image, year, description, rating popularity, language and production companies, video, genres, cast and crew
- Can rate a movie (use guest_session_id)
- If already rated, show user rating and option to delete the rating

### UserProfile page

route: `/profile`

- Show a list of rated movies
- User can delete the rating
- User can click on the movie and go to MovieDetails page

### Roullete modal

- Displays a switch between the includes and without
- Displays a scrollable list of genres
- User can select multiple genres and manage selected genres
