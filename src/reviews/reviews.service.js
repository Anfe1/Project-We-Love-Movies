const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

//Adds properties
const addCritics = mapProperties({
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});

//List the review based on the id
function read(review_id) {
  return knex("reviews").select("*").where({ review_id: review_id }).first();
}

//Updates a review
function update(updatedReview) {
  return knex("reviews")
    .select("*")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview);
}

//list the reviews and adds the critics table data for the specific movie and review
function getReviewWithCritic(reviewId) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("*")
    .where({ review_id: reviewId })
    .first()
    .then((result) => {
      const updatedReview = addCritics(result);
      return updatedReview;
    });
}

//Deletes the review based on id
function destroy(review_id) {
  return knex("reviews").where({ review_id }).del();
}

module.exports = {
  update,
  getReviewWithCritic,
  read,
  delete: destroy,
};
