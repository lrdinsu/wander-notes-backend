import { NextFunction, Request, Response } from 'express';
import { readFileSync } from 'fs';
import { writeFile } from 'fs/promises';

import { Tour } from '@/types/type.js';

import { dataPath } from '../utils/path.js';


const tours = JSON.parse(
  readFileSync(`${dataPath}/tours-simple.json`, 'utf-8'),
) as Tour[];

export function checkID(
  _: Request,
  res: Response,
  next: NextFunction,
  val: string,
) {
  const index = tours.findIndex((tour) => tour.id === Number(val));

  if (index === -1) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
    return;
  }
  next();
}

export function checkBody(req: Request, res: Response, next: NextFunction) {
  const isBodyValid =
    Object.prototype.hasOwnProperty.call(req.body, 'name') ||
    Object.prototype.hasOwnProperty.call(req.body, 'price');

  if (!isBodyValid) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid new tour!',
    });
    return;
  }
  next();
}

export function getAllTours(_: Request, res: Response) {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
}

export async function createTour(req: Request, res: Response) {
  const newId = tours.length === 0 ? 1 : tours[tours.length - 1].id + 1;
  const newTour = { ...req.body, id: newId } as Tour;

  tours.push(newTour);
  await writeFile(`${dataPath}/tours-simple.json`, JSON.stringify(tours));

  res.status(201).json({
    status: 'success',
    data: {
      tour: newTour,
    },
  });
}

export function getTour(req: Request, res: Response) {
  const id = req.params.id;
  const currentTour = tours.find((tour) => tour.id === Number(id));

  res.status(200).json({
    status: 'success',
    data: {
      currentTour,
    },
  });
}

export async function updateTour(req: Request, res: Response) {
  const id = Number(req.params.id);
  const changedIndex = tours.findIndex((tour) => tour.id === id);

  const changedTour = { ...tours[changedIndex], ...req.body } as Tour;
  tours[changedIndex] = changedTour;
  await writeFile(`${dataPath}/tours-simple.json`, JSON.stringify(tours));

  res.status(200).json({
    status: 'success',
    data: {
      changedTour,
    },
  });
}

export function deleteTour(_: Request, res: Response) {
  res.status(204).json({
    status: 'success',
    data: null,
  });
}
