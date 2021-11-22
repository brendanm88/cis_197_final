import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
// import axios from 'axios'
import Login from '../components/Login'
import Signup from '../components/Signup'
import Home from '../components/Home'
import {
  GlobalStyle,
} from '../styles/StyleComps'

// const [data, setData] = useState([])

// useEffect(async () => {
//   const { data: users } = await axios.get('/account/all') // GET request
//   setData(users)
// }, [])

// routes for home page, login, and signup
const App = () => (
  <GlobalStyle>
    <Router>
      <>
        <br />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </>
    </Router>
  </GlobalStyle>
)

export default App
