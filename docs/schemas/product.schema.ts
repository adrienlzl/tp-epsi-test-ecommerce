export const ProductSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
      format: "uuid",
      example: "e0a1b2c3-d4e5-6f7a-8b9c-0d1e2f3a4b5c"
    },
    name: {
      type: "string",
      example: "T-shirt Coton Bio Blanc"
    },
    description_short: {
      type: "string",
      example: "Un essentiel doux et respectueux de l'environnement."
    },
    description_long: {
      type: "string",
      example: "Ce t-shirt blanc en coton 100% biologique offre une sensation douce et confortable. Un basique indispensable pour un style décontracté et éco-responsable."
    },
    price: {
      type: "number",
      format: "float",
      example: 25
    },
    currency: {
      type: "string",
      example: "EUR"
    },
    stock: {
      type: "integer",
      example: 160
    },
    category: {
      type: "string",
      example: "t-shirt"
    },
    weight: {
      type: "integer",
      description: "Poids en grammes",
      example: 200
    },
    images: {
      type: "array",
      items: {
        type: "string",
        format: "uri"
      },
      example: [
        "https://example.com/images/tshirt_bio_blanc_1.jpg",
        "https://example.com/images/tshirt_bio_blanc_2.jpg"
      ]
    }
  },
  required: [
    "id",
    "name",
    "description_short",
    "description_long",
    "price",
    "currency",
    "stock",
    "category",
    "weight",
    "images"
  ]
};
