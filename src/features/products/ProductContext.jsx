import React, { createContext, useContext, useReducer } from "react";
import { productService } from "../../services/productService";

const ProductContext = createContext();

const initialState = {
  products: [],
  loading: false,
  error: null,
  total: 0,
  page: 1,
  pageSize: 10,
  search: ""
};

function productReducer(state, action) {
  switch (action.type) {
    case "FETCH_PRODUCTS_START":
      return { ...state, loading: true, error: null };
    case "FETCH_PRODUCTS_SUCCESS":
      return { ...state, loading: false, products: action.payload.products, total: action.payload.total };
    case "FETCH_PRODUCTS_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "SET_PAGE":
      return { ...state, page: action.payload };
    case "SET_SEARCH":
      return { ...state, search: action.payload };
    case "SET_PAGE_SIZE":
      return { ...state, pageSize: action.payload };
    case "CREATE_PRODUCT_SUCCESS":
      return { ...state, products: [...state.products, action.payload] };
    case "UPDATE_PRODUCT_SUCCESS":
      return { 
        ...state, 
        products: state.products.map(p => 
          p.id === action.payload.id ? action.payload : p
        ) 
      };
    case "DELETE_PRODUCT_SUCCESS":
      return { 
        ...state, 
        products: state.products.filter(p => p.id !== action.payload),
        total: state.total - 1
      };
    default:
      return state;
  }
}

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  // Fetch products from API
  const fetchProducts = async () => {
    dispatch({ type: "FETCH_PRODUCTS_START" });
    try {
      const { page, pageSize, search } = state;
      
      // Obtener todos los productos
      const allProducts = await productService.getAllProducts();
      
      // Filtrar por búsqueda si se proporciona
      let filteredProducts = allProducts;
      if (search) {
        filteredProducts = allProducts.filter(product => 
          product.title.toLowerCase().includes(search.toLowerCase()) ||
          product.description.toLowerCase().includes(search.toLowerCase())
        );
      }
      
      // Aplicar paginación
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
      
      dispatch({
        type: "FETCH_PRODUCTS_SUCCESS",
        payload: { 
          products: paginatedProducts, 
          total: filteredProducts.length 
        }
      });
      
      // Guardar en localStorage como backup
      localStorage.setItem("products", JSON.stringify(allProducts));
    } catch (error) {
      console.error("Error al obtener productos:", error);
      
      // Fallback a localStorage
      const local = localStorage.getItem("products");
      if (local) {
        const products = JSON.parse(local);
        let filteredProducts = products;
        
        if (state.search) {
          filteredProducts = products.filter(product => 
            product.title.toLowerCase().includes(state.search.toLowerCase()) ||
            product.description.toLowerCase().includes(state.search.toLowerCase())
          );
        }
        
        const startIndex = (state.page - 1) * state.pageSize;
        const endIndex = startIndex + state.pageSize;
        const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
        
        dispatch({ 
          type: "FETCH_PRODUCTS_SUCCESS", 
          payload: { 
            products: paginatedProducts, 
            total: filteredProducts.length 
          } 
        });
      } else {
        dispatch({ type: "FETCH_PRODUCTS_FAILURE", payload: error.message });
      }
    }
  };

  // Create product
  const createProduct = async (productData) => {
    dispatch({ type: "FETCH_PRODUCTS_START" });
    try {
      const newProduct = await productService.createProduct(productData);
      dispatch({ type: "CREATE_PRODUCT_SUCCESS", payload: newProduct });
      
      // Refrescar la lista de productos
      await fetchProducts();
      return { success: true, product: newProduct };
    } catch (error) {
      console.error("Error al crear producto:", error);
      
      // Fallback a localStorage
      try {
        let products = JSON.parse(localStorage.getItem("products") || "[]");
        const newProduct = { 
          ...productData, 
          id: Date.now(),
          creationAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        products.push(newProduct);
        localStorage.setItem("products", JSON.stringify(products));
        
        dispatch({ type: "CREATE_PRODUCT_SUCCESS", payload: newProduct });
        await fetchProducts();
        return { success: false, product: newProduct, message: "Producto creado localmente" };
      } catch {
        dispatch({ type: "FETCH_PRODUCTS_FAILURE", payload: error.message });
        return { success: false, error: error.message };
      }
    }
  };

  // Update product
  const updateProduct = async (id, productData) => {
    dispatch({ type: "FETCH_PRODUCTS_START" });
    try {
      const updatedProduct = await productService.updateProduct(id, productData);
      dispatch({ type: "UPDATE_PRODUCT_SUCCESS", payload: updatedProduct });
      
      // Refrescar la lista de productos
      await fetchProducts();
      return { success: true, product: updatedProduct };
    } catch (error) {
      console.error("Error al actualizar producto:", error);
      
      // Fallback a localStorage
      try {
        let products = JSON.parse(localStorage.getItem("products") || "[]");
        products = products.map(p => 
          p.id === parseInt(id) ? { ...p, ...productData, updatedAt: new Date().toISOString() } : p
        );
        localStorage.setItem("products", JSON.stringify(products));
        
        const updatedProduct = products.find(p => p.id === parseInt(id));
        dispatch({ type: "UPDATE_PRODUCT_SUCCESS", payload: updatedProduct });
        await fetchProducts();
        return { success: false, product: updatedProduct, message: "Producto actualizado localmente" };
      } catch {
        dispatch({ type: "FETCH_PRODUCTS_FAILURE", payload: error.message });
        return { success: false, error: error.message };
      }
    }
  };

  // Delete product
  const deleteProduct = async (id) => {
    dispatch({ type: "FETCH_PRODUCTS_START" });
    try {
      await productService.deleteProduct(id);
      dispatch({ type: "DELETE_PRODUCT_SUCCESS", payload: parseInt(id) });
      
      // Refrescar la lista de productos
      await fetchProducts();
      return { success: true, message: "Producto eliminado exitosamente" };
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      
      // Fallback a localStorage
      try {
        let products = JSON.parse(localStorage.getItem("products") || "[]");
        products = products.filter(p => p.id !== parseInt(id));
        localStorage.setItem("products", JSON.stringify(products));
        
        dispatch({ type: "DELETE_PRODUCT_SUCCESS", payload: parseInt(id) });
        await fetchProducts();
        return { success: false, message: "Producto eliminado localmente" };
      } catch {
        dispatch({ type: "FETCH_PRODUCTS_FAILURE", payload: error.message });
        return { success: false, error: error.message };
      }
    }
  };

  return (
    <ProductContext.Provider value={{ 
      ...state, 
      dispatch, 
      fetchProducts, 
      createProduct, 
      updateProduct, 
      deleteProduct 
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);
