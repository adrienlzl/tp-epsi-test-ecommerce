export const CustomersPaths = {
  "/api/customers": {
    get: {
      summary: "Liste tous les clients",
      description: "Récupère la liste complète des clients.",
      tags: ["Customers"],
      responses: {
        200: {
          description: "Liste des clients récupérée avec succès.",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/Customer" }
              }
            }
          }
        },
        500: {
          description: "Erreur serveur lors de la récupération des clients.",
          content: {
            "text/plain": {
              schema: {
                type: "string",
                example: "Erreur serveur lors de la récupération des clients."
              }
            }
          }
        }
      }
    },
    post: {
      summary: "Créer un nouveau client",
      description: "Ajoute un nouveau client dans la base de données.",
      tags: ["Customers"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Customer" }
          }
        }
      },
      responses: {
        201: {
          description: "Client créé avec succès.",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Customer" }
            }
          }
        },
        400: {
          description: "Requête invalide, données client incorrectes.",
          content: {
            "text/plain": {
              schema: {
                type: "string",
                example: "Requête invalide"
              }
            }
          }
        }
      }
    }
  },

  "/api/customers/{id}": {
    get: {
      summary: "Récupère un client par son ID",
      description: "Retourne les détails d'un client spécifique identifié par son ID.",
      tags: ["Customers"],
      parameters: [
        {
          name: "id",
          in: "path",
          description: "ID unique du client (UUID)",
          required: true,
          schema: {
            type: "string",
            format: "uuid",
            example: "8bc122a8-e790-4049-8552-85fa7c885bda"
          }
        }
      ],
      responses: {
        200: {
          description: "Client trouvé avec succès.",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Customer" }
            }
          }
        },
        404: {
          description: "Client non trouvé.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  erreur: {
                    type: "string",
                    example: "Client non trouvé"
                  }
                }
              }
            }
          }
        },
        500: {
          description: "Erreur serveur lors de la récupération du client.",
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
