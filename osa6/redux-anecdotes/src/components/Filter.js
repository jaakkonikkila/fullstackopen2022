import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const Filter = () => {
    const dispatch = useDispatch()

    const changeFilter = (event) => {
        event.preventDefault()
        const content = event.target.value
        dispatch(filterChange(content))
    }
    const style = {
        marginBottom: 10
    }

    return(
        <div style={style}>
            filter <input name='filter' onChange={changeFilter} />
        </div>
    )
}

export default Filter