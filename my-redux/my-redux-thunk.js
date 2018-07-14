
// thunk 的使用 是需要结合 my-redux.js 里的 applyMiddleware 函数

const thunk = ({dispatch, getState}) => next => action => {
    // 如果action是函数，那么就是异步的 所以要执行以下，参数是dispatch 和getState
    if (typeof action == 'function') {
        return action(dispatch, getState)
    }
    // 默认是 什么都没干
    return next(action)
}
exprot default thunk
