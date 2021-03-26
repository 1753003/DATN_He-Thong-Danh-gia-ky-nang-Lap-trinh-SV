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
    img: "https://firebasestorage.googleapis.com/v0/b/devcheckpro.appspot.com/o/Language%2FC.png?alt=media&token=c6a79e0c-f505-4656-8811-53171797f071"
  },
  {
    title: 'C++ Programming Set',
    img: 'https://firebasestorage.googleapis.com/v0/b/devcheckpro.appspot.com/o/Language%2FCpp.png?alt=media&token=5b9f1a05-cf3a-4fc6-b2f9-7c2d6cccfe49'
  },
  {
    title: 'Java Programming Set',
    img: 'https://firebasestorage.googleapis.com/v0/b/devcheckpro.appspot.com/o/Language%2FJava.png?alt=media&token=3cae8a18-e068-466f-ae4e-efd2534554fd'
  },
  {
    title: 'JavaScript Programming Set',
    img: 'https://firebasestorage.googleapis.com/v0/b/devcheckpro.appspot.com/o/Language%2FJavascript.png?alt=media&token=ff4fee77-2f4b-4963-8473-b1a2390c2f76'
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
              <Link to={"/developer/practice/list?listName="+ encodeURIComponent(item.title)}>
              <List.Item>
                <Card className={styles.card}
                hoverable
                >
                  <h4>{item.title}</h4>
                  <img
                    alt="cover"
                    src={item.img}
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