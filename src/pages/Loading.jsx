import React from 'react';
import BottomTab from '../components/BottomTab';
import Header from '../components/Header';
import ClipLoader from "react-spinners/ClipLoader";

const Loading = () => {
    return (
        <div>
            <Header/>
                <div className="loading-comp">
                    <ClipLoader color={'#fff'} loading={true} size={(Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0))/4} />
                </div>
            <BottomTab/>
        </div>
    )
}

export default Loading