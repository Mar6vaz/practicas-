import mongoose from 'mongoose'
const connectBDMongo = async ():Promise<void> =>{
    const mongoUrl="mongodb://localhost:27017/proyecto";
    //mongodb://<servidor>:<puesto>/<db>
    //mongo://localhost:27017/proyecto
    // mongodb://<user>:<pas>@<servidor>:<puesto>/<db>?authSource=admin

    try{
        await mongoose.connect(mongoUrl);
        console.log("Conexion a mongo");
    }catch (error){
        console.log("Error conexion a mongo: ", error);
    }

  
};
export default connectBDMongo;