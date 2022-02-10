import { Router, Request, Response } from 'express';
import { ErrorResponse } from '../../helpers/responses/error-response';
import { EventService } from '../services/event.services';
import { EventInput } from '../../db/models/event.model';

const eventRouter = Router();

eventRouter.post('/analytics', async (req: Request, res: Response) => {
  try {
    const eventInputs = req.body.events as EventInput[];
    const ingestedCount = await EventService.saveEvents(eventInputs);
    return res.status(201).json(ingestedCount);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(new ErrorResponse(500, 'Internal Server Error', 'post /analytics'));
  }
});

eventRouter.get('/analytics', async (req: Request, res: Response) => {
  try {
    const events = await EventService.getAll();
    res.status(200).json(events);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(new ErrorResponse(500, 'Internal Server Error', 'get /analytics'));
  }
});

export default eventRouter;
