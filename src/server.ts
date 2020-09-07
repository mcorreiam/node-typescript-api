import './util/module-alias';
import { UsersController } from './controllers/user';
import { BeachesController } from './controllers/beaches';
import { ForecastController } from './controllers/forecast';
import { Server } from '@overnightjs/core';
import bodyParser from 'body-parser';
import expressPino from 'express-pino-logger';
import cors from 'cors';
import { Application } from 'express';
import * as database from '@src/database';
import config from 'config';
import logger from './logger';

export class SetupServer extends Server {
  constructor(private port = config.get('App.port')) {
    super();
  }

  public async init(): Promise<void> {
    this.setupExpress();
    this.setupControllers();
    await this.databaseSetup();
  }

  private setupExpress(): void {
    this.app.use(bodyParser.json());
    this.app.use(
      expressPino({
        logger,
      })
    );
    this.app.use(
      cors({
        origin: '*',
      })
    );
  }

  private setupControllers(): void {
    const forecastController = new ForecastController();
    const beachesController = new BeachesController();
    const usersController = new UsersController();
    this.addControllers([
      forecastController,
      beachesController,
      usersController,
    ]);
  }

  private async databaseSetup(): Promise<void> {
    await database.connect();
  }

  public async close(): Promise<void> {
    await database.close();
  }

  public start(): void {
    this.app.listen(this.port, () => {
      logger.info('Server listening on port: ' + this.port);
    });
  }

  public getApp(): Application {
    return this.app;
  }
}
