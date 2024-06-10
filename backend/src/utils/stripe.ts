
import { Request, Response } from "express-serve-static-core";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import { instance } from "../app"
import { config } from 'dotenv';
import Stripe from "stripe";

config()

const keySecret = process.env.STRIPE_SECRET_KEY as string
const stripe = new Stripe(keySecret)

export const checkout = async (req: Request, res: Response) => {
    try {
        const product = await stripe.products.create({
            name: 'Jay Dabhi',
            description: 'Test Payment',
        });

        const price = await stripe.prices.create({
            unit_amount: req.body.amount * 100,
            currency: 'inr', // Specify currency as INR
            product: product.id,
        });

        const session: any = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: price.id,
                    quantity: 1
                },
            ],
            mode: 'payment',
            success_url: 'http://localhost:5173/sucess',
            cancel_url: 'http://localhost:5173/cancel',

        });

        res.json({
            error: false,
            sucess: true,
            id: session.id
        })
    } catch (error) {
        console.log(error);
        res.json({
            order: undefined,
            error: true
        })
    }
}

// export const checkout = async (req: Request, res: Response) => {
//     try {
//         let amount = req.body.amount;
//         amount = amount * 100;

//         var options = {
//             amount: amount,  // amount in the smallest currency unit
//             currency: "INR",
//         };

//         const order = await instance.orders.create(options);

//         res.json({
//             order,
//             error: false
//         })
//     } catch (error) {

//         res.json({
//             order: undefined,
//             error: true
//         })
//     }
// }

// export const verifyPayment = async (req: Request, res: Response) => {

//     try {
//         const secret: string = process.env.RAZORPAY_API_SECRET as string
//         const signature = validatePaymentVerification({ "order_id": req.body.order_id, "payment_id": req.body.razorpay_payment_id }, req.body.razorpay_signature, secret);

//         if (signature) {
//             res.json({
//                 sucess: true,
//                 error: false,
//                 message: "varify Sucessfully"
//             })
//         } else {
//             res.json({
//                 sucess: true,
//                 error: false,
//                 message: "Failed to verify"
//             })
//         }

//     } catch (error) {

//         res.json({
//             sucess: false,
//             error: true
//         })
//     }
// }