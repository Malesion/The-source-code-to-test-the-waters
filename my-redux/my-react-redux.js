// react- redux
import React from 'react'
import propTypes from 'prop-types'



// connect负责链接组件，给redux里的数据放到组件的属性里
// export function connect(mapStateToProps, mapDispatchToProps) {
//     return function(WarpComponent) {
//         return class ConnectComponent extends React.Component {

//         }
//     }
// }
                //    ||

// 1.需要接受一个组件，把state里的数据放进去，返回一个新的组件
// 2.数据发生变化时，能够通知组件
export const connect = (mapStateToProps=State=>state, mapDispatchToProps={})=>(WarpComponent)=>{
    return class ConnectComponent extends React.Component {
        static contextTypes = {
            store: PropTypes.object
        }
        constructor(props, context) {
            super(props, context)
            this.state = {
                props:{}
            }
        }
        componentDidMount() {
            const {store} = this.store
            this.update()
        }
        update() {
            const {store} = this.context
            const stateProps = mapStateToProps(store.getState())
        }
        render() {
            return <WarpComponent {...this.state.props}></WarpComponent>
        }
    }
}


// provide，把store 放到context里，然后所有的子元素可以直接取到store
export class Provider extends React.Component {
    static childContextTypes = {
        store: propTypes.object
    }
    getChildContext() {
        return { store: this.store }
    }

    constructor(props, context) {
        super(props, context)
        this.store = props.store
    }

    render() {
        return this.props.children
    }
}
