import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Badge } from 'reactstrap'
import { Redirect } from 'react-router-dom'

const InfoTvShow = ({ match }) => {
    const [form, setForm] = useState({
        name: ''
    })
    const [success, setSuccess] = useState(false)
    const [data, setData] = useState({})
    const [mode, setMode] = useState('INFO')
    const [genres, setGenres] = useState([])
    const [genreId, setGenreId] = useState('')
    useEffect(() => {
        axios
            .get('/api/series/' + match.params.id)
            .then(res => {
                setData(res.data)
                setForm(res.data)
            })
    }, [match.params.id])
    useEffect(() => {
        axios
            .get('/api/genres')
            .then(res => {
                setGenres(res.data.data)
                const genres = res.data.data
                const found = genres.find(value => data.genre === value.name)
                if (found) {
                    setGenreId(found.id)
                }
            })
    }, [data])

    // Custom header
    const masterHeader = {
        height: '50vh',
        minHeight: '500px',
        backgroundImage: `url('${data.background}')`,
        backgroundSize: 'couver',
        backgroundPosition: 'cener',
        backgroundRepeat: 'no-repeat'
    }

    const onChange = field => evt => {
        setForm({
            ...form,
            [field]: evt.target.value
        })
    }
    const onChangeGenre = evt => {
        console.log(evt.target.value)
        setGenreId(evt.target.value)
        console.log(genreId)
    }
    const select = value => () => {
        setForm({
            ...form,
            status: value
        })
    }
    const save = () => {
        axios
            .put('/api/series/' + match.params.id, {
                ...form,
                genre_id: genreId
            })
            .then(res => {
                setSuccess(true)
            })
    }
    if(success)
         return <Redirect to='/tv' />
    return (
        <div>
            <header style={masterHeader}>
                <div className='h-100' style={{ background: 'rgba(0,0,0,0.7)' }}>
                    <div className='h-100 container'>
                        <div className='row h-100 align-items-center'>
                            <div className='col-3'>
                                <img alt={data.name} className='img-fluid img-thumbnail' src={data.poster} />
                            </div>
                            <div className='col-9'>
                                <h1 className='font-weight-light text-white'>{data.name}</h1>
                                <div className='lead text-white'>
                                    {
                                        data.status === 'WATCHED' &&
                                        <Badge color='success'>Watched</Badge>
                                    }
                                    {
                                        data.status === 'TOWATCH' &&
                                        <Badge color='warning'>To Watch</Badge>
                                    }
                                    Genres: {data.genre}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div>
                <button className='btn btn-primary' onClick={() => setMode('EDIT')}>Edit</button>
            </div>
            {
                mode === 'EDIT' &&
                <div className='container'>
                    <h1>Info Tv Show</h1>
                    <pre>{JSON.stringify(form)}</pre>
                    <pre>{JSON.stringify(genres)}</pre>
                    <button className='btn btn-primary' onClick={() => setMode('INFO')}>Cancel Edit</button>
                    <form>
                        <div className='form-group'>
                            <label htmlFor='name'>Name</label>
                            <input type='text' value={form.name} onChange={onChange('name')} id='name' className='form-control' placeholder='Edit Tv Show'></input>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='comments'>Comments</label>
                            <input type='text' value={form.comments} onChange={onChange('comments')} id='comments' className='form-control' placeholder='Comment Tv Show'></input>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='genres'>Genres</label>
                            <select className='form-control' onChange={onChangeGenre} value={genreId}>
                                {genres.map(genre => <option key={genre.id} value={genre.id} >{genre.name}</option>)}
                            </select>
                        </div>
                        <div className='form-check'>
                            <input className='form-check-input' type='radio' checked={form.status === 'WATCHED'} name='status' id='watched' value='WATCHED' onChange={select('WATCHED')} />
                            <label className='form-check-label' htmlFor='watched'>Watched</label>
                        </div>
                        <div className='form-check'>
                            <input className='form-check-input' type='radio' checked={form.status === 'TOWATCH'} name='status' id='toWatch' value='TOWATCH' onChange={select('TOWATCH')} />
                            <label className='form-check-label' htmlFor='toWatched'>To Watch</label>
                        </div>

                        <button type='button' className='btn btn-primary' onClick={save}>Submit</button>
                    </form>
                </div>
            }
        </div>
    )
}

export default InfoTvShow