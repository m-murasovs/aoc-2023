const input =
`Time:        38     67     76     73
Distance:   234   1027   1157   1236`

const sampleInput = 
`Time:      7  15   30
Distance:  9  40  200`

const results = input.split('\n');

const times = results[0].split(':')[1].trim().replaceAll(' ', '')
const distances = results[1].split(':')[1].trim().replaceAll(' ', '')

// const raceResults = times.trim().replace(' ', '').map((time, index) => {
//     return {
//         time: parseInt(time.trim(), 10),
//         distance: parseInt(distances.trim(), 10),
//     }
// })

const raceResults = {
    time: times,
    distance: distances
}

console.log('race results', raceResults)

const text = `
Hold the button for 1 millisecond at the start of the race. Then, the boat will travel at a speed of 1 millimeter per millisecond for 6 milliseconds, reaching a total distance traveled of 6 millimeters.
Hold the button for 2 milliseconds, giving the boat a speed of 2 millimeters per millisecond. It will then get 5 milliseconds to move, reaching a total distance of 10 millimeters.
Hold the button for 3 milliseconds. After its remaining 4 milliseconds of travel time, the boat will have gone 12 millimeters.
Hold the button for 4 milliseconds. After its remaining 3 milliseconds of travel time, the boat will have gone 12 millimeters.
Hold the button for 5 milliseconds, causing the boat to travel a total of 10 millimeters.
Hold the button for 6 milliseconds, causing the boat to travel a total of 6 millimeters.
Hold the button for 7 milliseconds. That's the entire duration of the race. You never let go of the button. The boat can't move until you let go of the button. Please make sure you let go of the button so the boat gets to move. 0 millimeters.`

const getTotalDistance = (buttonHoldTime, raceDuration) => {
    const timeToMove = raceDuration - buttonHoldTime;
    const distance = timeToMove * buttonHoldTime;
    return distance;
}

// for each millisecond of the durations, we need to get the distances that exceed the record

const numberOfWaysToWinEachRace = ({time, distance}) => {
    const ways = [];
    for (let i = 1; i <= time; i++) {
        ways.push(getTotalDistance(i, time))
    }
    return ways.filter(score => score > distance).length;
}

console.log(numberOfWaysToWinEachRace({ time: raceResults.time, distance: raceResults.distance }))

// console.log(numberOfWaysToWinEachRace().reduce((acc, curr) => acc * curr))