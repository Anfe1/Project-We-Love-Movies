const knex = require("../db/connection");

//List all the movies in the database
function list() {
  return knex("movies").select("*");
}

//List all the movies by the is_showing status on the movies_theaters table based
function listMovies() {
  return knex("movies")
    .join("movies_theaters as mt", "movies.movie_id", "mt.movie_id")
    .select("movies.*")
    .where({ "mt.is_showing": true })
    .groupBy("movies.movie_id");
}

function listMoviesByTheaters() {
  return knex("movies_theaters as mt")
    .join("movies as m", "m.movie_id", "mt.movie_id")
    .join("theaters as th", "mt.theater_id", "th.theater_id")
    .select("th.*")
    .groupBy("th.theater_id");
}

//selects the the movie based on the movie_id
function read(movieId) {
  return knex("movies").select("*").where({ movie_id: movieId }).first();
}

module.exports = {
  list,
  read,
  listMovies,
  listMoviesByTheaters,
};
