// import { useAppSelector } from '../../../../../redux/store';
// import ItemBook from '../../../Catalog/ItemBook/ItemBook';
import StyledRecBooks from './RecommendBooks.styles';

const RecommendBooks: React.FC = () => {
  // const books = useAppSelector((store) => store.bookStore.books);
  return (
    <StyledRecBooks>
      <h2>Recommendations</h2>
      <div>
          {/* {books.map((el) => (
            <ItemBook
              price={el.price}
              cover={el.cover}
              author={el.author}
              rate={el.rate}
              title={el.title}
              key={el.id}
              id={el.id}
            />
          ))} */}
      </div>
    </StyledRecBooks>
  );
};

export default RecommendBooks;