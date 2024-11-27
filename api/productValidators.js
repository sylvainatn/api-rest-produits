import Joi from 'joi';

// Schéma de validation pour un produit
const productSchema = Joi.object({
   name: Joi.string().trim().required().messages({
      'string.base': 'Le champ "Nom du produit" doit être une chaîne de caractères.',
      'string.empty': 'Le champ "Nom du produit" ne peut pas être vide.',
      'any.required': 'Le champ "Nom du produit" est requis.',
   }),
   type: Joi.string().trim().required().messages({
      'string.base': 'Le champ "type" doit être une chaîne de caractères.',
      'string.empty': 'Le champ "type" ne peut pas être vide.',
      'any.required': 'Le champ "type" est requis.',
   }),
   price: Joi.number().positive().required().messages({
      'number.base': 'Le champ "Prix" doit être un nombre.',
      'number.positive': 'Le champ "Prix" doit être un nombre positif.',
      'any.required': 'Le champ "Prix" est requis.',
   }),
   rating: Joi.number().min(0).max(5).required().messages({
      'number.base': 'Le champ "rating" doit être un nombre.',
      'number.min': 'Le champ "rating" doit être au minimum 0.',
      'number.max': 'Le champ "rating" ne peut pas dépasser 5.',
      'any.required': 'Le champ "rating" est requis.',
   }),
   warranty_years: Joi.number().integer().min(0).required().messages({
      'number.base': 'Le champ "Garantie" doit être un nombre entier.',
      'number.min': 'Le champ "Garantie" doit être au minimum 0.',
      'any.required': 'Le champ "Garantie" est requis.',
   }),
   available: Joi.boolean().required().messages({
      'boolean.base': 'Le champ "Disponible" doit être un booléen.',
      'any.required': 'Le champ "Disponible" est requis.',
   }),
});

// Fonction de validation
export const validateProduct = (product) => {
   const { error, value } = productSchema.validate(product, { abortEarly: false });

   if (error) {
      const errors = error.details.map((detail) => detail.message);
      throw new Error(errors.join(', '));
   }

   // Retourner les données nettoyées
   return value;
};
