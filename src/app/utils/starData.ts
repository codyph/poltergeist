// Define interfaces
interface Position {
    x: number;
    y: number;
    z: number;
}

interface Star {
    index: number;
    name: string;
    type: string;
    brightness: string;
    distance: string;
    luminosity: string;
    position: Position;
}

// Function to generate random star data
export const generateStarsData = (numStars: number): { starVertices: Float32Array; starsData: Star[]} => {
    const starVertices = [];
    const starsData = [];
    for (let i = 0; i < numStars; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = (Math.random() - 0.5) * 2000;
        starVertices.push(x, y, z);

        starsData.push({
            index: i,
            name: `Star-${i}`,
            type: getRandomStarType(),
            brightness: (Math.random() * 10).toFixed(2),
            distance: (Math.random() * 1000).toFixed(2),
            luminosity: (Math.random() * 100).toFixed(2),
            position: { x, y, z },
        });
    }

    const starVertices32 = new Float32Array(starVertices)

    return { starVertices: starVertices32, starsData };
};

// Helper function to get random star types
export const getRandomStarType = () => {
    const types = ["O", "B", "A", "F", "G", "K", "M"];
    return types[Math.floor(Math.random() * types.length)];
};
