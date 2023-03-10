import { Link } from 'react-router-dom';
import { useAppSelector } from 'src/redux/store';

import Button from 'src/ui/components/Button';

import { navigationRoutes } from 'src/utils/constants';

import like from 'src/ui/assets/images/icon/Heart.svg';
import cart from 'src/ui/assets/images/icon/Cart.svg';
import profile from 'src/ui/assets/images/icon/UserIcon.svg';

const AuthUserLinks: React.FC = () => {
  const booksCount = useAppSelector((store) => store.bookStore.cart.length);

  return (
    <div className="round-buttons">
      <Link to={navigationRoutes.cart}>
        <Button className="round-button round-button__count">
          {booksCount !== 0 ? (
            <span className="books-counter">{booksCount}</span>
          ) : (
            ''
          )}
          <img className="round-button__img" src={cart} alt="Cart" />
        </Button>
      </Link>

      <Link to={navigationRoutes.favorite}>
        <Button className="round-button round-button__count">
          <img className="round-button__img" src={like} alt="Heart" />
        </Button>
      </Link>

      <Link to={navigationRoutes.profile}>
        <Button className="round-button">
          <img className="round-button__img" src={profile} alt="Profile" />
        </Button>
      </Link>
    </div>
  );
};

export default AuthUserLinks;
