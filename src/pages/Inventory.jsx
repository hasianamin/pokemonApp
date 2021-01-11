import React, { useEffect, useState } from 'react';
import BottomTab from '../components/BottomTab';
import Header from '../components/Header';
import InfiniteScroll from 'react-infinite-scroll-component';
import Card from './../components/Card'
import { connect } from 'react-redux';
import {ReleaseFunc} from './../redux/actions'

const Inventory = (props) => {

    const [pokemons,setPokemons] = useState(null)

    let [page,setPages] = useState(1)
    const [gqlVariables,setGqlVariables] = useState({
      limit: 8,
      offset: 0,
    })

    useEffect(()=>{
        setPokemons(props.Inventory.capturedPokemons)
    },[page,props.Inventory])

    const modifyPage=()=>{
        setPages(page+1)
        console.log(page)
        setGqlVariables({
            limit: gqlVariables.limit + 8
        })
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

    return (
        <div>
            <Header/>
            <section>
                <div className="container" id="scrollableDiv">
                    <div className="title-page">
                        <h3>My Pokemon List</h3>
                    </div>
                    <div className="content-box">
                        {pokemons? renderCard() : null}
                    </div>
                </div>
            </section>
            <BottomTab/>
        </div>
    )
}

const ReduxProps=(state)=>{
    return {
        Inventory: state.Inventory
    }
}

export default connect(ReduxProps,{ReleaseFunc})(Inventory)