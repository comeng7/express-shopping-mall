import { db } from '@/config/database';
import { IProduct } from '@/types/product';

export class ProductService {
  async getAllProducts(category?: string): Promise<IProduct[]> {
    let query = `
      SELECT 
        p.id,
        p.name,
        p.price,
        p.image_url,
        c.name as category_name,
        p.is_new,
        p.is_best,
        p.color,
        p.description
      FROM products p
      JOIN categories c ON p.category_id = c.id
      WHERE p.deleted_at IS NULL
    `;

    if (category) {
      query += ` AND c.code = ?`;
      const [rows] = await db.query(query, [category]);
      return rows as IProduct[];
    }

    const [rows] = await db.query(query);

    const products = (rows as IProduct[]).map((product) => ({
      ...product,
      is_new: Boolean(product.is_new),
      is_best: Boolean(product.is_best),
    }));

    return products;
  }

  async getNewProducts(): Promise<IProduct[]> {
    const query = `
      SELECT 
        p.id,
        p.name,
        p.price,
        p.image_url,
        c.name as category_name,
        p.is_new,
        p.is_best,
        p.color,
        p.description
      FROM products p
      JOIN categories c ON p.category_id = c.id
      WHERE p.is_new = true AND p.deleted_at IS NULL
    `;
    const [rows] = await db.query(query);

    const products = (rows as IProduct[]).map((product) => ({
      ...product,
      is_new: Boolean(product.is_new),
      is_best: Boolean(product.is_best),
    }));

    return products;
  }

  async getBestProducts(): Promise<IProduct[]> {
    const query = `
      SELECT 
        p.id,
        p.name,
        p.price,
        p.image_url,
        c.name as category_name,
        p.is_new,
        p.is_best,
        p.color,
        p.description
      FROM products p
      JOIN categories c ON p.category_id = c.id
      WHERE p.is_best = true AND p.deleted_at IS NULL
    `;
    const [rows] = await db.query(query);

    const products = (rows as IProduct[]).map((product) => ({
      ...product,
      is_new: Boolean(product.is_new),
      is_best: Boolean(product.is_best),
    }));

    return products;
  }

  async getProductById(id: number): Promise<IProduct | null> {
    const query = `
      SELECT 
        p.id,
        p.name,
        p.price,
        p.image_url,
        c.name as category_name,
        p.is_new,
        p.is_best,
        p.color,
        p.description
      FROM products p
      JOIN categories c ON p.category_id = c.id
      WHERE p.id = ? AND p.deleted_at IS NULL
    `;
    const [rows] = await db.query(query, [id]);

    const products = (rows as IProduct[]).map((product) => ({
      ...product,
      is_new: Boolean(product.is_new),
      is_best: Boolean(product.is_best),
    }));

    return products[0] || [];
  }
}
