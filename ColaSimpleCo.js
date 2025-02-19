class Cola {
    constructor(tipoDato, maxSize = 50) {
        this.items = [];
        this.tipoDato = tipoDato;
        this.maxSize = maxSize;
    }

    enqueue(elemento) {
        if (typeof elemento !== this.tipoDato) {
            throw new Error(`Solo se pueden almacenar elementos de tipo ${this.tipoDato} en la cola`);
        }
        if (this.isFull()) {
            return "La cola está llena";
        }
        this.items.push(elemento);
    }

    dequeue() {
        if (this.isEmpty()) {
            return "La cola está vacía";
        }
        return this.items.shift(); // Elimina y devuelve el primer elemento de la cola
    }

    frente() {
        if (this.isEmpty()) {
            return "La cola está vacía";
        }
        return this.items[0];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    isFull() {
        return this.items.length >= this.maxSize;
    }

    size() {
        return this.items.length;
    }

    mostrar() {
        console.log(this.items);
    }
}

// Prueba de la cola
const miCola = new Cola('number', 50); // Crear una cola para números con tamaño máximo de 50
miCola.enqueue(1);
miCola.enqueue(2);
miCola.enqueue(3);
miCola.mostrar();

console.log("Atendiendo: ", miCola.dequeue());
console.log("Siguiente en la fila: ", miCola.frente());
console.log("La cola está vacía: ", miCola.isEmpty());
console.log("La cola está llena: ", miCola.isFull());
console.log("Tamaño de la cola: ", miCola.size());