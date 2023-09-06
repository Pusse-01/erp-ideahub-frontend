import Joi from "joi";


export const materialsSchema = Joi.object({
  material_id:Joi.number().optional(),
  category: Joi.string().required(),
  name: Joi.string().required(),
  unit: Joi.string().required(),
  rate: Joi.number().required(),
  material_qty: Joi.number().required(),
  total_material_cost: Joi.number().required(),
  remarks: Joi.string().allow(''),
  in_store: Joi.boolean().required(),
});

export const quotationSchema = Joi.object({
  index_no: Joi.number().optional(),
  materials: Joi.array().items(materialsSchema).required(),
  created_date: Joi.string().isoDate().required(),
  site_measurements: Joi.boolean().required(),
  item_code: Joi.string().required(),
  itemname: Joi.string().required(),
  description: Joi.string().required(),
  qty: Joi.number().required(),
  rate: Joi.number().required(),
  comments:Joi.string().allow(''),
  amount: Joi.number().required(),
  label:Joi.string().required(),
});

export const quotationsSchema = Joi.object({
  Inquiry_id: Joi.number().required(),
  brief: Joi.string().required(),
  iht: Joi.string().required(),
  site_measurements: Joi.boolean().required(),
  list: Joi.array().items(quotationSchema).required(),
});

export const preQuotationsSchema = Joi.object({
    Inquiry_id: Joi.number().required().messages({
        'any.required': 'Inquiry ID is required.',
      }),
    brief: Joi.string().required().messages({
        'any.required': 'Brief is required.',
      }),
    iht: Joi.string().required().messages({
        'any.required': 'IHT is required.',
      }),
    site_measurements: Joi.boolean().required().messages({
        'any.required': 'Site Measurements is required.',
      }),
    // list: Joi.array().items(quotationSchema).required(),
  });

