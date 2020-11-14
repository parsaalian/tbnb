import _ from "lodash"

export function testOnePhaseOne() {
    return _.map(_.range(20), i => (i % 2 === 0 ? 400 : 1600))
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
    let current = 0
    const counts = {}
    const baseArray = [400, 600, 800, 1000, 1200, 1400, 1600]
    _.forEach(baseArray, time => (counts[String(time)] = 0))

    let shuffled = []
    for (let i = 0; i < count; i++) {
        const selections = _.filter(
            baseArray,
            time =>
            current !== time && counts[String(time)] < count / baseArray.length
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
                shuffled[randomIndex - 1] !== tail &&
                shuffled[randomIndex] !== tail
            ) {
                randomized.splice(randomIndex, 0, tail)
                shuffled = randomized
                break
            }
        }
    }
    console.log(shuffled)
    return shuffled
}