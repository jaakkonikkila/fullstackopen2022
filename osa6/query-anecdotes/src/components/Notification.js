import { useNotificationValue, useNotificationDispatch } from "../NotificationContext"

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const message = useNotificationValue()
  const dispatch = useNotificationDispatch()
  
  setTimeout(() => {
    dispatch({type: 'CLEAR'})
  }, 5000)

  if (message === '') return null

  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification
