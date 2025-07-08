import React, { useEffect } from "react";
import { useProductContext } from "./ProductContext";
import Swal from "sweetalert2";

const ProductList = ({ onEdit }) => {
  const { products, loading, error, page, pageSize, total, search, dispatch, fetchProducts, deleteProduct } = useProductContext();

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, [page, search]);

  const handleSearch = (e) => {
    dispatch({ type: "SET_SEARCH", payload: e.target.value });
  };

  const handleDelete = async (product) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Quieres eliminar el producto "${product.title}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        const response = await deleteProduct(product.id);
        
        if (response.success) {
          Swal.fire({
            title: '¡Eliminado!',
            text: 'El producto ha sido eliminado exitosamente.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
          });
        } else {
          Swal.fire({
            title: 'Eliminado localmente',
            text: response.message || 'El producto ha sido eliminado del almacenamiento local.',
            icon: 'info',
            timer: 2000,
            showConfirmButton: false
          });
        }
      } catch {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo eliminar el producto. Inténtalo de nuevo.',
          icon: 'error'
        });
      }
    }
  };

  return (
    <div style={{ backgroundColor: "#121212", color: "#e0e0e0", padding: "1rem", borderRadius: "8px" }}>
      <h2>Productos</h2>
      <input
        type="text"
        placeholder="Buscar producto..."
        value={search}
        onChange={handleSearch}
        style={{ 
          marginBottom: "1rem",
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #444",
          width: "300px",
          backgroundColor: "#1e1e1e",
          color: "#e0e0e0"
        }}
      />
      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: "#ff6b6b" }}>{error}</p>}
      
      <div style={{ overflowX: "auto" }}>
        <table style={{ 
          width: "100%", 
          borderCollapse: "collapse",
          backgroundColor: "#1e1e1e",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 2px 10px rgba(0,0,0,0.7)",
          color: "#e0e0e0"
        }}>
          <thead>
            <tr style={{ backgroundColor: "#2c2c2c" }}>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #444" }}>ID</th>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #444" }}>Imagen</th>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #444" }}>Nombre</th>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #444" }}>Precio</th>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #444" }}>Categoría</th>
              <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #444" }}>Descripción</th>
              <th style={{ padding: "12px", textAlign: "center", borderBottom: "2px solid #444" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} style={{ borderBottom: "1px solid #444" }}>
                <td style={{ padding: "12px" }}>{product.id}</td>
                <td style={{ padding: "12px" }}>
                  {product.images && product.images[0] ? (
                    <img 
                      src={product.images[0]} 
                      alt={product.title}
                      style={{ 
                        width: "50px", 
                        height: "50px", 
                        objectFit: "cover",
                        borderRadius: "4px"
                      }}
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/50x50?text=${product.title.charAt(0)}`;
                      }}
                    />
                  ) : (
                    <div style={{
                      width: "50px",
                      height: "50px",
                      backgroundColor: "#333",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "4px",
                      fontSize: "18px",
                      fontWeight: "bold",
                      color: "#bbb"
                    }}>
                      {product.title.charAt(0).toUpperCase()}
                    </div>
                  )}
                </td>
                <td style={{ padding: "12px", fontWeight: "500" }}>{product.title}</td>
                <td style={{ padding: "12px", color: "#4caf50", fontWeight: "600" }}>
                  ${product.price}
                </td>
                <td style={{ padding: "12px" }}>
                  <span style={{
                    backgroundColor: "#333",
                    padding: "4px 8px",
                    borderRadius: "12px",
                    fontSize: "12px",
                    fontWeight: "500",
                    color: "#ccc"
                  }}>
                    {product.category?.name || 'Sin categoría'}
                  </span>
                </td>
                <td style={{ 
                  padding: "12px", 
                  maxWidth: "200px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap"
                }}>
                  {product.description}
                </td>
                <td style={{ padding: "12px", textAlign: "center" }}>
                  <button 
                    onClick={() => onEdit && onEdit(product)}
                    style={{
                      backgroundColor: "#2196f3",
                      color: "white",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: "4px",
                      cursor: "pointer",
                      marginRight: "8px",
                      fontSize: "12px"
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = "#1769aa"}
                    onMouseOut={(e) => e.target.style.backgroundColor = "#2196f3"}
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => handleDelete(product)}
                    style={{
                      backgroundColor: "#f44336",
                      color: "white",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "12px"
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = "#d32f2f"}
                    onMouseOut={(e) => e.target.style.backgroundColor = "#f44336"}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {products.length === 0 && !loading && (
        <div style={{ 
          textAlign: "center", 
          padding: "40px",
          color: "#666"
        }}>
          <p>No se encontraron productos.</p>
          {search && (
            <p>Intenta con otros términos de búsqueda.</p>
          )}
        </div>
      )}

      <div style={{ 
        marginTop: "1rem", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "10px"
      }}>
        <div>
          Página {page} de {Math.ceil(total / pageSize)} - Total: {total} productos
        </div>
        
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button 
            onClick={() => dispatch({ type: "SET_PAGE", payload: Math.max(1, page - 1) })} 
            disabled={page === 1} 
            style={{
              padding: "8px 16px",
              backgroundColor: page === 1 ? "#e9ecef" : "#007bff",
              color: page === 1 ? "#6c757d" : "white",
              border: "none",
              borderRadius: "4px",
              cursor: page === 1 ? "not-allowed" : "pointer"
            }}
          >
            Anterior
          </button>
          
          <button 
            onClick={() => dispatch({ type: "SET_PAGE", payload: page + 1 })} 
            disabled={page >= Math.ceil(total / pageSize)} 
            style={{
              padding: "8px 16px",
              backgroundColor: page >= Math.ceil(total / pageSize) ? "#e9ecef" : "#007bff",
              color: page >= Math.ceil(total / pageSize) ? "#6c757d" : "white",
              border: "none",
              borderRadius: "4px",
              cursor: page >= Math.ceil(total / pageSize) ? "not-allowed" : "pointer"
            }}
          >
            Siguiente
          </button>
          
          <select 
            value={pageSize} 
            onChange={e => dispatch({ type: "SET_PAGE_SIZE", payload: Number(e.target.value) })} 
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc"
            }}
          >
            <option value={5}>5 por página</option>
            <option value={10}>10 por página</option>
            <option value={20}>20 por página</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
