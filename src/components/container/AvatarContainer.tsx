import React, { FC, ReactNode, ExoticComponent } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { motion } from 'framer-motion'

interface IProps {
  children: ReactNode;
  className?: string;
  show?: boolean;
  as: ExoticComponent;
  onClose: () => void;
}

/**
 * @author
 * @function @AvatarContainer
 **/

const AvatarContainer: FC<IProps> = (props) => {

  const classes = 'absolute sm:relative box-border h-full w-full transform overflow-hidden sm:rounded-lg bg-black text-center align-middle shadow-xl transition-all ease-in';

  return (
    <Transition appear show={props.show} as={props.as}>
      <Dialog as="div" className="relative z-20" onClose={props.onClose}>
        <Transition.Child
          as={props.as}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-none">
          <div className="flex min-h-full items-center justify-center text-center">
            <Transition.Child
              as={props.as}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-75"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-75"
            >
              <motion.div className={`${classes} ${props.className}`}>
                {props.children}
              </motion.div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AvatarContainer;
