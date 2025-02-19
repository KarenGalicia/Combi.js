class Cola {
    constructor(maxSize = 50) {
        this.items = [];
        this.maxSize = maxSize;
    }

    enqueue(elemento) {
        if (this.isFull()) {
            return "La cola está llena";
        }
        this.items.push(elemento);
    }

    dequeue() {
        if (this.isEmpty()) {
            return "La cola está vacía";
        }
        return this.items.shift();
    }

    frente() {
        return this.isEmpty() ? "La cola está vacía" : this.items[0];
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
}

// Integración de la Cola en el juego Snake
const canvas = document.getElementById('snakeCanvas');
const ctx = canvas.getContext('2d');
const box = 20;
let snake = new Cola(100); // La serpiente ahora es una cola con límite de 100
snake.enqueue({ x: 9 * box, y: 9 * box });
let direction = 'RIGHT';
let food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box
};

document.addEventListener('keydown', directionControl);

function directionControl(event) {
    if (event.keyCode === 37 && direction !== 'RIGHT') direction = 'LEFT';
    if (event.keyCode === 38 && direction !== 'DOWN') direction = 'UP';
    if (event.keyCode === 39 && direction !== 'LEFT') direction = 'RIGHT';
    if (event.keyCode === 40 && direction !== 'UP') direction = 'DOWN';
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Dibujar la serpiente
    for (let i = 0; i < snake.items.length; i++) {
        ctx.fillStyle = (i === 0) ? 'green' : 'lightgreen';
        ctx.fillRect(snake.items[i].x, snake.items[i].y, box, box);
        ctx.strokeStyle = 'darkgreen';
        ctx.strokeRect(snake.items[i].x, snake.items[i].y, box, box);
    }
    
    // Dibujar la comida
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);

    // Obtener la posición de la cabeza
    let snakeX = snake.frente().x;
    let snakeY = snake.frente().y;

    if (direction === 'LEFT') snakeX -= box;
    if (direction === 'UP') snakeY -= box;
    if (direction === 'RIGHT') snakeX += box;
    if (direction === 'DOWN') snakeY += box;

    let newHead = { x: snakeX, y: snakeY };

    // Verificar colisión con la comida
    if (snakeX === food.x && snakeY === food.y) {
        food = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box
        };
    } else {
        snake.dequeue(); // Si no comió, elimina la última parte de la serpiente
    }

    // Verificar colisión con el borde o consigo misma
    if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake.items)) {
        clearInterval(game);
        alert('Game Over!');
    }
    
    snake.enqueue(newHead); // Agrega la nueva posición al frente
}

function collision(head, array) {
    return array.some(segment => segment.x === head.x && segment.y === head.y);
}

let game = setInterval(draw, 100);
