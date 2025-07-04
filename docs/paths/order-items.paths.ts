export const OrderItemsPaths = {
  "/api/order-items": {
    get: {
      summary: "Liste tous les éléments de commande",
      description: "Récupère la liste complète des éléments de commande.",
      tags: ["OrderItems"],
      responses: {
        200: {
          description: "Liste des éléments de commande récupérée avec succès.",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/OrderItem" }
              }
            }
          }
        },
        500: {
          description: "Erreur serveur lors de la récupération des éléments de commande.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  erreur: {
                    type: "string",
                    example: "Impossible de récupérer les éléments de commande"
                  }
                }
              }
            }
          }
        }
      }
    },
    post: {
      summary: "Créer un nouvel élément de commande",
      description: "Ajoute un nouvel élément de commande dans la base de données.",
      tags: ["OrderItems"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/OrderItem" }
          }
        }
      },
      responses: {
        201: {
          description: "Élément de commande créé avec succès.",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/OrderItem" }
            }
          }
        },
        400: {
          description: "Requête invalide, données de l'élément incorrectes.",
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

  "/api/order-items/{id}": {
    get: {
      summary: "Récupère un élément de commande par son ID",
      description: "Retourne les détails d'un élément de commande spécifique identifié par son ID.",
      tags: ["OrderItems"],
      parameters: [
        {
          name: "id",
          in: "path",
          description: "ID unique de l'élément de commande (UUID)",
          required: true,
          schema: {
            type: "string",
            format: "uuid",
            example: "eafb7637-11b1-4e3d-b8e8-0c7d78dd832c"
          }
        }
      ],
      responses: {
        200: {
          description: "Élément de commande trouvé avec succès.",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/OrderItem" }
            }
          }
        },
        404: {
          description: "Élément de commande non trouvé.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  erreur: {
                    type: "string",
                    example: "Élément de commande non trouvé"
                  }
                }
              }
            }
          }
        },
        500: {
          description: "Erreur serveur lors de la récupération de l'élément de commande.",
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
