export const labelListHTMLGenerator = (labelList: any) => {
   let htmlTemplate = `<body style=" display: flex; align-items: center; justify-content: center; font-family: Arial, Helvetica, sans-serif; padding: 0; margin: 0; box-sizing: border-box; ">
    <div class="container" style="max-width: 600px; margin: 0 auto">
      <div id="first" style=" box-sizing: border-box; background: #fff; border-radius: 4px; padding: 16px;" >
        <h2 style=" padding: 0; margin: 0; box-sizing: border-box; color: #ff8500; margin-bottom: 16px;" >Lista de etiquetas para impressão</h2>
        <ul style=" margin: 0; padding: 16px 0; box-sizing: border-box; list-style: none; display: flex; flex-direction: column; gap: 16px;">`;
   labelList.forEach((label: any) => {
      htmlTemplate += `<li style=" border-radius: 4px; background: #f2f2f2; color: rgba(0, 0, 0, 0.8); margin: 0; padding: 16px; box-sizing: border-box;">
                          <span style="font-weight: bold">${label.codigo}</span> - ${label.nome} | ${label.valor} </li>`;
   });
   htmlTemplate += `</ul>
             </div>
         <p style="text-align: center; padding: 0px 4px; font-size: 12px">Esse e-mail foi enviado automaticamente pelo software de Consulta Preço.A visualização está com algum erro? Entre em contato com o T.I.</p>
     </div>
 </body>`;

   return htmlTemplate;
};
