export const OrdersPaths = {
  "/api/orders": {
    get: {
      summary: "Liste toutes les commandes",
      description: "Récupère la liste complète des commandes.",
      tags: ["Orders"],
      responses: {
        200: {
          description: "Liste des commandes récupérée avec succès.",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/Order" }
              }
            }
          }
        },
        500: {
          description: "Erreur serveur lors de la récupération des commandes.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  erreur: {
                    type: "string",
                    example: "Impossible de récupérer les commandes"
                  }
                }
              }
            }
          }
        }
      }
    },
    post: {
      summary: "Créer une nouvelle commande",
      description: "Ajoute une nouvelle commande dans la base de données.",
      tags: ["Orders"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Order" }
          }
        }
      },
      responses: {
        201: {
          description: "Commande créée avec succès.",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Order" }
            }
          }
        },
        400: {
          description: "Requête invalide, données de commande incorrectes.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  erreur: {
                    type: "string",
                    example: "Données invalides"
                  }
                }
              }
            }
          }
        }
      }
    }
  },

  "/api/orders/{id}": {
    get: {
      summary: "Récupère une commande par son ID",
      description: "Retourne les détails d'une commande spécifique identifiée par son ID.",
      tags: ["Orders"],
      parameters: [
        {
          name: "id",
          in: "path",
          description: "ID unique de la commande (UUID)",
          required: true,
          schema: {
            type: "string",
            format: "uuid",
            example: "f3b84a7c-6737-4987-85dd-d690cefcacac"
          }
        }
      ],
      responses: {
        200: {
          description: "Commande trouvée avec succès.",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Order" }
            }
          }
        },
        404: {
          description: "Commande non trouvée.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  erreur: {
                    type: "string",
                    example: "Commande non trouvée"
                  }
                }
              }
            }
          }
        },
        500: {
          description: "Erreur serveur lors de la récupération de la commande.",
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
