
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Homepage from './pages/HomePage'
import CategoryPage from './pages/CategoryPage'
import ProductDetail from './pages/ProductDetailPage'
import LoginPage from './pages/LoginPage'
import RegistrationPage from './pages/RegistrationPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage.jsx'
import CategoryProductPage from './pages/CategoryProductPage.jsx'
import CategorySearchPage from './pages/CategorySearchPage.jsx'
import OtpVerificationPage from './pages/OTPVerificationPage.jsx'
import CustomQueryClientProvider from './QueryClientProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';
import PrivateRoute from './PrivateRoute.jsx'


function App() {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  return (
    <>
    <GoogleOAuthProvider clientId={clientId}>
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
          <Route path="/category/tim-kiem/all/:keyword" element={<CategorySearchPage type={"All"}/>}/>
          <Route path="/category/tim-kiem/cho-canh/:keyword" element={<CategorySearchPage type={"Chó"}/>}/>
          <Route path="/category/tim-kiem/meo-canh/:keyword" element={<CategorySearchPage type={"Mèo"}/>}/>
          <Route path="/category/tim-kiem/phu-kien/:keyword" element={<CategorySearchPage type={"Phụ kiện"}/>}/>



          
          <Route path="/dang-nhap" element={<LoginPage/>}></Route>
          
          <Route path="/dang-ky" element={<RegistrationPage></RegistrationPage>}></Route>
          <Route path="/dang-ky/otp/:id" element={<OtpVerificationPage></OtpVerificationPage>}></Route>

          
          <Route element={<PrivateRoute/>}>
              <Route path="/detail/:id" element={<ProductDetail/>}></Route>
              <Route path="/cart" element={<CartPage></CartPage>}></Route>
              <Route path="/checkout" element={<CheckoutPage></CheckoutPage>}></Route>
          </Route>

         
        </Routes>
      </Router>
      </CustomQueryClientProvider>

    </GoogleOAuthProvider>
    </>
  )
}

export default App
