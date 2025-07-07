/**
 * Représente un client.
 */
export interface Customer {
    /** Identifiant unique du client (UUID) */
    id: string;
    /** Nom du client */
    name: string;
    /** Email du client */
    email: string;
    /** UUID de l'adresse par défaut pour la livraison. Peut être null si aucune adresse par défaut définie */
    defaultShippingAddressId: string | null;
    /** UUID de l'adresse par défaut pour la facturation. Peut être null si aucune adresse par défaut définie */
    defaultBillingAddressId: string | null;
}

/**
 * Représente une adresse.
 */
export interface Address {
    /** Identifiant unique de l'adresse (UUID) */
    id: string;
    /** Rue / numéro et nom de rue */
    street: string;
    /** Ville */
    city: string;
    /** Code postal */
    zipCode: string;
    /** Pays */
    country: string;
    /** Type d'adresse (ex. "billing", "shipping", etc.) */
    addressType: string;
    /** UUID de l'utilisateur/propriétaire de l'adresse. Peut être null si non associé */
    userId: string | null;
}

/**
 * Représente une commande.
 */
export interface Order {
    /** Identifiant unique de la commande (UUID) */
    id: string;
    /** Date et heure de la commande au format ISO (TIMESTAMP) */
    orderDate: string;
    /** Statut de la commande (ex. "pending", "shipped", etc.) */
    status: string;
    /** UUID du client ayant passé la commande */
    customerId: string;
    /** UUID de l'adresse de livraison pour cette commande */
    shippingAddressId: string;
    /** UUID de l'adresse de facturation pour cette commande */
    billingAddressId: string;
    /** UUID du transporteur (stocke simplement l’ID provenant du Json Server) */
    carrierId: string;
    /** UUID du paiement (stocke simplement l’ID provenant du Json Server) */
    paymentId: string;
    /** Total de la commande. DECIMAL représenté en number */
    orderTotal: number;
}

/**
 * Représente un item au sein d'une commande.
 */
export interface OrderItem {
    /** Identifiant unique de l'item de commande (UUID) */
    id: string;
    /** UUID de la commande associée */
    orderId: string;
    /** UUID du produit */
    productId: string;
    /** Quantité commandée */
    quantity: number;
    /** Prix unitaire. DECIMAL représenté en number */
    unitPrice: number;
    /** Prix total pour cette ligne (quantity * unitPrice). DECIMAL représenté en number */
    totalPrice: number;
}
export interface Product {
    /** Identifiant unique du produit (UUID) */
    id: string
    /** Nom affiché du produit */
    name: string
    /** Description courte */
    description_short: string
    /** Description longue */
    description_long: string
    /** Prix unitaire */
    price: number
    /** Devise (ISO 4217) */
    currency: string
    stock: number
    /** Catégorie / type (ex. "t-shirt", "pantalon") */
    category: string
    /** Poids en grammes */
    weight: number
    images: string[]
}

export interface Carrier {
    /** Identifiant unique du transporteur */
    id: string;
    /** Nom affiché du transporteur */
    name: string;
    /** Type de service (ex : Livraison express, Fret international…) */
    service_type: string;
    /** Zone desservie (Local, National, International…) */
    area_served: string;
    /** Note moyenne (échelle 0–5) */
    average_rating: number;
    /** Poids max accepté en kg */
    "max-weight": number;
    /** Email de contact */
    contact_email: string;
    /** Numéro de téléphone */
    phone: string;
    /** Modèle d’URL pour le suivi (placeholder : {tracking_number}) */
    tracking_url_template: string;
    /** Liste de fonctionnalités proposées */
    features: string[];
    price: number
}

/**
 * Méthodes de paiement disponibles.
 */
export type PaymentMethod =
    | "Carte Bancaire"
    | "PayPal"
    | "Virement Bancaire"
    | "Apple Pay";

/**
 * Représente un paiement.
 */
export interface Payment {
    /** Identifiant unique du paiement */
    id: string;
    /** UUID de la commande associée */
    order_id: string;
    /** UUID du client (optionnel si non renseigné) */
    customer_id?: string;
    /** Devise (ISO 4217) */
    currency: string;
    /** Méthode utilisée */
    method: PaymentMethod;
    /** Statut du paiement (ex : completed, pending…) */
    status: string;
    /** Date/heure de la transaction (ISO 8601) */
    transaction_date: string;
    /** Réponse du processeur de paiement */
    processor_response: string;
    /** Notes complémentaires */
    notes: string;
}