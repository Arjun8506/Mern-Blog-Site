import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import { useAuthContext } from './context/AuthContext'
import CreateBlog from './pages/CreateBlog'
import ReadBlog from './pages/ReadBlog'
import PageOfEditBlog from './pages/PgeOfEditBlog'
import MyBlogs from './pages/MyBlogs'


const App = () => {

  const {authUser} = useAuthContext()

  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path='/' element= {<Home />} />
      <Route path='/about' element= {<About />} />
      <Route path='/login' element= {<Login />} />
      <Route path='/register' element= {<Register />} />
      <Route path='/profile' element= {authUser ? <Profile /> : <Navigate to={'/login'}  />} />
      <Route path='/create' element= {authUser ? <CreateBlog /> : <Navigate to={'/login'}  />} />
      <Route path='/read/:id' element= {<ReadBlog />} />
      <Route path='/edit/:id' element= {<PageOfEditBlog />} />
      <Route path='/myblogs/:id' element={<MyBlogs />} />
    </Routes>
    <Footer />
    </BrowserRouter>
  )
}

export default App