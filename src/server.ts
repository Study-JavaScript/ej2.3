// Cargar los módulos
import express from 'express';
import bodyParser from "body-parser"
//Importar archivos
import rutas from "./rutas";

const app = express();
const PORT = process.env.PORT || 4001;

// app.set('view engine', 'ejs');
// app.set("views", __dirname + "/views") 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));
app.use(rutas);



app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: http://localhost:${PORT}`);
});

