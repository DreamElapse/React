export const DETAIL = 'DETAIL'
export const DETAIL_ASYNC = 'DETAIL_ASYNC'

export function detail (value = 1) {
    return (dispatch, getState) => {
        dispatch({
            type    : DETAIL,
            payload : value
        })
        console.log(getState())
    }
    
}

export const detailAsync = () => {
    return (dispatch, getState) => {
        
        dispatch({
            type    : DETAIL_ASYNC,
            payload : getState().detailDemo
        })
        console.log(getState())
           
    }
}


// action handlers
export const actions = {
    detail,
    detailAsync
}


const initialState = {
    'a':1,
    'b':2
}
export default function detailDemoReducer(state = initialState, action){
    switch(action.type){
         case 'DETAIL':
            return state =  Object.assign({},state,{'a':state.a+action.payload})
        default :
            return state = Object.assign({},state,{'a':state.a*2});
    }
       
}