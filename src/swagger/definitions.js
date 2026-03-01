/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         createdAt:
 *           type: string
 *           format: date-time
 *     Movie:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         title:
 *           type: string
 *         overview:
 *           type: string
 *         releaseYear:
 *           type: integer
 *         genres:
 *           type: array
 *           items:
 *             type: string
 *         runtime:
 *           type: integer
 *         posterUrl:
 *           type: string
 *           format: uri
 *         createdBy:
 *           type: string
 *           format: uuid
 *         createdAt:
 *           type: string
 *           format: date-time
 *     WatchlistItem:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         userId:
 *           type: string
 *           format: uuid
 *         movieId:
 *           type: string
 *           format: uuid
 *         status:
 *           type: string
 *           enum:
 *             - PLANNED
 *             - WATCHING
 *             - COMPLETED
 *         rating:
 *           type: integer
 *           minimum: 1
 *           maximum: 10
 *         notes:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 */
