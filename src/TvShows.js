import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const TvShows = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        axios
            .get('/api/series')
            .then(res => {
                setData(res.data.data)
            })
    }, [])
    const deleteTvshow = id => {
        axios
            .delete('api/series/' + id)
            .then(res => {
                const filtered = data.filter(item => item.id !== id)
                setData(filtered)
            })
    }
    const renderLine = record => {
        return (
            <tr key={record.id}>    
                <th scope='row'>{record.id}</th>
                <td>{record.name}</td>
                <td>
                    <button type='button' onClick={() => deleteTvshow(record.id)} className='btn btn-danger'>Delete</button>
                    <Link to={'/tv/' + record.id} className='btn btn-warning'>Info</Link>
                </td>
            </tr>
        )
    }
    if (data.length === 0) {
        return (
            <div className='container'>
                <h1>Tv Shows</h1>
                <Link to='/tv/new' className='btn btn-primary'>New Tv Show</Link>
                <div className='alert alert-warning' role='alert'>
                    It doesn't have Tv shows!
            </div>
            </div>
        )
    }
    return (
        <div className='container'>
            <h1>Tv Shows</h1>
            <Link to='/tv/new' className='btn btn-primary'>New Tv Show</Link>
            <table className='table table-dark'>
                <thead>
                    <tr>
                        <th scope='col'>Id</th>
                        <th scope='col'>Name</th>
                        <th scope='col'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(renderLine)}
                </tbody>
            </table>
        </div>
    )
}
export default TvShows