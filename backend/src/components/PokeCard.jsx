const PokeCard = ({ pokemon }) => {
    return (
        <div className="poke-card">
            <h2>{pokemon.name}</h2>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <p>Altura: {pokemon.height / 10} m</p>
            <p>Peso: {pokemon.weight / 10} kg</p>
            <p>Tipos: {pokemon.types.map((t) => t.type.name).join(", ")}</p>
        </div>
    );
};

export default PokeCard;