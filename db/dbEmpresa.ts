import mongoose from "mongoose"
import { Empresa } from "../types.ts"
import { trabajadorModel } from "./dbTrabajador.ts";
import { tareaModel } from "./dbTarea.ts";

const Schema = mongoose.Schema;

const empresaSchema = new Schema(
    {
        name:{type: String, required: true},
        trabajadoresID:[{type:Schema.Types.ObjectId, required: false, default: null, ref: "Trabajador"}],
    },
    {timestamps: false}
);

empresaSchema
    .path("trabajadoresID")
    .validate((trabajadores: mongoose.Schema.Types.ObjectId[]) => {
        if(trabajadores){
            if(trabajadores.length > 10){
                throw new Error("La empresa no admite más trabajadores")
            }
        }
        return true
    })

empresaSchema
    .post("findOneAndUpdate", async(empresa: empresaModelType) => {
        const empr = await empresaModel.findById(empresa.id)
        if(empr){
            if(empr.trabajadoresID){
                if(empr.trabajadoresID?.length < 10){
                    await trabajadorModel.updateMany({id:{$in: empr.trabajadoresID}}, {$set: {empresaID: empr._id}})
                }
            }
        }
    })

empresaSchema
    .post("findOneAndDelete", async(empresa: empresaModelType) => {
        if(empresa){
            if(empresa.trabajadoresID){
                try{
                    await trabajadorModel.updateMany({id:{$in: empresa.trabajadoresID}}, {$set:{empresaID: null}}, {$pull:{tareas:{$exists:true}}})
                    await tareaModel.deleteMany({empresa: empresa._id})
                }catch(error){
                    throw new Error(error)
                }
            }
        }
    })

export type empresaModelType = mongoose.Document & 
    Omit<Empresa,"id" | "trabajadores"> & {
        trabajadoresID: mongoose.Types.ObjectId[] | null;
    }; 

export const empresaModel = mongoose.model<empresaModelType>(
    "Empresa",
    empresaSchema
)