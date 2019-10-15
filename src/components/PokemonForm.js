import React from 'react'
import { Form } from 'semantic-ui-react'


const initialState = {
  name: '',
  hp: '',
  frontUrl: '',
  backUrl: ''
}

class PokemonForm extends React.Component {
  constructor() {
    super()

    this.state = initialState
  }

  pokemonSubmit = () => {
    let pokemonObj = {
      name : this.state.name, 
      stats : [{ name: "hp", value: this.state.hp}], 
      sprites: { front : this.state.frontUrl, 
      back : this.state.backUrl }
    }
    fetch('http://localhost:3000/pokemon', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pokemonObj)
      }).then(resp => resp.json()).then(resp => this.props.handleNewPokemon(resp)).then(this.clearForm)
    }

  clearForm = () => {
    this.setState(initialState)
  }


  handleFormChange = (event) => {
    this.setState({ [event.target.name]: event.target.value})
  }

  thing = (event) => this.setState( {name:  event.target.value})

  render() {
    return (
      <div>
        <h3>Add a Pokemon!</h3>
        <Form onSubmit={this.pokemonSubmit}>
          <Form.Group widths="equal">
            <Form.Input value={this.state.name} onChange={this.handleFormChange}  fluid label="Name" placeholder="Name" name="name" />
            <Form.Input value={this.state.hp} onChange={this.handleFormChange} fluid label="hp" placeholder="hp" name="hp" />
            <Form.Input value={this.state.frontUrl} onChange={this.handleFormChange} fluid label="Front Image URL" placeholder="url" name="frontUrl" />
            <Form.Input value={this.state.backUrl}  onChange={this.handleFormChange} fluid label="Back Image URL" placeholder="url" name="backUrl" />
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    )
  }
}

export default PokemonForm
