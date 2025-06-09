import {BrowserRouter, Route, Routes} from 'react-router'
import { useState } from 'react'
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from './pages/RegisterPage.jsx';
import UserPage from './pages/UserPage.jsx';
import UsersTable from './pages/UsersPage.jsx';
import UserAdd from './pages/UserAdd.jsx';
import UserEdit from './pages/UserEdit.jsx';
import ProductAdd from './pages/ProductAdd.jsx';
import ProductEdit from './pages/ProductEdit.jsx';
import ProductsPage from './pages/ProductsPage.jsx';
import Navbar from './components/Navbar.jsx';
import { AuthProvider } from "./context/authContext.jsx";
import { UserProvider } from "./context/userContext.jsx";
import { ProductProvider } from "./context/productContext.jsx";
import ProtectedRouter from './ProtectedRouter.jsx';
import FloatingChatbot from './components/chatbot.jsx';
import { useAuth } from './context/authContext.jsx'; // Asegúrate de que tengas este hook

function AppContent() {
  const { isAuthenticated } = useAuth(); // O como se llame tu estado de autenticación

  return (
    <BrowserRouter>
      <main className='container content-container mx-auto px-10'>
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* Para usuarios Registrados (SOLO ACCESIBLES CON AUTENTICACION) */}
          <Route element={<ProtectedRouter />}>
            <Route path="/user" element={<UserPage />} />
            <Route path='/users' element={<UsersTable />}/>
            <Route path='/add-user' element={<UserAdd />}/>
            <Route path='/edit-user/:id' element={<UserEdit />}/>
            <Route path='/products' element={<ProductsPage />}/>
            <Route path='/add-product' element={<ProductAdd />}/>
            <Route path='/edit-product/:id' element={<ProductEdit />}/>
          </Route>
        </Routes>
      </main>
      {/* El chatbot solo se muestra si el usuario está autenticado */}
      {isAuthenticated && <FloatingChatbot />}
    </BrowserRouter>
  );
}

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <ProductProvider>
          <AppContent />
        </ProductProvider>
      </UserProvider>
    </AuthProvider>
  )
}

export default App