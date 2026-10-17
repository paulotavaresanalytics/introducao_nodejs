const mongoose = require("mongoose");
const connectDB = async () => {
        try {
          await mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/exemplo_nosql");
          console.log("Conectado ao MongoDB com sucesso!");
        } catch (error) {
          console.error("Erro ao conectar ao MongoDB:", error);
          process.exit(1); // Finaliza a aplicação em caso de falha na conexão
        }
};
module.exports = connectDB;