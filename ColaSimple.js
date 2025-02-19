class Cola {
    constructor() {
        this.items = [];
    }

    enqueue(elemento) {
        this.items.push(elemento);
    }

    dequeue() {
        if (this.isempty()) {
            return "La cola está vacía";
        }
        return this.items.shift(); // Elimina y devuelve el primer elemento de la cola
    }

    frente() {
        if (this.isempty()) {
            return "La cola está vacía";
        }
        return this.items[0];
    }

    isempty() {  // Corrección del nombre del método
        return this.items.length === 0;
    }

    mostrar() {
        console.log(this.items);
    }
}

// Prueba de la cola
const miCola = new Cola(); // Corregí el nombre de la variable
miCola.enqueue("Cliente 1");
miCola.enqueue("Cliente 2");
miCola.enqueue("Cliente 3");
miCola.mostrar();

console.log("Atendiendo: ", miCola.dequeue());
console.log("Siguiente en la fila: ", miCola.frente());
