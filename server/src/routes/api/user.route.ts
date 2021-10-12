import { Router, Response, Request } from "express";
import bcrypt from "bcryptjs"
import User from "../../models/User"
import { check, validationResult } from 'express-validator/check';
import jwt from 'jsonwebtoken'
import config from "config"

const router: Router = Router();

// @route   POST api/user
// @desc    Register user given their email and password, returns the token upon successful registration
// @access  Public
router.post(
  "/register",
  [
    check("email", "Unvalid email").isEmail(),
    check("password", "Unvalid password").isLength({min:6})
  ],
  async (req: Request, res: Response) => {
    console.log('body', req.body);
    
    try {
      const errors = validationResult(req)
      const {email, password} = req.body;
      if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array(), message:"Unvalid values"});
      }
      const candidate = await User.findOne({email})
      if(candidate){
        return res.status(400).json({message: "User exists already"})
      }
      const hashedPassword = await bcrypt.hash(password, 12)
      const user = new User({email, password: hashedPassword})

      await user.save()
      res.status(201).json({message: "User created "})
      
    } catch (e) {
      res.status(500).json({message: "Something went wrong!"})
    }
  }
);
router.post(
  "/login",
  [
    check('email', 'Enter Email').isEmail(), 
    check('password', 'Enter Password').exists(),
  ]
  ,
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req)
      if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array(), message:"Unvalid values"});
      }
     
    const {email, password} = req.body
    const user = await User.findOne({email})
    if(!user){
      return res.status(400).json({message:"No registration found"})
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
      return res.status(400).json({message:"Invalid password"})
    }

    const token = jwt.sign(
      { userId: user.id},
      config.get("jwtSecret")
      )
    res.json({token, userId: user.id})

    } catch (e) {
      res.status(500).json({message: "Something went wrong!"})
    }
  }
);

export default router;