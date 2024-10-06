// Define interfaces
interface Position {
    x: number;
    y: number;
    z: number;
}

export interface Star {
    index: number;
    name: string;
    type: string;
    radius: string;
    distance: string;
    luminosity: string;
    position: Position;
}

// Function to generate random star data
export const generateStarsData = (numStars: number): { starVertices: Float32Array; starsData: Star[]} => {
    const starVertices = [];
    const starsData = [];
    for (let i = 0; i < numStars-6; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = (Math.random() - 0.5) * 2000;

        const distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2))
        starVertices.push(x, y, z);

        starsData.push({
            index: i,
            name: `Star-${i}`,
            type: getRandomStarType(),
            radius: (Math.random() * 400).toFixed(2),
            luminosity: (Math.random() * 10).toFixed(2),
            distance: distance.toFixed(2),
            position: { x, y, z },
        });
    }

    for (let i = numStars - 6; i < numStars; i++) {
        const x = (0.2*Math.random()/2) * 2000;
        const y = (0.2*Math.random()/2) * 2000;
        const z = (0.2*Math.random()/2) * 2000;

        const distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2))
        starVertices.push(x, y, z);

        starsData.push({
            index: i,
            name: `Star-${i}`,
            type: getRandomStarType(),
            radius: (Math.random() * 400).toFixed(2),
            luminosity: (Math.random() * 10).toFixed(2),
            distance: distance.toFixed(2),
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
