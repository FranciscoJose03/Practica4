import { Request, Response} from "express";
import { empresaModel } from "../../db/dbEmpresa.ts";
import { trabajadorModel } from "../../db/dbTrabajador.ts";

export const contratarTrabajador = async(req: Request, res: Response) => {
    const id = req.params.id
    const workwerId = req.params.workwerId
    try{
        const empresa = await empresaModel.findById(id)
        if(!empresa){
            throw new Error("Empresa not found")
        }

        const trabajador = await trabajadorModel.findById(workwerId)
        if(!trabajador){
            throw new Error("Trabajador not found")
        }

        if(trabajador.empresaID != null){
            throw new Error("Trabajador ya esta contratado")
        }

        await empresaModel.findByIdAndUpdate({id},
                                            {$push: {trabajadoresID: workwerId}},
                                            {new: true})
        
        res.status(200).send(empresa)                                            

    }catch(error){
        res.status(500).send(error)
    }
}