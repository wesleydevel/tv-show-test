import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Genres = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        axios
            .get('/api/genres')
            .then(res => {
                setData(res.data.data)
            })
    }, [])
    const deleteGenr = id => {
        axios
            .delete('api/genres/' + id)
            .then(res => {
                const filtered = data.filter(item => item.id !== id)
                setData(filtered)
            })
    }

    if (data.length === 0) {
        return (
            <div className='container'>
                <h1>Genres</h1>
                <Link to='/genres/new' className='btn btn-primary'>New Genres</Link>
                <div className='alert alert-warning' role='alert'>
                    It doesn't have genres!
            </div>
            </div>
        )
    }
    const renderLine = record => {
        return (
            <tr key={record.id}>
                <th scope='row'>{record.id}</th>
                <td>{record.name}</td>
                <td>
                    <button className='btn btn-danger' onClick={() => deleteGenr(record.id)}>Delete</button>
                    <Link to={'/genres/' + record.id} className='btn btn-warning'>Edit</Link>
                </td>
            </tr>
        )
    }
    return (
        <div className='container'>
            <h1>Genres</h1>
            <Link to='/genres/new' className='btn btn-primary'>New Genres</Link>
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

export default Genres