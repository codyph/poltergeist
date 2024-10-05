import * as THREE from 'three'

// Convert 3D position to 2D screen coordinates
export const toScreenPosition = (vector: THREE.Vector3, camera: THREE.Camera) => {
    const pos = vector.clone().project(camera);
    return {
        x: (pos.x * 0.5 + 0.5) * window.innerWidth,
        y: (-pos.y * 0.5 + 0.5) * window.innerHeight,
    };
};