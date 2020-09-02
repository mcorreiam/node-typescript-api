import { authMeddleware } from '@src/middlewares/auth';
import { Beach } from '../models/beach';
import { Forecast } from '../services/forecast'; //' @src/services/forecast';
import { Controller, Get, ClassMiddleware } from '@overnightjs/core';
import { Request, Response } from 'express';

const forecast = new Forecast();
@Controller('forecast')
@ClassMiddleware(authMeddleware)
export class ForecastController {
  @Get('')
  public async getForecastForLoggedUser(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const beaches = await Beach.find({ user: req.decoded?.id });
      const forecastData = await forecast.processForecastForBeaches(beaches);
      res.status(200).send(forecastData);
    } catch (error) {
      res.status(500).send({ error: 'Something went wrong' });
    }
  }
}
