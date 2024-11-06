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
    getAll: { url: '/product' },
    addProduct: { url: '/product' },
  },
};
