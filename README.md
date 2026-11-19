# Carrasco74 Productora Audiovisual

Sitio institucional multipágina responsive, desarrollado con HTML5 semántico, CSS3 (Flexbox y Grid) y JavaScript vanilla. Sin frameworks ni dependencias de ejecución.

## Estructura

| Archivo / carpeta | Contenido |
| --- | --- |
| `index.html` | Inicio: presentación institucional, actividades, producciones destacadas y CTA. |
| `equipo.html` | Equipo: Ariel Carrasco, Mauro Carrasco, Liliana Perino y Jairo Carrasco. |
| `servicios.html` | Servicios documentados en el Dossier Carrasco74. |
| `trabajos.html` | Portfolio: Cero DB ¡Viva el Arte!, El Profe y Moreira, con galerías. |
| `contacto.html` | Datos de contacto, redes sociales, mapa y formulario. |
| `css/styles.css` | Identidad visual, componentes y diseño responsive. |
| `js/main.js` | Menú móvil, navegación activa, revelado de secciones, lightbox y formulario. |
| `assets/img/` | Logotipos, retratos y fotografías de producciones optimizadas para web. |
| `archivos/` | Documentación y recursos originales (no modificados). |
| `backup_original/` | Copia de seguridad de los archivos HTML, CSS, JS y README originales. |

## Contenido y veracidad

Todo el texto institucional se basa en `archivos/Dossier Carrasco74.md` y en la documentación específica de cada producción referenciada desde la carpeta `archivos` (CERO DB, EL PROFE y MOREIRA). No se han inventado fechas, premios ni antecedentes.

Las fotografías de las producciones se copiaron y optimizaron desde esos recursos originales dentro de `assets/img/`. Los originales de `archivos/` se conservan sin cambios.

## Formulario de contacto

El sitio es estático. El formulario valida los campos y abre `mailto:estudio.carrasco74@gmail.com` con el asunto y el mensaje ya completos. No envía datos a un servidor ni simula un envío exitoso: el mensaje se envía cuando la persona confirma en su aplicación de correo.

## Ejecutar localmente

Opción simple: abrir `index.html` directamente en Google Chrome.

Opción recomendada (evita restricciones de rutas y permite probar como servidor):

```bash
cd carrasco74-tfi
python -m http.server 8000
```

Luego visitar `http://localhost:8000/`.

También funciona con la extensión **Live Server** de Visual Studio Code.

## Publicación

El sitio es compatible con alojamiento estático (GitHub Pages, Netlify, etc.). Mantener la estructura de carpetas y subir también `assets/img/`, `css/` y `js/`.
