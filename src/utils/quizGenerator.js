import _ from "lodash"

export function testOnePhaseOne(count = 20) {
    return _.map(_.range(count), i => (i % 2 === 0 ? 400 : 1600))
}

export function testOnePhaseTwo(count = 56) {
    return _.shuffle(
        _.repeat("400,1600,", count / 2)
        .split(",")
        .filter(x => !!x)
        .map(Number)
    )
}

export function testOnePhaseThree(count = 56) {
    const counts = {}
    const baseArray = [400, 600, 800, 1000, 1200, 1400, 1600]

    _.forEach(baseArray, time => (counts[String(time)] = 0))

    let shuffled = [baseArray[_.random(0, baseArray.length - 1)]]
    for (let i = 0; i < count - 1; i++) {
        const selections = _.filter(
            baseArray,
            time =>
            shuffled[i - 1] !== time &&
            counts[String(time)] < count / baseArray.length
        )
        const selected = selections[_.random(0, selections.length - 1)]
        counts[String(selected)] += 1
        shuffled = [...shuffled, selected]
    }
    while (shuffled[count - 1] === shuffled[count - 2]) {
        while (true) {
            const tail = shuffled[count - 1]
            const randomIndex = _.random(0, count - 2)
            let randomized = _.initial(shuffled)
            if (
                randomized[randomIndex - 1] !== tail &&
                randomized[randomIndex] !== tail
            ) {
                randomized.splice(randomIndex, 0, tail)
                shuffled = randomized
                break
            }
        }
    }
    return shuffled
}

function choice(startPoint, endPoint, count) {
    let chosen = 0;
    let array = {};
    while (chosen < count) {
        const selected = _.random(startPoint, endPoint);
        if (!array[selected]) {
            array[selected] = true;
            chosen += 1;
        }
    }
    return Object.keys(array);
}

function selectWithExclusion(exclude) {
    let initial = {};
    for (let i = 0; i < 10; i++) {
        initial[i] = true;
    }
    for (let i = 0; i < exclude.length; i++) {
        delete initial[exclude[i]];
    }
    initial = Object.keys(initial);
    return Number(initial[_.random(0, initial.length - 1)]);
}

export function randomNumberSequence(count = 56, m = 1) {
    let array = [];
    for (let i = 0; i < count; i++) {
        let selected = selectWithExclusion(array.slice(i - m, i));
        array = [...array, selected];
    }
    let selection = choice(m, count - 1, _.floor((count - m) / 3)).map(Number);
    for (let i = 0; i < selection.length; i++) {
        const values = array.slice(selection[i] - m, selection[i]);
        array[selection[i]] = values[_.random(0, m - 1)]
    }
    selection = [...selection, array.length - 1];
    for (let i = 0; i < selection.length - 1; i++) {
        const first = selection[i] + 1;
        const second = _.min([selection[i] + m, selection[i + 1]]);
        for (let j = first; j < second; j++) {
            array[j] = selectWithExclusion(array.slice(j - m, j));
        }
    }
    return array;
}