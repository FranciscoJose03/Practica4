import mongoose from "mongoose";
import { Trabajador } from "../types.ts";
import { empresaModel } from "./dbEmpresa.ts";
import { tareaModel } from "./dbTarea.ts";

const Schema = mongoose.Schema;

const trabajadorSchema = new Schema(
    {
        name: {type: String, required: true},
        DNI: {type: String, required: true},
        email: {type: String, required: true},
        telefono: {type: String, required: true},
        empresaID: {type:Schema.Types.ObjectId, required: false, ref: "Empresa"},
        tareasID:[{type:Schema.Types.ObjectId, required: false, ref: "Tareas"}]
    }
)

trabajadorSchema
    .path("DNI")
    .validate((DNI: string) => {
        if(/^[0-9]{8}[A-Z]$/.test(DNI)){
            return DNI
        }else{
            throw new Error("El DNI esta mal configurado")
        }
    }) 

trabajadorSchema
    .path("email")
    .validate((email: string) => {
        if(/^[a-z]{1,64}@(?:[a-z0-9-]{1,63}\.){1,125}[a-z]{2,63}$/.test(email)){
            return email;
        }else{ 
            throw new Error("El email da error")
        }
    })

trabajadorSchema
    .path("telefono")
    .validate((telefono: number) => {
        const tel = telefono.toString();
        if(/^[0-9]{9}$/.test(tel)){
            return telefono
        }else{
            throw new Error("El telefono no esta bien")
        }
    })

trabajadorSchema
    .path("tareasID")
    .validate((tareasID: mongoose.Types.ObjectId[]) => {
        if(tareasID.length > 10){
            throw new Error("El trabajador tiene mas de 10 tareas")
        }else{
            return true 
        }
    })

trabajadorSchema
    .post("findOneAndDelete", async(trabajador: trabajadorModelType) => {
        await tareaModel.deleteMany({trabajadorID: trabajador._id})
    })

trabajadorSchema
    .post("findOneAndUpdate", async(trabajador: trabajadorModelType) => {
        const trabajadorAhora = await trabajadorModel.findById(trabajador._id)
        if(trabajadorAhora){
            if(!trabajadorAhora.empresaID){
                await empresaModel.findOneAndUpdate({id: trabajadorAhora.empresaID},
                                                    {$pull: {trabajadoresID: trabajadorAhora._id}},
                                                    {new: true})
            }
            await tareaModel.deleteMany({trabajadorID: trabajadorAhora._id})
        }
    })

export type trabajadorModelType = mongoose.Document & 
        Omit<Trabajador, "id" | "empresa" | "tarea"> & {
            empresaID: mongoose.Types.ObjectId;
            tareasID: mongoose.Types.ObjectId[];
        };

export const trabajadorModel = mongoose.model<trabajadorModelType>(
    "Trabajador",
    trabajadorSchema
)