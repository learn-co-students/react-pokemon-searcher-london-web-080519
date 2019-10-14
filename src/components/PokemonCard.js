import React from "react";
import { Card } from "semantic-ui-react";

class PokemonCard extends React.Component {
	state = { side: "front" };

	handleClick = () => {
		this.setState({ side: this.state.side === "front" ? "back" : "front" });
	};

	render() {
		return (
			<Card onClick={this.handleClick}>
				<div>
					<div className="image">
						<img
							src={this.props.sprites[this.state.side]}
							alt={this.props.name}
						/>
					</div>
					<div className="content">
						<div className="header">{this.props.name}</div>
					</div>
					<div className="extra content">
						<span>
							<i className="icon heartbeat red" />
							{`${this.props.stats.find(stat => stat.name === "hp").value} hp`}
						</span>
					</div>
				</div>
			</Card>
		);
	}
}

export default PokemonCard;
