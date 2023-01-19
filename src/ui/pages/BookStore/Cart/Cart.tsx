import Lottie from 'lottie-react';

import options from 'utils/lottieOptions';
import develop from 'ui/assets/lottieFiles/web-address-registration.json';

import StyledCart from './Cart.styles';

const Cart: React.FC = () => {
  return (
    <StyledCart>
      <div className="cart_container">
      <Lottie style={options.loadingStyles} animationData={develop} />
      </div>
    </StyledCart>
  );
};

export default Cart;
