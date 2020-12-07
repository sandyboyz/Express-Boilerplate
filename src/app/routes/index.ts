import { Router } from 'express';

// Import Routes
import product from '../services/product/_routes.product';

const router = Router();

export default {
  product: router.use('/product', product),
};
