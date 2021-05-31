import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import BannerSVGAnim from './component/BannerSVGAnim';
import Children from 'rc-tween-one/lib/plugin/ChildrenPlugin';
import { Link } from 'umi';
import Language from '@/locales/index';
import { Button } from 'antd';
TweenOne.plugins.push(Children);

const Banner = (props) => {
  const [animation, setAnimation] = useState(null);
  useEffect(()=>{
    setAnimation({
      Children: { 
        value: 10000, floatLength:0,
      }, 
      duration: 3000,
    })
  },[]);
  return (<>
    <div className="banner-wrapper">
      {props.isMobile && (
        <TweenOne animation={{ opacity: 1 }} className="banner-image-wrapper">
          <div className="home-banner-image">
            <img
              alt="banner"
              src="https://gw.alipayobjects.com/zos/rmsportal/rqKQOpnMxeJKngVvulsF.svg"
              width="100%"
            />
          </div>
        </TweenOne>
      )}
      <QueueAnim className="banner-title-wrapper" type={props.isMobile ? 'bottom' : 'right'}>
        <div key="line" className="title-line-wrapper">
          <div
            className="title-line"
            style={{ transform: 'translateX(-64px)' }}
          />
        </div>
        <h1 key="h1">{Language.pages_welcome_hiDev}</h1>
        <p key="content">
          {Language.pages_welcome_whatToDoing}
        </p>
        <TweenOne className='number'
        animation={animation}
        style={{ fontSize: 56, marginBottom: 12 }}
      >
        0
      </TweenOne>
      <h4 className='numtitle'>{Language.pages_welcome_testSet}</h4>
        <div key="button" className="button-wrapper">
          <Link to = '/developer/practice'>
          <Button type="primary">
              {Language.pages_welcome_practice}
            </Button>
          </Link>
          <Link to = '/developer/test'>

          <Button 
          
          style={{ margin: '0 16px', padding:'4px 10px' }}
          type="primary" ghost>
            {Language.pages_welcome_test}
          </Button>
          </Link>
        </div>
      </QueueAnim>
      {!props.isMobile && (
        <TweenOne animation={{ opacity: 1 }} className="banner-image-wrapper">
          <BannerSVGAnim />
        </TweenOne>
      )}
      
    </div>
    <div style={{display:'flex', width: '100%' }}>
      
      
    </div>
    </>
  );
}
Banner.propTypes = {
  isMobile: PropTypes.bool.isRequired,
};

export default Banner;
