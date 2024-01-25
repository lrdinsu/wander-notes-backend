import { Prisma } from '@prisma/client';

export const softDelete = Prisma.defineExtension({
  name: 'softDelete',
  query: {
    user: {
      $allOperations({ operation, args, query }) {
        if (operation !== 'create' && operation !== 'createMany') {
          args.where = { ...args.where, deleted: false };
        }
        return query(args);
      },
    },
  },
});
