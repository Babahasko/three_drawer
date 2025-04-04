import * as THREE from 'three';

export function createLight() {
    const skyColor = 0x74f2f4
    const groundColor = 0x75460b
    // const color = 0xFFFFFF;
    const intensity = 3;
    // const light = new THREE.AmbientLight(color, intensity);
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    light.position.set(-1, 2, 4);
    return light
}
