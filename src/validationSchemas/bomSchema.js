import Joi from "joi";



export const materialSchema = Joi.object({
    category: Joi.string().required().messages({
      'any.required': 'Category is required.',
      'string.empty': 'Category cannot be empty.',
    }),
    name: Joi.string().required().messages({
      'any.required': 'Name is required.',
      'string.empty': 'Name cannot be empty.',
    }),
    unit: Joi.string().required().messages({
      'any.required': 'Unit is required.',
      'string.empty': 'Unit cannot be empty.',
    }),
    rate: Joi.number().required().messages({
      'any.required': 'Rate is required.',
      'number.base': 'Rate must be a number.',
    }),
    material_qty: Joi.number().required().messages({
      'any.required': 'Material quantity is required.',
      'number.base': 'Material quantity must be a number.',
    }),
    total_material_cost: Joi.number().required().messages({
      'any.required': 'Total material cost is required.',
      'number.base': 'Total material cost must be a number.',
    }),
    item_id:Joi.number().positive(),
    remarks: Joi.string().allow('').messages({
      'string.empty': 'Remarks cannot be empty.',
    }),
  });
  
export const bomMainSchema = Joi.object({
  job_no: Joi.number().required().messages({
    'any.required': 'The job_no field is required.',
    'number.base': 'The job_no field must be a number.',
  }),
  Index_no: Joi.number().messages({
    'any.required': 'The Index_no field is required.',
    'number.base': 'The Index_no field must be a number.',
  }),
  created_date: Joi.date().messages({
    'any.required': 'The created_date field is required.',
    'date.base': 'The created_date field must be a valid date.',
  }),
  items: Joi.array().items(materialSchema).required().messages({
    'any.required': 'The items field is required.',
    'array.base': 'The items field must be an array.',
  }),
  status: Joi.string().required().messages({
    'any.required': 'The status field is required.',
    'string.base': 'The status field must be a string.',
  }),
  description: Joi.string().allow("").required().messages({
    'any.required': 'The description field is required.',
    'string.base': 'The description field must be a string.',
  }),
});

export const preBomMainSchema = Joi.object({
  job_no: Joi.number().required().messages({
    'any.required': 'The job_no field is required.',
    'number.base': 'The job_no field must be a number.',
  }),
  description: Joi.string().allow("").required().messages({
    'any.required': 'The description field is required.',
    'string.base': 'The description field must be a string.',
  }),
});