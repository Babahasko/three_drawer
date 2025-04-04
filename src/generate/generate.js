export function generateCoordinates(cellSize) {
    const coordinates = []; // Массив для хранения координат
    for (let y = 0; y < cellSize; ++y) {
        for (let z = 0; z < cellSize; ++z) {
            for (let x = 0; x < cellSize; ++x) {
                const height = (Math.sin(x / cellSize * Math.PI * 2) + Math.sin(z / cellSize * Math.PI * 3)) * (cellSize / 6) + (cellSize / 2);
                if (y < height) {
                //     const voxelType = y % 2 === 0 ? 1 : 2;
                coordinates.push({ x, y, z });
                }
            }
        }
    }
    return coordinates;  // Возвращаем сгенерированный массив
}