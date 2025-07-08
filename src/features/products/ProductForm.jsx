import React, { useState } from "react";
import { useProductContext } from "./ProductContext";
import Swal from "sweetalert2";

const ProductForm = ({ initialData, onClose }) => {
  const safeData = initialData || {};
  const { createProduct, updateProduct } = useProductContext();
  const [title, setTitle] = useState(safeData.title || "");
  const [price, setPrice] = useState(safeData.price || "");
  const [description, setDescription] = useState(safeData.description || "");
  const [categoryId, setCategoryId] = useState(safeData.categoryId || 1);
  const [images, setImages] = useState(safeData.images ? safeData.images.join(", ") : "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const productData = {
        title: title.trim(),
        price: Number(price),
        description: description.trim(),
        categoryId: Number(categoryId),
        images: images.split(",").map(img => img.trim()).filter(img => img) || ["https://via.placeholder.com/400x400?text=Producto"]
      };

      let response;
      if (safeData.id) {
        response = await updateProduct(safeData.id, productData);
      } else {
        response = await createProduct(productData);
      }

      if (response.success) {
        await Swal.fire({
          title: '¡Éxito!',
          text: `Producto ${safeData.id ? 'actualizado' : 'creado'} exitosamente.`,
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
      } else {
        await Swal.fire({
          title: 'Guardado localmente',
          text: response.message || `Producto ${safeData.id ? 'actualizado' : 'creado'} en el almacenamiento local.`,
          icon: 'info',
          timer: 2000,
          showConfirmButton: false
        });
      }
      
      onClose && onClose();
    } catch (err) {
      console.error("Error al guardar producto:", err);
      await Swal.fire({
        title: 'Error',
        text: err.error || 'No se pudo guardar el producto. Inténtalo de nuevo.',
        icon: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const formStyle = {
    backgroundColor: "#1e1e1e",
    padding: "24px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.7)",
    marginBottom: "2rem",
    color: "#e0e0e0"
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginBottom: "16px",
    border: "1px solid #444",
    borderRadius: "4px",
    fontSize: "14px",
    boxSizing: "border-box",
    backgroundColor: "#2c2c2c",
    color: "#e0e0e0"
  };

  const buttonStyle = {
    padding: "12px 24px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    marginRight: "8px"
  };

  const primaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: loading ? "#555" : "#2196f3",
    color: "white"
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#666",
    color: "white"
  };

  return (
    <div style={formStyle}>
      <h3 style={{ marginBottom: "20px", color: "#e0e0e0" }}>
        {safeData.id ? "Editar Producto" : "Nuevo Producto"}
      </h3>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label style={{ display: "block", marginBottom: "4px", fontWeight: "500", color: "#e0e0e0" }}>
            Título del Producto *
          </label>
          <input
            type="text"
            placeholder="Ej: iPhone 14 Pro"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            style={inputStyle}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "4px", fontWeight: "500", color: "#e0e0e0" }}>
            Precio *
          </label>
          <input
            type="number"
            placeholder="Ej: 999.99"
            value={price}
            onChange={e => setPrice(e.target.value)}
            required
            min="0"
            step="0.01"
            style={inputStyle}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "4px", fontWeight: "500", color: "#e0e0e0" }}>
            Descripción *
          </label>
          <textarea
            placeholder="Describe las características del producto..."
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
            rows="4"
            style={{
              ...inputStyle,
              resize: "vertical",
              minHeight: "80px"
            }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "4px", fontWeight: "500", color: "#e0e0e0" }}>
            Categoría
          </label>
          <select
            value={categoryId}
            onChange={e => setCategoryId(e.target.value)}
            style={inputStyle}
          >
            <option value={1}>Electrónicos</option>
            <option value={2}>Ropa</option>
            <option value={3}>Hogar</option>
            <option value={4}>Deportes</option>
            <option value={5}>Libros</option>
          </select>
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "4px", fontWeight: "500", color: "#e0e0e0" }}>
            URLs de Imágenes (separadas por comas)
          </label>
          <input
            type="text"
            placeholder="https://ejemplo.com/imagen1.jpg, https://ejemplo.com/imagen2.jpg"
            value={images}
            onChange={e => setImages(e.target.value)}
            style={inputStyle}
          />
          <small style={{ color: "#bbb", fontSize: "12px" }}>
            Si no proporcionas imágenes, se usará una imagen por defecto
          </small>
        </div>

        <div style={{ marginTop: "24px", display: "flex", gap: "8px" }}>
          <button 
            type="submit" 
            disabled={loading}
            style={primaryButtonStyle}
          >
            {loading ? "Guardando..." : (safeData.id ? "Actualizar" : "Crear")}
          </button>
          
          {onClose && (
            <button 
              type="button" 
              onClick={onClose}
              style={secondaryButtonStyle}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
