import React, { Dispatch, FC, SetStateAction } from 'react';
import { Button } from '@mui/material';
import { ChevronRightIcon } from '@heroicons/react/outline';
import { SignInBackButton } from '../../../button/Auth/SignInBackButton';
import { AuthTransitionContainer } from '../../../container/Auth/AuthTransitionContainer';
import {
  SignInWithGoogle,
  SignInWithFacebook,
  SignInWithApple,
  SignInWithMicrosoft,
} from '../../../../algorithms/AuthAlgorithms';
import { useLoaderState } from '../../../../providers/state/LoadingState';
import { AuthType } from '../AuthType';

export interface LoginOtherAccountAuthUIProps {
  Loading: boolean;
  Toast: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setToast: Dispatch<SetStateAction<boolean>>;
  setToastSetting: Dispatch<
    SetStateAction<{ Title: string; Description: string; Type: string }>
  >;
  setAuthScreen: Dispatch<SetStateAction<AuthType>>;
  setFullName: Dispatch<SetStateAction<string>>;
  setEmailAddress: Dispatch<SetStateAction<string>>;
  setPhoneNumber: Dispatch<SetStateAction<string>>;
  IsInformationFilled: () => void;
}

/**
 * @author
 * @function @LoginOtherAccountAuthUI
 **/

export const LoginOtherAccountAuthUI: FC<LoginOtherAccountAuthUIProps> = (
  props
) => {
  // Loading
  const { setLoader } = useLoaderState();
  const LoadingScreen = (value: boolean) => {
    setLoader({ show: value });
  };

  // Toast
  const ShowToast = (
    title: string,
    description: string,
    type: string,
    show: boolean
  ) => {
    props.setToastSetting({
      Title: title,
      Description: description,
      Type: type,
    });
    props.setToast(show);
  };

  // Screens
  const BackToSignInWithPhoneNumber = () => {
    props.setAuthScreen('login-phone');
  };

  // Submit
  const GoogleSignIn = () => {
    SignInWithGoogle({
      ShowToast: ShowToast,
      Loading: props.setLoading,
      LoadingScreen: LoadingScreen,
      Next: props.IsInformationFilled,
      setFullName: props.setFullName,
      setEmailAddress: props.setEmailAddress,
      setPhoneNumber: props.setPhoneNumber,
    });
  };

  const FacebookSignIn = () => {
    SignInWithFacebook({
      ShowToast: ShowToast,
      Loading: props.setLoading,
      LoadingScreen: LoadingScreen,
      Next: props.IsInformationFilled,
      setFullName: props.setFullName,
      setEmailAddress: props.setEmailAddress,
      setPhoneNumber: props.setPhoneNumber,
    });
  };

  const AppleSignIn = () => {
    SignInWithApple({
      ShowToast: ShowToast,
      Loading: props.setLoading,
      LoadingScreen: LoadingScreen,
      Next: props.IsInformationFilled,
      setFullName: props.setFullName,
      setEmailAddress: props.setEmailAddress,
      setPhoneNumber: props.setPhoneNumber,
    });
  };

  const MicrosoftSignIn = () => {
    SignInWithMicrosoft({
      ShowToast: ShowToast,
      Loading: props.setLoading,
      LoadingScreen: LoadingScreen,
      Next: props.IsInformationFilled,
      setFullName: props.setFullName,
      setEmailAddress: props.setEmailAddress,
      setPhoneNumber: props.setPhoneNumber,
    });
  };

  return (
    <AuthTransitionContainer>
      <div className="w-full flex flex-col space-y-4">
        <div className="w-full flex flex-col space-y-2">
          <CustomButton onClick={GoogleSignIn} Label="Google" />
          <CustomButton onClick={FacebookSignIn} Label="Facebook" />
          <CustomButton onClick={AppleSignIn} Label="Apple" />
          <CustomButton onClick={MicrosoftSignIn} Label="Microsoft" />
        </div>
        <div className="w-full flex justify-start">
          <SignInBackButton
            Label="Back"
            onClick={BackToSignInWithPhoneNumber}
          />
        </div>
      </div>
    </AuthTransitionContainer>
  );
};

interface CustomButtonProps {
  Label: string;
  Description?: string;
  onClick?: () => void;
}

const CustomButton: FC<CustomButtonProps> = (props) => {
  return (
    <Button
      aria-label="apple-sign-in-button"
      disableFocusRipple
      onClick={props.onClick}
      className="bg-white/5 hover:bg-white/10 cursor-default text-white h-[50px] justify-center items-center flex w-full rounded-lg button-text-lower"
      sx={{
        '.MuiTouchRipple-child': {
          backgroundColor: '#ffffff50 !important',
        },
      }}
    >
      <div className="flex w-full px-3">
        {/* <Image height={20} width={20} src={props.Icon} alt="" /> */}
        <div
          className={`${
            props.Description ? '-space-y-1 ?' : ''
          } w-full flex flex-col`}
        >
          <div className="w-full text-start text-[13px] font-normal tracking-wide">
            {props.Label}
          </div>
          <div className="w-full text-start text-[12px] font-normal text-white/75">
            {props.Description}
          </div>
        </div>
        <div className="flex h-full items-center justify-center">
          <ChevronRightIcon
            className={`${props.Description ? 'mt-3' : 'mt-1'} h-4 w-4 block`}
          />
        </div>
      </div>
    </Button>
  );
};