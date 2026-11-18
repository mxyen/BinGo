# BinGo ♻️

Turning waste into value through smart sorting, recycling and rewards.

BinGo es una aplicación web que ayuda a las personas a separar correctamente sus residuos y las motiva a reciclar mediante un sistema de puntos y recompensas.

## Funcionalidades

### 🔍 Clasificación de residuos
- **Búsqueda por nombre**: escribe el residuo (por ejemplo, “botella”, “pila” o “cáscara de plátano”) y BinGo indica en qué contenedor va, junto con consejos para desecharlo correctamente.
- **Reconocimiento por foto**: toma una foto y un modelo de inteligencia artificial identifica el objeto y sugiere su categoría.
- **Selección manual**: si el residuo no aparece, se puede elegir la categoría directamente.

### ⭐ Puntos y niveles
Cada residuo reciclado suma puntos según su categoría. Los residuos con mayor impacto ambiental, como electrónicos o pilas, otorgan más puntos. El usuario avanza por cinco niveles, de 🌱 *Semilla* a 🌍 *Guardián del planeta*.

### 🎁 Recompensas
Los puntos acumulados se canjean por recompensas y se genera un código de canje.

### 📊 Impacto
Estadísticas de residuos reciclados por categoría y una estimación del CO₂ evitado.

## Categorías

| Categoría | Contenedor | Ejemplos |
|---|---|---|
| 🍌 Orgánico | Verde | Restos de comida, cáscaras, hojas |
| 📦 Papel y cartón | Azul | Hojas, cajas, periódico |
| 🥤 Plásticos y latas | Amarillo | Botellas PET, latas, Tetra Pak |
| 🍾 Vidrio | Blanco | Botellas y frascos |
| 🔌 Electrónicos | Punto de acopio | Celulares, cargadores, audífonos |
| 🔋 Manejo especial | Punto de acopio | Pilas, medicamentos, aceite |
| 🗑️ No reciclable | Gris | Unicel, envolturas, pañales |

## ¿Cómo funciona el reconocimiento por foto?

BinGo usa **MobileNet v2**, un modelo de visión por computadora de Google entrenado con el conjunto de datos ImageNet (1000 tipos de objetos), ejecutado con **TensorFlow.js**.

- El análisis se realiza **directamente en el dispositivo**: las fotos no se envían a ningún servidor.
- No requiere claves de API ni servicios externos.
- El modelo identifica el objeto (por ejemplo, *banana*) y BinGo lo asocia con su categoría de residuo (*Orgánico*).

## Funciona sin internet

BinGo es una **Progressive Web App (PWA)**:

- Se puede **instalar** en el celular o la computadora como una aplicación más.
- Tras la primera visita, **funciona completamente sin conexión**, incluido el reconocimiento por foto, ya que el modelo de IA se guarda en el dispositivo.
- El progreso del usuario se almacena localmente en el navegador.

**Instalar en Android (Chrome):** menú ⋮ → *Agregar a pantalla principal*.
**Instalar en iPhone (Safari):** botón Compartir → *Agregar a inicio*.

## Tecnologías

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) y [vite-plugin-pwa](https://vite-pwa-org.netlify.app/)
- [TensorFlow.js](https://www.tensorflow.org/js) con [MobileNet](https://github.com/tensorflow/tfjs-models/tree/master/mobilenet)

## Estructura del proyecto

```
src/
├── components/   Vistas e interfaz (clasificar, puntos, recompensas)
├── data/         Categorías, catálogo de residuos y recompensas
├── hooks/        Lógica de puntos, niveles y canjes
└── lib/          Búsqueda de residuos y clasificación de imágenes
public/
├── icons/        Íconos de la aplicación
└── models/       Modelo MobileNet v2 para uso sin conexión
```

## Créditos

- Modelo MobileNet v2 © Google, distribuido bajo licencia [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0).
- Las cifras de CO₂ evitado son estimaciones aproximadas con fines ilustrativos.
