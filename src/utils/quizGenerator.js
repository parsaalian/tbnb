import _ from "lodash"

export function testOnePhaseOne() {
    return _.map(_.range(20), i => (i % 2 === 0 ? 400 : 1600))
}

export function testOnePhaseTwo() {}

export function testOnePhaseThree() {}