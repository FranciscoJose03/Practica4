import { Request, Response } from "express";
import { empresaModel, empresaModelType } from "../../db/dbEmpresa.ts";

export const getEmpresas = async (_req: Request, res: Response<empresaModelType[] | {error: unknown}>) => {
    try{
        const empresas = await empresaModel.find()
        res.status(200).send(empresas);
    }catch(error){
        res.status(500).send(error)
    }
}