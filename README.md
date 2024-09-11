# Exportador de Horarios de la Universitat de València

Este UserScript añade un botón a la Intranet de la Universitat de València que permite descargar el horario de clases en formato ICS. El script intercepta una solicitud XHR que contiene el horario en formato JSON, lo convierte a formato ICS (iCalendar) y proporciona una opción para descargarlo directamente desde la página.

Anteriormente, la opción de descargar el horario en formato ICS estaba disponible a través de la Intranet o Secretaría Virtual. Sin embargo, tras una actualización, esta funcionalidad se eliminó. Este UserScript restaura esa capacidad, permitiendo nuevamente la descarga del horario en el formato deseado.

## Instalación

Para utilizar este UserScript, necesitarás una extensión de navegador que gestione UserScripts, como [Tampermonkey](https://www.tampermonkey.net/) o [Greasemonkey](https://www.greasespot.net/).

1. **Instala Tampermonkey en tu navegador**.
2. **Ve a la pestaña Releases de este repositorio y descarga el archivo** `horarioUV.user.js`.

## Uso

1. Accede a la página de horario de clases en la [Intranet de la Universitat de València](https://intranet.uv.es/portal/ac_students_schedule).
2. Haz clic en el botón "Descargar Horario" que aparecerá en la parte inferior derecha de la página.
3. Descarga el archivo `horario.ics` que contiene el horario de clases en formato ICS.
4. Para añadir el archivo ICS a tu calendario en iOS puedes utilizar el siguiente atajo. [ICS to Calendar](https://www.icloud.com/shortcuts/526e9629dea64ce0b0b990b117a37ffe)

## Contribuciones

Si deseas contribuir al proyecto o tienes sugerencias, por favor abre un issue o un pull request con tus cambios.
