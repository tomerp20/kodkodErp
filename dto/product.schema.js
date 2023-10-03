const yup = require('yup');

/*
shopProductInterface: {
    id: string (PK)
    name: string
    salePrice: number
    quantity : number
    description : string
    category: string
    discountPercentage : number
    image: {
        url: string
        alt: string
    }
}
prevent other properties from being added to the object

adminProductInterface: {
    …shopProductInterface
    isForSale : boolian
    costPrice: number
    supplier : string
}



*/

let productSchema = yup.object().shape({
    name: yup.string().required(),
    salePrice: yup.number().required(),
    quantity: yup.number().required(),
    description: yup.string(),
    category: yup.string(),
    discountPercentage: yup.number(),
    image: yup.object().shape({
        url: yup.string(),
        alt: yup.string()
    }).noUnknown()
}).noUnknown()

let adminProductSchema = yup.object().shape({
    name: yup.string().required(),
    salePrice: yup.number(),
    quantity: yup.number(),
    description: yup.string(),
    category: yup.string(),
    discountPercentage: yup.number(),
    image: yup.object().shape({
        url: yup.string(),
        alt: yup.string()
    }),
    isForSale: yup.boolean(),
    costPrice: yup.number(),
    supplier: yup.string()
})
module.exports = { productSchema, adminProductSchema };