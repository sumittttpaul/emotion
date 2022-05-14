import React, { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import AuthContainer from '../container/AuthContainer';
import { Tab } from '@headlessui/react';
import { DeviceMobileIcon, MailIcon } from '@heroicons/react/solid';
import { motion, AnimatePresence } from 'framer-motion';
import EmailAuthUI from './AuthComponentUI/EmailAuthUI';
import PhoneAuthUI from './AuthComponentUI/PhoneAuthUI';
import { Link, useTheme } from '@mui/material';
import Router from 'next/router';
import SwipeableViews from 'react-swipeable-views';
import TabPanel from '../tab/SelectAvatarTabPanel';

interface IProps {}

/**
 * @author
 * @function @LoginUI
 **/

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const LoginUI: FC<IProps> = (props) => {
  const [value, setValue] = useState(true);
  const [Tabvalue, setTabValue] = useState(0);
  const theme = useTheme();

  const handleChangeIndex = (index: number) => {
    setTabValue(index);
  };

  const handlePhoneClick = () => {
    setValue(true);
    setTabValue(0);
  };

  const handleEmailClick = () => {
    setValue(false);
    setTabValue(1);
  };

  return (
    <AuthContainer>
      <AnimatePresence exitBeforeEnter>
        <motion.div
          className="w-full max-w-[350px] space-y-7 flex flex-col justify-center items-center"
          key=""
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 50 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.25 }}
        >
          <Image
            height={50}
            width={50}
            className="opacity-70"
            src="/agewear.svg"
            alt="logo-svg"
          />
          <h6 className="font-medium text-center text-md">
            Sign in with an Agewear Account
          </h6>
          <div className="w-full">
            <Tab.Group>
              <Tab.List className="flex space-x-2 rounded-md bg-[#121212] p-[5px]">
                <Tab
                  onClick={handlePhoneClick}
                  className={({ selected }) =>
                    classNames(
                      'w-full rounded-md py-4 text-[13px] text-white focus:outline-none',
                      selected ? 'bg-[#202020]' : 'text-white/[0.50]'
                    )
                  }
                >
                  <div className="flex w-full justify-center space-x-1">
                    <DeviceMobileIcon height={20} width={20} />
                    <h6>Phone</h6>
                  </div>
                </Tab>
                <Tab
                  onClick={handleEmailClick}
                  className={({ selected }) =>
                    classNames(
                      'w-full rounded-md py-4 text-[13px] text-white focus:outline-none',
                      selected ? 'bg-[#202020]' : 'text-white/[0.50]'
                    )
                  }
                >
                  <div className="flex w-full justify-center space-x-2">
                    <MailIcon height={20} width={20} />
                    <h6>Email</h6>
                  </div>
                </Tab>
              </Tab.List>
            </Tab.Group>
          </div>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={Tabvalue}
            onChangeIndex={handleChangeIndex}
            className='w-full'
            id='SwipeableViews'
            containerStyle={{
              transition: 'transform 0.35s cubic-bezier(0.15, 0.3, 0.25, 1) 0s'
          }}
          >
            <TabPanel value={Tabvalue} index={0} dir={theme.direction}>
              <PhoneAuthUI/>
            </TabPanel>
            <TabPanel value={Tabvalue} index={1} dir={theme.direction}>
              <EmailAuthUI/>
            </TabPanel>
          </SwipeableViews>
          <div className="flex">
            <h6 className="text-xs font-light text-[rgba(255,255,255,0.75)] flex items-center">
              Don&apos;t have an Agewear account?&#160;
              <Link
                onClick={() => {
                  Router.push('/auth/register');
                }}
                className="text-white text-xs"
                component="button"
                underline="always"
              >
                Sign Up
              </Link>
            </h6>
          </div>
        </motion.div>
      </AnimatePresence>
    </AuthContainer>
  );
};

export default LoginUI;
