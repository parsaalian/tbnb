export default function sequenceRunner(functionList, index = 0) {
    const { func, time } = functionList[index]
    func()
    if (!!time) {
        setTimeout(() => {
            sequenceRunner(functionList, index + 1)
        }, time)
    }
}