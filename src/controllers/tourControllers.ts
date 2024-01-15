import { NextFunction, Request, Response } from 'express';
import { sql } from 'kysely';

import { HTTP_RESPONSE_CODE } from '@/constants/constant.js';
import { db, prisma } from '@/db/index.js';
import { HttpError } from '@/errors/errors.js';
import { buildPrismaReqQueryOptions } from '@/utils/buildPrismaReqQueryOptions.js';
import { TourQueryParamsSchema } from '@/validates/schemas.js';

import {
  TourCreateInputSchema,
  TourUpdateInputSchema,
} from '../../prisma/generated/zod/index.js';

export function checkID(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    res.status(HTTP_RESPONSE_CODE.BAD_REQUEST).json({
      status: 'fail',
      message: 'Invalid ID',
    });
    return;
  }

  next();
}

export function aliasTopTours(req: Request, _: Response, next: NextFunction) {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';

  next();
}

export async function getAllTours(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: 2 },
    });

    if (!user) {
      throw new HttpError('User not found!', HTTP_RESPONSE_CODE.NOT_FOUND);
    }

    const queryParams = TourQueryParamsSchema.parse(req.query);
    const queryOptions = buildPrismaReqQueryOptions(queryParams);

    let tours;
    if (user.role === 'ADMIN' || user.role === 'PREMIUM_USER') {
      tours = await prisma.tour.findMany(queryOptions);
    } else {
      tours = await prisma.tour.findMany({
        ...queryOptions,
        where: {
          ...queryOptions.where,
          isPremium: false,
        },
      });
    }

    // const tours = await prisma.tour.findMany({
    //   ...queryOptions,
    //   select: queryOptions.select ?? exclude('Tour', ['createdAt', 'summary']),
    // });

    res.status(HTTP_RESPONSE_CODE.OK).json({
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

// Use catchAsync helper function to catch errors
// export const createTour: (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => void = catchAsync(async (req, res) => {
//   const newTour = TourCreateInputSchema.parse(req.body);
//
//   const tour = await prisma.tour.create({
//     data: newTour,
//   });
//
//   res.status(201).json({
//     status: 'success',
//     message: 'New tour created!',
//     data: {
//       tour,
//     },
//   });
// });

export async function createTour(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const newTour = TourCreateInputSchema.parse(req.body);

    const tour = await prisma.tour.create({
      data: newTour,
    });

    res.status(HTTP_RESPONSE_CODE.CREATED).json({
      status: 'success',
      message: 'New tour created!',
      data: {
        tour,
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
      throw new HttpError('Invalid Tour ID', HTTP_RESPONSE_CODE.NOT_FOUND);
    }

    res.status(HTTP_RESPONSE_CODE.OK).json({
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
      throw new HttpError('Invalid Tour ID', HTTP_RESPONSE_CODE.NOT_FOUND);
    }

    res.status(HTTP_RESPONSE_CODE.OK).json({
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

    res.status(HTTP_RESPONSE_CODE.NO_CONTENT).json({
      status: 'success',
      data: null,
    });
  } catch (e) {
    next(e);
  }
}

// Aggregation pipeline & grouping
export async function getTourStats(
  _: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    // const stats = await prisma.tour.aggregate({
    //   where: {
    //     ratingsAverage: { gte: 4.5 },
    //   },
    //   _avg: {
    //     price: true,
    //     ratingsAverage: true,
    //   },
    //   _min: {
    //     price: true,
    //   },
    //   _max: {
    //     price: true,
    //   },
    //   _sum: {
    //     ratingsQuantity: true,
    //   },
    //   _count: {
    //     name: true,
    //   },
    // });

    const stats = await prisma.tour.groupBy({
      by: ['difficulty'],
      where: {
        ratingsAverage: { gte: 4.5 },
      },
      _avg: {
        price: true,
        ratingsAverage: true,
      },
      _min: {
        price: true,
      },
      _max: {
        price: true,
      },
      _sum: {
        ratingsQuantity: true,
      },
      _count: {
        name: true,
      },
      having: {
        difficulty: {
          not: 'EASY',
        },
      },
      orderBy: {
        _avg: {
          price: 'desc',
        },
      },
    });

    res.status(HTTP_RESPONSE_CODE.OK).json({
      status: 'success',
      data: {
        stats,
      },
    });
  } catch (e) {
    next(e);
  }
}

export async function getMonthlyPlan(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { year } = req.params;
    const results = await db
      .selectFrom('Tour')
      .leftJoin('StartDate', 'Tour.id', 'StartDate.tourId')
      .select([
        sql`date_part('month', "startDate")`.as('month'),
        (eb) => eb.fn.countAll<number>().as('numTourStarts'),
        sql`array_agg("name")`.as('tours'),
      ])
      .where('startDate', '>=', new Date(`${year}-01-01`))
      .where('startDate', '<=', new Date(`${year}-12-31`))
      .groupBy('month')
      .orderBy('month')
      .execute();

    res.status(HTTP_RESPONSE_CODE.OK).json({
      status: 'success',
      data: {
        results,
      },
    });
  } catch (e) {
    next(e);
  }
}
