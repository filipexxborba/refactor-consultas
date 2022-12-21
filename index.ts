import express, { Application, Request, Response } from "express";
import cors from "cors";
import fs from "fs";

const App: Application = express();
const port = 9999;

// Routes imports
import CodProdRoute from "./routes/produto";
import BarCodeRoute from "./routes/codigoBarra";
import PromoRoute from "./routes/promocao";
import StockRoute from "./routes/estoque";
import BuyRoute from "./routes/compras";
import EmailRoute from "./routes/email";

// Middlewares configurations
App.use(express.json());
App.use(cors());

// Routes initialization
App.use("/api/produto", CodProdRoute);
App.use("/api/codbarra", BarCodeRoute);
App.use("/api/promocao", PromoRoute);
App.use("/api/estoque", StockRoute);
App.use("/api/compras", BuyRoute);
App.use("/api/email", EmailRoute);

// Rota de teste de funcionamento
App.get("/", (_: Request, res: Response) => {
   res.status(200).send({ message: "Está tudo funcionando normalmente!" });
});

// Rota que vai retornar os logs
App.get("/api/logs", (_: Request, res: Response) => {
   const currentData = fs.readFileSync("./date.json", "utf-8");
   res.status(200).send(JSON.parse(currentData));
});

App.listen(port, () => {
   console.log(
      `API funcionando e rodando no endereço: http://localhost:${port}`
   );
});
