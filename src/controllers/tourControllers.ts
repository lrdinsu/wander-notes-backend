import { and, eq } from 'drizzle-orm';
import { NextFunction, Request, Response } from 'express';

import { db } from '@/db/index.js';
import { tour } from '@/db/schema.js';
import { insertTourSchema } from '@/types/schema.js';

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

export async function getAllTours(req: Request, res: Response) {
  try {
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];

    excludedFields.forEach((el) => delete queryObj[el]);

    console.log(req.query, queryObj);

    const tours = await db
      .select()
      .from(tour)
      .where(and(eq(tour.duration, 5), eq(tour.difficulty, 'easy')));

    // const tours = await db.query.tour.findMany();

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({
        status: 'fail',
        message: err.message,
      });
      return;
    }
    res.status(400).json({
      status: 'fail',
      message: 'Invalid new tour!',
    });
  }
}

export async function createTour(req: Request, res: Response) {
  try {
    const newTour = insertTourSchema.parse(req.body);
    // @ts-expect-error: FIXME - drizzle-orm array types are not working properly
    await db.insert(tour).values(newTour);

    res.status(201).json({
      status: 'success',
      message: 'New tour created!',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({
        status: 'fail',
        message: err.message,
      });
      return;
    }
    res.status(400).json({
      status: 'fail',
      message: 'Invalid new tour!',
    });
  }
}

export async function getTour(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    // const currentTour = await db.select().from(tour).where(eq(tour.id, id));
    const currentTour = await db.query.tour.findFirst({
      where: eq(tour.id, id),
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
    if (e instanceof Error) {
      res.status(400).json({
        status: 'fail',
        message: e.message,
      });
    }
  }
}

export async function updateTour(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    const updatedTour = insertTourSchema.partial().parse(req.body);

    const updatedResult = await db
      .update(tour)
      // @ts-expect-error: FIXME - drizzle-orm array types are not working properly
      .set(updatedTour)
      .where(eq(tour.id, id))
      .returning();

    if (updatedResult.length === 0) {
      throw new Error('Invalid ID');
    }

    res.status(200).json({
      status: 'success',
      data: {
        updatedResult,
      },
    });
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).json({
        status: 'fail',
        message: e.message,
      });
    }
  }
}

export async function deleteTour(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    await db.delete(tour).where(eq(tour.id, id));

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).json({
        status: 'fail',
        message: e.message,
      });
    }
  }
}
