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
    /** Quantité en stock */
    stock: number
    /** Catégorie / type (ex. "t-shirt", "pantalon") */
    category: string
    /** Poids en grammes */
    weight: number
    /** URLs des images du produit */
    images: string[]
}