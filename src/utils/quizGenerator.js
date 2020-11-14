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
    let current = baseArray[_.random(0, baseArray.length - 1)]

    _.forEach(baseArray, time => (counts[String(time)] = 0))

    let shuffled = [current]
    for (let i = 0; i < count - 1; i++) {
        const selections = _.filter(
            baseArray,
            time =>
            current !== time && counts[String(time)] < count / baseArray.length
        )
        const selected = selections[_.random(0, selections.length - 1)]
        current = selected
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