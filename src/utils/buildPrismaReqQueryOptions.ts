type buildPrismaReqQueryOptionsProps = {
  page?: number;
  limit?: number;
  sort?: string;
  fields?: string;
};

export function buildPrismaReqQueryOptions({
  page,
  limit,
  sort,
  fields,
}: buildPrismaReqQueryOptionsProps) {
  const selectOptions: Record<string, boolean> = {};

  if (fields) {
    fields.split(',').forEach((field) => {
      selectOptions[field] = true;
    });
  }

  const select = fields ? selectOptions : undefined;
  const take = limit ?? undefined;
  const skip = page && limit ? page * limit : undefined;

  const orderByOptions: Record<string, string>[] = [];
  if (sort) {
    sort.split(',').forEach((sortField) => {
      if (sortField.startsWith('-')) {
        orderByOptions.push({ [sortField.slice(1)]: 'desc' });
      } else {
        orderByOptions.push({ [sortField]: 'asc' });
      }
    });
  }

  const orderBy = sort ? orderByOptions : undefined;

  return {
    select,
    orderBy,
    take,
    skip,
  };
}
