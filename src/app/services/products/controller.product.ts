import { Request, Response, NextFunction } from 'express';
// import BadParamsException from '../../errors/BadParamsExpection';
import { ProductServices } from './services.product';

const services = new ProductServices();

export class ProductController {
  async getProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await services.getProduct();
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getProductById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await services.getProductById(+req.params.id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async insertProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await services.insertProduct({
        id: 10,
        name: 'Product #10',
        price: 3000,
      });
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async deleteProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await services.deleteProduct(+req.params.id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async updateProductById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await services.updateProductById(+req.params.id, {
        name: 'Product #10',
        price: 3000,
      });
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}
