import { Request, Response } from "express";
import { order } from "../models/Order";

// ✅ Crear una orden
export const createOrder = async (req: Request, res: Response) => {
    try {
        const payload = req.body;
        const newOrder = new order();

        Object.assign(newOrder, payload);

        if (!newOrder.products || !Array.isArray(newOrder.products) || newOrder.products.length === 0) {
            return res.status(400).json({ message: "La orden debe tener al menos un producto." });
        }

        let subtotal = 0;
        newOrder.products.forEach((product: any) => {
            if (!product.price || !product.quantity) {
                throw new Error("Cada producto debe tener precio y cantidad.");
            }
            subtotal += product.price * product.quantity;
        });

        const taxRate = 0.16;
        const total = subtotal * (1 + taxRate);

        newOrder.subtotal = subtotal;
        newOrder.total = total;

        await newOrder.save();

        return res.status(201).json({
            message: "Orden creada exitosamente.",
            order: newOrder
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al crear la orden.", error: (error as Error).message });
    }
};

// ✅ Obtener todas las órdenes activas
export const getAllOrders = async (_req: Request, res: Response) => {
    try {
        const orders = await order.find({ status: { $ne: "eliminado" } });
        return res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener órdenes", error: (error as Error).message });
    }
};

// ✅ Actualizar una orden por ID
export const updateOrder = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updated = await order.findByIdAndUpdate(id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: "Orden no encontrada" });

        return res.status(200).json({
            message: "Orden actualizada correctamente",
            order: updated
        });
    } catch (error) {
        return res.status(500).json({ message: "Error al actualizar la orden", error: (error as Error).message });
    }
};

// ✅ Eliminar lógicamente una orden por ID
export const deleteOrder = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleted = await order.findByIdAndUpdate(id, {
            status: "eliminado",
            updateDate: new Date()
        }, { new: true });

        if (!deleted) return res.status(404).json({ message: "Orden no encontrada" });

        return res.status(200).json({ message: "Orden eliminada", order: deleted });
    } catch (error) {
        return res.status(500).json({ message: "Error al eliminar la orden", error: (error as Error).message });
    }
};
