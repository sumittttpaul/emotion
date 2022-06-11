import React, { FC, Fragment, useState } from 'react';
import { IconButton, Button, Menu, MenuItem } from '@mui/material';
import Image from 'next/image';
import { Square_BlurDataURL } from '../../loader/BlurDataURL';
import { useAuth } from '../../../firebase/AuthProvider';
import firebase from 'firebase/compat/app';
import Router from 'next/router';

interface IProps {}

/**
 * @author
 * @function @UserIconButton
 **/

export const UserIconButton: FC<IProps> = (props) => {
  const user = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseClick = () => {
    setTimeout(() => {
      setAnchorEl(null);
    }, 150);
  };

  const SignOutUser = () => {
    setTimeout(() => {
      handleClose();
      firebase.auth().signOut();
    }, 150);
  };
  return (
    <div className="flex relative box-border">
      {user ? (
        <Fragment>
          <IconButton
            onClick={handleClick}
            className="p-0 inline-flex button-text-lower h-full px-2 sm:mr-2"
            sx={{
              borderRadius: '0 !important',
              '.MuiTouchRipple-child': {
                borderRadius: '0 !important',
                backgroundColor: 'rgba(225, 225, 255, 0.5) !important',
              },
            }}
          >
            <Image
              height={35}
              width={35}
              className="rounded-[50%]"
              placeholder="blur"
              blurDataURL={Square_BlurDataURL}
              src={`${user.photoURL}`}
            />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                background: 'rgba(255,255,255,0.9)',
                mt: 0.6,
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                '.MuiMenu-list': {
                  padding: '1px 0',
                },
                '.MuiMenuItem-root': {
                  minHeight: 0,
                },
                '.MuiTouchRipple-child': {
                  backgroundColor: 'rgba(0, 0, 0, 0.3) !important',
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem
              key={1}
              disableRipple
              disableTouchRipple
              className="m-1 p-2 rounded-md cursor-default hover:bg-[transparent]"
            >
              <div className="flex relative space-x-3">
                <div className="relative block">
                  <Image
                    height={50}
                    width={50}
                    className="rounded-[50%]"
                    placeholder="blur"
                    blurDataURL={Square_BlurDataURL}
                    src={`${user.photoURL}`}
                  />
                </div>
                <div className="relative block">
                  <h6 className="text-[15px] whitespace-nowrap font-[450] font-sans text-black">{`${user.displayName}`}</h6>
                  <h6 className="text-[11px] mr-1 whitespace-nowrap font-normal text-black opacity-90">{`${user.email}`}</h6>
                  <div className="relative block">
                    <Button
                      onClick={SignOutUser}
                      className="mt-[8px] p-[2px] relative block bg-[rgba(0,0,0,0.05)] hover:bg-[rgba(0,0,0,0.09)] button-text-lower font-[400] text-black text-[11.5px]"
                    >
                      Sign out
                    </Button>
                  </div>
                </div>
              </div>
            </MenuItem>
            <div className="h-[1px] w-full bg-[rgba(0,0,0,0.05)]" />
            <MenuItem
              key={2}
              onClick={handleCloseClick}
              className="m-1 rounded-md hover:bg-[rgba(0,0,0,0.05)]"
            >
              <div className="flex relative space-x-[10px]">
                <Image height={17} width={17} src="/icons/folder.svg" />
                <h6 className="text-[14px] font-sans font-[400] text-black">
                  Manage your account
                </h6>
              </div>
            </MenuItem>
            <MenuItem
              key={3}
              onClick={handleCloseClick}
              className="m-1 rounded-md hover:bg-[rgba(0,0,0,0.05)]"
            >
              <div className="flex relative space-x-[10px]">
                <Image height={18} width={18} src="/icons/truck.svg" />
                <h6 className="text-[14px] font-sans font-[400] text-black">
                  Track orders
                </h6>
              </div>
            </MenuItem>
            <MenuItem
              key={4}
              onClick={handleCloseClick}
              className="m-1 rounded-md hover:bg-[rgba(0,0,0,0.05)]"
            >
              <div className="flex relative space-x-[10px]">
                <Image height={17} width={17} src="/icons/shopping-bag.svg" />
                <h6 className="text-[14px] font-sans font-[400] text-black">
                  View all orders
                </h6>
              </div>
            </MenuItem>
            <MenuItem
              key={5}
              onClick={handleCloseClick}
              className="m-1 rounded-md hover:bg-[rgba(0,0,0,0.05)]"
            >
              <div className="flex relative space-x-[10px]">
                <Image height={17} width={17} src="/icons/gift.svg" />
                <h6 className="text-[14px] font-sans font-[400] text-black">
                  Redeem code or gift cards
                </h6>
              </div>
            </MenuItem>
          </Menu>
        </Fragment>
      ) : (
        <Button
          onClick={() => {
            setTimeout(() => {
              Router.push('/auth/login');
            }, 150);
          }}
          className="p-0 inline-flex button-text-lower h-full px-4"
          sx={{
            '.MuiTouchRipple-child': {
              backgroundColor: 'rgba(225, 225, 255, 0.5) !important',
            },
          }}
        >
          <div className="relative flex sm:space-x-2 items-center">
            <Image
              height={20}
              width={20}
              className="opacity-70"
              placeholder="blur"
              blurDataURL={Square_BlurDataURL}
              src="/icons/user-fill.svg"
            />
            <h6 className="text-white hidden sm:block whitespace-nowrap font-[350] text-[12px]">
              Login
            </h6>
          </div>
        </Button>
      )}
    </div>
  );
};
