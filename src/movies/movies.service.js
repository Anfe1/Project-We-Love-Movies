const knex = require("../db/connection");

function list() {
  return knex("movies").select("*");
}

//List all the movies by the is_showing status on the movies_theaters table
function listMovies() {
  return knex("movies")
    .join("movies_theaters as mt", "movies.movie_id", "mt.movie_id")
    .select("movies.*")
    .where({ "mt.is_showing": true })
    .groupBy("movies.movie_id");
}

function read(movieId) {
  return knex("movies").select("*").where({ movie_id: movieId }).first();
}
module.exports = {
  list,
  read,
  listMovies,
};
