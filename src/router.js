import Crud from "./controller.js";
import express from "express";

/**
 * @param className
 * @param {Array}  setMiddlewares
 * @param {Array}  getMiddlewares
 */

export default ({ className, setMiddlewares = [], getMiddlewares = [] }) => {
  const router = express.Router();
  const crud = new Crud(className);

  router
    .route("/")
    .post(setMiddlewares, crud.create())
    .get(getMiddlewares, crud.getAll());

  router
    .route("/:id")
    .put(setMiddlewares, crud.update())
    .get(getMiddlewares, crud.getOne())
    .delete(setMiddlewares, crud.delete());

  return router;
};
