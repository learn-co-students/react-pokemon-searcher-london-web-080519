import React, {useState} from 'react'
import { Card } from 'semantic-ui-react'

const PokemonCard = props => {

  const [isFront, setIsFront] = useState(true)
  

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
    </Card>
  )
}

export default PokemonCard
