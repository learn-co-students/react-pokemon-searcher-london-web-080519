import React from "react";
import PokemonCollection from "./PokemonCollection";
import PokemonForm from "./PokemonForm";
import { Search, Checkbox } from "semantic-ui-react";
import API from "../adapters/API";
import _ from "lodash";

class PokemonPage extends React.Component {
  state = {
    pokemons: [],
    pokemonSearched: "",
    sortOn: false,
    filterOn: false
  };

  componentDidMount() {
    API.getPokemon().then(pokemons => this.setState({ pokemons }));
  }

  handleSearchChange = (e, { value }) => {
    this.setState({
      pokemonSearched: value
    });
  };

  postNewPokemon = newPokemon => {
    let formattedNewPokemon = {
      name: newPokemon.name,
      stats: [{ value: newPokemon.hp, name: "hp" }],
      sprites: {
        front: newPokemon.frontUrl,
        back: newPokemon.backUrl
      }
    };
    API.postPokemon(formattedNewPokemon).then(data => {
      this.setState({
        pokemons: [...this.state.pokemons, data]
      });
    });
  };

  filterPokemons = () => {
    let filteredArray = [];
    if (this.state.filterOn) {
      this.state.pokemons.map(pokemon => {
        pokemon.stats.map(stat => {
          if (stat.name === "hp" && stat.value >= 80) {
            filteredArray.push(pokemon);
          }
        });
      });
    } else {
      filteredArray = this.state.pokemons;
    }

    return filteredArray;
  };

  sortPokemons = () => {
    const filteredPokemons = this.filterPokemons();

    if (this.state.sortOn) {
      return filteredPokemons.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      return filteredPokemons;
    }
  };

  displayPokemons = () => {
    const sortedPokemons = this.sortPokemons();
    if (this.state.pokemonSearched !== "") {
      return sortedPokemons.filter(pokemon =>
        pokemon.name.includes(this.state.pokemonSearched)
      );
    } else {
      return sortedPokemons;
    }
  };

  handleFilterClick = () => {
    this.setState({
      filterOn: !this.state.filterOn
    });
  };

  handleSortClick = () => {
    this.setState({
      sortOn: !this.state.sortOn
    });
  };

  render() {
    const {
      handleSearchChange,
      displayPokemons,
      postNewPokemon,
      handleFilterClick,
      handleSortClick
    } = this;
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <PokemonForm postNewPokemon={postNewPokemon} />
        <br />
        <Search
          onSearchChange={_.debounce(handleSearchChange, 500)}
          showNoResults={false}
        />
        <Checkbox
          label="More than 80 Hp"
          className="App-checkbox"
          onClick={handleFilterClick}
        />
        <Checkbox
          label="Sort Alphabetically"
          className="App-checkbox"
          onClick={handleSortClick}
        />
        <PokemonCollection pokemons={displayPokemons()} />
      </div>
    );
  }
}

export default PokemonPage;
