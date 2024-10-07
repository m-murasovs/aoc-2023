
const nbYear = (p0, percent, aug, p) => {
    let nrOfYears = 0

    const yearlyIncreaseNr = (nr, percent, aug) => {
        nrOfYears++;
        return nr + nr * (percent / 100) + aug;
    }

    const runPop = (startNr, perc, inc, finalNr) => {
        if (startNr >= finalNr) {
            return nrOfYears;
        }

        const increasedNumber = Math.floor(yearlyIncreaseNr(startNr, perc, inc))

        return runPop(increasedNumber, perc, inc, finalNr)
    }

    return runPop(p0, percent, aug, p);
}

console.log(nbYear(1500000, 2.5, 10000, 2000000)) // 15

// const digitalRoot = (n) => {
//     let nr = n;

//     if (nr.toString().length === 1) {
//         return nr;
//     }

//     nr = n.toString().split('');
//     nr = nr.map((num) => parseInt(num, 10))
//     nr = nr.reduce((acc, curr) => acc + curr)

//     if (nr.toString().length === 1) {
//         return nr;
//     } else {
//         return digitalRoot(nr)
//     }
// };

// console.log(digitalRoot(4561234)) // 7

