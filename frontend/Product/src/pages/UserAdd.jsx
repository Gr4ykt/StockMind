import { useState } from 'react';
import { useUser } from '../context/userContext.jsx';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaUserTag, FaSave, FaArrowLeft } from 'react-icons/fa';

const UserAdd = () => {
    const { profile, createUser } = useUser();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        username: '',
        name: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // Verificar si el usuario tiene permisos de administrador
    if (!profile || profile.role !== 'Administrator') {
        return (
            <div className="text-center text-red-500 py-8">
                Acceso restringido. Solo los administradores pueden agregar usuarios.
            </div>
        );
    }

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

        // Validar password
        if (!formData.password) {
            newErrors.password = 'La contraseña es requerida';
        } else if (formData.password.length < 6) {
            newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
        }

        // Validar confirmación de password
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Debe confirmar la contraseña';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Las contraseñas no coinciden';
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
                email: formData.email.trim(),
                password: formData.password
            };

            await createUser(userData);
            alert('Usuario creado exitosamente');
            navigate('/users'); // Redirigir a la tabla de usuarios
        } catch (error) {
            alert(`Error al crear usuario: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        if (window.confirm('¿Estás seguro de que deseas cancelar? Se perderán los datos ingresados.')) {
            navigate('/users');
        }
    };

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
                <h2 className="text-2xl font-bold">Agregar Nuevo Usuario</h2>
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

                    {/* Contraseñas */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <FaLock className="inline mr-2" />
                                Contraseña *
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.password ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="Mínimo 6 caracteres"
                            />
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <FaLock className="inline mr-2" />
                                Confirmar Contraseña *
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="Repetir contraseña"
                            />
                            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                        </div>
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
                            {loading ? 'Guardando...' : 'Guardar Usuario'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserAdd;