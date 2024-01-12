import { NextFunction, Request, Response } from 'express';

import { prisma } from '@/db/index.js';
import { TourQueryParamsSchema } from '@/types/schemas.js';
import { buildPrismaReqQueryOptions } from '@/utils/buildPrismaReqQueryOptions.js';

import {
  TourCreateInputSchema,
  TourUpdateInputSchema,
} from '../../prisma/generated/zod/index.js';

export function checkID(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid ID',
    });
    return;
  }

  next();
}

export async function getAllTours(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    console.log(req.query);
    const { page, limit, sort, fields, ...queryParams } =
      TourQueryParamsSchema.parse(req.query);

    const queryOptions = buildPrismaReqQueryOptions({
      page,
      limit,
      sort,
      fields,
    });

    const tours = await prisma.tour.findMany({
      where: {
        ...queryParams,
      },
      ...queryOptions,
    });

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (e) {
    next(e);
  }
}

export async function createTour(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const tour = TourCreateInputSchema.parse(req.body);
    const newTour = await prisma.tour.create({
      data: tour,
    });

    res.status(201).json({
      status: 'success',
      message: 'New tour created!',
      data: {
        tour: newTour,
      },
    });
  } catch (e) {
    next(e);
  }
}

export async function getTour(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const currentTour = await prisma.tour.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!currentTour) {
      throw new Error('Invalid ID');
    }

    res.status(200).json({
      status: 'success',
      data: {
        currentTour,
      },
    });
  } catch (e) {
    next(e);
  }
}

export async function updateTour(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.params;
    const tour = TourUpdateInputSchema.parse(req.body);

    const updatedTour = await prisma.tour.update({
      where: {
        id: Number(id),
      },
      data: tour,
    });

    if (!updatedTour) {
      throw new Error('Invalid ID');
    }

    res.status(200).json({
      status: 'success',
      data: {
        updatedTour,
      },
    });
  } catch (e) {
    next(e);
  }
}

export async function deleteTour(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.params;

    const deletedTour = await prisma.tour.delete({
      where: {
        id: Number(id),
      },
    });

    if (!deletedTour) {
      throw new Error('Invalid ID');
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (e) {
    next(e);
  }
}
