import { Link } from '@mui/material';
import React, { FC } from 'react';
import Image from 'next/image';

interface IProps {
  Content: { label: string; to: string; icon: string; }[];
  heading: string;
}

/**
 * @author
 * @function @PageFooterSocials
 **/

export const PageFooterSocials: FC<IProps> = (props) => {
  return (
    <div className="flex flex-col py-2">
      <h6 className="text-white text-sm opacity-50 py-1">{props.heading}</h6>
      <div className="relative flex">
        <ul className="flex relative space-x-2 pt-1">
          {props.Content.map((value) => (
            <li key={value.label} className="relative flex">
              <Link
                href={value.to}
                className="flex whitespace-nowrap space-x-2 button-text-lower"
              >
                <Image height={25} width={25} src={value.icon} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};