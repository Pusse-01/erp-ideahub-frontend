import Joi from 'joi'

export const installationSchema = Joi.object({
    index_no: Joi.number().integer().positive(),
    created_date: Joi.date(),
    installation_date: Joi.date().required(),
    job_no: Joi.number().integer().positive().required().messages({
      'number.base': 'job_no should be a number',
      'number.integer': 'job_no should be an integer',
      'number.positive': 'job_no should be a positive number',
      'any.required': 'job_no is required'
    }),
    description: Joi.string().allow("").required().messages({
      'string.base': 'description should be a string',
      'string.empty': 'description cannot be empty',
      'string.min': 'description should have a minimum length of {#limit}',
      'string.max': 'description should have a maximum length of {#limit}',
      'any.required': 'description is required'
    }),
    feedback: Joi.string().allow("").required().messages({
      'string.base': 'feedback should be a string',
      'string.empty': 'feedback cannot be empty',
      'string.min': 'feedback should have a minimum length of {#limit}',
      'string.max': 'feedback should have a maximum length of {#limit}',
      'any.required': 'feedback is required'
    }),
    client_name: Joi.string().required().messages({
      'string.base': 'client_name should be a string',
      'string.empty': 'client_name cannot be empty',
      'string.min': 'client_name should have a minimum length of {#limit}',
      'string.max': 'client_name should have a maximum length of {#limit}',
      'any.required': 'client_name is required'
    }),
    files: Joi.array().required().min(1, 'array.min').messages({
      'any.required': 'files is required.',
      'array.empty': 'At least one file entry is required.',
      'array.min': 'At least one file entry is required.',
    }),
    // files: Joi.array().items(fileJsonSchema).required().min(1, 'array.min').messages({
    //   'any.required': 'files is required.',
    //   'array.empty': 'At least one file entry is required.',
    //   'array.min': 'At least one file entry is required.',
    // }),
  });

  // const fileJsonSchema = Joi.object({
  //   containerName: Joi.boolean().required().messages({
  //     'any.required': 'containerName is required.',
  //     'string.base': 'containerName must be a string.',
  //     "string.empty": "containerName should not be empty"
  //   }),
  //   blobName: Joi.string().required().messages({
  //     'any.required': 'blobName is required.',
  //     'string.base': 'blobName must be a string.',
  //     "string.empty": "blobName should not be empty",
  //   }),
  // });