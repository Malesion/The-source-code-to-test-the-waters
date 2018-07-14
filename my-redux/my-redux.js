
import { createStore } from './my-redux';

export function createStore(reducer, enhancer) {
    if (enhancer) {
        return enhancer(createStore)(reducer)
    }

    // 初始化当前的状态
    let currentState = {}
    let currentListeners = []
    function getState() {
        return currentState
    }
    function subscribe(listener) {
        currentListeners.push(listener)
    }
    function dispatch(action) {
        // 这里的reducer 的目的就是为了返回一个dispatch后的state
       currentState = reducer(currentState, action)
       currentListeners.forEach(v=>v())
       return action
    }
    dispatch({type:'@my-redux'})
    return { getState, subscribe, dispatch }
}


export function applyMiddleware(...middlewares) {
    return createStore => (...args) => {
        const store = createStore(...args)
        let dispatch = store.dispatch
        const midApi = {
            getState: store.getState,
            dispatch: (...args) => dispatch(...args)
        }
        const middlewareChain = middlewares.map(middleware=>middleware(midAPi))
        dispatch = compose(...middlewareChain)(store.dispatch)
        // dispatch = middleware(midApi)(store.dispatch)
        return {
            ...store,
            dispatch
        }
    }
}



function bindActionCreator(creator, dispatch) {
    return (...args) => dispatch(creator(...args))
}

export function bindActionCreators(creators, dispatch) {
    // 第一种写法  常规写法
    // let bound = {}
    // Object.keys(creators).forEach(v=>{
    //     let creator = creators[v]
    //     bound[v] = bindActionCreator(creator, dispatch)
    // })
    // return bound

    // 第二种写法  用reduce
    Object.keys(creators).reduce((ret, item)=>{
        ret[item] = bindActionCreator(creators[item], dispatch)
        return ret
    },{})
}