// Función de suma
function suma(a, b) {
  return a + b;
}

test('suma 2 + 3 debe ser 5', () => {
  expect(suma(2, 3)).toBe(5);
});

test('suma 10 + 5 debe ser 15', () => {
  expect(suma(10, 5)).toBe(15);
});

// Prueba que falla
test('suma 1 + 1 NO debe ser 3', () => {
  expect(suma(1, 1)).toBe(3);
});
// Ejercicio: pruebas unitarias con Jest

function suma(a, b) {
  return a + b;
}

// EJERCICIO: Implementa la función totalCarrito que reciba un array de productos y devuelva el total
// function totalCarrito(carrito) { ... }

test('suma 2 + 2 es 4', () => {
  expect(suma(2, 2)).toBe(4);
});

test('suma -1 + 1 es 0', () => {
  expect(suma(-1, 1)).toBe(0);
});

// EJERCICIO: Agrega tests para totalCarrito
// test('...', () => { ... });
// test('...', () => { ... }); 