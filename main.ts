// @deno-types="npm:@types/express@4"
import express, { Request, Response } from "express";
import mongoose from "mongoose";

import { getTrabajador } from "./resolver/trabajador/getTrabajor.ts";
import { deleteTrabajador } from "./resolver/trabajador/deleteTrabajador.ts";
import { getTrabajadores } from "./resolver/trabajador/getTrabajadores.ts";
import { postTrabajador } from "./resolver/trabajador/postTrabajador.ts";
import { contratarTrabajador } from "./resolver/trabajador/contratarTrabajador.ts";

import { getEmpresa } from "./resolver/empresa/getEmpresa.ts";
import { deleteEmpresa } from "./resolver/empresa/deleteEmpresa.ts";
import { getEmpresas } from "./resolver/empresa/getEmpresas.ts";
import { postEmpresa } from "./resolver/empresa/postEmpresa.ts";
import { despedirTrabajador } from "./resolver/empresa/despedirTrabajador.ts";

import { getTarea } from "./resolver/tarea/getTarea.ts";
import { deleteTarea } from "./resolver/tarea/deleteTarea.ts";
import { getTareas } from "./resolver/tarea/getTareas.ts";
import { postTarea } from "./resolver/tarea/postTarea.ts";
import { cambiarStatus } from "./resolver/tarea/putTarea.ts";

try{
  const MONGO_URL = Deno.env.get("MONGO_URL");
  if (!MONGO_URL) {
    console.log("No mongo URL found");
    Deno.exit(1);
  }

  await mongoose.connect(MONGO_URL);
  const app = express();
  app.use(express.json());
  app
    .get("/worker/:id", getTrabajador)
    .get("/business/:id", getEmpresa)
    .get("/task/:id", getTarea)

    .delete("/worker/:id", deleteTrabajador)
    .delete("/business/:id", deleteEmpresa)
    .delete("/task/:id", deleteTarea)

    .get("/worker", getTrabajadores)
    .get("/business/", getEmpresas)
    .get("/task", getTareas)

    .post("/worker", postTrabajador)
    .post("/business", postEmpresa)
    .post("task", postTarea)

    .put("/business/:id/fire/:workwerId", despedirTrabajador)
    .put("/business/:id/hire/:workwerId", contratarTrabajador)
    .put("/task/:id", cambiarStatus)

  app.listen(3000, () => {
    console.log("Server listening on port 3000")
  })
}catch(e){
  console.log(e);
}