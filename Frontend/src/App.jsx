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
import CategoryProductPage from './pages/CategoryProductPage.jsx'
import CustomQueryClientProvider from './QueryClientProvider';
// import Test from './pages/Test.jsx'
function App() {
  
  return (
    <>
    <CustomQueryClientProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage/>}/>

          <Route path="/category/cho-canh/:breed" element={<CategoryPage type={"cho-canh"}/>}/>

          <Route path="/category/meo-canh/:breed" element={<CategoryPage type={"meo-canh"}/>}/>

          <Route path="/category/phu-kien/phu-kien-cua-cho/:ProductCategory/:ProductSubCategory" element={<CategoryProductPage type={"Chó"}/>}/>

          <Route path="/category/phu-kien/phu-kien-cua-meo/:ProductCategory/:ProductSubCategory" element={<CategoryProductPage type={"Mèo"}/>}/>
          
          <Route path="/category/search" element={<CategoryProductPage type={"search"}/>}/>

          <Route path="/detail/:id" element={<ProductDetail/>}></Route>
          <Route path="/login" element={<LoginPage/>}></Route>
          <Route path="/signup" element={<RegistrationPage></RegistrationPage>}></Route>
          <Route path="/cart" element={<CartPage></CartPage>}></Route>
          <Route path="/checkout" element={<CheckoutPage></CheckoutPage>}></Route>
          {/* <Route path="/test" element={<Test></Test>}></Route> */}
        </Routes>
      </Router>
      </CustomQueryClientProvider>
    </>
  )
}

export default App
