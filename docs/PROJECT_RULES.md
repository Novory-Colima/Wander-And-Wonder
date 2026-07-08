# PROJECT RULES

## Objetivo

Este proyecto debe sentirse como una producción de un estudio creativo de primer nivel.

Cada decisión deberá priorizar:

- Experiencia de usuario
- Calidad visual
- Rendimiento
- Escalabilidad
- Código limpio

La prioridad nunca será terminar rápido.

La prioridad será construir una referencia de portafolio.

---

# Filosofía

No estamos desarrollando una landing tradicional.

Estamos desarrollando una experiencia interactiva.

Debe sentirse como una mezcla entre:

- cortometraje
- documental
- revista editorial
- sitio Awwwards

Nunca como una plantilla de WordPress.

---

# Arquitectura

Todo debe seguir una arquitectura modular.

Separación absoluta entre:

- presentación
- animaciones
- utilidades
- configuración
- datos

No mezclar responsabilidades.

---

# Componentes

Cada componente debe ser:

- pequeño
- reutilizable
- desacoplado
- fácil de mantener

Evitar archivos gigantes.

---

# Animaciones

Toda la lógica GSAP deberá vivir únicamente dentro de:

src/animations/

Los componentes nunca deberán contener timelines complejos.

Únicamente inicializarán la animación correspondiente.

---

# Motion

Cada animación debe tener un propósito.

Nunca animar por animar.

Prioridades:

1. Guiar la mirada.
2. Reforzar la narrativa.
3. Generar emoción.
4. Sorprender.

Nunca distraer.

---

# Performance

Objetivos:

Lighthouse

Performance > 95

Accessibility > 100

SEO > 100

Best Practices > 100

---

Evitar:

Frameworks innecesarios.

JavaScript redundante.

Reflows.

Layout Thrashing.

CLS.

FOUC.

Animaciones pesadas.

---

# Imágenes

Utilizar siempre Astro Image.

Todas deberán incluir:

width

height

sizes

alt

loading adecuado

fetchpriority cuando corresponda.

---

# Responsive

Mobile First.

Optimizar para:

- teléfonos pequeños
- teléfonos grandes
- tablets
- laptops
- desktop
- pantallas ultrawide

La experiencia nunca deberá romperse.

No esconder contenido importante en móvil.

Reorganizarlo.

---

# Accesibilidad

Todo debe funcionar mediante teclado.

Estados focus visibles.

Contrastes correctos.

Respeto por prefers-reduced-motion.

Jerarquía semántica correcta.

ARIA únicamente cuando sea necesario.

---

# Tipografía

El texto es parte del diseño.

Nunca utilizar bloques enormes.

Mucho espacio.

Excelente legibilidad.

Jerarquías claras.

---

# Clean Code

TypeScript estricto.

Nada de any.

Nada de código muerto.

Nada duplicado.

Funciones pequeñas.

Variables descriptivas.

Imports ordenados.

---

# Dependencias

No instalar nuevas librerías salvo que exista una justificación técnica importante.

Antes de incorporar una dependencia deberá explicarse:

- problema
- beneficio
- impacto
- alternativa

Esperar aprobación.

---

# Desarrollo

Trabajar únicamente por fases.

Al terminar cada fase:

- realizar autoauditoría
- detectar problemas
- proponer mejoras
- esperar aprobación

Nunca avanzar automáticamente.

---

# Regla Final

Si durante el desarrollo encuentras una decisión capaz de mejorar significativamente la experiencia sin romper README.md, WIREFRAME.md ni DESIGN_SPEC.md:

Detente.

Explícala.

Justifica técnicamente la mejora.

Espera aprobación antes de implementarla.