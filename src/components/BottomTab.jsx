import React from 'react';
import * as Icon from 'react-bootstrap-icons'
import { HeaderView } from '../helpers';
import {Link} from 'react-router-dom'

const BottomTab=()=>{
    return (
        <div className='bottom-tab'>
            {
                HeaderView() === '/'?
                <>
                    <div className='tab-icon'>
                        <Link to='/'>
                            <Icon.HouseDoorFill size={28}/>
                        </Link>
                    </div>
                    <div className='tab-icon'>
                        <Link to='/inventory'>
                            <Icon.Person size={28}/>
                        </Link>
                    </div>
                </>
                : HeaderView() === '/inventory'?
                <>
                    <div>
                        <Link to='/'>
                            <Icon.HouseDoor size={28}/>
                        </Link>
                    </div>
                    <div>
                        <Link to='/inventory'>
                            <Icon.PersonFill size={28}/>
                        </Link>
                    </div>
                </>
                :
                <>
                    <div>
                        <Link to='/'>
                            <Icon.HouseDoor size={28}/>
                        </Link>
                    </div>
                    <div>
                        <Link to='/inventory'>
                            <Icon.Person size={28}/>
                        </Link>
                    </div>
                </>
            }
        </div>
    )
}

export default BottomTab