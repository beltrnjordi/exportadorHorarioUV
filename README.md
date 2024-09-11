# Exportador de horarios de la Universitat de València
Este UserScript agrega un botón a la Intranet de la Universitat de València que permite descargar el horario de clases en formato ICS. El script intercepta una única solicitud XHR que contiene como respuesta el horario en formato JSON. Este lo convierte a formato ICS (iCalendar) y ofrece una opción para descargarlo directamente desde la página.

En versiones anteriores de la Intranet o Secretaría Virtual, la opción de descargar el horario en formato ICS estaba disponible. Sin embargo, tras su actualización, esta funcionalidad se ha eliminado. Este UserScript restaura esa capacidad, permitiendo de nuevo la descarga del horario en el formato deseado.

## Instalación
Para utilizar este UserScript, necesitarás una extensión de navegador que gestione UserScripts, como por ejemplo [Tampermonkey](https://www.tampermonkey.net/)

1.**Instala Tampermonkey en tu navegador**
2.**Ve a la pestaña Releases de este repositorio y pulsa sobre el archivo --horarioUV.user.js--**

## Uso
1.Accede a la página de horario de clases en la [Intranet de la Universitat de València](https://intranet.uv.es/portal/ac_students_schedule)
2.Haz clic en el botón "Descargar Horario" que aparece en la parte inferior derecha de la página.
3.Descarga el archivo horario.ics que contiene el horario de clases en formato ICS.
