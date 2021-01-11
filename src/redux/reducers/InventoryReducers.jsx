const INITIAL_STATE = {
    capturedPokemons: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'CAPTURE':
            let temp = {
                ...state,
                capturedPokemons: [ ...state.capturedPokemons, action.payload]
            }
            localStorage.setItem('my_pokemon_list',JSON.stringify(temp))
            return temp
        case 'RELEASE':
            let result = state.capturedPokemons.filter((val)=>{
                return !(val.id === action.payload.id && val.nickname === action.payload.nickname) 
            })
            let obj = {
                capturedPokemons: result
            }
            localStorage.setItem('my_pokemon_list',JSON.stringify(obj))
            return {
                ...state,
                capturedPokemons: result
            }
        case 'RETRIEVE':
            return state.capturedPokemons = action.payload
        default:
            return state
    }
}