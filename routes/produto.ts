import express, { Request, Response } from "express";
import oracledb from "oracledb";
import database from "../database";
import logger from "../services/logger";
import { getProductsInfoByProductID } from "../querries/products";

const router = express.Router();

// Rota que vai retornar as informações do produto pelo código
router.post("/:produto&:filial", (req: Request, res: Response) => {
   const { produto, filial } = req.params;
   oracledb.getConnection(database, (error: Error, connection) => {
      if (error) {
         console.error(error.message);
         res.status(500).send("Falha na conexão com o banco de dados");
      } else
         connection.execute(
            getProductsInfoByProductID(produto, filial),
            (error: Error, result: any) => {
               if (error) {
                  console.error(error.message);
                  res.status(404).send({
                     message:
                        "Houve um erro nesse Select, por favor, reveja todas as informações.",
                  });
               } else {
                  logger(filial, new Date());
                  res.status(200).send(JSON.stringify(result.rows));
               }
            }
         );
   });
});

export default router;
