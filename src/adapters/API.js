const BASE_URL = "http://localhost:3000"
const POKEMON_URL = `${BASE_URL}/pokemon`

const getAllPokemon = () => {
    return fetch(POKEMON_URL).then(resp => resp.json())
}

const postNewPkmon = newPkmon => {
    const configObj = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(newPkmon)
    }
    return fetch(POKEMON_URL, configObj).then(resp => resp.json())
}

export default {
    getAllPokemon,
    postNewPkmon
}