import {combineReducers} from 'redux'
import InventoryReducers from './InventoryReducers'

export default combineReducers({
    Inventory: InventoryReducers
})