'use strict';

// ===============================
// Referencias a elementos del DOM
// ===============================
var form = document.getElementById('form');
var mensaje = document.getElementById('mensaje');
var estado = document.getElementById('estado');
var jsonBox = document.getElementById('json');

// Array para acumular usuarios
var usuarios = [];

// ===============================
// Utilidades
// ===============================

/**
 * Clasifica la etapa de vida:
 * - adolescente: 13–17
 * - adulto joven: 18–30
 * - adulto: 31+
 * Devuelve 'niñez' si < 13.
 */
function etapaEdad(edad) {
  if (edad >= 13 && edad <= 17) return 'adolescente';
  if (edad >= 18 && edad <= 30) return 'adulto joven';
  if (edad >= 31) return 'adulto';
  return 'niñez';
}

/**
 * Simula un guardado con Promesa (resuelve en 2s).
 */
function guardarDatos() {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve('✅ Datos guardados exitosamente');
    }, 2000);
  });
}

// ===============================
// Lógica principal
// ===============================

form.addEventListener('submit', function (e) {
  e.preventDefault();

  // Limpiar mensajes previos
  mensaje.innerText = '';
  estado.innerText = '';
  jsonBox.textContent = '';

  // Captura de valores
  var nombre = document.getElementById('nombre').value.trim();
  var edadTexto = document.getElementById('edad').value.trim();
  var ocupacion = document.getElementById('ocupacion').value.trim();
  var edad = Number(edadTexto);

  // Validaciones requeridas 
  if (nombre === '') {
    mensaje.innerText = 'El nombre no puede estar vacío.';
    return;
  }
  if (edadTexto === '' || isNaN(edad) || edad <= 0) {
    mensaje.innerText = 'La edad debe ser un número mayor a 0.';
    return;
  }

  // Mensaje según la edad
  if (edad < 18) {
    mensaje.innerText = 'Hola ' + nombre + ', eres menor de edad.';
  } else {
    mensaje.innerText = 'Hola ' + nombre + ', bienvenido/a.';
  }

  // Parte 3: Crear y mostrar un objeto
  var usuario = {
    nombre: nombre,
    edad: edad
  };
  if (ocupacion !== '') {
    usuario.ocupacion = ocupacion; 
  }

  console.clear && console.clear();
  console.log('Objeto usuario:', usuario);

  var usuarioJSON = JSON.stringify(usuario, null, 2);
  console.log('Usuario (JSON):', usuarioJSON);
  jsonBox.textContent = usuarioJSON;

  //  Muestra categoría por consola
  var categoria = etapaEdad(edad);
  console.log('Categoría:', categoria);

  //  Guardar varios usuarios y mostrarlos con console.table()
  usuarios.push(usuario);
  if (console.table) {
    console.table(usuarios);
  } else {
    console.log('Usuarios acumulados:', usuarios);
  }

  // Parte 4: Simular guardado con una Promesa
  estado.innerText = 'Guardando datos...';
  guardarDatos().then(function (msg) {
    console.log(msg);
    // muestra por  pantalla
    estado.innerText = msg;
  });

  //  resetear formulario
  form.reset();
});
