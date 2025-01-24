
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import RootLayout from './rootLayout/RootLayout'
import Recipepage from './pages/Recipepage'
import AboutUs from './pages/AboutUs'
import Detailpage from './pages/Detailpage'
import Loginpage from './pages/Loginpage'
import { UserProvider } from './UserContext'
import UserDashboard from './pages/UserDashboard'
import SignUp from './pages/SignUp'

function App() {
  
  const router = createBrowserRouter(
    createRoutesFromElements(

      <>

      <Route path='/' element={<RootLayout/>}>

      <Route index element={<Home/>}/>
      <Route path='recipes' element={<Recipepage/>}/>
      <Route path='aboutUs' element={<AboutUs/>}/>
      <Route path='details/:recipe_id' element={<Detailpage/>}/>
      <Route path='login' element={<Loginpage/>}/>
      <Route path='signup' element={<SignUp/>}/>
      <Route path='dashboard' element={<UserDashboard/>}/>


      </Route>
      </>
    )
  )

  return (
    <>
      <UserProvider> 
        <RouterProvider router={router}/>
      </UserProvider>
    </>
  )
}

export default App
