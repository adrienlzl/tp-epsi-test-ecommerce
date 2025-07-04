import { createSwaggerSpec } from "next-swagger-doc";

import { AddresseSchema } from '@/docs/schemas/addresse.schema';
import { CarrierSchema } from '@/docs/schemas/carrier.schema';
import { CustomerSchema } from '@/docs/schemas/customer.schema';
import { OrderItemSchema } from '@/docs/schemas/order-item.schema';
import { OrderSchema } from '@/docs/schemas/order.schema';
import { PaymentSchema } from '@/docs/schemas/payment.schema';
import { ProductSchema } from '@/docs/schemas/product.schema';

import { AddressesPaths } from '@/docs/paths/addresses.paths';
import { CarriersPaths } from '@/docs/paths/carriers.paths';
import { CustomersPaths } from '@/docs/paths/customers.paths';
import { OrderItemsPaths } from '@/docs/paths/order-items.paths';
import { OrdersPaths } from '@/docs/paths/orders.paths';
import { PaymentsPaths } from '@/docs/paths/payments.paths';
import { ProductsPaths } from '@/docs/paths/products.paths';


export const getApiDocs = async () => {
  const spec = createSwaggerSpec({
    apiFolder: "app/api",
    definition: {
      openapi: "3.0.0",
      info: {
        title: "ECommerce",
        version: "1.0",
        description: "Test ECommerce API",
        contact: {
          email: "totolasticot@gmail.com",
        }
      },
      paths: {
        ...AddressesPaths,
        ...CarriersPaths,
        ...CustomersPaths,
        ...OrderItemsPaths,
        ...OrdersPaths,
        ...PaymentsPaths,
        ...ProductsPaths
      },
      components: {
        securitySchemes: {
          BearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          }
        },
        schemas: {
          Addresse: AddresseSchema,
          Carrier: CarrierSchema,
          Customer: CustomerSchema,
          OrderItem: OrderItemSchema,
          Order: OrderSchema,
          Payment: PaymentSchema,
          Product: ProductSchema
        }
      },
      security: [],
    }
  });

  return spec;
}
