import React, { useEffect,useState } from 'react';
import BottomTab from '../components/BottomTab';
import Header from '../components/Header';
import { GET_POKEMON, GRAPHQL_API, IMAGE_URL } from '../helpers';
import axios from 'axios'
import Loading from './Loading';
import Pokeball from './../assets/pokeball.png'
import Swal from 'sweetalert2'
import { connect } from 'react-redux';
import {CaptureFunc} from './../redux/actions'

const Detail = (props) => {
    const {match} = props
    let {name} = match.params

    const gqlVariables = {
        name: name,
    };

    const [pokemon,setPokemon] = useState(null)


    useEffect(()=>{
        getPokemon()
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
            console.log(response.data.data.pokemon);
            setPokemon(response.data.data.pokemon)
        }).catch((err) => console.log(err))
    }

    const renderAbility=()=>{
        const {abilities} = pokemon
        return abilities.map((val,index)=>{
            return(
                <p className='detail-content'>{val.ability.name}</p>
            )
        })
    }

    const catchPokemon=()=>{
        let chance = Math.round(Math.random())
        let timerInterval
        console.log(chance)
        Swal.fire({
            title: 'You just throw the pokeball!',
            html: 'wait for a sec',
            timer: 1000,
            didOpen: () => {
                Swal.showLoading()
                timerInterval = setInterval(() => {
                    const content = Swal.getContent()
                    if (content) {
                        const b = content.querySelector('b')
                        if (b) {
                        b.textContent = Swal.getTimerLeft()
                        }
                    }
                }, 100)
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
            }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                if(chance){
                    let renamePokemon
                    Swal.fire({
                        title: `Gotcha!`,
                        text: `You just catch ${pokemon.name}, give them name`,
                        imageUrl: 'https://static2.srcdn.com/wordpress/wp-content/uploads/2020/07/Poke-Ball-Catch-Pokemon-Sword-Shield.jpg?q=50&fit=crop&w=740&h=370',
                        imageWidth: 400,
                        imageHeight: 200,
                        imageAlt: 'Custom image',
                        input: 'text',
                        showLoaderOnConfirm: true,
                        preConfirm: (rename) => {
                            if(!rename){
                                Swal.showValidationMessage(
                                    `Required`
                                )
                            } else {
                                renamePokemon = rename.toLowerCase()
                                if(props.Inventory.capturedPokemons.some(pokemon => pokemon.nickname === renamePokemon)){
                                    Swal.showValidationMessage(
                                        `Nickname is already registered`
                                    )
                                } else {
                                    let obj = {
                                        id: pokemon.id,
                                        name: pokemon.name,
                                        nickname: renamePokemon,
                                        image: pokemon.sprites.front_default
                                    }
                                    props.CaptureFunc(obj)
                                }
                            }
                        }
                    }).then((result)=>{
                        if(result.isConfirmed){
                            Swal.fire(
                                'Success!',
                                `${renamePokemon} just added to your bag`,
                                'success'
                            )
                        }
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: `${pokemon.name} just ran away!`
                    })
                }
            }
        })

    }

    if(pokemon===null){
        return <Loading/>
    }
    
    return (
        <div>
            <Header/>
            <section className='detail'>
                <div className="container">
                    <div className="card-detail">
                        <div className="detail-img">
                            <img src={IMAGE_URL+pokemon.id+'.png'} alt='img-profile'/>
                        </div>
                        <div className="detail-description">
                            <div className="detail-description-side">
                                <p className='detail-title'>Name:</p>
                                <p className='detail-content'>{pokemon.name}</p>
                                <p className='detail-title'>Type:</p>
                                <p className='detail-content'>{pokemon.types[0].type.name}</p>
                            </div>
                            <div className="detail-description-side">
                                <p className='detail-title'>Abilities:</p>
                                {renderAbility()}
                            </div>
                            <div className="pokeball" onClick={catchPokemon}>
                                <img src={Pokeball} alt=""/>
                                <p className='detail-title'>Catch 'em</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <BottomTab/>
        </div>
    )
}

const ReduxProps=(state)=>{
    return {
        Inventory : state.Inventory
    }
}

export default connect(ReduxProps,{CaptureFunc})(Detail)