import { useFormik } from 'formik';
import { useState } from 'react';
import { changePasswordThunk } from '../../../../redux/bookStore/bookStoreThunks';
import { useAppDispatch, useAppSelector } from '../../../../redux/store';
import { changePasswordSchema } from '../../../../validation/schemas';
import Input from '../../../auxiliaryComponents/Input/Input';
import Styles from './PasswordProfile.styles';
import eye from '../images/Hide.svg';
import Button from '../../../auxiliaryComponents/Button/Button.styles';

const PasswordProfile: React.FC = () => {
  const [changePassword, setChangePassword] = useState(false);
  const disabledInput = true;

  const user = useAppSelector((store) => store.bookData.user);

  const dispatch = useAppDispatch();

  const changeDataHandler = (
    type: string,
    e: React.MouseEvent<HTMLElement>,
  ) => {
    e.preventDefault();
    if (type === 'password') {
      setChangePassword(true);
    }
  };

  const dataPassword = useFormik({
    initialValues: {
      password: '',
      repeatPassword: '',
    },
    validationSchema: changePasswordSchema,
    onSubmit: async (values) => {
      const { password } = values;
      await dispatch(changePasswordThunk({ password, id: user.id }));
    },
  });

  return (
    <Styles>
      <form className="user-password" onChange={dataPassword.handleSubmit}>
        <div className="user-change_preview">
          <h3>Password</h3>
          <a onClick={(e) => changeDataHandler('password', e)} href="">
            Change password
          </a>
        </div>
        {!changePassword ? (
          <div className="data-box">
            <label>Old password</label>
            <Input
          disabled={disabledInput}
            img={eye}
            type="password"
            placeholder="***********"
            errors={dataPassword.errors.password}
            touched={dataPassword.touched.password}
            {...dataPassword.getFieldProps('password')}
          />
          </div>
        ) : (
          <>
           <div className="data-box">
            <label>Old password</label>
            <Input
            disabled={disabledInput}
              img={eye}
              type="password"
              placeholder="***********"
              label="Old password"
              errors={dataPassword.errors.password}
              touched={dataPassword.touched.password}
              {...dataPassword.getFieldProps('password')}
            />
           </div>
            <Input
              img={eye}
              placeholder="New password"
              label="Enter your password"
              errors={dataPassword.errors.password}
              touched={dataPassword.touched.password}
              {...dataPassword.getFieldProps('newPassword')}
            />
            <Input
              img={eye}
              placeholder="Password replay"
              label="Repeat your password without errors"
              errors={dataPassword.errors.repeatPassword}
              touched={dataPassword.touched.repeatPassword}
              {...dataPassword.getFieldProps('repeatPassword')}
            />
          </>
        )}
        <Button className="simple-button" type="submit">
          Confirm
        </Button>
      </form>
    </Styles>
  );
};

export default PasswordProfile;
