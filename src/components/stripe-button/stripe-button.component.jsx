import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForstripe = price * 100;
    const publishableKey = 'pk_test_r6XGxce5c4JV4JCClk5hTDdn00yKFuJoxX';

    const onToken = token => {
        console.log(token);
        alert('Payment Successful');
        
    }

    return (
        <StripeCheckout 
          label='Pay Now'
          name='E-Commerce' 
          billingAddress
          shippingAddress
          image='https://svgshare.com/i/CUz.svg'
          description={`Your total is $${price}`}
          amount={priceForstripe}
          panelLabel='Pay Now'
          token={onToken}
          stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton;