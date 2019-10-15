import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {
  state = {
    displayCard: "front"
  }

  flipCard = () => {
    if (this.state.displayCard === "front") {
      this.setState({displayCard: "back"})
     // return this.state.displayCard // don't need to return
    } else {
      this.setState({displayCard: "front"})
     // return this.state.displayCard
    }
  }


  findHP = () => {
    let hp = Object.values(this.props.stats).filter(e=> e["name"] === "hp")
    return hp[0]["value"]
  }

  render() {
    let localHP = this.findHP()
    return (
      <Card>
        <div onClick={this.flipCard}>
          <div className="image">
            <img src={this.props.sprites[this.state.displayCard]} alt={this.props.name} />
          </div>
          <div className="content">
            <div className="header">{this.props.name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              hp {localHP}
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard
