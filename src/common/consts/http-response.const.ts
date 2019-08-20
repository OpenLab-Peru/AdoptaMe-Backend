export default {
  /** STATUS CODE 2XX */
  OK: {
    message: 'OK',
    statusCode: 200,
  },
  CREATED: 'CREATED',
  ACCEPTED: 'ACCEPTED',
  NO_CONTENT: 'NO_CONTENT',
  /** */
  /** STATUS CODE 4XX */
  UNAUTHORIZED: {
    message: 'Authentication is needed to get requested response.',
    statusCode: 401,
  },
  BAD_REQUEST: {
    message: 'BAD REQUEST',
    statusCode: 400,
  },
  FORBIDDEN: {
    message: 'FORBIDDEN',
    statusCode: 200,
  },
  NOT_FOUND: 'NOT_FOUND',

  /** STATUS CODE 5XX */
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
}