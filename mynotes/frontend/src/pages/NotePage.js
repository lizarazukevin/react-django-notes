import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'

const NotePage = () => {
    const { id } = useParams();
    
    let navigate = useNavigate()
    let [note, setNote] = useState(null)

    
    useEffect(() => {
        getNote()
        // eslint-disable-next-line
    }, [id])

    let getNote = async ()=> {
        if (id === 'new') return
        let response = await fetch(`/api/notes/${id}/`)
        let data = await response.json()
        setNote(data)
    }

    let createNote = async () => {
        fetch(`/api/notes/create`, {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(note)
        })
        navigate('/')
    }

    let updateNote = async () => {
        fetch(`/api/notes/${id}/update`, {
            method: "PUT",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(note)
        })
    }

    let deleteNote = async () => {
        fetch(`/api/notes/${id}/delete`, {
            method: 'DELETE',
            'headers': {
                'Content-Type': 'application/json'
            }
        })
        navigate('/')
    }

    let handleChange = (value) => {
        setNote({...note, 'body': value})
    }

    let handleSubmit = () => {
        if (id !== 'new' && note.body === '') {
            deleteNote()
        } else if (id !== 'new') {
            updateNote()
        } else if (id === 'new' && note.body !== null) {
            createNote()
        }
        navigate('/')
    }

  return (
    <div>
        <div className='note'>
            <div className='note-header'>
                <h3>
                    <ArrowLeft onClick={handleSubmit}/>
                </h3>

                {id !== 'new' ? (
                    <button onClick={deleteNote}>Delete</button>
                ) : (
                    <button onClick={createNote}>Done</button>
                )}

            </div>
            <textarea onChange={(e) => {handleChange(e.target.value)}} value={note?.body}></textarea>
        </div>
        
    </div>
  )
}

export default NotePage