import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Создаем сцену
export function createScene() {
  const scene = new THREE.Scene();
  return scene;
}

// Создаем камеру
export const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Позиция камеры
camera.position.z = 7;
camera.position.x = 1;
camera.position.y = 2;
// Направляем камеру на целевую точку
camera.lookAt(0, 0, 0); // Камера смотрит на центр координат

// Создаем рендерер
export const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

// Даём возможность вращения камеры
export const controls = new OrbitControls( camera, renderer.domElement );
controls.target.set(0, 0, 0); // Устанавливаем целевую точку для OrbitControls
controls.rotateSpeed = 0.1;
controls.update();
document.body.appendChild(renderer.domElement);