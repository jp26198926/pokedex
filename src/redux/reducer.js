const initialState = {
    types: [],
    pokemons: [],
    filter: 'All',
    showList: [],
    selectedName: '',
    selectedPokemon: {}
}
const reducer = (state=initialState, action) => {
    
    switch (action.type) {
        case 'SET_TYPES':
            return { ...state, types: action.payload }
        
        case 'SET_POKEMONS':            
            return { ...state, pokemons: action.payload }
        
        case 'SHOW_LIST':
            if (action.payload.toLowerCase() === 'all') {
                return {...state, filter: 'all', showList: [...state.pokemons]}
            } else {
                return {...state, filter: action.payload, showList: [...state.pokemons.filter(pokemon => pokemon.types.includes(action.payload))]}
            }
         
        case 'SET_SELECTED':
            return { ...state, selectedPokemon: action.payload }
        
        default:
            return state;
    }    
}

export default reducer;