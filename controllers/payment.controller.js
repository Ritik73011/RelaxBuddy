// This is your test secret API key.
require('dotenv').config();
const stripe = require('stripe')(process.env.KEYPPP);
const express = require('express');
const router = express.Router();

const YOUR_DOMAIN = 'http://localhost:3001';

router.post('/create-checkout-session', async (req, res) => {

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price_data: {
            currency:"inr",
            product_data:{
                name:"RelaxBuddy Membership",
            },
            unit_amount:500,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/trending?success=true`,
    cancel_url: `${YOUR_DOMAIN}/trending?canceled=true`,
  
  });
  return res.send({
    url:session.url
  });
});
module.exports = router;
