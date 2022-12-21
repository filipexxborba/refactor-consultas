import express, { Request, Response } from "express";
import oracledb from "oracledb";
import database from "../database";
import { getProductsInfoByBarCode } from "../querries/products";
import logger from "../services/logger";

const router = express.Router();

// Rota que vai retornar as informações do produto pelo código de barra
router.post("/:codigobarra&:filial", (req: Request, res: Response) => {
   const { codigobarra, filial } = req.params;
   oracledb.getConnection(database, (error: Error, connection) => {
      if (error) {
         console.error(error.message);
         res.status(500).send("Falha na conexão com o banco de dados");
      } else {
         connection.execute(
            getProductsInfoByBarCode(codigobarra, filial),
            (error: Error, result) => {
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
      }
   });
});

export default router;
