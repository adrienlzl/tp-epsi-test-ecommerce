export const ProductsPaths = {
  "/api/products": {
    get: {
      summary: "Liste tous les produits",
      description: "Récupère la liste complète des produits.",
      tags: ["Products"],
      responses: {
        200: {
          description: "Liste des produits récupérée avec succès.",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/Product" }
              }
            }
          }
        },
        500: {
          description: "Erreur serveur lors de la récupération des produits.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  erreur: {
                    type: "string",
                    example: "Impossible de récupérer les produits"
                  }
                }
              }
            }
          }
        },
        502: {
          description: "Erreur réseau vers le serveur JSON-Server.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  erreur: {
                    type: "string",
                    example: "Erreur réseau vers JSON-Server"
                  }
                }
              }
            }
          }
        }
      }
    }
  },

  "/api/products/{productId}": {
    get: {
      summary: "Récupère un produit par son ID",
      description: "Retourne les détails d'un produit spécifique identifié par son ID.",
      tags: ["Products"],
      parameters: [
        {
          name: "productId",
          in: "path",
          description: "ID unique du produit (UUID)",
          required: true,
          schema: {
            type: "string",
            format: "uuid",
            example: "e0a1b2c3-d4e5-6f7a-8b9c-0d1e2f3a4b5c"
          }
        }
      ],
      responses: {
        200: {
          description: "Produit trouvé avec succès.",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Product" }
            }
          }
        },
        404: {
          description: "Produit non trouvé.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  erreur: {
                    type: "string",
                    example: "Produit non trouvé"
                  }
                }
              }
            }
          }
        },
        500: {
          description: "Erreur serveur lors de la récupération du produit.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  erreur: {
                    type: "string",
                    example: "Erreur lors de la récupération du produit"
                  }
                }
              }
            }
          }
        },
        502: {
          description: "Erreur réseau vers le serveur JSON-Server.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  erreur: {
                    type: "string",
                    example: "Impossible de contacter le serveur de données"
                  }
                }
              }
            }
          }
        }
      }
    },
    patch: {
      summary: "Met à jour partiellement un produit",
      description: "Met à jour partiellement un produit, notamment son stock via `stockDelta`.",
      tags: ["Products"],
      parameters: [
        {
          name: "productId",
          in: "path",
          description: "ID unique du produit (UUID)",
          required: true,
          schema: {
            type: "string",
            format: "uuid",
            example: "e0a1b2c3-d4e5-6f7a-8b9c-0d1e2f3a4b5c"
          }
        }
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["stockDelta"],
              properties: {
                stockDelta: {
                  type: "integer",
                  description: "Valeur à ajouter (positive ou négative) au stock actuel",
                  example: 5
                }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: "Produit mis à jour avec succès.",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Product" }
            }
          }
        },
        400: {
          description: "Requête invalide, données incorrectes.",
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
        },
        404: {
          description: "Produit non trouvé.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  erreur: {
                    type: "string",
                    example: "Produit non trouvé"
                  }
                }
              }
            }
          }
        },
        500: {
          description: "Erreur serveur lors de la mise à jour du produit.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  erreur: {
                    type: "string",
                    example: "Erreur serveur"
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
