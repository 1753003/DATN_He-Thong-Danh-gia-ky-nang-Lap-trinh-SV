import React from 'react';
import styles from './style.less';
import './style.less';
import { Typography, Card } from 'antd';
import { Link } from 'umi';
import Texty from 'rc-texty';
import TweenOne from 'rc-tween-one';
import QueueAnim from 'rc-queue-anim';
import Language from '@/locales/index';
import {c_set, cpp_set, java_set, js_set} from '@/utils/image.js'

const data = [
  {
    title: 'C Programming Set',
    img: c_set,
  },
  {
    title: 'C++ Programming Set',
    img: cpp_set,
  },
  {
    title: 'Java Programming Set',
    img: java_set,
  },
  {
    title: 'JavaScript Programming Set',
    img: js_set,
  },
];

const practiceHome = () => {
  const geInterval = (e) => {
    switch (e.index) {
      case 0:
        return 0;
      case 1:
        return 150;
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
        return 150 + 450 + (e.index - 2) * 10;
      default:
        return 150 + 450 + (e.index - 6) * 150;
    }
  };
  const getEnter = (e) => {
    const t = {
      opacity: 0,
      scale: 0.8,
      y: '-100%',
    };
    if (e.index >= 2 && e.index <= 6) {
      return { ...t, y: '-30%', duration: 150 };
    }
    return t;
  };

  const getSplit = (e) => {
    const t = e.split(' ');
    const c = [];
    t.forEach((str, i) => {
      c.push(<span key={`${str}-${i}`}>{str}</span>);
      if (i < t.length - 1) {
        c.push(<span key={` -${i}`}> </span>);
      }
    });
    return c;
  };

  return (
    <div className={styles.global}>
      <div className="combined-wrapper">
        {true && (
          <div className="combined">
            <div className="combined-shape">
              <div className="shape-left">
                <TweenOne
                  animation={[
                    { x: 158, type: 'from', ease: 'easeInOutQuint', duration: 600 },
                    { x: -158, ease: 'easeInOutQuart', duration: 450, delay: -150 },
                  ]}
                />
              </div>
              <div className="shape-right">
                <TweenOne
                  animation={[
                    { x: -158, type: 'from', ease: 'easeInOutQuint', duration: 600 },
                    { x: 158, ease: 'easeInOutQuart', duration: 450, delay: -150 },
                  ]}
                />
              </div>
            </div>
            <Texty
              className="title"
              type="mask-top"
              delay={400}
              enter={getEnter}
              interval={geInterval}
              component={TweenOne}
              componentProps={{
                animation: [
                  { x: 130, type: 'set' },
                  { x: 100, delay: 500, duration: 450 },
                  {
                    ease: 'easeOutQuart',
                    duration: 300,
                    x: 0,
                  },
                  {
                    letterSpacing: 0,
                    delay: -300,
                    scale: 0.9,
                    ease: 'easeInOutQuint',
                    duration: 1000,
                  },
                  { scale: 1, width: '100%', delay: -300, duration: 1000, ease: 'easeInOutQuint' },
                ],
              }}
            >
              {Language.pages_practice_title}
            </Texty>
            <Texty className="content" type="bottom" split={getSplit} delay={2200} interval={30}>
              {Language.pages_practice_subTitle}
            </Texty>
          </div>
        )}
      </div>
      <div>
        <Typography.Title className={styles.topic}>
          <Texty>{Language.pages_practice_topics}</Texty>
        </Typography.Title>
        <div className={styles.body}>
          <QueueAnim delay={300} className={styles.queue}>
            {data.map((item, i) => (
              <Link
                key={i}
                to={'/developer/practice/list?listName=' + encodeURIComponent(item.title)}
              >
                <Card className={styles.card} hoverable>
                  <img alt="cover" src={item.img} />
                </Card>
              </Link>
            ))}
          </QueueAnim>
          <div className={styles.topics}></div>
        </div>
      </div>
    </div>
  );
};

export default practiceHome;
