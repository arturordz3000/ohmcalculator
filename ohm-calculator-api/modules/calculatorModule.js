function calculateOhms(valueBands, multiplierBand, toleranceBand) {
    const ohms = valueBands * multiplierBand;

    return getOhmsWithSuffix(ohms) + ' Ohms ±' + toleranceBand + '%';
}

const magnitudes = [
    {start: 1000, end: 1e6, suffix: 'k'},
    {start: 1e6, end: 1e9, suffix: 'M'},
    {start: 1e9, end: 1e12, suffix: 'G'},
]

function getOhmsWithSuffix(ohms) {
    let suffix = '';

    for (const magnitude of magnitudes) {
        if (ohms >= magnitude.start && ohms < magnitude.end) {
            suffix = magnitude.suffix;
            ohms /= magnitude.start;
        }
    }

    return ohms + suffix;
}

module.exports = {
    calculateOhms: calculateOhms
}