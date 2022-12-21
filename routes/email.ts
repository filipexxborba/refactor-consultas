import express, { Request, Response } from "express";
import { labelListHTMLGenerator } from "../services/htmlGenerator";
import fs from "fs";
import { emailSend } from "../services/emailSend";
import logger from "../services/logger";

const router = express.Router();

// Rota que vai enviar o email
router.post("/", async (req: Request, res: Response) => {
   const { emailDestino, listaEtiquetas, filial } = req.body;

   const emailHtmlTemplate = labelListHTMLGenerator(listaEtiquetas);

   let newLine = "";
   listaEtiquetas.forEach((item: any) => {
      newLine += `${item.codigo}\n`;
   });

   fs.writeFileSync(`listaEtiquetas${filial}.txt`, newLine);

   try {
      const info = await emailSend(emailDestino, emailHtmlTemplate, filial);
      console.log("Message sent: %s", info.messageId);
      res.status(200).send({ message: "Email enviado com sucesso!" });
   } catch (error: any) {
      res.status(400).send({ message: error.message });
   }

   logger(filial, new Date());
});

export default router;
