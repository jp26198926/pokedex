import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import './../styling/Pokemon.css';

const Pokemon = () => {
    const selectedPokemon = useSelector(state => state.selectedPokemon);
        
    return (
        <div className="pokemonData">            
           
            <div className="forImage border border-warning rounded p-2 text-center">
                <img src={selectedPokemon.image} alt={selectedPokemon.name} />
            </div>

            <div className="forDescription p-2">
                <h1>{selectedPokemon.name}</h1>
                {selectedPokemon.description}
                
                <br /><br />

                {
                    selectedPokemon.types.map(type => {
                        return (
                            <Button as={Link} to={`/types/${type}`} key={type} variant="warning" className="m-1">{type}</Button>
                        )
                    })
                }
            </div> 
        </div>
    )
}

export default Pokemon
