import { useUser } from '../context/userContext.jsx';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaEdit, FaUserPlus } from 'react-icons/fa';

const UsersTable = () => {
    const { profile, users = [], loading, error, deleteUser } = useUser(); // Agregamos deleteUser
    const navigate = useNavigate(); // Para navegación
    const [search, setSearch] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [deleting, setDeleting] = useState(null); // Para mostrar estado de eliminación

    // Función para manejar la eliminación de usuarios
    const handleDeleteUser = async (userId, username) => {
        if (window.confirm(`¿Estás seguro de que deseas eliminar al usuario "${username}"?`)) {
            try {
                setDeleting(userId);
                await deleteUser(userId);
                alert(`Usuario "${username}" eliminado exitosamente`);
            } catch (error) {
                alert(`Error al eliminar usuario: ${error.message}`);
            } finally {
                setDeleting(null);
            }
        }
    };

    // Función para manejar la edición de usuarios
    const handleEditUser = (userId) => {
        navigate(`/edit-user/${userId}`);
    };

    // Filtrar usuarios cuando cambie la búsqueda o la lista de usuarios
    useEffect(() => {
        if (users && users.length > 0) {
            const lower = search.toLowerCase();
            const filtered = users.filter(user =>
                user.username?.toLowerCase().includes(lower) ||
                `${user.name || ''} ${user.lastname || ''}`.toLowerCase().includes(lower) ||
                user.email?.toLowerCase().includes(lower) ||
                user.role?.toLowerCase().includes(lower)
            );
            setFilteredUsers(filtered);
        } else {
            setFilteredUsers([]);
        }
    }, [users, search]); // Dependencias correctas

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <p className="text-xl">Cargando usuarios...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-600 text-center py-8">
                <p>Error: {error}</p>
            </div>
        );
    }

    if (!profile || profile.role !== 'Administrator') {
        return (
            <div className="text-center text-red-500 py-8">
                Acceso restringido. Solo los administradores pueden ver esta página.
            </div>
        );
    }

    return (
        <div className="px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Gestión de Usuarios</h2>
                <button
                    className="btn-primary flex items-center gap-2"
                    onClick={() => navigate('/add-user')}
                >
                    <FaUserPlus />
                    Agregar Usuario
                </button>
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Buscar usuario..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">Username</th>
                            <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">Nombre Completo</th>
                            <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">Email</th>
                            <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">Rol</th>
                            <th className="text-center px-6 py-3 text-sm font-medium text-gray-600">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
                                <tr key={user._id || user.id} className="border-t hover:bg-gray-50">
                                    <td className="px-6 py-4">{user.username}</td>
                                    <td className="px-6 py-4">{user.name} {user.lastname}</td>
                                    <td className="px-6 py-4">{user.email}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-white text-xs font-medium ${
                                            user.role === 'Administrator' ? 'bg-blue-600' : 'bg-green-600'
                                        }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex gap-4 justify-center">
                                            <button 
                                                className="text-blue-500 hover:text-blue-700" 
                                                title="Editar"
                                                onClick={() => handleEditUser(user._id || user.id)}
                                            >
                                                <FaEdit />
                                            </button>
                                            <button 
                                                className={`text-red-500 hover:text-red-700 ${deleting === (user._id || user.id) ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                title="Eliminar" 
                                                onClick={() => handleDeleteUser(user._id || user.id, user.username)}
                                                disabled={deleting === (user._id || user.id)}
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center px-6 py-8 text-gray-500">
                                    {search ? 'No se encontraron usuarios que coincidan con la búsqueda.' : 'No hay usuarios disponibles.'}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UsersTable;