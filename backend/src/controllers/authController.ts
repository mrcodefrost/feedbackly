import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Owner from "../models/owner";

const register = async (req: Request, res: Response) => {
    try{
        const {name, email, password} = req.body;


        // Check if the owner already exists
        const existingOwner = await Owner.findOne({email});
        if(existingOwner){
            return res.status(400).json({ message : "Owner already exists"});
        }


        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new owner
        const newOwner = new Owner({
            name,
            email, 
            password: hashedPassword
        });
        await newOwner.save();

        // Generate a JWT 
        const token = jwt.sign({id: newOwner._id}, process.env.JWT_SECRET || "", {
            expiresIn: "1h",
        });

     res.status(201).json({message: "Owner registered successfully", token: token});
     return; // return void - issue with v5 types/express
    } catch (error) {
     res.status(500).json({message: "Server error", error});
     return;

    }
};


export {register};