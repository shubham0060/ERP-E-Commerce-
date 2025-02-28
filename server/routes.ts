import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { insertCustomerSchema, insertProductSchema, insertOrderSchema, insertOrderItemSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);

  // Customers
  app.get("/api/customers", async (req, res) => {
    const customers = await storage.getCustomers();
    res.json(customers);
  });

  app.post("/api/customers", async (req, res) => {
    const data = insertCustomerSchema.parse(req.body);
    const customer = await storage.createCustomer(data);
    res.status(201).json(customer);
  });

  app.patch("/api/customers/:id", async (req, res) => {
    const id = z.coerce.number().parse(req.params.id);
    const customer = await storage.updateCustomer(id, req.body);
    res.json(customer);
  });

  app.delete("/api/customers/:id", async (req, res) => {
    const id = z.coerce.number().parse(req.params.id);
    await storage.deleteCustomer(id);
    res.sendStatus(204);
  });

  // Products
  app.get("/api/products", async (req, res) => {
    const products = await storage.getProducts();
    res.json(products);
  });

  app.post("/api/products", async (req, res) => {
    const data = insertProductSchema.parse(req.body);
    const product = await storage.createProduct(data);
    res.status(201).json(product);
  });

  app.patch("/api/products/:id", async (req, res) => {
    const id = z.coerce.number().parse(req.params.id);
    const product = await storage.updateProduct(id, req.body);
    res.json(product);
  });

  app.delete("/api/products/:id", async (req, res) => {
    const id = z.coerce.number().parse(req.params.id);
    await storage.deleteProduct(id);
    res.sendStatus(204);
  });

  // Orders
  app.get("/api/orders", async (req, res) => {
    const orders = await storage.getOrders();
    res.json(orders);
  });

  app.post("/api/orders", async (req, res) => {
    const data = insertOrderSchema.parse(req.body);
    const order = await storage.createOrder(data);
    res.status(201).json(order);
  });

  app.patch("/api/orders/:id", async (req, res) => {
    const id = z.coerce.number().parse(req.params.id);
    const order = await storage.updateOrder(id, req.body);
    res.json(order);
  });

  app.get("/api/orders/:id/items", async (req, res) => {
    const id = z.coerce.number().parse(req.params.id);
    const items = await storage.getOrderItems(id);
    res.json(items);
  });

  app.post("/api/orders/:id/items", async (req, res) => {
    const orderId = z.coerce.number().parse(req.params.id);
    const data = insertOrderItemSchema.parse({ ...req.body, orderId });
    const item = await storage.createOrderItem(data);
    res.status(201).json(item);
  });

  const httpServer = createServer(app);
  return httpServer;
}
