const _ = require("lodash")
const fs = require("fs")
const express = require("express")
var cors = require("cors")
const app = express()
const port = 8002

app.use(cors())

app.post("/:p/:id/:csv", (req, res) => {
    const { p, id, csv } = req.params
    console.log(csv.replace(/\_\_NEWLINE\_\_/g, "\n"))
    fs.writeFileSync(
        `${__dirname}/src/data/${id}-${p}.csv`,
        csv.replace(/\_\_NEWLINE\_\_/g, "\n"), {
            flag: "wx",
        }
    )
    res.json("Saved")
})

app.listen(port, "0.0.0.0", () => {
    console.log(`CSV server at http://0.0.0.0:${port}`)
})