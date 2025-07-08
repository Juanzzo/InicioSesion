# CRUD de Productos - Guía para Thunder Client

Este proyecto implementa un CRUD completo de productos que funciona con la API de **escuelajs.co**. Puedes probar todas las operaciones usando Thunder Client.

## 🚀 Instalación y Configuración

### 1. Instalar dependencias
```bash
# Instalar dependencias del frontend y backend
npm run install:all
```

### 2. Ejecutar el proyecto
```bash
# Opción 1: Ejecutar frontend y backend simultáneamente
npm run start:all

# Opción 2: Ejecutar por separado
# Terminal 1 - Backend
npm run server:dev

# Terminal 2 - Frontend  
npm run dev
```

El frontend estará disponible en: `http://localhost:5173`
El backend estará disponible en: `http://localhost:3001`

## 📋 Endpoints Disponibles

### Base URL
```
https://api.escuelajs.co/api/v1/products
```

### 1. GET - Obtener todos los productos
**URL:** `GET https://api.escuelajs.co/api/v1/products`

**Descripción:** Obtiene una lista de todos los productos disponibles.

**Ejemplo de respuesta:**
```json
[
  {
    "id": 1,
    "title": "Handmade Fresh Table",
    "price": 687,
    "description": "Andy shoes are designed to keeping in...",
    "category": {
      "id": 5,
      "name": "Others",
      "image": "https://placeimg.com/640/480/any?r=0.591926261873231"
    },
    "images": [
      "https://placeimg.com/640/480/any?r=0.9178516507833767",
      "https://placeimg.com/640/480/any?r=0.9300320592588625"
    ]
  }
]
```

### 2. GET - Obtener producto por ID
**URL:** `GET https://api.escuelajs.co/api/v1/products/{id}`

**Ejemplo:** `GET https://api.escuelajs.co/api/v1/products/1`

**Descripción:** Obtiene un producto específico por su ID.

### 3. POST - Crear nuevo producto
**URL:** `POST https://api.escuelajs.co/api/v1/products`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "title": "Mi Nuevo Producto",
  "price": 299.99,
  "description": "Descripción detallada del producto",
  "categoryId": 1,
  "images": [
    "https://via.placeholder.com/400x400?text=Producto1",
    "https://via.placeholder.com/400x400?text=Producto2"
  ]
}
```

### 4. PUT - Actualizar producto
**URL:** `PUT https://api.escuelajs.co/api/v1/products/{id}`

**Ejemplo:** `PUT https://api.escuelajs.co/api/v1/products/1`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "title": "Producto Actualizado",
  "price": 399.99,
  "description": "Nueva descripción del producto",
  "categoryId": 2,
  "images": [
    "https://via.placeholder.com/400x400?text=Actualizado"
  ]
}
```

### 5. DELETE - Eliminar producto
**URL:** `DELETE https://api.escuelajs.co/api/v1/products/{id}`

**Ejemplo:** `DELETE https://api.escuelajs.co/api/v1/products/1`

**Descripción:** Elimina un producto específico por su ID.

## 🧪 Pruebas con Thunder Client

### Configuración en Thunder Client

1. **Abrir Thunder Client** en VS Code
2. **Crear una nueva colección** llamada "CRUD Productos"
3. **Agregar las siguientes requests:**

#### Request 1: Obtener todos los productos
- **Método:** GET
- **URL:** `https://api.escuelajs.co/api/v1/products`
- **Nombre:** "Get All Products"

#### Request 2: Obtener producto por ID
- **Método:** GET
- **URL:** `https://api.escuelajs.co/api/v1/products/1`
- **Nombre:** "Get Product by ID"

#### Request 3: Crear producto
- **Método:** POST
- **URL:** `https://api.escuelajs.co/api/v1/products`
- **Headers:** `Content-Type: application/json`
- **Body:**
```json
{
  "title": "Producto de Prueba",
  "price": 199.99,
  "description": "Este es un producto de prueba creado desde Thunder Client",
  "categoryId": 1,
  "images": [
    "https://via.placeholder.com/400x400?text=Test+Product"
  ]
}
```
- **Nombre:** "Create Product"

#### Request 4: Actualizar producto
- **Método:** PUT
- **URL:** `https://api.escuelajs.co/api/v1/products/1`
- **Headers:** `Content-Type: application/json`
- **Body:**
```json
{
  "title": "Producto Actualizado",
  "price": 299.99,
  "description": "Producto actualizado desde Thunder Client",
  "categoryId": 2
}
```
- **Nombre:** "Update Product"

#### Request 5: Eliminar producto
- **Método:** DELETE
- **URL:** `https://api.escuelajs.co/api/v1/products/1`
- **Nombre:** "Delete Product"

### Secuencia de Pruebas Recomendada

1. **Ejecutar "Get All Products"** para ver los productos existentes
2. **Ejecutar "Create Product"** para crear un nuevo producto
3. **Copiar el ID** del producto creado de la respuesta
4. **Ejecutar "Get Product by ID"** usando el ID copiado
5. **Ejecutar "Update Product"** usando el mismo ID
6. **Ejecutar "Delete Product"** usando el mismo ID
7. **Verificar con "Get All Products"** que el producto fue eliminado

## 🎯 Características del CRUD

### ✅ Funcionalidades Implementadas

- **CREATE (POST):** Crear nuevos productos con validación
- **READ (GET):** Obtener todos los productos o uno específico
- **UPDATE (PUT):** Actualizar productos existentes
- **DELETE (DELETE):** Eliminar productos
- **Paginación:** Navegación por páginas de productos
- **Búsqueda:** Filtrar productos por título o descripción
- **Fallback Local:** Almacenamiento local cuando la API no está disponible
- **Interfaz Mejorada:** UI moderna con SweetAlert2 para notificaciones

### 🔧 Tecnologías Utilizadas

- **Frontend:** React + Vite
- **Estado:** React Context + useReducer
- **API:** Escuela JS API (https://api.escuelajs.co)
- **Notificaciones:** SweetAlert2
- **Estilos:** CSS inline con diseño moderno

### 📱 Interfaz de Usuario

El proyecto incluye una interfaz web completa con:
- Lista de productos con imágenes
- Formulario para crear/editar productos
- Confirmaciones para eliminar
- Paginación y búsqueda
- Diseño responsive

## 🐛 Solución de Problemas

### Error de CORS
Si encuentras errores de CORS, la aplicación automáticamente usará localStorage como fallback.

### API no disponible
El sistema tiene un mecanismo de fallback que guarda los datos localmente cuando la API externa no está disponible.

### Puerto ocupado
Si el puerto 3001 está ocupado, puedes cambiar el puerto en `server/index.js`.

## 📞 Soporte

Si tienes problemas o preguntas:
1. Verifica que todas las dependencias estén instaladas
2. Asegúrate de que los puertos 3001 y 5173 estén disponibles
3. Revisa la consola del navegador para errores
4. Verifica que Thunder Client esté correctamente configurado

¡Disfruta probando el CRUD! 🚀
