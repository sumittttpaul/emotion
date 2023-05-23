import React, { FC, useRef, useState } from 'react';
import { DiscoverSliderContentProps } from '../../contents/store/discover/Store.Discover.Slider';
import {
  DiscoverSliderBrowser,
  DiscoverSliderMobile,
} from './DiscoverSlider/DiscoverSlider.MultiScreen';
import { DiscoverSliderTitle } from './DiscoverSlider/DiscoverSliderTitle';

interface IProps {
  ContentArray: DiscoverSliderContentProps[];
}

/**
 * @author
 * @function @DiscoverSlider
 **/
export const DiscoverSlider: FC<IProps> = (props) => {
  const [LeftDisabled, setLeftDisabled] = useState(false);
  const [RightDisabled, setRightDisabled] = useState(false);
  const [Wishlist, setWishlist] = useState(-1);
  const sliderRef = useRef<HTMLElement>(null);
  return (
    <div className="flex flex-col space-y-5 overflow-x-hidden overflow-y-visible mt-[30px]">
      <DiscoverSliderTitle
        label="Trending winter collections"
        sliderRef={sliderRef}
        LeftDisabled={LeftDisabled}
        RightDisabled={RightDisabled}
      />
      <DiscoverSliderBrowser
        ContentArray={props.ContentArray}
        sliderRef={sliderRef}
        Wishlist={Wishlist}
        setWishlist={setWishlist}
        setLeftDisabled={setLeftDisabled}
        setRightDisabled={setRightDisabled}
      />
      {/* <DiscoverSliderMobile
          ContentArray={props.ContentArray}
          Wishlist={Wishlist}
          setWishlist={setWishlist}
        /> */}
    </div>
  );
};
