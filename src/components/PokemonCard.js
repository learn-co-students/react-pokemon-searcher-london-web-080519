import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {

  state = {
    cardFront : true
  }

  handleCardClick = () => {
    this.setState({cardFront: !this.state.cardFront})
  }
  render() {
    return (
      <Card>
        <div>
          <div className="image">
            <img src={this.state.cardFront? this.props.sprites.front : this.props.sprites.back} onClick={this.handleCardClick} alt="oh no!" />
          </div>
          <div className="content">
            <div className="header">{this.props.name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {this.props.stats.find(object => object.name === "hp").value}
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard
