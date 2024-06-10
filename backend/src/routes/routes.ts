import { Router } from "express";
import { checkout, verifyPayment } from "../controller/gatwayController";

const router = Router();

router.get('/',function(req,res){

    res.send("Working");
    
})

router.post(`/checkout`, checkout)
router.post(`/verify`,verifyPayment)

export default router;