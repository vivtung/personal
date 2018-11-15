import { FETCH_CARS } from '../actions/types';
import { fromJS } from 'immutable'

const initialState = fromJS({
    allCars: []
  })


export default function carReducer(state = initialState, action) {
  let newState = state

  switch (action.type) {
    case FETCH_CARS:
      newState = state.set('allCars', fromJS(action.cars.cars))
      return newState
    default:
      return state;
  }
}