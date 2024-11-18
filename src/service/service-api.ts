export interface ApiEndpoint {
  url: string;
  requiresAuth?: boolean; // defaults to false, send true for auth apis
}

export const api = {
  auth: {
    login: { url: '/account/login' },
    register: { url: '/account/register' },
  },
  product: {
    getAll: { url: '/products' },
    addProduct: { url: '/products' },
    getProduct: (id: string) => ({ url: `/products/${id}` }),
    updateProduct: (id: string) => ({ url: `/products/${id}` }),
    deleteProduct: (id: string) => ({ url: `/products/${id}` }),
  },
  bundles: {
    getAll: { url: '/bundles' },
    addBundle: { url: '/bundles' },
    getBundle: (id: string) => ({ url: `/bundles/${id}` }),
    updateBundle: (id: string) => ({ url: `/bundles/${id}` }),
    deleteBundle: (id: string) => ({ url: `/bundles/${id}` }),
  },
};
