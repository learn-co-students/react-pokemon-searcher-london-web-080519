const BASE_URL = "http://localhost:3000/pokemon/";

export const getPokemon = () => fetch(BASE_URL).then(resp => resp.json());
export const postPokemon = data =>
  fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(resp => resp.json());

export default {
  getPokemon,
  postPokemon
};
