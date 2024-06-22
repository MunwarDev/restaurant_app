import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Payment() {
    const navigate = useNavigate();
    const location = useLocation();
    const totalPrice = location.state?.totalPrice;
    const [selectedOption, setSelectedOption] = useState(''); // State to track selected option
    const [pay, setPay] = useState(false);
    const [cardNumber, setCardNumber] = useState('');
    const [validity, setValidity] = useState('');
    const [cvv, setCvv] = useState('');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleProceed = () => {
        if (selectedOption === 'debit-card') {
            // Navigate to the debit card payment page
            setPay(true);
        } else if (selectedOption === 'cash-on-delivery') {
            // Simulate placing the order successfully
            alert('Order placed successfully!');
            navigate('/main');
        } else {
            // Handle case where no option is selected
            alert('Please select a payment method.');
        }
        setSelectedOption('');
    };

    const handlePayment = (event) => {
        event.preventDefault();
        const numberRegex = /^\d+$/;

        if (!numberRegex.test(cardNumber) || cardNumber.length !== 16) {
            alert('Card number must be 16 digits.');
            return;
        }
        if (!numberRegex.test(validity) || validity.length !== 4) {
            alert('Validity must be 4 digits (MMYY).');
            return;
        }
        if (!numberRegex.test(cvv) || cvv.length !== 3) {
            alert('CVV must be 3 digits.');
            return;
        }

        alert('Payment successful!');
        setCardNumber('');
        setValidity('');
        setCvv('');
    };

    return (
        <center id='pay'>
            <h1>RazorPay</h1><br />
            {!pay ? (
                <div>
                    
                    <input
                        type="radio"
                        id="cash-on-delivery"
                        name="paymentMethod"
                        value="cash-on-delivery"
                        checked={selectedOption === 'cash-on-delivery'}
                        onChange={handleOptionChange}
                    />
                    <label className='label' htmlFor="cash-on-delivery">Cash on delivery</label><br /><br />

                    <input
                        type="radio"
                        id="debit-card"
                        name="paymentMethod"
                        value="debit-card"
                        checked={selectedOption === 'debit-card'}
                        onChange={handleOptionChange}
                    />
                    <label className='label' htmlFor="debit-card">Debit Card</label><br /><br />

                    <h3> ₹{totalPrice}</h3><br />
                    <button id='button_card' onClick={handleProceed}>Proceed</button>
                </div>
            ) : (
                <div>
                    <form onSubmit={handlePayment}>
                    <input id='cardNumber'
                    required
                        type="text"
                        placeholder='Enter card number'
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                    /><br /><br />
                    <input id='validity'
                    required
                        type="text"
                        placeholder='Enter validity'
                        value={validity}
                        onChange={(e) => setValidity(e.target.value)}
                    />&nbsp;&nbsp;&nbsp;&nbsp;
                    <input id='cvv'
                    required
                        type="text"
                        placeholder='CVV'
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                    /><br /><br />
                    <h2>₹ {totalPrice}</h2>
                    <button id='button_pay' type='submit'>Pay</button>
                    </form>
                </div>
            )}
        </center>
    );
}

export default Payment;
