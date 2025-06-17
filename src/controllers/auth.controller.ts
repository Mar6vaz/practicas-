import { Request, Response } from "express";
import { generateAccessToken } from "../utils/generateToken";
import { cache } from "../utils/cache";
import { time } from "console";
import dayjs from 'dayjs'
import { User } from "../models/User";
import bcrypt from "bcryptjs";
export const login = (req:Request, res:Response) => {
    //name:string asigno tipo de dato 
    //name="mariela" asigno valor
let name:string = "Mariela";

const {username, password}=req.body;

//credenciales correctas 
if (username !=='Admin' || password !='123456789'){
    return res.status(401)
    .json({message: "credenciales incorrectas"})
}
const userId='abc123';
const accesToken = generateAccessToken(userId);

cache.set(userId, accesToken, 60 * 15);

return res.json({
    message: 'Login',
    accesToken
})


}


export const getTime = (req:Request, res:Response) =>{
    const {userId} = req.params;
    const ttl = cache.getTtl(userId);

    if(!ttl){
        return res.status(404)
         .json({message: "Token no encontrado"})
    }

    const now=Date.now();
    const timeToLifeSeconds=Math.floor((ttl - now) / 1000)
    const expTime = dayjs(ttl).format('HH:mm:ss');

    return res.json({
        timeToLifeSeconds,
        expTime
    });

};
export const updateTime = (req: Request, res: Response) => {
    const {userId} = req.body ;
    const ttl = cache.getTtl (userId);
    if (!ttl){
        return res.status (404) 
        .json({message: 'Token no encontrado o expirado'});
    }
    const nuevaTTLsegundos = 60 * 10;
    cache.ttl(userId, nuevaTTLsegundos); // metodo pra actualizar el token 

    res.json("Actualizado con exito");
};

export const getAllUsers = async (req:Request, res:Response) =>{
    const userList = await User.find(); //BUSCAR TODOS LOS REGISTROS 

    return res.json({userList});
}

export const getUserByUsername = async (req: Request, res: Response) => {
    const { username } = req.params;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        return res.json({ user });
    } catch (error) {
        return res.status(500).json({ message: 'Error al buscar el usuario', error });
    }
};

export const createUser = async (req:Request,res:Response) => {
    try{
        const{username, password, email,role}=req.body
        const newUser=new User({
            username,
            password,
            role,
            email,
            status: true
        })

        const user=await newUser.save();
        return res.json ({ user });

    }catch(error){
        console.log("Error ocurrido en createUser: ", error);
        return res.status(426).json({error})
    }
};



export const encryptPassword = async (req: Request, res: Response) => {
    try {
        const { username } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Validar si ya está cifrada
        if (user.password.startsWith('$2a$')) {
            return res.status(400).json({ message: "La contraseña ya está cifrada" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;

        await user.save();

        return res.json({ message: "Contraseña cifrada correctamente", user });

    } catch (error) {
        console.log("Error en encryptPassword: ", error);
        return res.status(500).json({ message: "Error al cifrar contraseña", error });
    }
    
};






