import React from "react";
import PokemonCollection from "./PokemonCollection";
import PokemonForm from "./PokemonForm";
import { Search } from "semantic-ui-react";
import _ from "lodash";

class PokemonPage extends React.Component {
	state = {
		pokemon: [],
		search: "",
		sortByHp: false,
	};

	componentDidMount() {
		fetch("http://localhost:3000/pokemon")
			.then(resp => resp.json())
			.then(pokemon => this.setState({ pokemon }));
	}

	handleSearch = event => {
		this.setState({ search: event.target.value });
	};

	findPokemon = () =>
		this.state.pokemon.filter(pokemon =>
			pokemon.name.includes(this.state.search),
		);

	createPokemon = event => {
		event.preventDefault();
		let newPokemon = {
			name: event.target.name.value,
			stats: [
				{
					name: "hp",
					value: event.target.hp.value,
				},
			],
			sprites: {
				front: event.target.frontUrl.value,
				back: event.target.backUrl.value,
			},
		};

		fetch("http://localhost:3000/pokemon", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newPokemon),
		}).then(ans =>
			fetch("http://localhost:3000/pokemon")
				.then(resp => resp.json())
				.then(pokemon => this.setState({ pokemon })),
		);

		// this.setState({ pokemon: [...this.state.pokemon, newPokemon] });

		event.target.name.value = "";
		event.target.hp.value = "";
		event.target.frontUrl.value = "";
		event.target.backUrl.value = "";
	};

	handleSort = () => {
		this.setState({ sortByHp: !this.state.sortByHp });
	};

	sortPokemon = pokemon => {
		return this.state.sortByHp
			? pokemon.sort(
					(a, b) =>
						b.stats.find(s => s.name === "hp").value -
						a.stats.find(s => s.name === "hp").value,
			  )
			: pokemon;
	};

	render() {
		return (
			<div>
				<h1>Pokemon Searcher</h1>
				<br />
				<PokemonForm handleSubmit={this.createPokemon} />
				<br />
				<Search onSearchChange={this.handleSearch} showNoResults={false} />
				<br />
				<button onClick={this.handleSort}>
					{this.state.sortByHp ? "Sort by HP: ON" : "Sort by HP: OFF"}
				</button>
				<br />
				<br />
				<PokemonCollection pokemon={this.sortPokemon(this.findPokemon())} />
			</div>
		);
	}
}

export default PokemonPage;
