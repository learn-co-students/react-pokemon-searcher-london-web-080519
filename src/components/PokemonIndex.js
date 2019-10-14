import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search, Button } from 'semantic-ui-react'
import _ from 'lodash'
import API from '../adapters/API'

class PokemonPage extends React.Component {
  state = {
    pokemon: [],
    searchString: '',
    filter: false
  }

  componentDidMount() {
    API.getAllPokemon()
      .then(pokemon => this.setState({pokemon}))
  }

  handleSearch = (e, target) => {
    this.setState({
      searchString: target.value
    })
  }
  
  searchResults = () => {
    return this.state.pokemon.filter(pkmon => pkmon.name.match(this.state.searchString))
  }

  handleNewPkmonAdd = formState => {
    const newPkmon = {
      name: formState.name,
      sprites: {
        back: formState.backUrl,
        front: formState.frontUrl
      },
      moves: [],
      stats: [{
        name: 'hp',
        value: formState.hp
      }]
    }
    console.log(newPkmon);
    API.postNewPkmon(newPkmon).then(pkmon => this.setState({
      pokemon: [...this.state.pokemon, pkmon]
    }))
  }

  toggleFilter = e => {
    this.setState({
      filter: !this.state.filter
    })
  }

  filterPokemon = (pokemon) => {
    
    return pokemon.filter(pkmon => !this.state.filter || pkmon.moves.length > 0)
  }

  render() {
    let refinedPokemon = this.searchResults()
    let filteredPokemon = this.filterPokemon(refinedPokemon)
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <PokemonForm handleNewPkmonAdd={this.handleNewPkmonAdd} />
        <br />
        <Search onSearchChange={_.debounce(this.handleSearch, 500)} showNoResults={false} />
        <br/>
        <Button onClick={this.toggleFilter}>{this.state.filter ? "All Pokemon" : "Show Pokemon with Moves"}</Button>
        <br />
        <PokemonCollection pokemon={filteredPokemon} />
      </div>
    )
  }
}

export default PokemonPage
