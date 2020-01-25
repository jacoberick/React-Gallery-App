import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class SearchBar extends Component {
  state = {
    searchText: ""
  };

  onSearchChange = e => {
    this.setState({ searchText: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSearch(this.state.searchText);
    e.currentTarget.reset();
    this.props.history.push(`/?search=${this.state.searchText}`);
  };

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

export default withRouter(SearchBar);
