import * as THREE from 'three';

// Создаем куб
export function createCube() {
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshPhongMaterial({ color: 0x0d65e1});
  const cube = new THREE.Mesh(geometry, material);
  return cube;
}