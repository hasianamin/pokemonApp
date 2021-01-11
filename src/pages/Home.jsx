import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { GET_POKEMONS, GRAPHQL_API } from './../helpers';
import Header from '../components/Header';
import BottomTab from '../components/BottomTab';
import Card from '../components/Card';
import Loading from './Loading'
import InfiniteScroll from 'react-infinite-scroll-component';



const Home = () => {
    const [pokemons,setPokemons] = useState(null)
    let [page,setPages] = useState(1)
    const [gqlVariables,setGqlVariables] = useState({
      limit: 8,
      offset: 0,
    })

    const modifyPage=()=>{
        setPages(page+1)
        setGqlVariables({
            limit: gqlVariables.limit + 8,
            offset:0
        })
    }

    useEffect(()=>{
        setGqlVariables({
            limit: gqlVariables.limit + 8,
            offset:0
        })
        getPokemons()
    },[page])

    const getPokemons=async()=>{
        return await axios({
        url: GRAPHQL_API,
        method: 'POST',
        credentials: 'omit',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify({
            query: GET_POKEMONS,
            variables: gqlVariables,
        })
        })
        .then((response) => {
            setPokemons(response.data.data.pokemons.results)
        }).catch((err) => console.log(err))
    }

    const renderCard=()=>{
        return (
            <InfiniteScroll 
                dataLength={pokemons.length}
                next={()=>modifyPage()}
                hasMore={true}
                className="content-box"
            >
                {
                    pokemons.map((val,index)=>{
                    return (
                        <Card data={val} key={index}/>
                    )
                    })
                }
            </InfiniteScroll>
        )
    }

    if(pokemons===null){
        return <Loading/>
    }

    return (
        <div>
            <Header/>
            <section>
                <div className="container" id="scrollableDiv">
                    <div className="title-page">
                        <h3>Pokedex</h3>
                    </div>
                    <div className="content-box">
                        {renderCard()}
                        <div className='title-page' onClick={modifyPage} style={{cursor:'pointer'}}>
                            Load more
                        </div>
                    </div>
                </div>
            </section>
            <BottomTab/>
        </div>
    )
}

export default Home