/**
 * get api key from .env file
 * to do this, you need to create a `.env` file in the root of the project, and add the following line:
 * @example
 * # .env.local
 * VITE_GOOGLE_MAP_API_KEY=your_api_key
 */
export const GOOGLE_MAP_API_KEY = import.meta.env.VITE_GOOGLE_MAP_API_KEY;