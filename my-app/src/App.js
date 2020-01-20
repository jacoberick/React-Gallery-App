import React, { Component } from "react";
import logo from "./logo.svg";
import axios from "axios";
import Nav from "./components/Nav";
import NotFound from "./components/NotFound";
import PhotoList from "./components/PhotoList";
import SearchBar from "./components/SearchBar";
import apiKey from "./config";
import { Switch, Route, Link, useParams } from "react-router-dom";

class App extends Component {
  constructor() {
    super();
    this.state = {
      tags: {
        koalas: [],
        tacos: [],
        guitars: []
      },
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
          searchImages: response.data.photos.photo
        });
      })
      .catch(error => {
        console.log("Error fetching and parsing data.", error);
      });
  };

  UseTag = () => {
    let { tag } = useParams();
  };

  render() {
    return (
      <div>
        <div className="main-header">
          <h1>SearchMe!</h1>
          <SearchBar onSearch={this.performSearch} />
          <Nav routes={this.state.tags} />
        </div>

        <Switch>
          <Route exact path="/">
            <div className="main-content">
              <h1>Search for photos</h1>
            </div>
          </Route>
          <Route path="/:tag">
            <div className="main-content">
              <PhotoList data={this.state.searchImages} />
            </div>
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
