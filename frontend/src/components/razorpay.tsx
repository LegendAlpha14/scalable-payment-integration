
declare global {
  interface Window {
    Razorpay: any;
  }
}

import { useState } from 'react'
import {paymentApiService} from '../apis/paymentApiService'

const razorpay = () => {
  const [amount, setAmount] = useState();

  const style = {
    "height": "30px",
    "width": "200px"
  }

  function handleChange(e: any) {
    setAmount(e.target.value)
  }

  async function handleClick() {
    const response = await paymentApiService.post("/checkout", { amount: amount })

    const order = response.data.order;

    var options = {
      key: import.meta.env.VITE_RAZORPAY_API_KEY, // Enter the Key ID generated from the Dashboard
      amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Zerotime Solutions",
      description: "Test Transaction",
      image: "/home/admin5/Documents/R & D/Razorpay/frontend/public/black-logo-zerotime.svg",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response: any) {

        alert(response.razorpay_payment_id);
        alert(response.razorpay_payment_id);
        alert(response.razorpay_signature)

        const verifyPayment: any = await paymentApiService.post("/verify", {
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          order_id: order.id
        })

        if (verifyPayment && verifyPayment?.data.sucess) {
          alert("Payment verify sucessfully");
        } else {
          alert("Payment Failed");

        }
      },
      prefill: {
        name: "Jay Dabhi",
        email: "jaydabhi12@gmail.com",
        contact: "9824907350"
      },
      notes: {
        address: "Razorpay Corporate Office"
      },
      theme: {
        color: "#3399cc"
      }
    };
    const rzp1 = new window.Razorpay(options);

    rzp1.on('payment.failed', function (response: any) {

      alert("payment Failed")
      alert(response.error.code);
      // alert(response.error.description);
      // alert(response.error.source);
      // alert(response.error.step);
      // alert(response.error.reason);
      // alert(response.error.metadata.order_id);
      // alert(response.error.metadata.payment_id);
    });
    rzp1.open();

  }
  return (

    <div>
      <h3>Razorpay Payment Gatway</h3>
      <input style={style} type="text" name="" id="" value={amount} placeholder='Enter Amount' onChange={handleChange} /><br /><br />
      <button onClick={handleClick}>Pay</button>
    </div>)
}

export default razorpay