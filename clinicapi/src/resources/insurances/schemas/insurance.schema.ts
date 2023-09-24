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

  // Transformación de los datos de la base de datos
  // En este caso, eliminamos el campo __v y renombramos _id a id para que no se vea en la respuesta
  toJSON: {
    transform: (doc: DocumentType, ret) => {
      delete ret.__v
      ret.id = ret._id
      delete ret._id
    },
  },
})
