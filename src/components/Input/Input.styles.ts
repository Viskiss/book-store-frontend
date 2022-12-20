import styled from 'styled-components';

export default styled.section`
  position: relative;
  padding-right: 54px;

  .search-input {
    padding: 20px 34px 20px 64px;
    background: #f0f4ef;
    border-radius: 16px;
    border: none;
    font-family: "Poppins";
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
  }

  .search-input::placeholder {
    color: #b9bac4;
  }

  .search-input_button {
    padding: 22px 20px;
    position: absolute;
    border: none;
    background-color: initial;
  }
`;
