import React from "react";
import PokemonCollection from "./PokemonCollection";
import PokemonForm from "./PokemonForm";
import { Search } from "semantic-ui-react";
import _ from "lodash";

const POKE_URL = "http://localhost:3000/pokemon";
class PokemonPage extends React.Component {
  state = {
    pokemon: [],
    searchTerm: "",
    sort: false
  };

  componentDidMount = () => {
    this.getAllPokemon();
  };

  getAllPokemon = () => {
    fetch(POKE_URL)
      .then(resp => resp.json())
      .then(data => this.setState({ pokemon: data }));
  };

  handleAddNewPokemon = form => {
    const newPoke = {
      name: form.name,
      sprites: {
        back: form.back,
        front: form.front
      },
      moves: [],
      stats: [
        {
          name: "hp",
          value: form.hp
        }
      ]
    };
    // console.log(newpoke);
    return this.addNewPokemon(newPoke).then(pkmn =>
      this.setState({
        pokemon: [...this.state.pokemon, pkmn]
      })
    );
  };

  addNewPokemon = pkmn => {
    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(pkmn)
    };
    return fetch(POKE_URL, configObj)
      .then(resp => resp.json())
      .then(this.setState({ showingFront: true }))

  };

  handleSearch = (event, target) => {
    this.setState({
      searchTerm: target.value
    });
  };

  searchResults = () => {
    return this.state.pokemon.filter(pkmn =>
      pkmn.name.includes(this.state.searchTerm)
    );
    //
  };
  //

  toggleSort = event => {
    this.setState({
      sort: !this.state.sort
    });
  };

  sortPokemon = pokemon => {
        return pokemon.sort((a, b) => a.name.localeCompare(b.name));
  };

  render() {
    let pokeSearch = this.searchResults();
    let pokeSort = this.sortPokemon(pokeSearch);
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <PokemonForm handleAddNewPokemon={this.handleAddNewPokemon} />
        
        <br />
        <Search
          onSearchChange={_.debounce(this.handleSearch, 500)}
          showNoResults={false}
        />
        <br />
        <PokemonCollection pokemon={pokeSort} />
      </div>
    );
  }
}

export default PokemonPage;
