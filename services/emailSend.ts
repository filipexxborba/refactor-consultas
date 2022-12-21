import nodemailer from "nodemailer";

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
         user: "etiquetas@panoramahomecenter.com.br",
         pass: "Panorama@@2021",
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
