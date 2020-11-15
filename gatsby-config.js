/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

const _ = require(`lodash`)
const path = require(`path`)

module.exports = {
    /* Your site config here */
    plugins: [{
        resolve: `gatsby-source-filesystem`,
        options: {
            name: `data`,
            path: `${__dirname}/src/data/`,
            ignore: [`**/\.*`], // ignore files starting with a dot
        },
    }, ],
}