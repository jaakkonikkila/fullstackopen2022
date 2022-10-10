const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
}

const successStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
}

const Notification = ({ message, type }) => {
    if (message === null) {
      return null
    }
    if(type === 'error') {
        return (
            <div style={errorStyle}>
              {message}
            </div>
          )
    }
    if(type === 'success') {
        return (
            <div style={successStyle}>
              {message}
            </div>
          )
    }

  }


export default Notification;