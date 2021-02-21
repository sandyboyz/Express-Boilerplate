import { Router } from 'express';
import { ProductController } from './controller.product';

const router = Router();
const controller = new ProductController();

/**
 * @swagger
 * /api/product:
 *    get:
 *     tags:
 *     - "product"
 *     summary: Retrieve a list of products.
 *     description: Retrieve a list of products.
 *     responses:
 *       200:
 *         description: A list of product.
 */
router.get('/', controller.getProduct);
router.get('/:id', controller.getProductById);
router.post('/', controller.insertProduct);
router.delete('/:id', controller.deleteProduct);
router.put('/:id', controller.updateProductById);

export default router;
