const apiBase = "https://pokeapi.co/api/v2/pokemon/";
const game = document.getElementById("game");

loadPokemon = async () => {
    const ids = new Set();
    while (ids.size < 8) {
        const randomNumber = Math.ceil(Math.random() * 150);
        ids.add(randomNumber);
    }
    const Pokepromises = [...ids].map((id) => fetch(apiBase + id));
    const responses = await Promise.all(Pokepromises);
    return await Promise.all(responses.map((res) => res.json()));
};

const displayPoke = (pokemon) => {
    pokemon.sort(_ => Math.random() - 0.5);
    const pokeHTML = pokemon.map(pokemon => {
            return `
            < div class = "card" >
            <h2>${pokemon.name}</h2>
            </div >
            `
    }).join("");
    game.innterHTML = pokeHTML;
};

const resetGame = async () => {
    const pokemon = await loadPokemon();
    displayPoke([...pokemon, ...pokemon]);
};

resetGame();
