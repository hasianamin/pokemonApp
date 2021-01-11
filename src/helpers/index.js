import {useLocation} from 'react-router-dom'
export const HeaderView=()=>{
  const location = useLocation();
  return location.pathname
}

export const GRAPHQL_API = 'https://graphql-pokeapi.vercel.app/api/graphql'

export const TITLE = 'Pokemon List'

export const GET_POKEMONS = `query pokemons($limit: Int, $offset: Int) {
  pokemons(limit: $limit, offset: $offset) {
    next
    results {
      name
      id
    }
  }
}`

export const GET_POKEMON = `query pokemon($name:String!){
  pokemon(name: $name){
    id,
    name,
    abilities{
      ability{
        name
      }
    },
    types{
      type{
        name
      }
    },
    sprites{
      front_default
    }
  }
}`

export const IMAGE_URL = 'https://pokeres.bastionbot.org/images/pokemon/'