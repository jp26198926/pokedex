import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Route, Switch } from 'react-router-dom';
import { useHistory } from 'react-router';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

//data
import Pokemons from './data/pokemon.json';
import Types from './data/PokemonTypes.json';

//custom component
import PokemonList from './component/PokemonList';
import Pokemon from './component/Pokemon';

import './styling/App.css';

function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  const types = useSelector(state => state.types);
  const selectedPokemon = useSelector(state => state.selectedPokemon);
  const filter = useSelector(state => state.filter);
  
  const triggerChange = e => {
    history.push('/types/' + e.target.value);
  }

  useEffect(() => {
    //set data to reducer
    dispatch({ type: 'SET_TYPES', payload: Types });
    dispatch({ type: 'SET_POKEMONS', payload: Pokemons });
    dispatch({ type: 'SHOW_LIST', payload: 'all' });
    history.push('/types/All');// redirect page to show all pokemons
  }, []); 
 
  return (    
    <div className="App">
      <Container>
        <Row>
          <Col xs="12" className="mt-2">
            <h1>
              PokeDex
              <Form.Select onChange={triggerChange} value={filter} className="my-2 d-sm-none" >
                {
                types.map(type => {
                  return (                    
                    <option
                      value={type.type}
                      key={type.type}
                    >
                      {type.type}
                    </option>
                  )
                })
              }              
              </Form.Select>
            </h1>
          </Col>
        </Row>
          
        <Row>
          <Col xs={12} sm={12} md={2} className="d-none d-md-block">
            <div className="d-grid gap-2 mb-2">
              <Button
                as={Link}
                to={`/types/All`}
                variant={'warning'}
              >
                Home
              </Button>
            </div>
            <div className="d-grid gap-2" style={{maxHeight:'70vh', overflowY: 'scroll'}}>                
              {
                types.map(type => {
                  return (                    
                    <Button
                      as={Link}
                      to={`/types/${type.type}`}
                      variant={'warning'}
                      key={type.type}
                    >
                      {type.type}
                    </Button>
                  )
                })
              }              
            </div>
          </Col>

          <Col xs={12} sm={10}>
            <Switch>              

              <Route path='/types/:type'>
                {/* show pokemon list*/}                
                <PokemonList />
              </Route>              

              <Route path='/:pokemon'>
                {/* show pokemon details*/}
                {
                  Object.keys(selectedPokemon).length > 0  ? <Pokemon  /> : 'No Data!'
                }                
              </Route>
              
            </Switch>
          </Col>

        </Row>
      </Container>  
        
    </div>
  );
}

export default App;
