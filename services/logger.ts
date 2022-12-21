import fs from "fs";

const logger = (filial: string, date: Date) => {
   const currentData = JSON.parse(
      fs.readFileSync("./date.json", {
         flag: "r",
         encoding: "utf8",
      })
   );
   currentData[filial][1] = new Date(date);
   fs.writeFile("./date.json", JSON.stringify(currentData), (err) => {
      if (err) throw new Error(`${err.message}`);
      console.log(`Arquivo de logs foi salvo com sucesso!`);
   });
};

export default logger;
