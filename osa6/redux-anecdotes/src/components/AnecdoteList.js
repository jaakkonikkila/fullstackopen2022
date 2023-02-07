import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const Anecdote = ({anecdote, handleClick }) => {
    return(
        <div>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={handleClick}>vote</button>
            </div>
        </div>
    )
}

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => {
        if ( state.filter === '') {
            return state.anecdotes
        }
        return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
    })
    const anecdotesSorted = [...anecdotes].sort((a,b) => b.votes - a.votes)

    return(
        <div>
            {anecdotesSorted.map(anecdote =>
                <Anecdote 
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleClick={() => {
                        dispatch(voteAnecdote(anecdote))
                        dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
                    }
                    }
                />
            )}
        </div>
    )
}

export default AnecdoteList