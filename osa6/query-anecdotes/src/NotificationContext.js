import { createContext, useContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'CLEAR':
            return ''
        case 'MSG':
            return action.payload
        default:
            return state
    }
}

const CounterContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, '')

    return (
        <CounterContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
        </CounterContext.Provider>
    )
}

export const useNotificationValue = () => {
    const counterAndDispatch = useContext(CounterContext)
    return counterAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const counterAndDispatch = useContext(CounterContext)
    return counterAndDispatch[1]
}


export default CounterContext