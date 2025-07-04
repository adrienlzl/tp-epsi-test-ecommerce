export const OrderItemSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
      format: "uuid",
      example: "eafb7637-11b1-4e3d-b8e8-0c7d78dd832c"
    },
    orderId: {
      type: "string",
      format: "uuid",
      example: "f3b84a7c-6737-4987-85dd-d690cefcacac"
    },
    productId: {
      type: "string",
      format: "uuid",
      example: "e0a1b2c3-d4e5-6f7a-8b9c-0d1e2f3a4b5c"
    },
    quantity: {
      type: "integer",
      example: 2
    },
    unitPrice: {
      type: "number",
      format: "float",
      example: 25
    },
    totalPrice: {
      type: "number",
      format: "float",
      example: 50
    }
  },
  required: [
    "id",
    "orderId",
    "productId",
    "quantity",
    "unitPrice",
    "totalPrice"
  ]
};
