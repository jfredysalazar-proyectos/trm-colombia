# TRM Colombia 🇨🇴

Aplicación web para consultar la **TRM (Tasa Representativa del Mercado)** del dólar en Colombia en tiempo real.

![TRM Colombia Preview](https://img.shields.io/badge/React-19-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4) ![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6)

## ✨ Características

- **TRM Actual**: Visualización del valor del dólar hoy con animación y valor en letras
- **Consulta Histórica**: Selector de fecha para consultar la TRM de cualquier día desde 1991
- **Calculadora**: Conversión bidireccional USD ↔ COP
- **Gráfica de Evolución**: Visualización del histórico con filtros de período (15 días a 1 año)
- **Tabla de Histórico**: Últimos 14 días con tendencias y variaciones
- **Tablas de Conversión**: Valores predefinidos para referencia rápida

## 🛠️ Tecnologías

- **Frontend**: React 19 + TypeScript
- **Estilos**: Tailwind CSS 4 + shadcn/ui
- **Gráficas**: Recharts
- **Routing**: Wouter
- **Build**: Vite

## 📊 Fuente de Datos

Los datos de la TRM se obtienen de la **API oficial de Datos Abiertos de Colombia** (datos.gov.co), proporcionados por la Superintendencia Financiera de Colombia.

```
https://www.datos.gov.co/resource/32sa-8pi3.json
```

## 🚀 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/jfredysalazar-proyectos/trm-colombia.git

# Entrar al directorio
cd trm-colombia

# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev
```

## 📁 Estructura del Proyecto

```
trm-colombia/
├── client/
│   ├── public/
│   │   └── images/          # Imágenes y assets
│   └── src/
│       ├── components/      # Componentes React
│       │   ├── Calculator.tsx
│       │   ├── DateSelector.tsx
│       │   ├── Footer.tsx
│       │   ├── Header.tsx
│       │   ├── HistoricalTable.tsx
│       │   ├── TRMChart.tsx
│       │   └── TRMDisplay.tsx
│       ├── hooks/
│       │   └── useTRM.ts    # Hook para obtener datos de la API
│       ├── pages/
│       │   └── Home.tsx
│       ├── App.tsx
│       └── index.css        # Estilos globales y tema
├── server/                  # Servidor Express (producción)
└── package.json
```

## 🎨 Diseño

El diseño sigue un estilo **Fintech Moderno con Glassmorphism**:
- Paleta de colores azul profundo y verde esmeralda
- Efectos de glassmorphism (tarjetas semitransparentes)
- Tipografía Outfit para valores numéricos
- Microinteracciones y animaciones suaves

## 📄 Licencia

MIT License - Siéntete libre de usar este proyecto como base para tus propios desarrollos.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir los cambios que te gustaría realizar.

---

Hecho con ❤️ para Colombia
