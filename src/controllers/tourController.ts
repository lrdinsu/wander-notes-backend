import type { NextFunction, Request, Response } from 'express';
import { sql } from 'kysely';

import { HttpStatusCode, TourMessage } from '@/constants/constant.js';
import { db, prisma } from '@/db/index.js';
import {
  TourCreateInputSchema,
  TourUpdateInputSchema,
} from '@/db/zod/index.js';
import { NotFoundError } from '@/errors/errors.js';
import { buildPrismaReqQueryOptions } from '@/utils/buildPrismaReqQueryOptions.js';
import { exclude } from '@/utils/exclude.js';
import { TourQueryParamsSchema } from '@/validates/schemas.js';

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
    // const user = await prisma.user.findUnique({
    //   where: { id: 2 },
    // });
    //
    // if (!user) {
    //   throw new NotFoundError(UserMessage.NOT_FOUND);
    // }

    const queryParams = TourQueryParamsSchema.parse(req.query);
    const queryOptions = buildPrismaReqQueryOptions(queryParams);

    // let tours;
    // if (user.role === 'ADMIN' || user.role === 'PREMIUM_USER') {
    //   tours = await prisma.tour.findMany(queryOptions);
    // } else {
    //   tours = await prisma.tour.findMany({
    //     ...queryOptions,
    //     where: {
    //       ...queryOptions.where,
    //       isPremium: false,
    //     },
    //   });
    // }

    const tours = await prisma.tour.findMany({
      ...queryOptions,
      select: queryOptions.select ?? exclude('Tour', ['createdAt', 'summary']),
    });

    res.status(HttpStatusCode.OK).json({
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

    res.status(HttpStatusCode.CREATED).json({
      status: 'success',
      message: TourMessage.CREATED,
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
      throw new NotFoundError(TourMessage.NOT_FOUND);
    }

    res.status(HttpStatusCode.OK).json({
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

    // Error handled by prisma (PrismaClientKnownRequestError)
    const updatedTour = await prisma.tour.update({
      where: {
        id: Number(id),
      },
      data: tour,
    });

    res.status(HttpStatusCode.OK).json({
      status: 'success',
      message: TourMessage.UPDATED,
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

    // Error handled by prisma (PrismaClientKnownRequestError)
    await prisma.tour.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(HttpStatusCode.NO_CONTENT).json({
      status: 'success',
      message: TourMessage.DELETED,
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

    res.status(HttpStatusCode.OK).json({
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
      .selectFrom('tour')
      .leftJoin('start_date', 'tour.id', 'start_date.tourId')
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

    res.status(HttpStatusCode.OK).json({
      status: 'success',
      data: {
        results,
      },
    });
  } catch (e) {
    next(e);
  }
}
