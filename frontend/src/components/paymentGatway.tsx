import razorpay from "./razorpay";
import payment from "./payment";


const componentMap: any = {
    "razorpay": razorpay,
    "stripe": payment,
};

const PaymentGatway = () => {

    const ComponentSelector = componentMap[import.meta.env.VITE_ENVIRONMENT];

    return (
        <div>
            <ComponentSelector />
        </div>
    )
}

export default PaymentGatway