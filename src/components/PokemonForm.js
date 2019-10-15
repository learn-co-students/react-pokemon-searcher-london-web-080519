import React from 'react'
import { Form } from 'semantic-ui-react'

class PokemonForm extends React.Component {
  constructor() {
    super()

    this.state = {
      name: '',
      hp: '',
      frontUrl: '',
      backUrl: ''
    }
  }

  // --- change state --- //
  handleSubmit=(event)=>{
    // console.log(searchTerms)
    this.setState({
      name: event.target.name.value,
      hp: event.target.hp.value,
      frontUrl: event.target.frontUrl.value,
      backUrl: event.target.backUrl.value
    }, this.postNewPokemon)
  }

  // --- add new Pokemon --- // 

  postNewPokemon = ()=> {
    let body = {
      name: this.state.name,
      stats: [{value: parseInt(this.state.hp), name: 'hp'}],
      sprites: {front: this.state.frontUrl, back: this.state.backUrl}
    }
    let configObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };
    return fetch('http://localhost:3000/pokemon',configObj).then(response => response.json()).then(data=>this.props.addNewPokemon(data));
  }

  // --- rendering --- //
  render() {
    return (
      <div>
        <h3>Add a Pokemon!</h3>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input fluid label="Name" placeholder="Name" name="name" />
            <Form.Input fluid label="hp" placeholder="hp" name="hp" />
            <Form.Input fluid label="Front Image URL" placeholder="url" name="frontUrl" />
            <Form.Input fluid label="Back Image URL" placeholder="url" name="backUrl" />
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    )
  }
}

export default PokemonForm
