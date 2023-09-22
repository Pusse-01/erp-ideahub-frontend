import Joi from 'joi';

const itemschema = Joi.object({
  name: Joi.string().trim().required(),
  qty: Joi.number().integer().min(0).required(),
});

export const taskSchemaUpdate = Joi.object({
  Index_no: Joi.number().integer().required().messages({
    'number.base': 'Index_no should be a number',
    'number.integer': 'Index_no should be an integer',
    'any.required': 'Index_no is required',
  }),
  job_no: Joi.number().integer().required().messages({
    'number.base': 'job_no should be a number',
    'number.integer': 'job_no should be an integer',
    'any.required': 'job_no is required',
  }),
  Emp_no: Joi.number().integer().required().messages({
    'number.base': 'Emp_no should be a number',
    'number.integer': 'Emp_no should be an integer',
    'any.required': 'Emp_no is required',
  }),
  task_name: Joi.string().trim().required().messages({
    'string.base': 'task_name should be a string',
    'string.empty': 'task_name should not be empty',
    'any.required': 'task_name is required',
  }),
  start_date: Joi.date().iso().required().messages({
    'date.base': 'start_date should be a valid date',
    'any.required': 'start_date is required',
  }),
  end_date: Joi.date().iso().required().messages({
    'date.base': 'end_date should be a valid date',
    'any.required': 'end_date is required',
  }),
  description: Joi.string().trim().allow('').required().messages({
    'string.base': 'description should be a string',
    'string.empty': 'description should not be empty',
    'any.required': 'description is required',
  }),
  items: Joi.array().items(itemschema).required().messages({
    'array.base': 'items should be an array',
    'array.items': 'items should be an array of strings',
    'any.required': 'items is required',
  }),
  status: Joi.string().trim().required().messages({
    'string.base': 'status should be a string',
    'any.only': 'status should be one of [pending, in-progress, completed]',
    'any.required': 'status is required',
  }),
  remarks: Joi.string().trim().optional().allow("")
    .messages({
      'string.base': 'remarks should be a string',
      'any.required': 'remarks is required'
    })
});

export const taskSchema = Joi.object({
  Index_no: Joi.number().integer().messages({
    'number.base': 'Index_no should be a number',
    'number.integer': 'Index_no should be an integer',
  }),
  job_no: Joi.number().integer().required().messages({
    'number.base': 'job_no should be a number',
    'number.integer': 'job_no should be an integer',
    'any.required': 'job_no is required',
  }),
  Emp_no: Joi.number().integer().required().messages({
    'number.base': 'Emp_no should be a number',
    'number.integer': 'Emp_no should be an integer',
    'any.required': 'Emp_no is required',
  }),
  task_name: Joi.string().trim().required().messages({
    'string.base': 'task_name should be a string',
    'string.empty': 'task_name should not be empty',
    'any.required': 'task_name is required',
  }),
  start_date: Joi.date().iso().required().messages({
    'date.base': 'start_date should be a valid date',
    'any.required': 'start_date is required',
  }),
  end_date: Joi.date().iso().required().messages({
    'date.base': 'end_date should be a valid date',
    'any.required': 'end_date is required',
  }),
  description: Joi.string().trim().allow('').required().messages({
    'string.base': 'description should be a string',
    'string.empty': 'description should not be empty',
    'any.required': 'description is required',
  }),
  items: Joi.array().items(itemschema).required().messages({
    'array.base': 'items should be an array',
    'array.items': 'items should be an array of strings',
    'any.required': 'items is required',
  }),
  urgent: Joi.boolean().required(),
  status: Joi.string().trim().required().messages({
    'string.base': 'status should be a string',
    'any.only': 'status should be one of [pending, in-progress, completed]',
    'any.required': 'status is required',
  }),
  remarks: Joi.string().trim().optional().allow("")
    .messages({
      'string.base': 'remarks should be a string',
      'any.required': 'remarks is required'
    })
});

export const arraySchema = Joi.object({
  tasks: Joi.array().items(taskSchema).required(),
});

export const arraySchemaUpdate = Joi.object({
  tasks: Joi.array().items(taskSchemaUpdate).required(),
});
