import express  from "express";
import morgan from 'morgan';
import authRoute from './routes/auth.routes';
import { connect } from "http2";
import connectBDMongo from "./config/db";
import orderRoutes from './routes/order.routes';
import userRoutes from './routes/user.routes';
import productRoute from "./routes/product.routes";



//inicializar el servidor de express
const app = express ();

//asignar el numero de puerto
const PORT = 3000;

app.use(express.json()); //.Todo lo que resiva es de tipo json
app.use(morgan('dev')); //Mostrar logs de las peticiones 

app.use('/api/v1/auth', authRoute); //ruta principal 
app.use("/api/v1/orders", orderRoutes);
app.use('/api/v1/users', userRoutes);
app.use("/api/v1/products", productRoute); 


connectBDMongo().then (() => {

    app.listen(PORT, ()=>{
        console.log(`El servidor funciona en el puerto:, ${PORT}`);
        console.log("El servidor esta funcionando:", PORT);
    });
           
});
