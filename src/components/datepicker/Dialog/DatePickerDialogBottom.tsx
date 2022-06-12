import { Button } from '@mui/material';
import React, { FC } from 'react';

interface IProps {
  cancel: () => void;
  submit: () => void;
  submitActive: boolean;
}

/**
 * @author
 * @function @DatePickerDialogBottom
 **/

export const DatePickerDialogBottom: FC<IProps> = (props) => {
  return (
    <div className="p-3 flex space-x-3 relative justify-end">
      <Button
        disableFocusRipple
        onClick={props.cancel}
        className="text-[rgba(255,255,255,0.8)] rounded-md font-normal text-[11px] h-8 w-[calc(100%/3)] border border-solid border-[rgba(255,255,255,0.2)] outline-none button-text-lower"
      >
        Cancel
      </Button>
      <Button
        disableFocusRipple
        disabled={!props.submitActive}
        onClick={props.submit}
        className="text-white disabled:opacity-50 disabled:text-white rounded-md  text-[11px] h-8 w-[calc(100%/3)] bg-[#0074E4] hover:bg-[#0074E4] outline-none button-text-lower"
      >
        Done
      </Button>
    </div>
  );
};
