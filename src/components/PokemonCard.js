import React, {useState} from 'react'
import { Card, Button } from 'semantic-ui-react'

const PokemonCard = props => {

  const [isFront, setIsFront] = useState(true)
  const [showMoves, setShowMoves] = useState(false);
  

  return (
    <Card>
      <div onClick={() => setIsFront(!isFront)}>
        <div className="image">
          <img src={isFront ? props.sprites.front : props.sprites.back} alt={props.name} />
        </div>
        <div className="content">
          <div className="header">{props.name}</div>
        </div>
        <div className="extra content">
          <span>
            <i className="icon heartbeat red" />
            {props.stats.find(stat => stat.name === 'hp').value}
          </span>
        </div>
      </div>
      <div class="moves-container">
        <Button onClick={() => setShowMoves(!showMoves)}>{showMoves ? "Hide Moves" : "Show Moves"}</Button>
        <ul>
          { showMoves ? 
            (props.moves.length > 0 ? props.moves.map(move => <li>{move}</li>) : <li>No Moves</li>) :
            null
          }
        </ul>
      </div>
    </Card>
  )
}

export default PokemonCard
