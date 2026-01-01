# Ideas de Diseño - TRM Colombia

## Contexto
Aplicación web para consultar la Tasa Representativa del Mercado (TRM) del dólar en Colombia. Debe mostrar la TRM actual, histórico, calculadora de conversión y gráficas.

---

<response>
## Idea 1: Fintech Moderno con Glassmorphism

### Design Movement
Inspirado en el diseño de aplicaciones fintech modernas como Revolut, Wise y N26, con elementos de glassmorphism y gradientes sutiles.

### Core Principles
1. **Claridad de datos**: Los números financieros deben ser el protagonista absoluto con tipografía grande y legible
2. **Confianza visual**: Colores institucionales que transmitan seguridad y profesionalismo
3. **Microinteracciones**: Feedback visual inmediato en cada acción del usuario
4. **Jerarquía clara**: Información más importante siempre visible sin scroll

### Color Philosophy
- **Primario**: Azul profundo (#1E3A5F) - Transmite confianza, estabilidad financiera
- **Acento**: Verde esmeralda (#10B981) - Representa crecimiento, dinero, prosperidad
- **Fondo**: Gradiente suave de blanco a gris muy claro con texturas sutiles
- **Alertas**: Rojo coral para bajas, verde para alzas

### Layout Paradigm
- Hero section con la TRM actual en tipografía display gigante (120px+)
- Grid asimétrico de 3 columnas para calculadora, gráfica y tabla
- Sidebar flotante con navegación por fechas
- Cards con efecto glass (backdrop-blur) sobre fondos con gradientes

### Signature Elements
1. **Indicador de tendencia animado**: Flecha con animación que muestra si la TRM subió o bajó
2. **Números con transición**: Los valores cambian con animación de contador
3. **Glassmorphism cards**: Tarjetas semitransparentes con blur de fondo

### Interaction Philosophy
- Hover effects con elevación y sombra aumentada
- Transiciones suaves de 300ms en todos los elementos interactivos
- Tooltips informativos al pasar sobre datos
- Feedback háptico visual en botones (scale transform)

### Animation
- Entrada de elementos con fade-in + slide-up escalonado
- Gráficas con animación de dibujo de línea
- Números con animación de conteo al cargar
- Transiciones de página con crossfade

### Typography System
- **Display**: Outfit (800 weight) para el valor de TRM principal
- **Headings**: Outfit (600 weight) para títulos de secciones
- **Body**: Inter (400-500 weight) para texto general
- **Monospace**: JetBrains Mono para valores numéricos en tablas

<probability>0.08</probability>
</response>

---

<response>
## Idea 2: Estilo Editorial Financiero

### Design Movement
Inspirado en publicaciones financieras premium como The Economist, Financial Times y Bloomberg, con énfasis en tipografía editorial y diseño de información.

### Core Principles
1. **Autoridad informativa**: Diseño que transmita credibilidad y seriedad periodística
2. **Densidad de información**: Maximizar datos útiles sin sacrificar legibilidad
3. **Tipografía como protagonista**: Las fuentes serif establecen el tono editorial
4. **Neutralidad cromática**: Colores sobrios que no distraigan de los datos

### Color Philosophy
- **Primario**: Negro profundo (#0D0D0D) - Autoridad editorial
- **Acento**: Salmón/coral (#FF6B6B) para destacar cambios importantes
- **Secundario**: Dorado apagado (#C9A227) para elementos premium
- **Fondo**: Crema papel (#FDF8F3) que evoca publicaciones impresas
- **Texto**: Gris oscuro (#2D2D2D) para mejor lectura prolongada

### Layout Paradigm
- Diseño de periódico con columnas asimétricas
- Header minimalista tipo masthead de periódico
- Sección principal con TRM en formato de "breaking news"
- Grid de 12 columnas con uso creativo del espacio negativo
- Footer informativo con fuentes y metodología

### Signature Elements
1. **Ticker de cambio**: Banda superior con cambio porcentual estilo Bloomberg
2. **Líneas divisorias finas**: Separadores elegantes entre secciones
3. **Pull quotes**: Destacados con el valor de TRM en tipografía display

### Interaction Philosophy
- Interacciones sutiles y refinadas
- Hover con subrayado animado en enlaces
- Transiciones discretas que no distraigan
- Estados de carga con skeleton screens elegantes

### Animation
- Animaciones mínimas y funcionales
- Fade-in suave para contenido
- Transiciones de 200ms para respuesta rápida
- Sin animaciones decorativas innecesarias

### Typography System
- **Display**: Playfair Display (700) para el valor principal de TRM
- **Headings**: Playfair Display (600) para títulos
- **Body**: Source Serif Pro (400) para texto editorial
- **Data**: Roboto Mono para valores numéricos y tablas

<probability>0.06</probability>
</response>

---

<response>
## Idea 3: Neobrutalism Colombiano

### Design Movement
Neobrutalism con influencias de la identidad visual colombiana, combinando formas geométricas audaces con colores vibrantes inspirados en la bandera y cultura del país.

### Core Principles
1. **Impacto visual inmediato**: Diseño que captura la atención instantáneamente
2. **Honestidad estructural**: Elementos UI que muestran su función claramente
3. **Identidad cultural**: Incorporar elementos visuales colombianos de forma moderna
4. **Contraste extremo**: Bordes definidos, sombras duras, sin gradientes suaves

### Color Philosophy
- **Primario**: Amarillo colombiano (#FCD116) - Energía, optimismo
- **Secundario**: Azul bandera (#003893) - Confianza, cielo colombiano
- **Acento**: Rojo (#CE1126) - Pasión, alerta para cambios
- **Fondo**: Blanco puro con bloques de color sólido
- **Bordes**: Negro absoluto (#000000) para definición brutal

### Layout Paradigm
- Bloques rectangulares con bordes negros gruesos (3-4px)
- Disposición tipo collage con elementos superpuestos
- Asimetría intencional en la distribución
- Espacios blancos generosos entre bloques de contenido
- Sin bordes redondeados - todo angular

### Signature Elements
1. **Sombras duras offset**: Sombras sólidas desplazadas (4px, 4px) sin blur
2. **Stickers/badges**: Elementos decorativos tipo etiquetas con rotación
3. **Tipografía en bloques de color**: Texto sobre fondos de color sólido

### Interaction Philosophy
- Hover con desplazamiento de sombra
- Click con efecto de "presión" (translate + shadow reduction)
- Estados activos con inversión de colores
- Feedback inmediato y obvio

### Animation
- Transiciones rápidas y snappy (150ms)
- Movimientos lineales, sin easing suave
- Efectos de "rebote" en elementos interactivos
- Animaciones de entrada con slide desde direcciones inesperadas

### Typography System
- **Display**: Space Grotesk (700) para TRM principal - geométrica y moderna
- **Headings**: Space Grotesk (600) para títulos
- **Body**: Work Sans (400-500) para texto general
- **Accent**: Archivo Black para elementos destacados

<probability>0.04</probability>
</response>

---

## Decisión Final

**Seleccionada: Idea 1 - Fintech Moderno con Glassmorphism**

Esta opción es la más apropiada para una aplicación financiera porque:
1. Transmite confianza y profesionalismo necesarios para datos financieros
2. La claridad en la presentación de números es fundamental para la TRM
3. El glassmorphism aporta modernidad sin sacrificar legibilidad
4. Los colores azul y verde son universalmente asociados con finanzas y crecimiento
5. Las microinteracciones mejoran la experiencia sin distraer del contenido principal
