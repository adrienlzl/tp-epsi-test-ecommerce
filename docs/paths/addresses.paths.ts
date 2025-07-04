export const AddressesPaths = {
  "/api/addresses": {
    get: {
      summary: "Liste toutes les adresses",
      description: "Récupère la liste complète des adresses.",
      tags: ["Addresses"],
      responses: {
        200: {
          description: "Liste des adresses récupérées avec succès.",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/Address" }
              }
            }
          }
        },
        500: {
          description: "Erreur serveur lors de la récupération des adresses.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  erreur: {
                    type: "string",
                    example: "Impossible de récupérer les adresses"
                  }
                }
              }
            }
          }
        }
      }
    },
    post: {
      summary: "Créer une nouvelle adresse",
      description: "Ajoute une nouvelle adresse dans la base de données.",
      tags: ["Addresses"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Address" }
          }
        }
      },
      responses: {
        201: {
          description: "Adresse créée avec succès.",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Address" }
            }
          }
        },
        400: {
          description: "Requête invalide, données d'adresse incorrectes.",
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

  "/api/addresses/{id}": {
    get: {
      summary: "Récupère une adresse par son ID",
      description: "Retourne les détails d'une adresse spécifique identifiée par son ID.",
      tags: ["Addresses"],
      parameters: [
        {
          name: "id",
          in: "path",
          description: "ID unique de l'adresse (UUID)",
          required: true,
          schema: {
            type: "string",
            format: "uuid",
            example: "9e4cbfdb-2f90-4c1f-ad42-36de0dfeb794"
          }
        }
      ],
      responses: {
        200: {
          description: "Adresse trouvée avec succès.",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Address" }
            }
          }
        },
        404: {
          description: "Adresse non trouvée.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  erreur: {
                    type: "string",
                    example: "Adresse non trouvée"
                  }
                }
              }
            }
          }
        },
        500: {
          description: "Erreur serveur lors de la récupération de l'adresse.",
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
