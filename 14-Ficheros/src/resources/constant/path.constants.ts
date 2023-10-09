import * as process from 'process'

export const UPLOADS_IMAGE_PATH =
  process.env.API_IMAGE_UPLOADS_PATH || 'uploads'
export const PROCESSED_IMAGE_PATH = `${UPLOADS_IMAGE_PATH}/processed`
