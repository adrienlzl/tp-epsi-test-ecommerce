export const OrderSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
      format: "uuid",
      example: "f3b84a7c-6737-4987-85dd-d690cefcacac"
    },
    orderDate: {
      type: "string",
      format: "date-time",
      example: "2025-06-20T13:47:35.022Z"
    },
    status: {
      type: "string",
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      example: "pending"
    },
    customerId: {
      type: "string",
      format: "uuid",
      example: "5ba49417-f03e-4315-9389-8f2d51e9a982"
    },
    shippingAddressId: {
      type: "string",
      format: "uuid",
      example: "93723d04-e0d8-4f0d-807c-ae267bc76212"
    },
    billingAddressId: {
      type: "string",
      format: "uuid",
      example: "93723d04-e0d8-4f0d-807c-ae267bc76212"
    },
    carrierId: {
      type: "string",
      example: "trk002"
    },
    paymentId: {
      type: "string",
      example: "Carte Bancaire"
    },
    orderTotal: {
      type: "number",
      format: "float",
      example: 192
    }
  },
  required: [
    "id",
    "orderDate",
    "status",
    "customerId",
    "shippingAddressId",
    "billingAddressId",
    "carrierId",
    "paymentId",
    "orderTotal"
  ]
};
