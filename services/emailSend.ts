import nodemailer from "nodemailer";
require("dotenv").config();

export const emailSend = async (
   destino: string,
   htmlTemplate: string,
   filial: string
) => {
   let transporter = nodemailer.createTransport({
      host: "email-ssl.com.br",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
         user: process.env.EMAIL_ADDRESS,
         pass: process.env.EMAIL_PASSWORD,
      },
   });

   let info = await transporter.sendMail({
      from: '"Consulta Preço | PHC" <etiquetas@panoramahomecenter.com.br>',
      to: `${destino}`,
      subject: "Lista de etiquetas para impressões",
      html: `${htmlTemplate}`,
      attachments: [
         {
            filename: "Lista-de-Etiquetas.txt",
            path: `./etiquetas/listaEtiquetas${filial}.txt`,
         },
      ],
   });
   return info;
};
