import React, { useState } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const NewTvShow = () => {
    const [name, setName] = useState('')
    const [sucess, setSucess] = useState(false)
    const onChange = evt => {
        setName(evt.target.value)
    }
    const save = () => {
        axios
            .post('/api/series/', {
                name
            })
            .then(res => {
                setSucess(true)
            })
    }
    if (sucess)
        return <Redirect to='/tv' />
    return (
        <div className='container'>
            <h1>New Tv Show</h1>
            <form>
                <div className='form-group'>
                    <label htmlFor='name'>Name</label>
                    <input type='text' className='form-control' onChange={onChange} id='name' placeholder='Name of Tv Show'></input>
                </div>
                <button type='button' onClick={save} className='btn btn-primary'>Submite</button>
            </form>
        </div>
    )
}
export default NewTvShow