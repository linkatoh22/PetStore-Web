import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homepage from './pages/HomePage'
import CategoryPage from './pages/CategoryPage'
import ProductDetail from './pages/ProductDetailPage'
import LoginPage from './pages/LoginPage'
import RegistrationPage from './pages/RegistrationPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage.jsx'
// import Test from './pages/Test.jsx'
function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage/>}/>

          <Route path="/category/cho-canh/:breed" element={<CategoryPage type={"cho-canh"}/>}/>

          <Route path="/category/meo-canh/:breed" element={<CategoryPage type={"meo-canh"}/>}/>

          <Route path="/category/phu-kien/:ProductCategory/:ProductSubCategory" element={<CategoryPage type={"phu-kien"}/>}/>

          <Route path="/category/search" element={<CategoryPage type={"search"}/>}/>

          <Route path="/detail/:id" element={<ProductDetail/>}></Route>
          <Route path="/login" element={<LoginPage/>}></Route>
          <Route path="/signup" element={<RegistrationPage></RegistrationPage>}></Route>
          <Route path="/cart" element={<CartPage></CartPage>}></Route>
          <Route path="/checkout" element={<CheckoutPage></CheckoutPage>}></Route>
          {/* <Route path="/test" element={<Test></Test>}></Route> */}
        </Routes>
      </Router>
        
    </>
  )
}

export default App
