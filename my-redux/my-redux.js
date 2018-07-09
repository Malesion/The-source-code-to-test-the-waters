

export function createStore(reducer) {
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
       currentState = reducer(currentState, action)
       currentListeners.forEach(v=>v())
       return action
    }
    dispatch({type:'@my-redux'})
    return { getState, subscribe, dispatch }
}