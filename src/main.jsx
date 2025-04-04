import * as THREE from 'three';
import { createScene, renderer, camera, controls } from './scene/sceneSetup.js'
import { setBackgroundColor } from './colors/colorManager.js';
import { VoxelWorld, addDataToWorld } from './shapes/voxelMap.js';
import { createLight } from './scene/light/light.js';
import { loadTexture, createMaterial, createMesh, TextureColorManager} from './textures/textures.js'
// import { GameData } from './parser/gameData'
import { parseSnakes, parseEnemies, parseFood, parseGolden, parseSuspicious, parseFoodPoints } from './parser/parser.js'
import { Text } from 'troika-three-text'
import { webSocketManager } from './websocket.js'; // Импортируем WebSocket


// Установка сценыы
const scene = createScene();
setBackgroundColor(scene);

// Добавляем свет
const light = createLight();
scene.add(light);

// Размеры мира
const cellSize = 180;
const tileSize = 64;
const tileTextureWidth = 512; // Ширина файла с текстурами
const tileTextureHeight = 256; // Высота файла с текстурами


// Глобальная переменная для хранения текущих данных
let currentGameData = null;
// Функция для обновления сцены
function updateScene(data) {
    // Очищаем старую сцену
    scene.clear();
    scene.add(light);

    // Парсим данные
    const word_cubes = data.cubes
    const text = data.text

    const world = new VoxelWorld({
        cellSize,
        tileSize,
        tileTextureWidth,
        tileTextureHeight,
    });

    // Добавляем данные в VoxelWorld
    addDataToWorld(word_cubes, world, TextureColorManager.green);

    // Загружаем текстуру и создаём меш
    loadTexture('../assets/cubes.png')
        .then((texture) => {
            const material = createMaterial(texture);

            // Формируем геометрию для ячейки (0, 0, 0)
            const geometryData = world.generateGeometryDataForCell(0, 0, 0);
            const mesh = createMesh(geometryData, material);

            // Добавляем меш в сцену
            scene.add(mesh);
        })
        .catch((error) => {
            console.error('Не удалось загрузить текстуру:', error);
        });

    // Добавляем текстовые метки
    addText(word_cubes, text, scene);

    // Сохраняем текущие данные
    currentGameData = data;
}


//Функция для добавления текста
function addText(food, foodPoints, scene) {
    // Проверяем, что длина массивов совпадает
    if (food.length !== foodPoints.length) {
        console.error('Количество координат food не совпадает с количеством points');
        return;
    }

    // Перебираем массив координат food
    food.forEach((coords, index) => {
        const [x, y, z] = coords;
        // console.log('Координаты точки:', x,y,z)
        // console.log('Индекс:', index) // Получаем координаты точки
        const pointValue = foodPoints[index]; // Получаем соответствующее значение points

        // Создаём текстовый объект
        const myText = new Text();
        scene.add(myText);

        // Настройка текста
        myText.text = `${pointValue}`; // Текст метки
        myText.fontSize = 1; // Размер шрифта
        myText.position.set(x+0.25, y+1.2, z+1.1); // Позиция текста (на y+1 выше)
        myText.color = 0x000000; // Цвет текста (черный)
    });
}


function animate() {
    renderer.render(scene, camera);
    controls.update();
    // Обновляем текст с позицией камеры
    const { x, y, z } = camera.position;
    // Получаем углы поворота камеры в радианах
    const { x: rotX, y: rotY, z: rotZ } = camera.rotation;

    // Преобразуем радианы в градусы
    const angleX = THREE.MathUtils.radToDeg(rotX).toFixed(2);
    const angleY = THREE.MathUtils.radToDeg(rotY).toFixed(2);
    const angleZ = THREE.MathUtils.radToDeg(rotZ).toFixed(2);


    // Формируем текст для отображения
    const infoElement = document.getElementById('info');
    infoElement.innerHTML = `
    Camera Position: X: ${x.toFixed(2)}, Y: ${y.toFixed(2)}, Z: ${z.toFixed(2)}<br>
    Camera Rotation: X: ${angleX}°, Y: ${angleY}°, Z: ${angleZ}°`

    // Обновляем информацию о игре
    if (currentGameData) {
        const gameInfoElement = document.getElementById('game-info');
        const {name, turn, reviveTimeoutSec, tickRemainMs, errors, points } = currentGameData;
        gameInfoElement.innerHTML = `
        Command: ${name},<br> Points: ${points},<br>
        turn: ${turn},<br> revievTimeoutSec: ${reviveTimeoutSec},<br> tickRemainMs: ${tickRemainMs},<br> errors: ${errors}
        `
    }
}
renderer.setAnimationLoop(animate);

// Подключение к WebSocket
document.addEventListener("DOMContentLoaded", () => {
    webSocketManager.onOpen(() => {
        console.log("Соединение установлено!");
        // Отправляем ID клиента
        webSocketManager.sendMessage({ id: "front" });
    });

    webSocketManager.onMessage((data) => { 
        console.log("Получено сообщение от сервера:", data)
        console.log(data.message)
        if (data && data.message){
            updateScene(data.message);
        }
        
    });

    webSocketManager.onError((error) => {
        console.error("Ошибка WebSocket:", error);
    });

    webSocketManager.onClose(() => {
        console.log("Соединение закрыто.");
    });
});