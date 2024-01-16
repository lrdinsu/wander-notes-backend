export const enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  CONFLICT = 409,
  SERVER_ERROR = 500,
}

function generateHttpErrorMessage(entity: string) {
  return {
    CREATED: `${entity} created successfully`,
    DELETED: `${entity} deleted successfully`,
    UPDATED: `${entity} updated successfully`,
    NOT_FOUND: `${entity} not found`,
  } as const;
}

export const AppMessage = {
  SERVER_ERROR: 'Internal Server Error, try again later!',
  ID_FORMAT_ERROR: 'ID must be a positive number',
  DATABASE_ERROR: 'Database error',
};
export const TourMessage = generateHttpErrorMessage('Tour');
export const UserMessage = {
  ...generateHttpErrorMessage('User'),
  EMAIL_ALREADY_EXISTS: 'Email already exists',
  AUTHENTICATION_FAILED: 'Email or password is incorrect',
  LOGIN_SUCCESS: 'Logged in successfully',
} as const;
