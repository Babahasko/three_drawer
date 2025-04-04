export class GameData {
    constructor(data) {
        // Инициализация свойств из данных
        this.mapSize = data.mapSize || [];
        this.name = data.name || '';
        this.points = data.points || 0;
        this.fences = data.fences || [];
        this.snakes = data.snakes ? data.snakes.map(snake => new Snake(snake)) : [];
        this.enemies = data.enemies || [];
        this.food = data.food || [];
        this.turn = data.turn || 0;
        this.reviveTimeoutSec = data.reviveTimeoutSec || 0;
        this.tickRemainMs = data.tickRemainMs || 0;
        this.errors = data.errors || [];
    }

    // Метод для вывода данных в консоль (для отладки)
    printSummary() {
        console.log('Map Size:', this.mapSize);
        console.log('Name:', this.name);
        console.log('Points:', this.points);
        console.log('Fences:', this.fences);
        console.log('Snakes:', this.snakes.map(snake => snake.id));
        console.log('Enemies:', this.enemies.length);
        console.log('Food:', this.food.length);
        console.log('Turn:', this.turn);
        console.log('Revive Timeout:', this.reviveTimeoutSec);
        console.log('Tick Remain:', this.tickRemainMs);
        console.log('Errors:', this.errors);
    }
}

// Класс для змей
export class Snake {
    constructor(snakeData) {
        this.id = snakeData.id || '';
        this.direction = snakeData.direction || [];
        this.oldDirection = snakeData.oldDirection || [];
        this.geometry = snakeData.geometry || [];
        this.deathCount = snakeData.deathCount || 0;
        this.status = snakeData.status || '';
        this.reviveRemainMs = snakeData.reviveRemainMs || 0;
    }

    // Метод для вывода данных змеи в консоль (для отладки)
    printDetails() {
        console.log(`Snake ID: ${this.id}`);
        console.log(`Direction: ${this.direction}`);
        console.log(`Geometry: ${JSON.stringify(this.geometry)}`);
        console.log(`Status: ${this.status}`);
    }
}