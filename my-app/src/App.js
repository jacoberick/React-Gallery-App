import React, { Component } from "react";
import logo from "./logo.svg";
import axios from "axios";
import Nav from "./components/Nav";
import NotFound from "./components/NotFound";
import PhotoList from "./components/PhotoList";
import SearchBar from "./components/SearchBar";
import apiKey from "./config";
import { Switch, Route, Link } from "react-router-dom";

class App extends Component {
  constructor() {
    super();
    this.state = {
      tags: {
        koalas: [],
        tacos: [],
        guitars: []
      },
      searchQuery: "",
      searchImages: []
    };

    Object.keys(this.state.tags).map(tag => {
      axios
        .get(
          `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&per_page=24&tags=${tag}&format=json&nojsoncallback=1`
        )
        .then(response => {
          let tags = { ...this.state.tags };
          tags[tag] = response.data.photos.photo;
          this.setState({ tags });
        })
        .catch(error => {
          console.log("Error fetching and parsing data.", error);
        });
    });
  }

  performSearch = query => {
    axios
      .get(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&per_page=24&tags=${query}&format=json&nojsoncallback=1`
      )
      .then(response => {
        this.setState({
          searchQuery: query,
          searchImages: response.data.photos.photo
        });
      })
      .catch(error => {
        console.log("Error fetching and parsing data.", error);
      });
  };

  render() {
    const state = this.state;
    const DynamicRoutes = () => {
      return Object.keys(state.tags).map((tag, idx) => (
        <Route path={"/" + tag} key={idx}>
          <div className="main-content">
            <PhotoList query={tag} data={state.tags[tag]} />
          </div>
        </Route>
      ));
    };

    return (
      <div>
        <div className="main-header">
          <h1>SearchMe!</h1>
          <SearchBar onSearch={this.performSearch} />
          <Nav routes={state.tags} />
        </div>

        <Switch>
          <Route exact path="/">
            <div className="main-content">
              <PhotoList query={state.searchQuery} data={state.searchImages} />
            </div>
          </Route>
          <DynamicRoutes></DynamicRoutes>
        </Switch>
      </div>
    );
  }
}

export default App;
