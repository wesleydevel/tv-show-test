import React, { useState, useEffect} from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const EditGenres = ({match}) => {
    const [name, setName] = useState('')
    const [sucess, setSucess] = useState(false)
    useEffect( ()=> {
        axios
            .get('/api/genres/' + match.params.id)
            .then( res => {
                setName(res.data.name)
            })
    }, [match.params.id])

    const onChange = evt => {
        setName(evt.target.value)
    }
    const save = () => {
        axios
            .put('/api/genres/' + match.params.id, {
                name
            })
            .then( res => {
                setSucess(true)
            }) 
    }
    if(sucess)
        return <Redirect to='/genres'/>

    return (
        <div className='container'>
            <h1>Edit Genres</h1>
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
export default EditGenres