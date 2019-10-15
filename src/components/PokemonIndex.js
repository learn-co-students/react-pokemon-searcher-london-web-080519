import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

const URL = "http://localhost:3000/pokemon/"

class PokemonPage extends React.Component {
  state = {
    pokemon: [],
    results: []
  }

  componentDidMount() {
    return fetch(URL).then(resp=>resp.json()).then(pokemon=>this.setState({pokemon}))
  }

  //_.debounce(() => console.log('🤔'), 500)


  handleSearch = (e) => {
    let search = new RegExp(e.target.value, "i")
    let results = this.state.pokemon.filter(poke => poke.name.match(search))
    this.setState({
      results: results
    })
  }


  post = (data) => { 
    return fetch(URL, {
      method: "POST", 
      headers: {
       "Content-type": "application/json",
        "Accept": "application/json"
      }, body: JSON.stringify(data)
      }).then(response => response.json())
      .then(newPoke=> this.setState({pokemon: [...this.state.pokemon, newPoke ]})) 
  }

  renderPokes = () => {
    if (this.state.results.length === 0) {
      return this.state.pokemon
    } else {
      return this.state.results
    }
  }

  render() {
    let pokesOnPage = this.renderPokes()
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <PokemonForm post={this.post}/>
        <br />
        <Search onSearchChange={this.handleSearch} showNoResults={false} />
        <br />
        <PokemonCollection pokemon={pokesOnPage} />
      </div>
    )
  }
}

export default PokemonPage
