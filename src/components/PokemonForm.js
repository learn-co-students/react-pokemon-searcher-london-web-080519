import React from "react";
import { Form } from "semantic-ui-react";
import { format } from "path";
import PokemonCard from "./PokemonCard";

class PokemonForm extends React.Component {
  constructor() {
    super();

    this.state = {
      name: "",
      hp: "",
      frontUrl: "",
      backUrl: ""
    };
  }

  handleOnChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = () => {
    this.props.postNewPokemon(this.state);
    this.setState({
      name: "",
      hp: "",
      frontUrl: "",
      backUrl: ""
    });
  };

  render() {
    const { name, hp, frontUrl, backUrl } = this.state;
    const { handleOnChange, handleSubmit } = this;
    return (
      <div>
        <h3>Add a Pokemon!</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="Name"
              placeholder="Name"
              name="name"
              onChange={event => handleOnChange(event)}
              value={name}
            />
            <Form.Input
              fluid
              label="hp"
              placeholder="hp"
              name="hp"
              onChange={event => handleOnChange(event)}
              value={hp}
            />
            <Form.Input
              fluid
              label="Front Image URL"
              placeholder="url"
              name="frontUrl"
              onChange={event => handleOnChange(event)}
              value={frontUrl}
            />
            <Form.Input
              fluid
              label="Back Image URL"
              placeholder="url"
              name="backUrl"
              onChange={event => handleOnChange(event)}
              value={backUrl}
            />
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    );
  }
}

export default PokemonForm;
