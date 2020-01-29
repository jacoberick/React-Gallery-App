//search filter component and functionality
import React, { Component } from "react";

class SearchBar extends Component {
  //initial searchText state
  state = {
    searchText: ""
  };

  //updates searchText state
  onSearchChange = e => {
    this.setState({ searchText: e.target.value });
  };

  //handles search submit
  handleSubmit = e => {
    e.preventDefault();
    this.props.onSearch(this.state.searchText);
    e.currentTarget.reset();
  };

  //renders search form and field
  render() {
    return (
      <form className="search-form" onSubmit={this.handleSubmit}>
        <input
          type="search"
          onChange={this.onSearchChange}
          name="search"
          placeholder="Search..."
        />
        <button type="submit">
          <img alt="magnifying glass" src={require("../img/search.svg")} />
        </button>
      </form>
    );
  }
}

export default SearchBar;
