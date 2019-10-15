import React from "react";
import { Card } from "semantic-ui-react";

class PokemonCard extends React.Component {
  state = {
    cardFront: true
  };

  getPokemonHp = () => {
    return this.props.stats.map(stat => {
      if (stat.name === "hp") {
        return stat.value;
      }
    });
  };

  handleCardClick = () => {
    this.setState({
      cardFront: !this.state.cardFront
    });
  };

  render() {
    const { name, sprites } = this.props;
    const { handleCardClick } = this;
    const { cardFront } = this.state;
    return (
      <Card>
        <div>
          <div className="image" onClick={handleCardClick}>
            {cardFront ? (
              <img src={sprites.front} alt={name} />
            ) : (
              <img src={sprites.back} alt={name} />
            )}
          </div>
          <div className="content">
            <div className="header">{name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {this.getPokemonHp()}
            </span>
          </div>
        </div>
      </Card>
    );
  }
}

export default PokemonCard;
