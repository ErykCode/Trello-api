/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import express from 'express'
import cors from 'cors'
import { corsOptions } from './config/cors'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, GET_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from "~/config/environment";
import { APIs_V1 } from './routes/v1';

const START_SERVER = () => {
  const app = express()

  app.use(cors(corsOptions))


  // app.get('/', (req, res) => {
  //   res.end('<h1>Hello World!</h1><hr>')
  // })
  app.use(express.json())

  app.use('/v1', APIs_V1)

  app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`Trello web, I am running at http://${env.APP_HOST}:${env.APP_PORT}/`)
  })

  exitHook(() => {
    CLOSE_DB()
  })
}

CONNECT_DB()
  .then(() => console.log('connect'))
  .then(() => START_SERVER())
  .catch(error => {
    console.error(error);
    process.exit(0);
  })


