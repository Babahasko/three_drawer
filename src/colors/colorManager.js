import * as THREE from 'three';

// Устанавливаем цвет фона
export function setBackgroundColor(scene) {
  scene.background = new THREE.Color(0x37e4e4); // Черный фон
}