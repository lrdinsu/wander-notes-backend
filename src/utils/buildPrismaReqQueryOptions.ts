// Defines the structure for query options passed to the Prisma ORM.

type buildPrismaReqQueryOptionsProps = {
  page?: number; // Optionally specifies the current page number for pagination purposes.
  limit?: number; // Optionally specifies the limit on the number of items per page.
  sort?: string; // Optionally specifies the sorting criteria. Can include fields with a '-' prefix indicating descending order.
  fields?: string; // Optionally specifies a comma-separated list of fields to include in the query response.
  [key: string]: unknown; // Allows inclusion of additional properties with unknown validates.
};

// Function to construct query options for use with Prisma ORM queries.
export function buildPrismaReqQueryOptions({
  page,
  limit,
  sort,
  fields,
  ...where // Captures additional filtering criteria passed to the function.
}: buildPrismaReqQueryOptionsProps) {
  // Initializes an object to store options for selecting specific fields in the query.
  const selectOptions: Record<string, boolean> = {};

  // Processes 'fields' parameter to populate 'selectOptions' with appropriate boolean flags.
  if (fields) {
    fields.split(',').forEach((field) => {
      selectOptions[field] = true; // Sets the field in the 'selectOptions' object to true.
    });
  }

  // Determines the 'select' value based on whether fields are specified.
  const select = fields ? selectOptions : undefined;

  // Sets the 'take' value for limiting the number of records returned, if specified.
  const take = limit ?? 10;

  // Calculates the 'skip' value for pagination, determining how many records to bypass.
  const skip = page && limit ? (page - 1) * limit : undefined;

  // Initializes an array to store the sorting criteria.
  const orderByOptions: Record<string, string>[] = [];
  if (sort) {
    // Splits and processes each sorting field specified in the 'sort' parameter.
    sort.split(',').forEach((sortField) => {
      // Determines sort direction and constructs the appropriate sorting object.
      if (sortField.startsWith('-')) {
        orderByOptions.push({ [sortField.slice(1)]: 'desc' }); // Descending order for prefixed fields.
      } else {
        orderByOptions.push({ [sortField]: 'asc' }); // Ascending order otherwise.
      }
    });
  }

  // Assigns the 'orderBy' value based on the sorting criteria provided.
  const orderBy = sort ? orderByOptions : undefined;

  // Constructs and returns the final query options object.
  return {
    select,
    orderBy,
    take,
    skip,
    where,
  } as const; // Marks the object as a constant, ensuring immutability.
}
