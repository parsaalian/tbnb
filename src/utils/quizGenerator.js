import _ from "lodash"

export function testOnePhaseOne() {
    return _.map(_.range(20), i => (i % 2 === 0 ? 400 : 1600))
}

export function testOnePhaseTwo() {
    return _.map(_.range(20), () => (_.random() % 2 === 0 ? 400 : 1600))
}

export function testOnePhaseThree() {
    const baseArray = [400, 600, 800, 1000, 1200, 1400, 1600]
    let choice = baseArray[_.random(0, 6)]
    return _.map(_.range(20), () => {
        const next = _.filter(baseArray, value => value !== choice)[_.random(0, 5)]
        choice = next
        return next
    })
}