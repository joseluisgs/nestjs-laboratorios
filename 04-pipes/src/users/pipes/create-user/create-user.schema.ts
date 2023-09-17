//import * as Joi from 'joi' // Cuidado como se impporta que te puede dar error, ponlo así que como lo importa como antiguamente
import * as Joi from 'joi' // Se debe instalar con npm i joi
export const CreateUserSchema: Joi.ObjectSchema = Joi.object().keys({
  name: Joi.string().required(),
  address: Joi.string(),
  age: Joi.number().min(10).max(80).required(),
})
