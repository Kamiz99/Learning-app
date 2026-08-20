# ☁️ CloudLingo — AWS Cloud Practitioner (CLF-C02)

Aplicación web tipo Duolingo para preparar el examen **AWS Certified Cloud Practitioner (CLF-C02)**:
lecciones cortas, rachas, vidas, XP, logros y simulacros de examen cronometrados.

Todo el contenido está en español y no requiere instalación, servidor ni conexión a internet.

## 🚀 Cómo ejecutarla

Abre `index.html` en el navegador. Es una app estática sin dependencias ni proceso de compilación.

Si prefieres servirla (recomendado para que se apliquen bien las tipografías web):

```bash
npx http-server -p 8080 .
# o
python3 -m http.server 8080
```

Y visita <http://localhost:8080>.

También puede publicarse tal cual en GitHub Pages, Netlify o cualquier hosting estático.

## 🎮 Qué incluye

| Mecánica | Descripción |
|---|---|
| **Camino de aprendizaje** | 6 unidades y 31 lecciones que se desbloquean en orden, con burbujas y estrellas |
| **Vidas ❤️** | 5 vidas; se pierde una por fallo y se recupera una cada 15 minutos (o con gemas) |
| **Racha 🔥** | Cuenta los días consecutivos de práctica y se rompe si te saltas un día |
| **XP y niveles ⭐** | 15 XP por lección (+5 si es perfecta) y meta diaria configurable |
| **Gemas 💎** | Se ganan al completar lecciones, logros y simulacros; sirven para recargar vidas |
| **Logros 🏅** | 13 medallas por constancia, precisión y resultados de examen |
| **Repaso inteligente 🧠** | Prioriza los ejercicios que más fallas y los que llevas más tiempo sin ver |
| **Fichas rápidas** | Tarjetas de servicio ↔ definición para repasar sin presión |
| **Simulacro 📝** | 65 preguntas / 90 min con el reparto real por dominio, o mini test de 20 / 25 min |

### Tipos de ejercicio

- **Opción única** y **opción múltiple** (varias respuestas correctas)
- **Verdadero / falso**
- **Emparejar** conceptos con definiciones (se corrige solo al completarse)
- **Completar huecos** con banco de palabras
- **Clasificar** elementos en categorías (por ejemplo, responsabilidad de AWS o del cliente)

Cada respuesta muestra una explicación con el porqué, tanto si aciertas como si fallas.

## 📚 Temario cubierto

Sigue la guía oficial del examen CLF-C02 y respeta el peso de cada dominio:

| Unidad | Dominio | Peso |
|---|---|---|
| 1. Conceptos de la nube | Dominio 1 | 24 % |
| 2. Arquitectura bien diseñada | Dominio 1 | 24 % |
| 3. Seguridad y cumplimiento | Dominio 2 | 30 % |
| 4. Infraestructura global y cómputo | Dominio 3 | 34 % |
| 5. Almacenamiento, datos y redes | Dominio 3 | 34 % |
| 6. Facturación, precios y soporte | Dominio 4 | 12 % |

En total: **194 ejercicios** en las lecciones y **82 preguntas** en el banco del simulacro.

## 🗂️ Estructura del proyecto

```
index.html          Punto de entrada
styles.css          Tema claro/oscuro, componentes y camino de aprendizaje
js/
  content.js        Unidades, lecciones y ejercicios (todo el temario)
  exam.js           Banco de preguntas del simulacro y configuración del examen
  state.js          Estado persistente: XP, vidas, racha, progreso (localStorage)
  audio.js          Efectos de sonido sintetizados con Web Audio (sin archivos)
  ui.js             Utilidades: escapado, barajado, avisos, tema
  exercises.js      Renderizado y corrección de cada tipo de ejercicio
  lesson.js         Motor de lección: cola, vidas, feedback y resultados
  screens.js        Camino, práctica, examen, perfil y logros
  app.js            Router, barra superior, navegación inferior y modales
```

### Añadir contenido

Para crear una lección nueva basta con añadir un objeto al array `lessons` de una unidad en
`js/content.js`; los identificadores de ejercicio se generan solos al final del archivo:

```js
{
  id: 'u1l6', icon: '🎯', title: 'Mi lección',
  tip: 'Idea clave que se muestra antes de empezar.',
  ex: [
    { t:'choice', q:'¿Pregunta?', o:['A','B','C','D'], a:0, why:'Explicación.' },
    { t:'tf', q:'Afirmación.', a:true, why:'Explicación.' }
  ]
}
```

Las preguntas del simulacro se añaden a `EXAM_BANK` en `js/exam.js` indicando su dominio (`d: 1..4`).
Las opciones se barajan automáticamente en cada intento.

## 💾 Datos y privacidad

Todo el progreso se guarda **solo en tu navegador** (`localStorage`, clave `cloudlingo.v1`).
No hay cuentas, ni servidor, ni analítica. Puedes borrarlo desde *Perfil → Borrar todo mi progreso*.

## ⚙️ Ajustes disponibles

Tema claro/oscuro/automático, sonidos, meta diaria (20–200 XP), navegación libre
(para saltar el desbloqueo secuencial) y recarga de vidas.

---

Contenido de estudio no oficial y con fines educativos. AWS, Amazon Web Services y
AWS Certified Cloud Practitioner son marcas registradas de Amazon Web Services, Inc.
