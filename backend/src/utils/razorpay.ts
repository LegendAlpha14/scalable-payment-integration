
import { Request, Response } from "express-serve-static-core";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import { instance } from "../app"
import { config } from 'dotenv';

config()

export const checkout = async (req: Request, res: Response) => {
    try {
        let amount = req.body.amount;
        amount = amount * 100;

        var options = {
            amount: amount,  // amount in the smallest currency unit
            currency: "INR",
        };

        const order = await instance.orders.create(options);

        res.json({
            order,
            error: false
        })
    } catch (error) {

        res.json({
            order: undefined,
            error: true
        })
    }
}

export const verifyPayment = async (req: Request, res: Response) => {

    try {
        const secret: string = process.env.RAZORPAY_API_SECRET as string
        const signature = validatePaymentVerification({ "order_id": req.body.order_id, "payment_id": req.body.razorpay_payment_id }, req.body.razorpay_signature, secret);

        if (signature) {
            res.json({
                sucess: true,
                error: false,
                message: "varify Sucessfully"
            })
        } else {
            res.json({
                sucess: true,
                error: false,
                message: "Failed to verify"
            })
        }

    } catch (error) {

        res.json({
            sucess: false,
            error: true
        })
    }
}