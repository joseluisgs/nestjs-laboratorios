import mongoose from 'mongoose'

/**
 * Esquema de la colección de seguros de la base de datos de Mongoose
 * Trabajamos con los tipos de datos de TypeScript/Mongoose
 * Es un objeto que define la estructura de la colección
 */
export const InsuranceSchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: String,
  email: String,
  postal_code: String,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  collection: 'INSURANCES',

})