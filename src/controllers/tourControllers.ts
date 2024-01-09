import { eq } from 'drizzle-orm';
import { NextFunction, Request, Response } from 'express';

import { db } from '@/db/index.js';
import { tour } from '@/db/schema.js';
import { insertTourSchema } from '@/types/schema.js';


// const tours = JSON.parse(
//   readFileSync(`${dataPath}/tours-simple.json`, 'utf-8'),
// ) as Tour[];

// export function checkID(
//   _: Request,
//   res: Response,
//   next: NextFunction,
//   val: string,
// ) {
//   const index = tours.findIndex((tour) => tour.id === Number(val));
//
//   if (index === -1) {
//     res.status(404).json({
//       status: 'fail',
//       message: 'Invalid ID',
//     });
//     return;
//   }
//   next();
// }

// export function checkBody(req: Request, res: Response, next: NextFunction) {
//   const isBodyValid =
//     Object.prototype.hasOwnProperty.call(req.body, 'name') ||
//     Object.prototype.hasOwnProperty.call(req.body, 'price');
//
//   if (!isBodyValid) {
//     res.status(400).json({
//       status: 'fail',
//       message: 'Invalid new tour!',
//     });
//     return;
//   }
//   next();
// }

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

export async function getAllTours(_: Request, res: Response) {
  try {
    const tours = await db.select().from(tour);
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
  // const newId = tours.length === 0 ? 1 : tours[tours.length - 1].id + 1;
  // const newTour = { ...req.body, id: newId } as Tour;
  //
  // tours.push(newTour);
  // await writeFile(`${dataPath}/tours-simple.json`, JSON.stringify(tours));

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
  // const id = Number(req.params.id);
  // const changedIndex = tours.findIndex((tour) => tour.id === id);
  //
  // const changedTour = { ...tours[changedIndex], ...req.body } as Tour;
  // tours[changedIndex] = changedTour;
  // await writeFile(`${dataPath}/tours-simple.json`, JSON.stringify(tours));

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
