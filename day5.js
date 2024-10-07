const sampleInput = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;

const input = sampleInput;


const inputToLines = input.split('\n\n');
const maps = inputToLines.slice(1);

const convertNumStringToArr = (nums) => {
    if (typeof nums === 'string') return nums.split(' ').map(num => parseInt(num, 10));

    return nums.map(str => str.split(' ').map(num => parseInt(num, 10)));
};

const seeds = { name: 'seeds', numbers: convertNumStringToArr(inputToLines[0].split(': ')[1]) };

const parameters = [];
maps.forEach((line) => {
    const [name, numbers] = line.split(':\n');
    const numbersMatrix = convertNumStringToArr(numbers.split('\n'));

    parameters.push({
        name,
        numbers: numbersMatrix,
    });
});
/**
 * Now we have this
[
    { name: 'seed-to-soil map', numbers: [ [Array], [Array] ] },
    {
        name: 'soil-to-fertilizer map',
        numbers: [ [Array], [Array], [Array] ]
    },
    {
        name: 'fertilizer-to-water map',
        numbers: [ [Array], [Array], [Array], [Array] ]
    },
    { name: 'water-to-light map', numbers: [ [Array], [Array] ] },
    {
        name: 'light-to-temperature map',
        numbers: [ [Array], [Array], [Array] ]
    },
    {
        name: 'temperature-to-humidity map',
        numbers: [ [Array], [Array] ]
    },
    { name: 'humidity-to-location map', numbers: [ [Array], [Array] ] }
]
 */

/** I want to get a thing that looks like
{
    seed: [1, 2, 3, ...],
    soil: [1, 2, 3, ...],
    fertilizer: [1, 2, 3, ...],
}
 */
const part1 = () => {
    const filledArray = Array.from({ length: 100 }, (e, i) => i);
    console.log(filledArray);

    let result = {
        seed: filledArray,
    };

    /**
     * Create the map of seeds to soil
     * So, I want to take the index of the seed number, and at that index, set the destination number
     * returns the destination array
     */
    const mapSourceToDestination = (sourceName, destinationName, arr) => {
        const [dest, src, range] = arr; // e.g. dest = soil, src = seed
        const sourceArr = [...result[sourceName]];
        const sourceNumIndex = sourceArr[sourceArr.indexOf(src)];

        let destArray = result[destinationName] ? [...result[destinationName]] : [...sourceArr];
        // Set the destination number at the right index
        destArray[sourceNumIndex] = dest;

        // Set the destination numbers
        for (let i = 1; i < range && sourceNumIndex + i < filledArray.length; i++) {
            destArray[sourceNumIndex + i] = dest + i;
        }


        result[destinationName] = destArray;

        console.log(sourceName, 'to', destinationName, '\nbefore\n', result[sourceName], 'after\n', result[destinationName]);
    };

    /**
     * Now, we need to iterate over all the parameters and create map arrays for them
     */
    parameters.forEach((param) => {
        // Get the names of the source and destination
        const nameSplit = param.name.split('-');
        const sourceName = nameSplit[0];
        const destinationName = nameSplit[2].replace(' map', '');

        param.numbers.forEach((par) => {
            mapSourceToDestination(sourceName, destinationName, par);
        });
    });

    const lowestLocation = seeds.numbers.map(num => {
        return result.location[num];
    });
    console.log("🚀 ~ lowestLocation ~ lowestLocation:", lowestLocation, Math.min(...lowestLocation));
};

part1();
