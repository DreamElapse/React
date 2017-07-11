const LOAD = 'LOAD'
const LOAD_ASYNC = 'LOAD_ASYNC'

export function load (value) {
    return (dispatch, getStatee) => {
        dispatch({
            type    : LOAD,
            payload : value
        })

    }
}

export const loadAsync = () => {
    return (dispatch, getState) => {

        dispatch({
            type     : LOAD_ASYNC,
            payload  : getState().seckill
        })
    }
}


const initialState = {
    'a':1,
    'b':2
}

export default function seckillReducer( state = initialState, action){
    switch(action.type){
         case 'DETAIL':
            return state =  Object.assign({},state,{'a':state.a+action.payload})
        default :
            return state = Object.assign({},state,{'a':state.a*2});
    }
}