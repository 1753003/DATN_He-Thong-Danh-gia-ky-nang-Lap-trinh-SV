import React from 'react'
import styles from './style.less'
import {
  Typography,
  Card,
  List
} from 'antd'
import {Link} from 'umi';

const data = [
  {
    title: 'C Programming Set',
  },
  {
    title: 'C++ Programming Set',
  },
  {
    title: 'Java Programming Set',
  },
  {
    title: 'JavaScript Programming Set',
  },
];

const practiceHome = () => {
  return (
    <div>
      <div className={styles.top}>PRACTICE MAKE PERFECT</div>
      <div className={styles.body}>
      <Typography.Title>Topics</Typography.Title>
        <div className={styles.topics}>
          <List
            grid={{ gutter: 64, 
              xs: 1,
              sm: 2,
              md: 4,
              lg: 4,
              xl: 4,
              xxl: 4, }}
            dataSource={data}
            renderItem={item => (
              <Link to={"/developer/practice/list?name="+ encodeURIComponent(item.title)}>
              <List.Item>
                <Card className={styles.card}
                hoverable
                >
                  <h4>{item.title}</h4>
                  <img
                    alt="cover"
                    src="https://www.pinclipart.com/picdir/middle/396-3965857_c-c-programming-language-logo-clipart.png"
                  />
                </Card>
              </List.Item>
              </Link>
            )}
          />,
        </div>
      </div>
    </div>
  );
}

export default practiceHome;