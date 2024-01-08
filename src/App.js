import Header from './component/Header'
import Footer from './component/Footer'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
  ScrollRestoration,
} from 'react-router-dom'
import Home from './pages/Home'
import { ProductsData } from './api/api'
import Signin from './pages/Signin'
import Cart from './pages/Cart'
import Registration from './pages/Registration'
const Layout = () => {
  return (
    <div>
      <Header />
      <ScrollRestoration />
      <Outlet />
      <Footer />
    </div>
  )
}
const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} loader={ProductsData}></Route>
          <Route path='/cart' element={<Cart />} />
        </Route>
        <Route path='/signin' element={<Signin />}></Route>
        <Route path='/registration' element={<Registration />} />
      </Route>
    )
  )
  return (
    <>
      <div className='bg-gray-100 font-bodyFont'>
        <RouterProvider router={router}></RouterProvider>
      </div>
    </>
  )
}

export default App
