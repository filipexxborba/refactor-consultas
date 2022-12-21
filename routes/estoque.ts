import express, { Request, Response } from "express";
import oracledb from "oracledb";
import database from "../database";
import { getStockProductById } from "../querries/products";
const router = express.Router();

// Rota que vai retornar as informações de estoque de um produto
router.post("/:produto", (req: Request, res: Response) => {
   const { produto } = req.params;
   oracledb.getConnection(database, (error: Error, connection) => {
      if (error) {
         console.error(error.message);
         res.status(500).send("Falha na conexão com o banco de dados");
      } else {
         connection.execute(
            getStockProductById(produto),
            (error: Error, result) => {
               if (error) {
                  res.status(404).send({
                     message:
                        "Houve um erro nesse Select, por favor, reveja todas as informações.",
                  });
               } else {
                  console.log(result.rows);
                  res.status(200).send(JSON.stringify(result.rows));
               }
            }
         );
      }
   });
});

export default router;
