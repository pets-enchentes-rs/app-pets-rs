import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import routes from './routes'
import createTables from './database/Create'

class App {
  public express: express.Application

  constructor() {
    dotenv.config()

    this.express = express()
    this.middlewares()
    this.routes()

    createTables()
  }

  private middlewares(): void {
    this.express.use(express.json())
    this.express.use(cors())
  }

  private routes(): void {
    this.express.use(routes)
  }
}

export default new App().express
