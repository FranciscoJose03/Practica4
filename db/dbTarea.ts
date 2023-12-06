import mongoose from "mongoose"
import { Tarea, Estados } from "../types.ts"
import { empresaModelType } from "./dbEmpresa.ts";
import { trabajadorModel } from "./dbTrabajador.ts";

const Schema = mongoose.Schema;

const tareaSchema = new Schema(
    {
        nombre: {type: String, required: true},
        estado: {type: String, required: true, enum: Object.values(Estados)},
        duracion: {type: Number, required: true},
        empresaID: {type:Schema.Types.ObjectId, required: true, ref: "Empresa"},
        trabajadorID: {type:Schema.Types.ObjectId, required: true, ref: "Trabajador"}
    },
    {timestamps: false}
);

tareaSchema
    .path("estado")
    .validate((estado: Estados) => {
        if(estado === Estados.Closed){
            throw new Error("No puedes crear una tarea Cerrada")
        }else{
            return Object.values(Estados).includes(estado)
        }
    })

tareaSchema
    .path("empresaID")
    .validate(async function(empresa: empresaModelType){
        const trab = await trabajadorModel.findById(this.trabajadorID)
        if(trab){
            if(trab.empresaID){
                if(empresa.id.toString() == trab.empresaID.toString()){
                    return true;
                }else{
                    throw new Error("El trabaajador no concuerda con la empresa")
                }
            }
        }
    })

tareaSchema
    .post("save", async(tarea: tareaModelType) => {
        await trabajadorModel.findByIdAndUpdate(tarea.trabajadorID,
                                                {$push: {tareas: tarea._id}})
    })

tareaSchema
    .post("findOneAndDelete", async(tarea: tareaModelType) => {
        await trabajadorModel.updateMany({tareas: tarea.id}, {$pull: {tareas: tarea.id}})
    })

export type tareaModelType = mongoose.Document & 
    Omit<Tarea, "id" | "trabajador" | "empresa"> & {
        empresaID: mongoose.Schema.Types.ObjectId;
        trabajadorID: mongoose.Schema.Types.ObjectId;
    }

export const tareaModel = mongoose.model<tareaModelType>(
    "Tarea",
    tareaSchema
);