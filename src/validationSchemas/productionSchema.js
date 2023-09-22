import Joi from 'joi';
import { taskSchema, taskSchemaUpdate, arraySchema, arraySchemaUpdate } from './taskValidation';

const productionSchema = Joi.object({
  index_no: Joi.number().integer(),
  job_no: Joi.number().integer().required(),
  main_job_id: Joi.string(),
  status: Joi.string().max(20).required(),
  project_name: Joi.string().required(),
  remarks: Joi.string().allow('').required().messages({
    'string.empty': 'Remarks field can be empty',
  }),
  created_date: Joi.date().required(),
  description: Joi.string().allow('').required().messages({
    'string.empty': 'Description field can be empty',
  }),
  tasks: Joi.array().items(taskSchema).required(),
});

export default productionSchema;
