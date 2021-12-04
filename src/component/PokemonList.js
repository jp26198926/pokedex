import React, {useEffect } from 'react';
import { useParams, useHistory} from 'react-router';
import { Col, Row, Card } from 'react-bootstrap';
import './../styling/PokemonList.css';

import { useSelector,useDispatch } from 'react-redux';

const PokemonList = () => {
    const history = useHistory();
    const { type } = useParams();
    const showList = useSelector(state => state.showList);
    const dispatch = useDispatch();    
    
    const triggerClick = (pokemonData) => {
        dispatch({ type: 'SET_SELECTED', payload: pokemonData });
        history.push(`/${pokemonData.name}`);
    }

    useEffect(() => { 
        dispatch({ type: 'SHOW_LIST', payload: type });
    }, [dispatch, type])

    return (
        <div>            
            <Row>
            {
                showList.length > 0
                    ? //if
                    showList.map(pokemon => {
                        return (
                            <Col md={2} sm={4}  className="mb-2" key={pokemon.ntnlnum}>
                                <Card bg="warning"  className="border border-warning" >
                                    <Card.Header >{pokemon.name}</Card.Header>
                                    <Card.Body className="bg-light">
                                        <Card.Img src={pokemon.image} onClick={() => triggerClick(pokemon)} />
                                        <Card.Text>{pokemon.ntnlnum}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })
                    : //else
                    'No Data!'              
            }
            </Row>
        </div>
    )
}

export default PokemonList
