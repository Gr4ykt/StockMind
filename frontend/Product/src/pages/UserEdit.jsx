import { useState, useEffect } from 'react';
import { useUser } from '../context/userContext.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaUserTag, FaSave, FaArrowLeft } from 'react-icons/fa';

const UserEdit = () => {
    const { profile, getUser, updateUser } = useUser();
    const navigate = useNavigate();
    const { id } = useParams(); // Obtener el ID del usuario de la URL
    
    const [formData, setFormData] = useState({
        username: '',
        name: '',
        lastname: '',
        email: ''
    });
    
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [loadingUser, setLoadingUser] = useState(true);

    // Cargar datos del usuario al montar el componente
    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoadingUser(true);
                const userData = await getUser(id);
                setFormData({
                    username: userData.username || '',
                    name: userData.name || '',
                    lastname: userData.lastname || '',
                    email: userData.email || '',
                    password: '',
                    confirmPassword: '',
                    role: userData.role || 'User'
                });
            } catch (error) {
                alert(`Error al cargar usuario: ${error.message}`);
                navigate('/user');
            } finally {
                setLoadingUser(false);
            }
        };

        if (id) {
            fetchUser();
        }
    }, [id, getUser, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Limpiar error del campo cuando el usuario empiece a escribir
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Validar username
        if (!formData.username.trim()) {
            newErrors.username = 'El nombre de usuario es requerido';
        } else if (formData.username.length < 3) {
            newErrors.username = 'El nombre de usuario debe tener al menos 3 caracteres';
        }

        // Validar nombre
        if (!formData.name.trim()) {
            newErrors.name = 'El nombre es requerido';
        }

        // Validar apellido
        if (!formData.lastname.trim()) {
            newErrors.lastname = 'El apellido es requerido';
        }

        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = 'El email es requerido';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'El formato del email no es válido';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        
        try {
            const userData = {
                username: formData.username.trim(),
                name: formData.name.trim(),
                lastname: formData.lastname.trim(),
                email: formData.email.trim()
            };
            await updateUser(id, userData);
            alert('Usuario actualizado exitosamente');
            navigate('/user');
        } catch (error) {
            alert(`Error al actualizar usuario: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        if (window.confirm('¿Estás seguro de que deseas cancelar? Se perderán los cambios no guardados.')) {
            navigate('/user');
        }
    };

    if (loadingUser) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <p className="text-xl">Cargando usuario...</p>
            </div>
        );
    }

    return (
        <div className="px-4 py-8 max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={handleCancel}
                    className="text-gray-600 hover:text-gray-800 flex items-center gap-2"
                >
                    <FaArrowLeft />
                    Volver
                </button>
                <h2 className="text-2xl font-bold">Editar Usuario</h2>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Username */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <FaUser className="inline mr-2" />
                            Nombre de Usuario *
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                errors.username ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Ingrese el nombre de usuario"
                        />
                        {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                    </div>

                    {/* Nombre y Apellido */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nombre *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.name ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="Nombre"
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Apellido *
                            </label>
                            <input
                                type="text"
                                name="lastname"
                                value={formData.lastname}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.lastname ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="Apellido"
                            />
                            {errors.lastname && <p className="text-red-500 text-sm mt-1">{errors.lastname}</p>}
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <FaEnvelope className="inline mr-2" />
                            Email *
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                errors.email ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="usuario@ejemplo.com"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    {/* Botones */}
                    <div className="flex justify-end gap-4 pt-6">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            disabled={loading}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2 ${
                                loading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        >
                            <FaSave />
                            {loading ? 'Guardando...' : 'Guardar Cambios'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserEdit;