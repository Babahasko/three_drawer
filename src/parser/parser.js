import fs from 'fs';
import { GameData } from './snakes.js';

/**
 * Функция для предварительной обработки данных
 * @param {string} data - Сырые данные из файла.
 * @returns {string} - Обработанные данные.
 */
function preprocessData(data) {
    // Удаляем многоточия
    data = data.replace(/\.\.\./g, '');

    // Проверяем, что данные начинаются и заканчиваются на фигурные скобки
    if (!data.trim().startsWith('{') || !data.trim().endsWith('}')) {
        throw new Error('Данные не являются валидным JSON');
    }

    return data;
}

/**
 * Читает файл и возвращает его содержимое.
 * @param {string} filePath - Путь к файлу.
 * @returns {Promise<string>} - Промис с содержимым файла или ошибкой.
 */
export function readFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Ошибка чтения файла:', err);
                reject(err); // Отклоняем промис в случае ошибки
                return;
            }
            resolve(data); // Резолвим промис с данными из файла
        });
    });
}

/**
 * Парсит данные в объект класса GameData.
 * @param {string} rawData - Сырые данные (строка JSON).
 * @returns {GameData} - Экземпляр класса GameData.
 */
export function parseToGameData(rawData) {
    try {
        // Предварительная обработка данных
        const processedData = preprocessData(rawData);

        // Парсим данные как JSON
        const parsedData = JSON.parse(processedData);

        // Создаем экземпляр класса GameData
        return new GameData(parsedData);
    } catch (error) {
        console.error('Ошибка парсинга JSON:', error);
        throw error; // Перебрасываем ошибку для обработки вызывающей стороной
    }
}

export function parseSnakes(gameData){
    const allGeometry = gameData.snakes.map(snake => snake.geometry).flat();
    return allGeometry
}

export function parseEnemies(gameData) {
    const allGeometry = gameData.enemies.map(enemies => enemies.geometry).flat();
    return allGeometry
}

export function parseFood(gameData) {
    const allGeometry = gameData.food.map(food => food.c);
    return allGeometry
}


export function parseFoodPoints(gameData) {
    const allGeometry = gameData.food.map(food => food.points);
    return allGeometry
}

export function parseGolden(gameData) {
    const allGeometry = gameData.specialFood.golden;
    return allGeometry;
}

export function parseSuspicious(gameData) {
    const allGeometry = gameData.specialFood.suspicious;
    return allGeometry;
}
