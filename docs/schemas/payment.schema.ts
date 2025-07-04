export const PaymentSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
      example: "pay001"
    },
    order_id: {
      type: "string",
      example: "ord78901234"
    },
    customer_id: {
      type: "string",
      example: "cust101"
    },
    currency: {
      type: "string",
      example: "EUR"
    },
    method: {
      type: "string",
      example: "Carte Bancaire"
    },
    status: {
      type: "string",
      enum: ["pending", "completed", "failed", "refunded"],
      example: "completed"
    },
    transaction_date: {
      type: "string",
      format: "date-time",
      example: "2025-06-09T14:30:00Z"
    },
    processor_response: {
      type: "string",
      example: "Paiement approuvé par la banque."
    },
    notes: {
      type: "string",
      example: "Transaction réussie, commande traitée."
    }
  },
  required: [
    "id",
    "order_id",
    "customer_id",
    "currency",
    "method",
    "status",
    "transaction_date",
    "processor_response"
  ]
};
