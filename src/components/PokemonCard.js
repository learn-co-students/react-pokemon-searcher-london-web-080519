import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {

state = {
  showingFront: true 
}

toggleView = () => {
  // console.log(this.state);
  this.setState({
      showingFront: !this.state.showingFront
  })
}


  render() {
    return (
      <Card>
        <div>
          <div className="image">
          { this.state.showingFront ? 
            <img src = {this.props.pokemon.sprites.front} alt="oh no!" onClick = {this.toggleView} />
            : <img src = {this.props.pokemon.sprites.back} alt="oh no!" onClick = {this.toggleView} />
          }
          </div>
          <div className="content">
            <div className="header">{this.props.pokemon.name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {this.props.pokemon.stats.find(stat => stat.name === 'hp').value}
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard
