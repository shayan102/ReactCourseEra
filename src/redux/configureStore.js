import {createStore , combineReducers , applyMiddleware} from 'redux';
import { Promotions } from './promotions' ;
import { Comments } from './comments';
import { Leaders } from './leaders';
import { Dishes } from './dishes';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers ({
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders
        }),
        applyMiddleware(thunk , logger)
    );

    return store;
}