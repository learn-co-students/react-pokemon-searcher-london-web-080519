import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {

  state = ({
    cardType: true
  })

  changeCardType=()=>{
    this.setState({
      cardType: !this.state.cardType
    })
  }

  render() {
    return (
      <Card>
        <div>
          <div className="image" onClick={this.changeCardType}>
            <img src={this.state.cardType? this.props.pokemon.sprites.front : this.props.pokemon.sprites.back}  alt="oh no!" />
          </div>
          <div className="content">
            <div className="header">{this.props.pokemon.name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {this.props.pokemon.stats.find(stat => stat.name==='hp').value}
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard
