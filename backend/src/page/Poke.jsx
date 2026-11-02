import { useEffect, useState } from 'react';
import PokeCard from '../components/PokeCard.jsx';

const Poke = () => {
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                const promesas = [];
                for (let i = 1; i <= 20; i++) {
                    promesas.push(
                        fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then((res) => res.json())
                    );
                }
                const data = await Promise.all(promesas);
                setPokemons((prev) => [...prev, data]);
            } catch (error) {
                console.error(`Error al obtener los pokemons: ${error}`);
            }
        };

        fetchPokemons();
    }, []);

    return (
        <div className="poke-container">
            {pokemons.length === 0 ? (
                <p>Cargando...</p>
            ) : (
                pokemons.map((pokemon) => (
                    <PokeCard key={pokemon.id} pokemon={pokemon} />
                ))
            )}
        </div>
    );
};

export default Poke;