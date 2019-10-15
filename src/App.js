import React from 'react'
import PokemonIndex from './components/PokemonIndex'
import './App.css'

class App extends React.Component {

  state = {
    pokemons: [],
    searchTerms: null,
    newPokemon: null
  }

  componentDidMount(){
    fetch('http://localhost:3000/pokemon').then(resp=> resp.json()).then(data => this.setState({pokemons: data}))
  }

  // --- change Search Terms --- //

  changeSearchTerms= (event) => {
    event.persist()
    // console.log(event.target.value)
    this.setState({
      searchTerms: event.target.value
    })
  }

  filterPokemonsBySearch = () => {
    if (this.state.searchTerms === null) {
      return this.state.pokemons
    } else {
      return this.state.pokemons.filter(pokemon => pokemon.name.includes(this.state.searchTerms))  
    }
  }

  // --- add new Pokemon --- //
  addNewPokemon = (newPokemon) => {
    this.setState({ pokemons: [...this.state.pokemons, newPokemon] })
  }

  // --- rendering --- //

  render() {
    const filteredPokemons = this.filterPokemonsBySearch()
    return (
    <div className="App">
      <PokemonIndex pokemons={filteredPokemons} changeSearchTerms={this.changeSearchTerms} addNewPokemon={this.addNewPokemon}/>
    </div>
    )
  }
}

export default App
