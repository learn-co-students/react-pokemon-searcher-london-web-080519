import React from "react";
import { Form } from "semantic-ui-react";

class PokemonForm extends React.Component {
  constructor() {
    super();

    this.state = {
      name: "",
      hp: "",
      front: "",
      back: ""
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    // console.log(this)

    this.props.handleAddNewPokemon(this.state).then(() => {this.setState({
      name: "",
      hp: "",
      front: "",
      back: ""
    })})
  };

  render() {
    return (
      <div>
        <h3>Add a Pokemon!</h3>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="Name"
              placeholder="Name"
              name="name"
              onChange={this.handleChange}
              value={this.state.name}
            />
            <Form.Input
              fluid
              label="hp"
              placeholder="hp"
              name="hp"
              onChange={this.handleChange}
              value={this.state.hp}
            />
            <Form.Input
              fluid
              label="Front Image URL"
              placeholder="url"
              name="front"
              onChange={this.handleChange}
              value={this.state.front}
            />
            <Form.Input
              fluid
              label="Back Image URL"
              placeholder="url"
              name="back"
              onChange={this.handleChange}
              value={this.state.back}
            />
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    );
  }
}

export default PokemonForm;
