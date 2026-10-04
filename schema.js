// SERver side validation

import Joi from 'joi';
console.log(Joi.version);


export const schema = Joi.object({
    listing : Joi.object({
         title : Joi.string().min(3).max(30).required(),
         desc : Joi.string().required(),
        listingimage: Joi.string().uri().allow("", null), 
         price : Joi.number().required(),
         country: Joi.string().required(),
         location : Joi.string().max(100).required()    
    }).required()

})




// Review schema
   export  const reviewSchema = Joi.object({
        review: Joi.object({
            rating: Joi.number().required(),
            comment: Joi.string().required()
        }).required()
    })

    