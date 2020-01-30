import React, { Component } from "react";
import axios from "axios";
import Nav from "./components/Nav";
import NotFound from "./components/NotFound";
import PhotoList from "./components/PhotoList";
import SearchBar from "./components/SearchBar";
import apiKey from "./config";
import { Switch, Route, withRouter } from "react-router-dom";

class App extends Component {
  constructor() {
    super();
    // initial states for arrays
    this.state = {
      tags: {
        koalas: [],
        tacos: [],
        guitars: []
      },
      searchQuery: "",
      searchImages: []
    };

    // handles requests to API for koalas, tacos, and guitars arrays
    Object.keys(this.state.tags).forEach(tag => {
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

  // function that gets photos on search of specific tag
  performSearch = query => {
    axios
      .get(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&per_page=24&tags=${query}&format=json&nojsoncallback=1`
      )
      .then(response => {
        let images = response.data.photos.photo;

        this.setState({
          searchQuery: query,
          searchImages: images
        });

        // if no images are returned the NotFound component is rendered
        return images.length
          ? this.props.history.push(`/?search=${query}`)
          : this.props.history.push("/not-found");
      })
      .catch(error => {
        console.log("Error fetching and parsing data.", error);
      });
  };

  render() {
    const state = this.state;
    // route rendering for searches
    const DynamicRoutes = () => {
      return Object.keys(state.tags).map((tag, idx) => (
        <Route path={"/" + tag} key={idx}>
          <div className="main-content">
            <PhotoList query={tag} data={state.tags[tag]} />
          </div>
        </Route>
      ));
    };

    // construction of main header
    return (
      <div>
        <div className="main-header">
          <h1>
            <a id="SearchMe" href="/">
              SearchMe!
            </a>
          </h1>
          <SearchBar onSearch={this.performSearch} />
          <Nav routes={state.tags} />
        </div>
        //Router code for PhotoList and NotFound
        <Switch>
          <Route exact path="/">
            <div className="main-content">
              <PhotoList query={state.searchQuery} data={state.searchImages} />
            </div>
          </Route>
          <Route exact path="/not-found" component={NotFound} />
          <DynamicRoutes />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
