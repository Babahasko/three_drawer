import * as THREE from 'three';

/**
 * Загружает текстуру из указанного пути.
 * @param {string} path - Путь к файлу текстуры.
 * @returns {Promise<THREE.Texture>} - Промис с загруженной текстурой.
 */
export function loadTexture(path) {
    const loader = new THREE.TextureLoader();
    return new Promise((resolve, reject) => {
        loader.load(
            path,
            (texture) => {
                // Настройка текстуры
                texture.magFilter = THREE.NearestFilter;
                texture.minFilter = THREE.NearestFilter;
                texture.colorSpace = THREE.SRGBColorSpace;

                resolve(texture);
            },
            undefined, // onProgress callback (не используется)
            (error) => {
                console.error('Ошибка загрузки текстуры:', error);
                reject(error);
            }
        );
    });
}

/**
 * Создает материал на основе загруженной текстуры.
 * @param {THREE.Texture} texture - Загруженная текстура.
 * @returns {THREE.MeshLambertMaterial} - Материал.
 */
export function createMaterial(texture) {
    return new THREE.MeshLambertMaterial({
        map: texture,
        side: THREE.DoubleSide,
        alphaTest: 0.1,
        transparent: true,
    });
}

/**
 * Создает меш на основе данных геометрии и материала.
 * @param {Object} geometryData - Данные геометрии (positions, normals, uvs, indices).
 * @param {THREE.Material} material - Материал.
 * @returns {THREE.Mesh} - Меш.
 */
export function createMesh(geometryData, material) {
    const { positions, normals, uvs, indices } = geometryData;

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(new Float32Array(positions), 3)
    );
    geometry.setAttribute(
        'normal',
        new THREE.BufferAttribute(new Float32Array(normals), 3)
    );
    geometry.setAttribute(
        'uv',
        new THREE.BufferAttribute(new Float32Array(uvs), 2)
    );
    geometry.setIndex(indices);

    return new THREE.Mesh(geometry, material);
}

export class TextureColorManager {
    static blue = 1;
    static green = 2;
    static red = 3;
    static orange = 4;
    static golden = 5;
    static purple = 6;
    static dark_blue = 7;
    static pink = 8;

    // Метод для получения числового значения цвета по его имени
    static getValue(colorName) {
        return ColorManager[colorName] || null;
    }
}