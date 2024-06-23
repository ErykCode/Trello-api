/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import express from 'express'
import { CONNECT_DB, GET_DB } from '~/config/mongodb'

const START_SERVER = () => {
  const app = express()

  const hostname = 'localhost'
  const port = 8017

  app.get('/',async (req, res) => {
    console.log(await GET_DB().listCollections().toArray());
    res.end('<h1>Hello World!</h1><hr>')
  })

  app.listen(port, hostname, () => {
    console.log(`Trello web, I am running at http://${hostname}:${port}/`)
  })
}

CONNECT_DB()
  .then(() => console.log('connect'))
  .then(() => START_SERVER())
  .catch(error => {
    console.error(error);
    process.exit(0);
  })


