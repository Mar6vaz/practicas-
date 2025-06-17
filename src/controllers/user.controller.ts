import { Request, Response } from 'express';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';

// Crear usuario
export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, password, role, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      role,
      email
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear el usuario', error: err });
  }
};

// Obtener todos los usuarios activos
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find({ status: true });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
};

// Actualizar usuario
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { username, email, role } = req.body;

    const updated = await User.findByIdAndUpdate(
      id,
      { username, email, role, updateDate: new Date() },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar usuario' });
  }
};

// Eliminar usuario (cambiar status)
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleted = await User.findByIdAndUpdate(
      id,
      { status: false, deleteDate: new Date() },
      { new: true }
    );

    res.json(deleted);
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar usuario' });
  }
};
