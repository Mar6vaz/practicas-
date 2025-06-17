import { Router } from "express";
import {
    createOrder,
    getAllOrders,
    updateOrder,
    deleteOrder
} from "../controllers/order.controller";

const router = Router();

router.post("/", createOrder);
router.get("/", getAllOrders);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

export default router;
