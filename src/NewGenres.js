import React, { useState } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const NewGenres = () => {
    const [name, setName] = useState('')
    const [sucess, setSucess] = useState(false)
    const onChange = evt => {
        setName(evt.target.value)
    }
    const save = () => {
        axios
            .post('/api/genres', {
                name
            })
            .then(res => {
                setSucess(true)
            })
    }
    if (sucess)
        return <Redirect to='/genres' />
    return (
        <div className='container'>
            <h1>New Genres</h1>
            <form>
                <div className='form-group'>
                    <label htmlFor='name'>Name</label>
                    <input type='text' className='form-control' value={name} onChange={onChange} id='name' placeholder='Name of Genres' />
                </div>
                <button type='button' onClick={save} className='btn btn-primary'>Submit</button>
            </form>
        </div>
    )
}
export default NewGenres