# Características
## 🎯 Gestión de Compras
* ✅ Agregar compras con nombre, precio, categoría y fecha
* ✏️ Editar compras existentes de forma intuitiva
* 🗑️ Eliminar compras con confirmación visual
* 🔍 Búsqueda en tiempo real con debounce optimizado
🔧 Filtros y Ordenación Avanzados
* 📁 Filtro por categorías múltiples
* 📅 Rango de fechas personalizable
* 💰 Rango de precios (mínimo y máximo)
* 🔄 Ordenación por nombre, precio, categoría o fecha
* 🎨 Panel de filtros colapsable y responsive
## 📊 Estadísticas y Visualización
* 📈 Gráficos interactivos con Recharts
   * Tendencia de gastos (línea)
   * Distribución por categoría (pastel)
   * Comparación mensual (barras)
* ⏰ Vistas temporales: Diaria, Semanal, Mensual
* 🔄 Modo comparación con mes anterior
* 💡 Métricas clave: Total, promedio, cantidad de compras
## 🎨 UI/UX
* 🌊 Animaciones fluidas con Framer Motion
* 📱 Diseño responsive para móvil, tablet y desktop
* 🎨 Gradientes modernos y efectos visuales
* 🔔 Notificaciones toast para feedback instantáneo
* ♿ Accesibilidad considerada en todo el diseño
## 💾 Persistencia
* 💿 LocalStorage para guardar datos automáticamente
* 🔄 Sincronización en tiempo real
* 📦 Sin backend requerido  
* 📂 Estructura del Proyecto

```
src/
├── components/           # Componentes React
│   ├── FilterPanel/     # Panel de filtros y ordenación
│   ├── PurchaseForm/    # Formulario de compras
│   ├── PurchaseItem/    # Item individual de compra
│   ├── StatisticsView/  # Vista de estadísticas y gráficos
│   └── Toast/           # Sistema de notificaciones
├── hooks/               # Custom Hooks
│   ├── useDebounce.ts   # Hook de debounce
│   ├── useLocalStorage.ts # Persistencia en localStorage
│   └── usePurchases.ts  # Lógica de negocio de compras
├── utils/               # Funciones utilitarias
│   ├── filters.ts       # Lógica de filtrado y ordenación
│   └── statistics.ts    # Cálculos estadísticos
├── types/               # Definiciones TypeScript
│   └── index.ts         # Interfaces y tipos
├── constants/           # Constantes globales
│   └── index.ts         # Configuración y valores constantes
└── App.tsx              # Componente principal
```

# 🎯 Uso
## Agregar una Compra
   1. Completa el formulario en la parte superior
   2. Ingresa: Nombre, Precio, Categoría y Fecha
   3. Click en "Agregar" o presiona Enter
   4. ✅ La compra aparecerá en la lista
## Filtrar Compras
   1. Usa la barra de búsqueda para filtrar por nombre
   2. Click en "Filtros" para opciones avanzadas:
      * Selecciona categorías
      * Define rango de fechas
      * Establece rango de precios
   3. Ordena por nombre, precio, categoría o fecha
## Ver Estadísticas
   1. Click en "Estadísticas" en el encabezado
   2. Selecciona período: Diario, Semanal o Mensual
   3. Activa "Comparar con mes anterior" para análisis comparativo
   4. Explora los gráficos interactivos  me interesa esto solamente, formatealo con la estructura propia de md