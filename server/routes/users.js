import express from 'express'
import {signup,login} from '../controllers/auth.js'

const router = express.Router();

router.post('/signup',(req, res)=>{
    console.log(req.body);
    // console.log("asdas");
})
router.post('/login',()=>{})
 
export default router