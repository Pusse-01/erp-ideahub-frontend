import Joi from 'joi';

export const qcSchema = Joi.object({
  job_no: Joi.number().required().messages({
    'any.required': 'Job number is required.',
    'number.base': 'Job number must be a number.',
  }),
  project_name: Joi.string().required().messages({
    'any.required': 'Project name is required.',
    'string.empty': 'Project name cannot be empty.',
  }),
  created_date: Joi.date().required().messages({
    'any.required': 'Created date is required.',
    'date.base': 'Invalid date format for created date.',
  }),
  description: Joi.string().required().messages({
    'any.required': 'Description is required.',
    'string.empty': 'Description cannot be empty.',
  }),
  status: Joi.string().required().messages({
    'any.required': 'Status is required.',
    'string.empty': 'Status cannot be empty.',
  }),
  tasks: Joi.array().items(
    Joi.object({
      status: Joi.string().required().messages({
        'any.required': 'Task status is required.',
        'string.empty': 'Task status cannot be empty.',
      }),
      remarks: Joi.string().required().messages({
        'any.required': 'Task remarks are required.',
        'string.empty': 'Task remarks cannot be empty.',
      }),
      task_id: Joi.number().required().messages({
        'any.required': 'Task ID is required.',
        'number.base': 'Task ID must be a number.',
      }),
    })
  ),
});

