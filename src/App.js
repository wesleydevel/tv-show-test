import React from 'react'
import Header from './Header'
import Genres from './Genres'
import NewGenres from './NewGenres'
import EditGenres from './EditGenres'
import TvShows from './TvShows'
import NewTvShow from './NewTvShow'
import InfoTvShow from './InfoTvShow'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

const Home = () => <h1>Home</h1>


function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/genres' exact component={Genres} />
          <Route path='/genres/new' exact component={NewGenres} />
          <Route path='/genres/:id' exact component={EditGenres} />
          <Route path='/tv' exact component={TvShows} />
          <Route path='/tv/new' exact component={NewTvShow} />
          <Route path='/tv/:id' exact component={InfoTvShow} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
