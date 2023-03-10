import styled from 'styled-components';

export default styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;

  .books-catalog__items {
    display: flex;
    gap: 60px 20px;
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  .title-catalog {
    font-size: ${(props) => props.theme.font.size.xxl};
    line-height: ${(props) => props.theme.font.lineHeight.xxl};
    color: ${(props) => props.theme.color.text.dark};
    margin: 0;
  }

  .books-catalog {
    margin-bottom: 83px;
    display: flex;
    width: calc((100% - (20 * 3)) / 4);
  }

  @media (max-width: 834px) {
    .books-catalog__items {
      gap: 30px 20px;
    }
    .books-catalog {
      margin-bottom: 64px;
    }
  }

  @media (max-width: 834px) {
    .books-catalog {
      margin-bottom: 45px;
    }
  }
`;
