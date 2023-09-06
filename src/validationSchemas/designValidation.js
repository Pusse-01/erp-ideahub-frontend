import Joi from 'joi';

const fileJsonNamesSchema = Joi.object({
  outsourced: Joi.boolean().required().messages({
    'any.required': 'outsourced is required.',
  }),
  itemname: Joi.string().required().messages({
    'any.required': 'itemname is required.',
    'string.base': 'itemname must be a string.',
    "string.empty": "itemname should not be empty",
  }),
  comment: Joi.string().required().messages({
    'any.required': 'comment is required.',
    'string.base': 'comment must be a string.',
    "string.empty": "comment should not be empty",
  })
});

 const designSchema = Joi.object({
  date: Joi.date().messages({
    'any.required': 'Date is required.',
    'date.base': 'Date must be a valid date.',
  }),
  description: Joi.string().required().messages({
    'any.required': 'Description is required.',
    'string.base': 'Description must be a string.',
  }),
  sitemeaurements: Joi.boolean().required().messages({
    'any.required': 'SiteMeaurements is required.',
  }),
  inquiry_no:Joi.number().integer().required().messages({
    'any.required': 'inquiry_no is required.',
  }),
  vname: Joi.string().required().messages({
    'any.required': 'name is required.',
  }),
  files: Joi.array().items(fileJsonNamesSchema).required().min(1, 'array.min').messages({
    'any.required': 'files is required.',
    'array.empty': 'At least one file entry is required.',
    'array.min': 'At least one file entry is required.',
  }),
});




export default designSchema;