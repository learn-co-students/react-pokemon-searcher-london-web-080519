import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'
import API from '../adapters/API'

class PokemonPage extends React.Component {
  state = {
    pokemon: [],
    searchString: ''
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
  
  filterResults = () => {
    return this.state.pokemon.filter(pkmon => pkmon.name.match(this.state.searchString))
  }

  handleNewPkmonAdd = formState => {
    const newPkmon = {
      name: formState.name,
      sprites: {
        back: formState.backUrl,
        front: formState.frontUrl
      },
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

  render() {
    let pokemon = this.filterResults()
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <PokemonForm handleNewPkmonAdd={this.handleNewPkmonAdd} />
        <br />
        <Search onSearchChange={_.debounce(this.handleSearch, 500)} showNoResults={false} />
        <br />
        <PokemonCollection pokemon={pokemon} />
      </div>
    )
  }
}

export default PokemonPage
