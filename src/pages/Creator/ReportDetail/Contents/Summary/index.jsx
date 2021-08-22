import React from 'react';
import styles from './index.less';
import { Progress, Card, Tag, Tooltip } from 'antd';
import {
  UserOutlined,
  FileTextTwoTone,
  QuestionOutlined,
  FieldTimeOutlined,
  DownloadOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { exportToCSV } from '@/components/ExportCSV';
import Constants from '@/utils/constants';

const Summary = ({ summaryReport, summaryUser }) => {
  return (
    <div className={styles.container}>
      <div className={styles.analysis}>
        <div className={styles.chart}>
          <Tooltip placement="topLeft" title={'Percentage of users correct all'}>
            <div>
              <Progress
                type="circle"
                // trailColor={'#f5222d'}
                strokeColor={'#a0d911'}
                percent={summaryReport?.PercentSuccess}
                width={140}
                format={(percent) => {
                  return (
                    <div>
                      <div style={{ fontSize: 32 }}>{percent}%</div>
                      <div style={{ fontSize: 18 }}>Perfect</div>
                    </div>
                  );
                }}
              />
            </div>
          </Tooltip>
          <Tooltip placement="topLeft" title={'Percentage of users pass'}>
            <div>
              <Progress
                type="circle"
                trailColor={'#f5222d'}
                strokeColor={'#a0d911'}
                percent={summaryReport?.PercentPass}
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
          </Tooltip>
        </div>
        <div className={styles.info}>
          {window.innerWidth > Constants.MIN_SCREEN_WIDTH && (
            <div className={styles.infoPicture}>
              <FileTextTwoTone twoToneColor="#63b1f6" style={{ fontSize: 200 }} />
            </div>
          )}

          <div className={styles.infoContainer}>
            <div className={styles.detailInfo}>
              <div style={{ fontSize: 17 }}>Users</div>

              <div className={styles.information}>
                <UserOutlined style={{ color: '#63b1f6', fontSize: '20px' }} />
                <div>{summaryReport?.numOfUser}</div>
              </div>
            </div>
            <div className={styles.detailInfo}>
              <div style={{ fontSize: 17 }}>Questions</div>

              <div className={styles.information}>
                <QuestionOutlined style={{ color: '#63b1f6', fontSize: '20px' }} />
                <div>{summaryReport?.numOfQuestion}</div>
              </div>
            </div>
            <div className={styles.detailInfo}>
              <div style={{ fontSize: 17 }}>Time</div>
              <div className={styles.information}>
                <FieldTimeOutlined style={{ color: '#63b1f6', fontSize: '20px' }} />
                <div>{summaryReport?.time}</div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={styles.getReport}
          onClick={() => {
            if (summaryUser && summaryReport) {
              exportToCSV(summaryUser, summaryReport);
            }
          }}
        >
          <div className={styles.getReportTitle}>Get your report here</div>
          <DownloadOutlined style={{ fontSize: 100 }} />
        </div>
      </div>
      <div className={styles.detail}>
        <Card
          title={
            <div className={styles.cardTitle}>
              <div className={styles.cardTitleLeft}>
                <div style={{ marginRight: 20 }}>Difficult questions</div>
                <Tag color="#f50">0</Tag>
              </div>
              <div className={styles.cardTitleRight}>
                <QuestionCircleOutlined />
              </div>
            </div>
          }
          // bordered={false}
          style={{
            width: window.innerWidth < Constants.MIN_SCREEN_WIDTH ? '100%' : '70vw',
            marginRight: 20,
            marginBottom: window.innerWidth < Constants.MIN_SCREEN_WIDTH ? 20 : 0,
          }}
        >
          {summaryReport?.DifficultQuestion?.map((item) => {
            return (
              <div style={{ borderBottom: '1px solid #edecec', padding: '15px 0px' }}>{item}</div>
            );
          })}

          {summaryReport?.DifficultQuestion?.length === 0 ? (
            <p style={{ textAlign: 'center' }}>No one found any questions too challenging.</p>
          ) : null}
        </Card>

        <Card
          title={
            <div className={styles.cardTitle}>
              <div className={styles.cardTitleLeft}>
                <div style={{ marginRight: 20 }}>Did not finish</div>
                <Tag color="#63b1f6">{summaryReport?.listNotFinish?.length}</Tag>
              </div>
              <div className={styles.cardTitleRight}>
                <QuestionCircleOutlined />
              </div>
            </div>
          }
          bordered={false}
          style={{ width: window.innerWidth < Constants.MIN_SCREEN_WIDTH ? '100%' : '30vw' }}
        >
          {summaryReport?.listNotFinish?.map((item) => {
            return (
              <div
                style={{
                  borderBottom: '1px solid #edecec',
                  padding: '15px 0px',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <div>{item.userName}</div>
                <div>{item.number}</div>
              </div>
            );
          })}

          {summaryReport?.listNotFinish?.length === 0 ? (
            <p style={{ textAlign: 'center' }}>No one found any questions too challenging.</p>
          ) : null}
        </Card>
      </div>
    </div>
  );
};

export default Summary;
