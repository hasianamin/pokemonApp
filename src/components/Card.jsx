import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import { HeaderView } from '../helpers';
import * as Icon from 'react-bootstrap-icons'
import { connect } from 'react-redux';
import {ReleaseFunc} from './../redux/actions'
import Swal from 'sweetalert2'

import axios from 'axios'
import {GRAPHQL_API,GET_POKEMON} from './../helpers'
import Skeleton from 'react-loading-skeleton'

const colors = {
	fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};

const Card=(props)=>{
    const {name,id} = props.data

    const releasePokemon=(nickname,id)=>{
        Swal.fire({
            title: `Release ${nickname}?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                let obj = {
                    nickname,
                    id
                }
                props.ReleaseFunc(obj)
                console.log(nickname)
                Swal.fire(
                    'Released!',
                    `${nickname} has been released`,
                    'success'
                )
            }
        })
    }

    const [pokemon,setPokemon] = useState(null)
    const [vw,setVw] = useState(0)
    const [vh,setVh] = useState(0)


    const gqlVariables = {
        name: name,
    }

    const [qty,setQty] = useState(0)

    useEffect(()=>{
        if(props.Inventory.capturedPokemons.some(pokemon => pokemon.id === id)){
            let count = props.Inventory.capturedPokemons.filter((val)=>{
                return val.id === id
            })
            setQty(count.length)
        }

        getPokemon()

        setVw((Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0))/2.5)
        setVh((Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0))/5)
        
        if(Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) > 1024){
            setVw(vw/1.5)
        }
    },[])

    const getPokemon=async()=>{
        return await axios({
        url: GRAPHQL_API,
        method: 'POST',
        credentials: 'omit',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify({
            query: GET_POKEMON,
            variables: gqlVariables,
        })
        })
        .then((response) => {
            setPokemon(response.data.data.pokemon)
        }).catch((err) => console.log(err))
    }

    const pokemonType=(type)=>{
        if(type === 'fire') return colors.fire
        if(type === 'grass') return colors.grass
        if(type === 'electric') return colors.electric
        if(type === 'water') return colors.water
        if(type === 'ground') return colors.ground
        if(type === 'rock') return colors.rock
        if(type === 'fairy') return colors.fairy
        if(type === 'poison') return colors.poison
        if(type === 'bug') return colors.bug
        if(type === 'dragon') return colors.dragon
        if(type === 'psychic') return colors.psychic
        if(type === 'flying') return colors.flying
        if(type === 'fighting') return colors.fighting
        if(type === 'normal') return colors.normal
    }

    return (
        HeaderView() === '/'?
        pokemon?
        <Link to={`/detail/${pokemon.name}`}>
            <span className='content-card' style={{backgroundColor: pokemonType(pokemon.types[0].type.name)}}>
                {
                    qty?
                    <div className="badge badge-active">
                        {qty}
                    </div> : null
                }
                <div>
                    <img src={pokemon.sprites.front_default} alt='pokemon'/>
                </div>
                <div>
                    <p><b>{pokemon.name}</b></p>
                </div>
            </span>
        </Link> 
        :
        <span className='content-card'>
            <Skeleton height={vh} width={vw}/>
        </span>
        :
        pokemon?
        <span className='content-card' style={{backgroundColor: pokemonType(pokemon.types[0].type.name)}}>
            <div className="badge badge-active" onClick={()=>releasePokemon(props.data.nickname,props.data.id)}>
                <Icon.Trash size={12}/>
            </div>
            <div>
                <img src={pokemon.sprites.front_default} alt='pokemon'/>
            </div>
            <div>
                <p>{props.data.nickname}</p>
            </div>
        </span>
        :
        <span className='content-card'>
            <Skeleton height={vh} width={vw}/>
        </span>
    )
}

const ReduxProps=(state)=>{
    return {
        Inventory: state.Inventory
    }
}

export default connect(ReduxProps,{ReleaseFunc})(Card)