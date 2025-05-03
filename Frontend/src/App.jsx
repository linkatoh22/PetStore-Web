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

          <Route path="/category/cho-canh" element={<CategoryPage type={"Chó"} typePage={"All"}/>}/>
          <Route path="/category/meo-canh" element={<CategoryPage type={"Mèo"} typePage={"All"}/>}/>



          <Route path="/category/cho-canh/:breed" element={<CategoryPage type={"Chó"} typePage={"Breed"}/>}/>
          <Route path="/category/meo-canh/:breed" element={<CategoryPage type={"Mèo"} typePage={"Breed"}/>}/>



          {/* PRODUCT */}
          <Route path="/category/phu-kien" element={<CategoryProductPage type={""} typePage={"Phụ kiện"}/>}/>

          <Route path="/category/phu-kien/phu-kien-cua-cho/:ProductCategory/:ProductSubCategory" element={<CategoryProductPage type={"Chó"} typePage={"Subcategory"}/>}/>
          <Route path="/category/phu-kien/phu-kien-cua-cho/:ProductCategory" element={<CategoryProductPage type={"Chó"} typePage={"Category"}/>}/>
          <Route path="/category/phu-kien/phu-kien-cua-cho" element={<CategoryProductPage type={"Chó"} typePage={"Phụ kiện của pet"}/>}/>


          <Route path="/category/phu-kien/phu-kien-cua-meo/:ProductCategory/:ProductSubCategory" element={<CategoryProductPage type={"Mèo"} typePage={"Subcategory"}/>}/>
          <Route path="/category/phu-kien/phu-kien-cua-meo/:ProductCategory" element={<CategoryProductPage type={"Mèo"} typePage={"Category"}/>}/>
          <Route path="/category/phu-kien/phu-kien-cua-meo" element={<CategoryProductPage type={"Mèo"} typePage={"Phụ kiện của pet"}/>}/>



          {/* SEARCH */}
          <Route path="/category/search" element={<CategoryProductPage typePage={"Search"}/>}/>



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
