import React, { useState } from "react";
import ProductList from "./ProductList";
import ProductForm from "./ProductForm";
import { ProductProvider } from "./ProductContext";
import { useSelector } from "react-redux";

const AdminDashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const { user, isAuthenticated } = useSelector(state => state.auth);

  if (!isAuthenticated || user?.role !== "admin") {
    console.log("No autorizado", { isAuthenticated, user });
    return <div style={{ textAlign: "center", marginTop: "4rem" }}><h2>Acceso restringido solo para administradores.</h2></div>;
  }
  console.log("Renderizando AdminDashboard", { isAuthenticated, user });

  const handleEdit = (product) => {
    setEditData(product);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditData(null);
  };

  return (
    <ProductProvider>
      <div style={{ 
        maxWidth: 900, 
        margin: "2rem auto", 
        padding: 24, 
        background: "#121212", 
        borderRadius: 12,
        color: "#e0e0e0",
        boxShadow: "0 4px 20px rgba(0,0,0,0.7)"
      }}>
        <h1 style={{ color: "#e0e0e0", marginBottom: "1.5rem" }}>Dashboard de Productos</h1>
        {showForm ? (
          <ProductForm initialData={editData} onClose={handleCloseForm} />
        ) : (
          <button 
            onClick={() => setShowForm(true)} 
            style={{ 
              marginBottom: "1rem",
              padding: "12px 24px",
              backgroundColor: "#2196f3",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500"
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#1769aa"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#2196f3"}
          >
            Nuevo Producto
          </button>
        )}
        <ProductList onEdit={handleEdit} />
      </div>
    </ProductProvider>
  );
};

export default AdminDashboard;