import React, { Component } from "react";
import "isomorphic-fetch";
import MovieReviews from "./MovieReviews";

const NYT_API_KEY = "NZmf9N4KAXM6cj8Fhur9LH5nV9QxA5V1";
const BASE_URL =
  "https://api.nytimes.com/svc/movies/v2/reviews/search.json?" +
  `api-key=${NYT_API_KEY}&query=`;

// Code SearchableMovieReviewsContainer Here

class SearchableMovieReviewsContainer extends Component {
  state = {
    searchTerm: "",
    reviews: []
  };

  handleSearchInputChange = e => this.setState({ searchTerm: e.target.value });

  handleSubmit = e => {
    e.preventDefault();

    fetch(BASE_URL.concat(this.state.searchTerm))
      .then(data => data.json())
      .then(reviews => this.setState({ reviews: reviews.results }));
  };

  render() {
    return (
      <div className="searchable-movie-reviews">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="search-input">Search Movie Reviews</label>
          <input
            id="search-input"
            type="text"
            style={{ width: 300 }}
            onChange={this.handleSearchInputChange}
          />
          <button type="submit">Submit</button>
        </form>
        {typeof this.state.reviews === "object" &&
          this.state.reviews.length > 0 && <h2>Movie Review By Search:</h2>}
        <MovieReviews reviews={this.state.reviews} />
      </div>
    );
  }
}

export default SearchableMovieReviewsContainer;
