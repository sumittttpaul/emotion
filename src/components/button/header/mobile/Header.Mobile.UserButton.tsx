import UserIcon from '../../../../../public/icons/user-fill.svg';
import { CircularProgress, IconButton } from '@mui/material';
import { getAuth } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import firebaseUser from 'firebase/compat';
import React, { FC, Fragment, ReactNode, useState, MouseEvent } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { GetUserAuthData } from '../../../../algorithms/AuthDB';
import { FirstNameEncrytionKey } from '../../../../algorithms/security/CryptionKey';
import { DecryptData } from '../../../../algorithms/security/CryptionSecurity';
import { useAuth } from '../../../../firebase/AuthProvider';
import { useLoaderState } from '../../../../providers/state/LoadingState';
import { Login_Link } from '../../../../routerLinks/RouterLinks';
import Router from 'next/router';
import Image from 'next/legacy/image';
import dynamic from 'next/dynamic';
import { HeaderUserButtonMenuProps } from '../Header.UserButton.Menu';

const HeaderUserButtonMenu = dynamic<HeaderUserButtonMenuProps>(() =>
  import('../Header.UserButton.Menu').then((x) => x.HeaderUserButtonMenu)
);

interface IProps {}

/**
 * @author
 * @function @HeaderMobileUserButton
 **/
export const HeaderMobileUserButton: FC<IProps> = (props) => {
  const FirebaseUser = useAuth();
  const FirebaseAuth = getAuth(firebase.app());
  const [user, loading] = useAuthState(FirebaseAuth);

  const { setLoader } = useLoaderState();
  const LoadingScreen = (value: boolean) => {
    setLoader({ show: value });
  };

  if (loading)
    return (
      <ContainerButton>
        <LoadingButton />
      </ContainerButton>
    );

  if (user && FirebaseUser)
    return (
      <ContainerButton>
        <UserButton user={FirebaseUser} />
      </ContainerButton>
    );

  return (
    <ContainerButton>
      <LoginButton
        onClick={() => {
          setTimeout(() => {
            Router.push(Login_Link);
            LoadingScreen(true);
          }, 150);
        }}
      />
    </ContainerButton>
  );
};

interface LoginButtonProps {
  onClick: () => void;
}
interface LoadingButtonProps {}

interface ContainerButtonProps {
  children: ReactNode;
}
interface UserButtonProps {
  user: firebaseUser.User;
}

const LoginButton: FC<LoginButtonProps> = (props) => {
  return (
    <IconButton
      aria-label="user-login-button"
      disableFocusRipple
      onClick={props.onClick}
      className="flex items-center justify-center h-[35px] w-[35px] p-0"
      sx={{
        '.MuiTouchRipple-child': {
          backgroundColor: 'transparent !important',
        },
      }}
      style={{ minWidth: 35, width: 35, maxWidth: 35 }}
    >
      <Image
        height={25}
        width={25}
        layout="fixed"
        className="opacity-70 rounded-[50%]"
        src={UserIcon}
        alt=""
      />
    </IconButton>
  );
};

const LoadingButton: FC<LoadingButtonProps> = (props) => {
  return (
    <Fragment>
      <IconButton
        disabled
        aria-label="user-button-loading"
        disableFocusRipple
        className="flex items-center justify-center h-[35px] w-[35px] p-0"
        sx={{
          '.MuiTouchRipple-child': {
            backgroundColor: 'transparent !important',
          },
        }}
        style={{ minWidth: 35, width: 35, maxWidth: 35 }}
      >
        <CircularProgress className="text-white p-2.5 -ml-[5px]" />
      </IconButton>
    </Fragment>
  );
};

const UserButton: FC<UserButtonProps> = (props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { setLoader } = useLoaderState();
  const LoadingScreen = (value: boolean) => {
    setLoader({ show: value });
  };

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const SignOutUser = () => {
    setTimeout(() => {
      firebase
        .auth()
        .signOut()
        .then(() => {
          handleClose();
        });
    }, 200);
  };

  return (
    <Fragment>
      <IconButton
        aria-label="user-popup-button"
        disableFocusRipple
        onClick={handleClick}
        className="flex items-center justify-center h-[35px] w-[35px] p-0"
        sx={{
          '.MuiTouchRipple-child': {
            backgroundColor: 'transparent !important',
          },
        }}
        style={{ minWidth: 35, width: 35, maxWidth: 35 }}
      >
        {props.user.photoURL ? (
          <Image
            height={35}
            width={35}
            layout="fixed"
            className="rounded-[50%]"
            src={`${props.user.photoURL}`}
            alt=""
          />
        ) : (
          <Image
            height={25}
            width={25}
            layout="fixed"
            className="opacity-70 rounded-[50%]"
            src={UserIcon}
            alt=""
          />
        )}
      </IconButton>
      <HeaderUserButtonMenu
        anchorEl={anchorEl}
        open={open}
        user={props.user}
        handleClose={handleClose}
        SignOutUser={SignOutUser}
        LoadingScreen={(value) => LoadingScreen(value)}
      />
    </Fragment>
  );
};

const ContainerButton: FC<ContainerButtonProps> = (props) => {
  return (
    <div className="flex relative h-[35px] w-[35px] overflow-hidden">
      {props.children}
    </div>
  );
};