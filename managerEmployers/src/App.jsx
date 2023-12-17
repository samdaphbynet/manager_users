import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { Dashbord } from './components/dashbord'
import { Employer} from './components/employer'
import {Category} from './components/category'
import {Profile} from './components/profile'
import { Home } from './components/home'
import { AddCategory } from './components/addcategory'

import { Login } from './components/loginPage/login'
import { SignUp } from './components/signuppage/singup'
import { AddEmployer } from './components/addeployer'
import { EditEmployer } from './components/editEmployer'
import { HomePage } from './components/homePage'

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/dashbord' element={<Dashbord />}>
            <Route path='' element={<Home />}></Route>
            <Route path='/dashbord/employer'  element={<Employer />}></Route>
            <Route path='/dashbord/category'  element={<Category />}></Route>
            <Route path='/dashbord/profile' element={<Profile />}></Route>
            <Route path='/dashbord/add_category' element={<AddCategory />}></Route>
            <Route path='/dashbord/add_employer' element={<AddEmployer />}></Route>
            <Route path='/dashbord/edit_employer/:id' element={<EditEmployer />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
