import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

class PokemonIndex extends React.Component {


  render() {
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <PokemonForm addNewPokemon={this.props.addNewPokemon}/>
        <br />
        <Search onSearchChange={this.props.changeSearchTerms} showNoResults={false} />
        <br />
        <PokemonCollection pokemons={this.props.pokemons}  />
      </div>
    )
  }
}

export default PokemonIndex