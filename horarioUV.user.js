// ==UserScript==
// @name         Exportador de horario de clases de la Universitat de València
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Intercepta solicitudes XHR para combinar datos de horarios de diferentes meses y exportarlos en formato ICS mediante un botón
// @author       Jordi Beltran Querol (beltrnjordi)
// @match        https://intranet.uv.es/portal/ac_students_schedule
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let horario = []; // Array para almacenar todas las respuestas JSON, para ello, si quieres almacenar en el fichero ICS el curso completo debes moverte hasta mayo de 2025

    // Crear y añadir el botón al DOM
    const downloadButton = document.createElement('button');
    downloadButton.textContent = 'Descargar Horario';
    downloadButton.style.position = 'fixed';
    downloadButton.style.padding = '10px 20px';
    downloadButton.style.backgroundColor = '#016ca2';
    downloadButton.style.color = 'white';
    downloadButton.style.border = 'none';
    downloadButton.style.borderRadius = '5px';
    downloadButton.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    downloadButton.style.cursor = 'pointer';
    downloadButton.style.top = '95px';
    downloadButton.style.zIndex = 9999;

    // Calcular el valor right conforme el tamaño de la pantalla
    function adjustButtonPosition() {
        const screenWidth = window.innerWidth;
        downloadButton.style.right = `${Math.max(200, screenWidth * 0.1)}px`; // Ajustar el valor right
    }

    // Ajustar la posición del botón al cargar la página y al redimensionar la ventana
    adjustButtonPosition();
    window.addEventListener('resize', adjustButtonPosition);

    downloadButton.addEventListener('mouseover', function() {
        downloadButton.style.backgroundColor = '#014f7b';
    });
    downloadButton.addEventListener('mouseout', function() {
        downloadButton.style.backgroundColor = '#016ca2';
    });
    downloadButton.addEventListener('click', function() {
        if (horario.length > 0) {
            const data = { items: horario.flatMap(data => data.items) };
            const icsContent = convertToICS(data);
            const blob = new Blob([icsContent], { type: 'text/calendar' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'horario.ics';
            a.click();
            URL.revokeObjectURL(url); // Liberar la URL creada
        } else {
            alert('No se ha encontrado el horario.');
        }
    });
    document.body.appendChild(downloadButton);

    // Función para convertir JSON a ICS
    function convertToICS(data) {
        let ics = 'BEGIN:VCALENDAR\nVERSION:2.0\nCALSCALE:GREGORIAN\n';
        data.items.forEach(item => {
            ics += 'BEGIN:VEVENT\n';
            ics += `DTSTART:${formatDateToICS(item.inicio)}\n`;
            ics += `DTEND:${formatDateToICS(item.fin)}\n`;
            ics += `SUMMARY:${item.nombre_asignatura} - ${item.identificador_grupo}\n`;
            ics += `LOCATION:${item.nombre_lugar}\n`;
            ics += `DESCRIPTION:${item.nombre_grupo} - ${item.identificador_grupo}\n`;
            ics += 'END:VEVENT\n';
        });
        ics += 'END:VCALENDAR';
        return ics;
    }

    // Función para formatear la fecha al formato ICS
    function formatDateToICS(dateString) {
        const date = new Date(dateString);
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    }

    // Guardar las funciones originales de XMLHttpRequest (XHR)
    const originalOpen = XMLHttpRequest.prototype.open;
    const originalSend = XMLHttpRequest.prototype.send;

    // Sobrescribir la función open de XMLHttpRequest para capturar la URL de la solicitud
    XMLHttpRequest.prototype.open = function(method, url, ...rest) {
        this._url = url; // Guardar la URL de la solicitud
        return originalOpen.apply(this, [method, url, ...rest]); // Llamar a la función original
    };

    // Sobrescribir la función send de XMLHttpRequest para interceptar la respuesta
    XMLHttpRequest.prototype.send = function(body) {
        this.addEventListener('load', function() {
            // Verificar si la URL de la solicitud es la que contiene el horario
            if (this._url.startsWith('https://portal-api.universitasxxi.cloud/ac5/schedule/teacherstudent')) {
                try {
                    // Parsear la respuesta JSON y almacenarla en la variable
                    const data = JSON.parse(this.responseText);
                    console.log('Respuesta XHR detectada:', data);
                    horario.push(data); // Agregar la respuesta al array de datos
                } catch (e) {
                    // Manejar errores en el análisis del JSON
                    console.error('Error al analizar JSON:', e);
                }
            }
        });
        return originalSend.apply(this, [body]); // Llamar a la función original
    };
})();
