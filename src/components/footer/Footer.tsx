import Router from 'next/router';
import React, { FC } from 'react';
import { useLoaderState } from '../../providers/state/LoadingState';
import { Home_Link } from '../../routerLinks/RouterLinks';
import { FooterLogo } from '../logo/CompanyLogo';
import { FooterBottom } from './assets/FooterBottom';
import { FooterTop } from './assets/FooterTop';
import { ScrollToTopButton } from './assets/ScrollToTopButton';

export interface FooterProps {
  setPage: (value: string) => void;
}

/**
 * @author
 * @function @Footer
 **/
export const Footer: FC<FooterProps> = (props) => {
  const { setLoader } = useLoaderState();
  const LoadingScreen = (value: boolean) => {
    setLoader({ show: value });
  };
  return (
    <div className="w-full self-end pb-5 pr-5">
      <div className="w-full relative pb-5 sm:pb-8 sm:px-8 px-3 box-border rounded-3xl bg-gradient-to-t from-[#151515]">
        <div className="flex flex-col items-center justify-center">
          <FooterLogo
            onValueChange={(value) => {
              props.setPage(value);
              LoadingScreen(true);
              Router.push(Home_Link);
            }}
          />
          {/* <FooterTop /> */}
          {/* <div className="h-[1px] w-full my-5 bg-[#ffffff1a]" /> */}
          <h6 className="text-[11.5px] text-center py-2 font-[300] leading-[22px] whitespace-normal lg:max-w-[70%] xl:max-w-[60%] 2xl:max-w-[55%] flex text-white opacity-80">
            Founded in 2023, Emotion is a outfit fashion brand that makes
            creative, distinctive fashion for the trendy, contemporary Indian.
            Emotion-outfit was created on the principle of creating impact
            through innovation, honesty and thoughtfulness. We like to
            experiment freely, which allows us to balance creativity and
            relatability, and our innovative designs. Our range of products is
            always fresh and up-to-date. Discover the new you with
            Emotion-outfit.
          </h6>
          <h6 className="text-[11.5px] py-2 font-[300] whitespace-normal flex text-white">
            Discover the new you with Emotion-outfit.
          </h6>
        </div>
        <FooterBottom />
        <ScrollToTopButton />
      </div>
    </div>
  );
};