import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'
import { timingSafeEqual } from 'crypto'

class PokemonPage extends React.Component {

  state = { 
    pokemons: [],
    searchTerm: ''
  }

  componentDidMount() {
    fetch('http://localhost:3000/pokemon').then(resp => resp.json()).then(pokemons => this.setState({ pokemons }))
  }

  handleChange = (event) => {
    this.setState({ searchTerm: event.target.value})
  }

  filterPokemons = () => {
    return this.state.pokemons.filter(pokemon => pokemon.name.toLocaleLowerCase().includes(this.state.searchTerm.toLocaleLowerCase()) )
  }

  handleNewPokemon = (newPokemonObject) => {
    this.setState( {pokemons: [...this.state.pokemons, newPokemonObject]})
  }


  render() {

    const filteredPokemons = this.filterPokemons()

    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <PokemonForm handleNewPokemon={this.handleNewPokemon}/>
        <br />
        <Search onSearchChange={this.handleChange} showNoResults={false} />
        <br />
        <PokemonCollection pokemons={filteredPokemons}/>
      </div>
    )
  }
}

export default PokemonPage


// .debounce(this.handleChange, 500