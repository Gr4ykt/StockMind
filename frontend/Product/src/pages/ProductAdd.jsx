import { useState } from 'react';
import { useProducts } from '../context/productContext.jsx';
import { useNavigate } from 'react-router-dom';
import { FaSave, FaArrowLeft } from 'react-icons/fa';

const ProductAdd = () => {
    const { createProduct, loading, errors } = useProducts();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        code: '',
        name: '',
        quantity: '',
        supplier: ''
    });

    const [formErrors, setFormErrors] = useState({});

    // Validar formulario
    const validateForm = () => {
        const newErrors = {};

        if (!formData.code.trim()) {
            newErrors.code = 'El código es requerido';
        }

        if (!formData.name.trim()) {
            newErrors.name = 'El nombre es requerido';
        }

        if (!formData.quantity.trim()) {
            newErrors.quantity = 'La cantidad es requerida';
        } else if (isNaN(formData.quantity) || parseInt(formData.quantity) < 0) {
            newErrors.quantity = 'La cantidad debe ser un número válido mayor o igual a 0';
        }

        if (!formData.supplier.trim()) {
            newErrors.supplier = 'El proveedor es requerido';
        }

        setFormErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Manejar cambios en el formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Limpiar error del campo cuando el usuario empiece a escribir
        if (formErrors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    // Manejar envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const productData = {
                ...formData,
                quantity: parseInt(formData.quantity)
            };

            const result = await createProduct(productData);
            
            if (result) {
                alert('Producto creado exitosamente');
                navigate('/products');
            }
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    return (
        <div className="px-4 py-8 max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={() => navigate('/products')}
                    className="text-gray-600 hover:text-gray-800 transition-colors"
                    title="Volver"
                >
                    <FaArrowLeft size={20} />
                </button>
                <h2 className="text-2xl font-bold">Agregar Nuevo Producto</h2>
            </div>

            {/* Mostrar errores del contexto */}
            {errors.length > 0 && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                    {errors.map((error, index) => (
                        <p key={index}>{error}</p>
                    ))}
                </div>
            )}

            <div className="bg-white shadow-md rounded-lg p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Código */}
                    <div>
                        <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
                            Código del Producto *
                        </label>
                        <input
                            type="text"
                            id="code"
                            name="code"
                            value={formData.code}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                formErrors.code ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Ej: P001, ABC123"
                        />
                        {formErrors.code && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.code}</p>
                        )}
                    </div>

                    {/* Nombre */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Nombre del Producto *
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                formErrors.name ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Nombre del producto"
                        />
                        {formErrors.name && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                        )}
                    </div>

                    {/* Cantidad */}
                    <div>
                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                            Cantidad *
                        </label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            min="0"
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                formErrors.quantity ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="0"
                        />
                        {formErrors.quantity && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.quantity}</p>
                        )}
                    </div>

                    {/* Proveedor */}
                    <div>
                        <label htmlFor="supplier" className="block text-sm font-medium text-gray-700 mb-2">
                            Proveedor *
                        </label>
                        <input
                            type="text"
                            id="supplier"
                            name="supplier"
                            value={formData.supplier}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                formErrors.supplier ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Nombre del proveedor"
                        />
                        {formErrors.supplier && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.supplier}</p>
                        )}
                    </div>

                    {/* Botones */}
                    <div className="flex gap-4 pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${
                                loading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        >
                            <FaSave />
                            {loading ? 'Guardando...' : 'Guardar Producto'}
                        </button>
                        
                        <button
                            type="button"
                            onClick={() => navigate('/products')}
                            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>

            <div className="mt-4 text-sm text-gray-600">
                <p>* Campos obligatorios</p>
            </div>
        </div>
    );
};

export default ProductAdd;