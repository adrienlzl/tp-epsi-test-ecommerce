export const CarrierSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
      example: "trk001"
    },
    name: {
      type: "string",
      example: "Express Rapide"
    },
    service_type: {
      type: "string",
      example: "Livraison express (24h-48h)"
    },
    area_served: {
      type: "string",
      example: "National"
    },
    average_rating: {
      type: "number",
      format: "float",
      example: 4.5
    },
    "max-weight": {
      type: "number",
      format: "float",
      example: 1
    },
    price: {
      type: "number",
      format: "float",
      example: 2.5
    },
    contact_email: {
      type: "string",
      format: "email",
      example: "contact@expressrapide.fr"
    },
    phone: {
      type: "string",
      example: "+33123456789"
    },
    tracking_url_template: {
      type: "string",
      format: "uri",
      example: "https://expressrapide.fr/suivi?id={tracking_number}"
    },
    features: {
      type: "array",
      items: {
        type: "string"
      },
      example: [
        "Suivi en temps réel",
        "Assurance standard incluse",
        "Livraison à domicile"
      ]
    }
  },
  required: [
    "id",
    "name",
    "service_type",
    "area_served",
    "average_rating",
    "max-weight",
    "price",
    "contact_email",
    "phone",
    "tracking_url_template",
    "features"
  ]
};
