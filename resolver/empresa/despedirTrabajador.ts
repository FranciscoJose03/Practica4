import { Request, Response} from "express";
import { empresaModel } from "../../db/dbEmpresa.ts";
import { trabajadorModel } from "../../db/dbTrabajador.ts";

export const despedirTrabajador = async(req: Request, res: Response) => {
    try{
        const id = req.params.id
        const workwerId = req.params.workwerId
    
        const empresa = await empresaModel.findById(id).exec()

        if(!empresa){
            throw new Error("Empresa not found")
        }

        const trabajador = await trabajadorModel.findById(workwerId).exec()
        if(!trabajador){
            throw new Error("Trabajador not found")
        }

        if(trabajador.empresaID === null){
            throw new Error("Trabajador no tiene empresa")
        }

        await trabajadorModel.findByIdAndUpdate({_id: workwerId},
                                                {$set: {empresaID: null}},
                                                {new: true})

        res.status(200).send("Se ha despedido al cliente de la empresa")
    }catch(error){
        res.status(500).send(error)
    }
}