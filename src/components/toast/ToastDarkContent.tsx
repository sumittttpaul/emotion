import { XIcon } from '@heroicons/react/solid';
import { Snackbar } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React, { FC, SyntheticEvent } from 'react';
import { m } from 'framer-motion';
import Image from 'next/image';

export interface ToastDarkContentProps {
  Open: boolean;
  MessageTitle: string;
  MessageDescription: string;
  HideDuration: number;
  Icon: string;
  Color: string;
  Vertical: 'top' | 'bottom';
  Horizontal: 'left' | 'center' | 'right';
  onClose: () => void;
  Transition: React.ComponentType<
    TransitionProps & {
      children: React.ReactElement<any, any>;
    }
  >;
}

/**
 * @author
 * @function @ToastDarkContent
 **/

export const ToastDarkContent: FC<ToastDarkContentProps> = (props) => {
  const handleClose = (event: SyntheticEvent | Event, reason: string) => {
    if (reason === 'clickaway') {
      return;
    }
    if (reason === 'escapeKeyDown') {
      return;
    } else {
      props.onClose();
    }
  };

  return (
    <Snackbar
      open={props.Open}
      autoHideDuration={props.HideDuration * 1000 - 500}
      onClose={handleClose}
      TransitionComponent={props.Transition}
      disableWindowBlurListener
      anchorOrigin={{
        vertical: props.Vertical,
        horizontal: props.Horizontal,
      }}
    >
      <div
        className={`${props.Color} h-full text-white max-w-[500px] flex flex-col space-y-1 border border-solid border-white/20 rounded-xl overflow-hidden Toast-DropShadow`}
      >
        <div className="w-full h-full flex space-x-3 p-1">
          <div className="flex h-full pl-2 py-3 items-start">
            <Image height={40} width={40} src={props.Icon} alt="" />
          </div>
          <div className="flex flex-col py-2 w-full">
            <h5 className="text-white text-[15px] font-medium">
              {props.MessageTitle}
            </h5>
            <h6 className="text-white/75 text-[13px] leading-4 font-normal">
              {props.MessageDescription}
            </h6>
          </div>
          <div className="h-full flex flex-col items-start justify-center">
            <m.button
              onClick={props.onClose}
              whileTap={{ scale: 0.9 }}
              className="bg-transparent hover:bg-white/10 cursor-default p-2.5 m-0 rounded-full"
            >
              <XIcon className="text-white h-4 w-4" />
            </m.button>
          </div>
        </div>
        <div className="w-full flex">
          <m.div
            initial={{ width: '100%' }}
            animate={{ width: '0%' }}
            transition={{ duration: props.HideDuration }}
            className="w-full h-[2px] bg-white/75"
          />
        </div>
      </div>
    </Snackbar>
  );
};