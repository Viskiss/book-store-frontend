import { useState } from 'react';

interface IProps {
  bookId: number;
  price: string;
  cover: string;
  title: string;
  author: string;
}

const ItemCart: React.FC<IProps> = ({ price, cover, title, author }) => {
  const [counter, setcounter] = useState(false);

  return (
    <div className="item-cart--box">
      <div>
        <img className="item-cart--box-cover" src={cover} alt="" />
      </div>
      <div>
        <h1 className="item-cart--box-title">{title}</h1>
        <p className="item-cart--box-author">{author}</p>
        <div>
          <div>
            <button className="item-cart--box-button">+</button>
            {counter}
            <button className="item-cart--box-button">-</button>
          </div>
          <img className="item-cart--box-trash" src="" alt="" />
        </div>
        <p className="item-cart--box-price">{price}</p>
      </div>
    </div>
  );
};

export default ItemCart;
