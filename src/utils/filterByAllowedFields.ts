export function filterByAllowedFields(
  obj: Record<string, unknown>,
  ...allowedFields: string[]
) {
  const newObj: Record<string, unknown> = {};
  const fieldSet = new Set(allowedFields);
  Object.keys(obj).forEach((el) => {
    if (fieldSet.has(el)) newObj[el] = obj[el];
  });
  return newObj;
}
