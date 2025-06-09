import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { useUser } from '../context/userContext.jsx';

function Navbar() {
    const { isAuthenticated, logout } = useAuth();
    const { profile, loading } = useUser();
    const navigate = useNavigate();

    return (
        <nav className="my-3 flex justify-between py-5 px-10 rounded-lg">
            <Link to={isAuthenticated ? "/user" : "/"}>
                <h1 className="text-2xl font-bold">StockMind</h1>
            </Link>
            <ul className="flex gap-x-4 items-center">
                {isAuthenticated ? (
                    <>
                        {/* Mostrar mientras se carga el perfil */}
                        {loading ? (
                            <li>Cargando perfil...</li>
                        ) : (
                            <>
                                {/* Link solo para Administrador */}
                                {profile?.role === "Administrator" && (
                                    <li>
                                        <Link to="/users">Usuarios</Link>
                                    </li>
                                )}
                                {/* Link visible para cualquier usuario autenticado */}
                                <li>
                                    <Link to="/products">Inventario</Link>
                                </li>
                            </>
                        )}
                        <li>
                            <button
                                onClick={() => {
                                    logout();
                                    localStorage.removeItem('userpage_refreshed');
                                    navigate('/');
                                }}
                                className="px-4 py-1 rounded-sm"
                            >
                                Cerrar sesión
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/" className="px-4 py-1 rounded-sm">Iniciar sesión</Link>
                        </li>
                        <li>
                            <Link to="/register" className="px-4 py-1 rounded-sm">Registrar</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
