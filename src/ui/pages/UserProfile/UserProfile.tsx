import type { MouseEvent } from 'react';
import { useState } from 'react';
import classNames from 'classnames';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

import Input from 'src/ui/components/Input';
import Button from 'src/ui/components/Button';

import { useAppDispatch, useAppSelector } from 'src/redux/store';
import { userSliceActions } from 'src/redux/userStore/userSlice';
import {
  changeUserThunk,
  uploadAvatarUserThunk,
} from 'src/redux/userStore/thunks/updateUser';
import { fieldsValidation } from 'src/utils/validationFields';
import {
  handleApiValidationError,
  matchError,
} from 'src/utils/handleApiValidationError';
import tokenHelper from 'src/utils/tokenHelper';

import constants from 'src/utils/constants';

import mail from 'src/ui/assets/images/icon/Mail.svg';
import camera from 'src/ui/assets/images/icon/Camera.svg';
import imgUser from 'src/ui/assets/images/icon/User.svg';

import defaultPhoto from 'src/ui/assets/images/UserPhoto.svg';
import PasswordProfile from './PasswordProfile';

import StyledUserProfile from './UserProfile.styles';

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [changeUser, setChangeUser] = useState(true);

  const user = useAppSelector((store) => store.userStore.user);

  let userId = 0;

  if (user) {
    userId = user.id;
  }

  const changeDataHandler = (
    type: string,
    e: React.MouseEvent<HTMLElement>,
  ) => {
    e.preventDefault();
    if (type === 'userData') {
      setChangeUser(true);
    }
    if (changeUser === true) {
      setChangeUser(false);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullName: user?.fullName || '',
      email: user?.email || '',
    },
    validationSchema: Yup.object({
      email: fieldsValidation.email,
      fullName: fieldsValidation.fullName,
    }),
    onSubmit: async (values) => {
      try {
        const { fullName, email } = values;
        await dispatch(
          changeUserThunk({ fullName, email, id: userId }),
        ).unwrap();
      } catch (error) {
        if (matchError(error)) {
          handleApiValidationError(error.error, formik.setErrors);
          return;
        }
        toast.error('Unexpected server error');
      }
    },
  });

  const uploadPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files;
    if (selectedFile) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(selectedFile[0]);
      fileReader.onload = async () => {
        try {
          await dispatch(uploadAvatarUserThunk(fileReader.result as string));
        } catch (err) {
          const error = err as Error;
          toast.error(error.message);
        }
      };
    }
  };

  const exitUserHandler = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) => {
    e.preventDefault();
    if (user) {
      tokenHelper.token.remove();
      dispatch(userSliceActions.exitUser(1));
      navigate(`${constants.routesLink.home}`);
    }
  };

  return (
    <StyledUserProfile>
      <div className="img-profile">
        <img
          className="user-photo"
          src={user?.avatar ? user?.avatar : defaultPhoto}
          alt=""
        />

        <div className="load-avatar">
          <div className="drop-box">
            <input
              className="load-avatar__input"
              type="file"
              onChange={(e) => uploadPhoto(e)}
            />
          </div>

          <Button className="add-avatar">
            <img src={camera} alt="" />
          </Button>
        </div>

        <div className="exit-box">
          <button
            className="exit-box__button"
            onClick={(e) => exitUserHandler(e)}
          >
            Exit
          </button>
        </div>
      </div>

      <div className="form-user__box">
        <form className="form-user-data" onSubmit={formik.handleSubmit}>
          <div className="user-change-preview">
            <h3 className="user-change-preview__title">Personal information</h3>
            <a
              className="user-change-preview__link"
              onClick={(e) => changeDataHandler('userData', e)}
              href=""
            >
              Change information
            </a>
          </div>

          <div className="data-box">
            <label className="data-box__label">Your name</label>

            <Input
              disabled={changeUser}
              className={classNames({
                'form-input': true,
                'error-input': formik.touched.fullName
                  ? formik.errors.fullName
                  : undefined,
              })}
              img={imgUser}
              placeholder="Name"
              errors={
                formik.touched.fullName ? formik.errors.fullName : undefined
              }
              touched={formik.touched.fullName || ''}
              {...formik.getFieldProps('fullName')}
            />
          </div>

          <div className="data-box">
            <label>Your email</label>

            <Input
              className={classNames({
                'form-input': true,
                'error-input': formik.touched.email
                  ? formik.errors.email
                  : undefined,
              })}
              disabled={changeUser}
              img={mail}
              placeholder="Email"
              errors={formik.touched.email ? formik.errors.email : undefined}
              touched={formik.touched.email || ''}
              {...formik.getFieldProps('email')}
            />
          </div>

          {!changeUser ? (
            <Button className="simple-button" type="submit">
              Confirm
            </Button>
          ) : null}
        </form>
        <PasswordProfile />
      </div>
    </StyledUserProfile>
  );
};

export default UserProfile;
