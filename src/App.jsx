import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './HomePage.jsx'
import BookPage from './BookPage.jsx'
import ShopPage from './ShopPage.jsx'
import './HomePage.css'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/book/:slug" element={<BookPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
