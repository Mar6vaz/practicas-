import { Request, Response } from "express";
import { product } from "../models/Product";

// Crear producto
export const createProduct = async (req: Request, res: Response) => {
  try {
    const newProduct = new product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: "Error al crear el producto", error: err });
  }
};

// Obtener todos los productos activos
export const getAllProducts = async (_: Request, res: Response) => {
  try {
    const products = await product.find({ status: true });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener productos", error: err });
  }
};

// Actualizar producto
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await product.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Producto no encontrado" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Error al actualizar el producto", error: err });
  }
};

// Eliminar producto (delete lógico)
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await product.findByIdAndUpdate(id, {
      status: false,
      deleteDate: new Date()
    }, { new: true });

    if (!deleted) return res.status(404).json({ message: "Producto no encontrado" });
    res.json({ message: "Producto eliminado lógicamente", product: deleted });
  } catch (err) {
    res.status(400).json({ message: "Error al eliminar el producto", error: err });
  }
};
