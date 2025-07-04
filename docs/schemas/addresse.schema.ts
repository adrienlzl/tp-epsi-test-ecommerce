export const AddresseSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
      format: "uuid",
      example: "9e4cbfdb-2f90-4c1f-ad42-36de0dfeb794"
    },
    street: {
      type: "string",
      example: "4, rue des fleurs"
    },
    city: {
      type: "string",
      example: "Saint-Savin"
    },
    zipCode: {
      type: "string",
      example: "33920"
    },
    country: {
      type: "string",
      example: "FR"
    },
    addressType: {
      type: "string",
      enum: ["billing", "shipping"],
      example: "billing"
    },
    userId: {
      type: "string",
      format: "uuid",
      example: "52ef7cb5-4546-4d0b-a9fb-ddcd2e14be0b"
    }
  },
  required: [
    "id",
    "street",
    "city",
    "zipCode",
    "country",
    "addressType",
    "userId"
  ]
};
