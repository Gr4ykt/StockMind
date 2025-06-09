import { useEffect } from 'react';
import { useUser } from '../context/userContext.jsx';
import { useAuth } from '../context/authContext.jsx';
import { Link, useNavigate } from 'react-router-dom';

const UserPage = () => {
    const { profile, loading: userLoading, error } = useUser();
    const { loginLoading } = useAuth();
    const navigate = useNavigate();

    // Mostrar loading si está cargando el login o el perfil del usuario
    if (loginLoading || userLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="text-center">
                    <div className="loading mb-4">
                        {loginLoading ? 'Iniciando sesión...' : 'Cargando perfil...'}
                    </div>
                    <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
                </div>
            </div>
        );
    }
    
    if (error) return (
        <div className="error text-center py-8">
            <p>Error: {error}</p>
        </div>
    );

    // Si no hay perfil después de cargar, mostrar error
    if (!profile) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="text-center">
                    <div className="error mb-4">No se pudo cargar el perfil del usuario</div>
                </div>
            </div>
        );
    }

    const handleEditUser = () => {
        navigate(`/edit-user/${profile.id}`);
    };

    const isAdmin = profile?.role === "Administrator";

    return (
        <div className="mx-auto px-4 py-8">
            {/* Header de Bienvenida */}
            <div className="hero mb-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-2">
                        Bienvenido, {profile.username}
                    </h1>
                    <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                        isAdmin 
                            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' 
                            : 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                    }`}>
                        {profile.role}
                    </span>

                </div>
            </div>

            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">

                {/* Card de Usuarios - Solo para Administradores */}
                {isAdmin && (
                    <div className="card group cursor-pointer">
                        <div className="flex items-center mb-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-xl font-bold mr-4">
                                👥
                            </div>
                            <h3 className="text-xl font-bold">Gestión de Usuarios</h3>
                        </div>
                        <p className="text-muted mb-4">
                            Controla el acceso al sistema, gestiona permisos y administra las cuentas de usuario de tu equipo.
                        </p>
                        <div className="space-y-2 mb-4">
                            <div className="flex items-center text-sm">
                                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                                Crear nuevos usuarios
                            </div>
                            <div className="flex items-center text-sm">
                                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                                Modificar usuarios
                            </div>
                            <div className="flex items-center text-sm">
                                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                                Monitorear Actividades
                            </div>
                        </div>
                        <Link 
                            to="/users" 
                            className="w-full btn-primary inline-block text-center no-underline"
                        >
                            Gestionar Usuarios
                        </Link>
                    </div>
                )}

                {/* Card de Inventario - Visible para todos */}
                <div className="card group cursor-pointer">
                    <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-xl font-bold mr-4">
                            📦
                        </div>
                        <h3 className="text-xl font-bold">Gestión de Inventario</h3>
                    </div>
                    <p className="text-muted mb-4">
                        Administra tus productos, controla stock, actualiza precios y mantén un registro detallado de tu inventario.
                    </p>
                    <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                            Ver productos disponibles
                        </div>
                        <div className="flex items-center text-sm">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                            Actualizar productos
                        </div>
                        <div className="flex items-center text-sm">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                            Agregar productos
                        </div>
                    </div>
                    <Link 
                        to="/products"
                        className="w-full btn-primary inline-block text-center no-underline"
                    >
                        Acceder al Inventario
                    </Link>
                </div>

                {/* Card de IA */}
                <div className="card group cursor-pointer">
                    <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white text-xl font-bold mr-4">
                            🤖
                        </div>
                        <h3 className="text-xl font-bold">¿Requieres ayuda?</h3>
                    </div>
                    <p className="text-muted mb-4">
                        Apóyate a través de nuestro chatbot integrado con IA para realizar ciertas tareas relacionadas con el inventario o al uso de la aplicación en general.
                    </p>
                    <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                            Consultas relacionadas a la aplicación
                        </div>
                        <div className="flex items-center text-sm">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                            Análisis de productos
                        </div>
                        <div className="flex items-center text-sm">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                            Información relacionada con datos
                        </div>
                    </div>
                </div>

                {/* Card de Perfil - Solo para usuarios no admin */}
                {!isAdmin && (
                    <div className="card">
                        <div className="flex items-center mb-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center text-white text-xl font-bold mr-4">
                                👤
                            </div>
                            <h3 className="text-xl font-bold">Mi Perfil</h3>
                        </div>
                        <p className="text-muted mb-4">
                            Gestiona tu información personal y preferencias de cuenta.
                        </p>
                        <div className="space-y-2 mb-4">
                            <div className="text-sm">
                                <span className="font-semibold">Nombre:</span> {profile.username}
                            </div>
                            <div className="text-sm">
                                <span className="font-semibold">Email:</span> {profile.email}
                            </div>
                            <div className="text-sm">
                                <span className="font-semibold">Rol:</span> {profile.role}
                            </div>
                        </div>
                        <button 
                            onClick={handleEditUser} 
                            className="w-full btn-primary inline-block text-center no-underline"
                        >
                            Editar perfil
                        </button>
                    </div>
                )}
            </div>

            {/* Sección de Ayuda */}
            <div className="card">
                <div className="text-center">
                    <h3 className="text-2xl font-bold mb-4">¿Necesitas ayuda?</h3>
                    <p className="text-muted mb-6">
                        {isAdmin 
                            ? "Como administrador, tienes acceso completo a todas las funcionalidades del sistema. Puedes gestionar usuarios e inventario. En caso de problemas, puede revisar documentación o contactar con soporte."
                            : "Como usuario, puedes gestionar el inventario, agregar productos o realizar consultas a la IA integrada. En caso de problemas, contactar con soporte o revisar documentación."
                        }
                    </p>
                    <div className="flex justify-center gap-4">
                        <button className="btn-secondary">
                            📚 Ver Documentación
                        </button>
                        <button className="btn-secondary">
                            💬 Contactar Soporte
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserPage;