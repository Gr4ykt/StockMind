import { useProducts } from '../context/productContext.jsx';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';

const ProductsPage = () => {
    const { products = [], loading, errors, getProducts, deleteProduct } = useProducts();
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [deleting, setDeleting] = useState(null);

    // Cargar productos al montar el componente
    useEffect(() => {
        getProducts();
    }, []);

    // Función para manejar la eliminación de productos
    const handleDeleteProduct = async (productId, productName) => {
        if (window.confirm(`¿Estás seguro de que deseas eliminar el producto "${productName}"?`)) {
            try {
                setDeleting(productId);
                const success = await deleteProduct(productId);
                if (success) {
                    alert(`Producto "${productName}" eliminado exitosamente`);
                }
            } catch (error) {
                alert(`Error al eliminar producto: ${error.message}`);
            } finally {
                setDeleting(null);
            }
        }
    };

    // Función para manejar la edición de productos
    const handleEditProduct = (productId) => {
        navigate(`/edit-product/${productId}`);
    };

    // Filtrar productos cuando cambie la búsqueda o la lista de productos
    useEffect(() => {
        if (products && products.length > 0) {
            const lower = search.toLowerCase();
            const filtered = products.filter(product =>
                product.code?.toLowerCase().includes(lower) ||
                product.name?.toLowerCase().includes(lower) ||
                product.supplier?.toLowerCase().includes(lower) ||
                product.user?.username?.toLowerCase().includes(lower)
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts([]);
        }
    }, [products, search]);

    // Función para formatear fecha
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <p className="text-xl">Cargando productos...</p>
            </div>
        );
    }

    return (
        <div className="px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Gestión de Productos</h2>
                <button
                    className="btn-primary flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                    onClick={() => navigate('/add-product')}
                >
                    <FaPlus />
                    Agregar Producto
                </button>
            </div>

            {/* Mostrar errores si existen */}
            {errors.length > 0 && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {errors.map((error, index) => (
                        <p key={index}>{error}</p>
                    ))}
                </div>
            )}

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Buscar producto por código, nombre, proveedor o usuario..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">Código</th>
                            <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">Nombre</th>
                            <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">Cantidad</th>
                            <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">Proveedor</th>
                            <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">Usuario</th>
                            <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">Fecha Agregado</th>
                            <th className="text-center px-6 py-3 text-sm font-medium text-gray-600">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <tr key={product._id || product.id} className="border-t hover:bg-gray-50">
                                    <td className="px-6 py-4 font-mono text-sm">{product.code}</td>
                                    <td className="px-6 py-4 font-medium">{product.name}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            product.quantity > 10 
                                                ? 'bg-green-100 text-green-800' 
                                                : product.quantity > 0 
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : 'bg-red-100 text-red-800'
                                        }`}>
                                            {product.quantity}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">{product.supplier}</td>
                                    <td className="px-6 py-4">
                                        <span className="text-blue-600 font-medium">
                                            {product.user?.username || 'N/A'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {formatDate(product.createdAt)}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex gap-4 justify-center">
                                            <button 
                                                className="text-blue-500 hover:text-blue-700 transition-colors" 
                                                title="Editar"
                                                onClick={() => handleEditProduct(product._id || product.id)}
                                            >
                                                <FaEdit />
                                            </button>
                                            <button 
                                                className={`text-red-500 hover:text-red-700 transition-colors ${
                                                    deleting === (product._id || product.id) 
                                                        ? 'opacity-50 cursor-not-allowed' 
                                                        : ''
                                                }`}
                                                title="Eliminar" 
                                                onClick={() => handleDeleteProduct(product._id || product.id, product.name)}
                                                disabled={deleting === (product._id || product.id)}
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center px-6 py-8 text-gray-500">
                                    {search ? 'No se encontraron productos que coincidan con la búsqueda.' : 'No hay productos disponibles.'}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Resumen de productos */}
            {filteredProducts.length > 0 && (
                <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">
                        Mostrando {filteredProducts.length} de {products.length} productos
                    </p>
                </div>
            )}
        </div>
    );
};

export default ProductsPage;