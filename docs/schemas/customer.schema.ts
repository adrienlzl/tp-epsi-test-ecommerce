export const CustomerSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
      format: "uuid",
      example: "8bc122a8-e790-4049-8552-85fa7c885bda"
    },
    name: {
      type: "string",
      example: "Lefevre Emmanuel"
    },
    email: {
      type: "string",
      format: "email",
      example: "Emmanuel@yahoo.fr"
    },
    defaultBillingAddressId: {
      type: "string",
      format: "uuid",
      example: "95a414f5-11ac-4fe2-9eb3-c738d12a98a7"
    },
    defaultShippingAddressId: {
      type: "string",
      format: "uuid",
      example: "95a414f5-11ac-4fe2-9eb3-c738d12a98a7"
    }
  },
  required: ["id", "name", "email"]
};
