import { checkout as stripeCheckout } from "../utils/stripe";
import { checkout as razorCheckout, verifyPayment as razorVerify } from "../utils/razorpay";

const paymentEnvironment = process.env.PAYMENT_ENVIRONEMNT

let checkout: any;

let verifyPayment: any = function (req: any, res: any) {
    res.json({ message: "invelid Payment Environment" })
};

switch (paymentEnvironment) {
    case 'razorpay':
        checkout = razorCheckout;
        verifyPayment = razorVerify;
        break;
    case 'stripe':
        checkout = stripeCheckout;
        break;
    default:
        throw new Error('Invalid payment environment');
}

export { checkout, verifyPayment };