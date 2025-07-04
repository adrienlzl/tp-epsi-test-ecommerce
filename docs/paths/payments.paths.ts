export const PaymentsPaths = {
  "/api/payments": {
    get: {
      summary: "Liste tous les paiements",
      description: "Récupère la liste complète des paiements.",
      tags: ["Payments"],
      responses: {
        200: {
          description: "Liste des paiements récupérée avec succès.",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/Payment" }
              }
            }
          }
        },
        500: {
          description: "Erreur serveur lors de la récupération des paiements.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  erreur: {
                    type: "string",
                    example: "Impossible de récupérer les paiements"
                  }
                }
              }
            }
          }
        }
      }
    }
  },

  "/api/payments/{id}": {
    get: {
      summary: "Récupère un paiement par son ID",
      description: "Retourne les détails d'un paiement spécifique identifié par son ID.",
      tags: ["Payments"],
      parameters: [
        {
          name: "id",
          in: "path",
          description: "ID unique du paiement",
          required: true,
          schema: {
            type: "string",
            example: "pay001"
          }
        }
      ],
      responses: {
        200: {
          description: "Paiement trouvé avec succès.",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Payment" }
            }
          }
        },
        404: {
          description: "Paiement non trouvé.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  erreur: {
                    type: "string",
                    example: "Paiement non trouvé"
                  }
                }
              }
            }
          }
        },
        500: {
          description: "Erreur serveur lors de la récupération du paiement.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  erreur: {
                    type: "string",
                    example: "Erreur interne du serveur"
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};
