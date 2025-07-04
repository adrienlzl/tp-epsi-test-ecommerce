export const CarriersPaths = {
  "/api/carriers": {
    get: {
      summary: "Liste tous les transporteurs",
      description: "Récupère la liste complète des transporteurs disponibles.",
      tags: ["Carriers"],
      responses: {
        200: {
          description: "Liste des transporteurs récupérée avec succès.",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/Carrier" }
              }
            }
          }
        },
        500: {
          description: "Erreur serveur lors de la récupération des transporteurs.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  erreur: {
                    type: "string",
                    example: "Impossible de récupérer les transporteurs"
                  }
                }
              }
            }
          }
        }
      }
    }
  },

  "/api/carriers/{id}": {
    get: {
      summary: "Récupère un transporteur par son ID",
      description: "Retourne les détails d'un transporteur spécifique identifié par son ID.",
      tags: ["Carriers"],
      parameters: [
        {
          name: "id",
          in: "path",
          description: "ID unique du transporteur",
          required: true,
          schema: {
            type: "string",
            example: "trk001"
          }
        }
      ],
      responses: {
        200: {
          description: "Transporteur trouvé avec succès.",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Carrier" }
            }
          }
        },
        404: {
          description: "Transporteur non trouvé.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  erreur: {
                    type: "string",
                    example: "Transporteur non trouvé"
                  }
                }
              }
            }
          }
        },
        500: {
          description: "Erreur serveur lors de la récupération du transporteur.",
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
