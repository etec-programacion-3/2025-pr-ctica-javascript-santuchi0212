// Función que calcula el total de un carrito
function calcularTotal(carrito) {
  return carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
}

// Pruebas con console.assert
const carrito1 = [
  { nombre: 'Manzana', precio: 10, cantidad: 2 },
  { nombre: 'Pan', precio: 20, cantidad: 1 },
];
console.assert(
  calcularTotal(carrito1) === 40,
  'Error: El total del carrito1 debería ser 40'
);

const carrito2 = [
  { nombre: 'Leche', precio: 15, cantidad: 3 },
];
console.assert(
  calcularTotal(carrito2) === 45,
  'Error: El total del carrito2 debería ser 45'
);

// Prueba que falla
console.assert(
  calcularTotal(carrito2) === 50,
  'Esta prueba debe fallar: El total del carrito2 NO es 50'
);
 