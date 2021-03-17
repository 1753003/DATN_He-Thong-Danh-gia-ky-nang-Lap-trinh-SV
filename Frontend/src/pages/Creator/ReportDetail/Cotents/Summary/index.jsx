import React from 'react';
import styles from './index.less';
import { Progress, Card, Tag } from 'antd';
import {
  UserOutlined,
  FileTextTwoTone,
  QuestionOutlined,
  FieldTimeOutlined,
  DownloadOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';

const Summary = () => {
  const report = {
    PercentPass: 70,
    PercentSuccess: 50,
    Users: 52,
    Questions: 15,
    Time: 45,
    DifficultQuestion: [
      'Kho Qua di',
      'fasldkjflkasdjfklasjdfklasjdflajks',
      'fasdkfjaskldfjklasjdfaskdfjaslkdfj',
    ],
    DidNotFinish: [
      {
        name: 'Nguyễn Phạm Quang Định',
        questions: 4,
      },
      {
        name: 'Phạm Khánh Duy',
        questions: 2,
      },
      {
        name: 'Khánh Duy Pon Pham AAA',
        questions: 5,
      },
    ],
  };
  return (
    <div className={styles.container}>
      <div className={styles.analysis}>
        <div className={styles.chart}>
          <div>
            <Progress
              type="circle"
              // trailColor={'#f5222d'}
              strokeColor={'#a0d911'}
              percent={report.PercentSuccess}
              width={140}
              format={(percent) => {
                return (
                  <div>
                    <div style={{ fontSize: 32 }}>{percent}%</div>
                    <div style={{ fontSize: 18 }}>Success</div>
                  </div>
                );
              }}
            />
          </div>
          <div>
            <Progress
              type="circle"
              trailColor={'#f5222d'}
              strokeColor={'#a0d911'}
              percent={report.PercentPass}
              width={140}
              format={(percent) => {
                return (
                  <div>
                    <div style={{ fontSize: 32 }}>{percent}%</div>
                    <div style={{ fontSize: 18 }}>Pass</div>
                  </div>
                );
              }}
            />
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.infoPicture}>
            <FileTextTwoTone twoToneColor="#63b1f6" style={{ fontSize: 200 }} />
          </div>
          <div className={styles.infoContainer}>
            <div className={styles.detailInfo}>
              <div style={{ fontSize: 17 }}>Users</div>

              <div className={styles.information}>
                <UserOutlined style={{ color: '#63b1f6', fontSize: '20px' }} />
                <div>{report.Users}</div>
              </div>
            </div>
            <div className={styles.detailInfo}>
              <div style={{ fontSize: 17 }}>Questions</div>

              <div className={styles.information}>
                <QuestionOutlined style={{ color: '#63b1f6', fontSize: '20px' }} />
                <div>{report.Questions}</div>
              </div>
            </div>
            <div className={styles.detailInfo}>
              <div style={{ fontSize: 17 }}>Time</div>
              <div className={styles.information}>
                <FieldTimeOutlined style={{ color: '#63b1f6', fontSize: '20px' }} />
                <div>{report.Time}</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.getReport}>
          <div className={styles.getReportTitle}>Get your report here</div>
          <DownloadOutlined style={{ fontSize: 100 }} />
        </div>
      </div>
      <div className={styles.detail}>
        <Card
          title={
            <div className={styles.cardTitle}>
              <div className={styles.cardTitleLeft}>
                <div style={{ marginRight: 20 }}>Diffcult questions</div>
                <Tag color="#f50">0</Tag>
              </div>
              <div className={styles.cardTitleRight}>
                <QuestionCircleOutlined />
              </div>
            </div>
          }
          // bordered={false}
          style={{ width: '70vw', marginRight: '20px' }}
        >
          {report.DifficultQuestion.map((item) => {
            return (
              <div style={{ borderBottom: '1px solid #edecec', padding: '15px 0px' }}>{item}</div>
            );
          })}

          {report.DifficultQuestion.length === 0 ? (
            <p style={{ textAlign: 'center' }}>No one found any questions too challenging.</p>
          ) : null}
        </Card>

        <Card
          title={
            <div className={styles.cardTitle}>
              <div className={styles.cardTitleLeft}>
                <div style={{ marginRight: 20 }}>Didn’t finish</div>
                <Tag color="#63b1f6">3</Tag>
              </div>
              <div className={styles.cardTitleRight}>
                <QuestionCircleOutlined />
              </div>
            </div>
          }
          bordered={false}
          style={{ width: '30vw' }}
        >
          {report.DidNotFinish.map((item) => {
            return (
              <div
                style={{
                  borderBottom: '1px solid #edecec',
                  padding: '15px 0px',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <div>{item.name}</div>
                <div>{item.questions}</div>
              </div>
            );
          })}

          {report.DifficultQuestion.length === 0 ? (
            <p style={{ textAlign: 'center' }}>No one found any questions too challenging.</p>
          ) : null}
        </Card>
      </div>
    </div>
  );
};

export default Summary;
