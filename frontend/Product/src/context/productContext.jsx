import { createContext, useState, useContext, useEffect } from "react";
import { 
    productsRequest, 
    getProductRequest, 
    createProductRequest, 
    updateProductRequest, 
    deleteProductRequest 
} from "../api/product.js";

export const ProductContext = createContext();

export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error("useProducts must be used within a ProductProvider");
    }
    return context;
};

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    // Obtener todos los productos
    const getProducts = async (id) => {
        try {
            setLoading(true);
            setErrors([]);
            const res = await productsRequest();
            setProducts(res.data);
        } catch (error) {
            console.error('Error getting products:', error);
            if (Array.isArray(error.response?.data)) {
                setErrors(error.response.data);
            } else {
                setErrors([error.response?.data?.message || 'Error al obtener productos']);
            }
        } finally {
            setLoading(false);
        }
    };

    // Obtener un producto específico
    const getProduct = async (id) => {
        try {
            setLoading(true);
            setErrors([]);
            const res = await getProductRequest(id);
            setProduct(res.data);
            return res.data;
        } catch (error) {
            console.error('Error getting product:', error);
            if (Array.isArray(error.response?.data)) {
                setErrors(error.response.data);
            } else {
                setErrors([error.response?.data?.message || 'Error al obtener producto']);
            }
            return null;
        } finally {
            setLoading(false);
        }
    };

    // Crear nuevo producto
    const createProduct = async (productData) => {
        try {
            setLoading(true);
            setErrors([]);
            const res = await createProductRequest(productData);
            
            // Agregar el nuevo producto al estado local
            setProducts(prev => [...prev, res.data]);
            
            return res.data;
        } catch (error) {
            console.error('Error creating product:', error);
            if (Array.isArray(error.response?.data)) {
                setErrors(error.response.data);
            } else {
                setErrors([error.response?.data?.message || 'Error al crear producto']);
            }
            return null;
        } finally {
            setLoading(false);
        }
    };

    // Actualizar producto existente
    const updateProduct = async (id, productData) => {
        try {
            setLoading(true);
            setErrors([]);
            const res = await updateProductRequest(id, productData);
            
            // Actualizar el producto en el estado local
            setProducts(prev => 
                prev.map(product => 
                    product._id === id ? res.data : product
                )
            );
            
            // Si es el producto actual, actualizarlo también
            if (product && product._id === id) {
                setProduct(res.data);
            }
            
            return res.data;
        } catch (error) {
            console.error('Error updating product:', error);
            if (Array.isArray(error.response?.data)) {
                setErrors(error.response.data);
            } else {
                setErrors([error.response?.data?.message || 'Error al actualizar producto']);
            }
            return null;
        } finally {
            setLoading(false);
        }
    };

    // Eliminar producto
    const deleteProduct = async (id) => {
        try {
            setLoading(true);
            setErrors([]);
            await deleteProductRequest(id);
            
            // Remover el producto del estado local
            setProducts(prev => prev.filter(product => product._id !== id));
            
            // Si es el producto actual, limpiarlo
            if (product && product._id === id) {
                setProduct(null);
            }
            
            return true;
        } catch (error) {
            console.error('Error deleting product:', error);
            if (Array.isArray(error.response?.data)) {
                setErrors(error.response.data);
            } else {
                setErrors([error.response?.data?.message || 'Error al eliminar producto']);
            }
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Limpiar errores después de 5 segundos
    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000);

            return () => {
                clearTimeout(timer)
                clearProduct()
            };
        }
    }, [errors]);

    // Limpiar producto seleccionado
    const clearProduct = () => {
        setProduct(null);
    };

    // Limpiar errores manualmente
    const clearErrors = () => {
        setErrors([]);
    };

    return (
        <ProductContext.Provider value={{
            products,
            product,
            loading,
            errors,
            getProducts,
            getProduct,
            createProduct,
            updateProduct,
            deleteProduct,
            clearProduct,
            clearErrors
        }}>
            {children}
        </ProductContext.Provider>
    );
};