import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import {paymentApiService} from '../apis/paymentApiService'

const payment = () => {

  const [amount, setAmount] = useState();

  const style = {
    "height": "30px",
    "width": "200px"
  }

  function handleChange(e: any) {
    setAmount(e.target.value)
  }

  async function handleClick() {

    const stripe = await loadStripe("pk_test_51POyklEtDQEOmYMQZp8RXlxyNljvPKgDaYFtz3ZKNuQvdg7amvDqIRRFfwRxZ4tFIZza8FhBwbaZPx1nFMlvJrFm00dgbztIMq")

    const response = await paymentApiService.post("/checkout", { amount })

    console.log(response); 

    const sessionId = response.data.id;

    const result: any = stripe?.redirectToCheckout({
      sessionId: sessionId
    })

    if (result.error) {
      console.log(result.error);
    }
  }

  return (
    <div>
      <h3>Stripe Payment Gatway</h3>
      <input style={style} type="text" name="" id="" value={amount} placeholder='Enter Amount' onChange={handleChange} /><br /><br />
      <button onClick={handleClick}>Pay</button>
    </div>)
}

export default payment