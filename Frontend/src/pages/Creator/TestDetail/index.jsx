import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { Button, Modal, Upload, Select, message, List, ConfigProvider } from 'antd';
import { CheckCircleFilled, CloseCircleFilled, UploadOutlined } from '@ant-design/icons';
import { connect, useHistory, getLocale } from 'umi';
import PageLoading from '@/components/PageLoading';
import NotFound from '@/pages/404';
import MDEditor from '@uiw/react-md-editor';
import _ from 'lodash';
import * as XLSX from 'xlsx';
import '@/components/GlobalHeader/style.less';

const TestDetail = ({ dispatch, location }) => {
  const history = useHistory();
  const [test, setTest] = useState({
    generalInformation: {},
    listQuestion: [],
  });
  const [loading, setLoading] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [listInvitedEmail, setListInvitedEmail] = useState([]);

  const setTestInformation = (testObject) => {
    setTest(testObject);
    setLoading(false);
  };

  const closeModal = () => {
    setVisibleModal(false);
  };

  useEffect(() => {
    if (location.query.id) {
      setLoading(true);
      dispatch({
        type: 'test/getTestByIdModel',
        payload: { id: location.query.id, callback: setTestInformation },
      });
      dispatch({
        type: 'test/getInvitedEmailList',
        payload: {
          testID: location.query.id,
          onSuccess: (data) => {
            setListInvitedEmail(data);
          },
          onFail: () => {
            message.error('Cannot load invited email list, something wrong happened !!!');
          },
        },
      });
    }
  }, [location]);

  const handleEditClick = () => {
    history.push({
      pathname: '/creator/tests/editTest',
      query: {
        id: location.query.id,
      },
    });
  };

  if (loading) return <PageLoading />;
  if (test)
    return (
      <ConfigProvider locale={getLocale()}>
        <div className={styles.container}>
          <div className={styles.left}>
            <div className={styles.testName}>{test.generalInformation?.TestName}</div>

            <div className={styles.otherInfo}>
              <p>
                <b>Permission: </b>
                {test.generalInformation?.Permissions || 'Public'}
              </p>

              <p>
                <b>TestCode: </b>
                {test.generalInformation?.TestCode}
              </p>

              <p>
                <b>Time: </b>
                {test.generalInformation?.TestTime}
              </p>
              <p>
                <b className={styles.bold}>Do again: </b>
                {test.generalInformation?.Again || 'false'}
              </p>
              <p>
                <b className={styles.bold}>Total of questions: </b>
                {test.listQuestion?.length}
              </p>
              <p>
                <b className={styles.bold}>Max score: </b>
                {test.generalInformation?.MaxScore} marks
              </p>
              {test.generalInformation?.StartTime && (
                <p>
                  <b className={styles.bold}>Start date: </b>
                  {test.generalInformation?.StartTime} marks
                </p>
              )}

              {test.generalInformation?.EndTime && (
                <p>
                  <b className={styles.bold}>End Time: </b>
                  {test.generalInformation?.EndTime} marks
                </p>
              )}
            </div>
            <div className={styles.editContainer}>
              <Button type="primary" onClick={handleEditClick}>
                Edit
              </Button>
              <Button
                type="primary"
                onClick={() => setVisibleModal(true)}
                style={{ marginLeft: 10 }}
              >
                Invite
              </Button>
            </div>
          </div>

          <div className={styles.right}>
            <h3>Questions</h3>
            <Question list={test?.listQuestion} />
          </div>
          <InviteModal
            isModalVisible={visibleModal}
            testID={location.query?.id}
            closeModal={closeModal}
            dispatch={dispatch}
            listInvitedList={listInvitedEmail}
            setListInvitedEmail={setListInvitedEmail}
          />
        </div>
      </ConfigProvider>
    );

  if (!test) {
    return <NotFound />;
  }
};

const Question = ({ list }) => {
  const checkCorrect = (listCorrect, index) => {
    return listCorrect.includes(index);
  };
  return list?.map((item) => {
    return (
      <div className={styles.questionContainer} key={item.ID}>
        <span className={styles.questionHead}>
          <div><b>ID:</b>{` ${item.ID} - ${item.QuestionType}`}</div>
          <div className={styles.mark}>{`Score: ${item.Score} `}mark(s)</div>
          
        </span>
        <div className={styles.question}>{item.Question}</div>
        
        <b>Description: </b>
        <br/>
        <MDEditor.Markdown className="problem" source={item.Description}></MDEditor.Markdown>
        <br/>
        {item.QuestionType === 'Code' ? (
          <div>
            <div>
              <b>Language Allowed: </b>
              {item.Language_allowed}
            </div>
            <div>
              <b>Memory Usage: </b>
              {item.MemoryUsage}
            </div>
            <div>
              <b>Running Time: </b>
              {item.RunningTime}
            </div>
            <div>
              <b>CodeSample: </b>
              <br />
              <MDEditor.Markdown
                className="problem"
                source={`\`\`\` \n${item?.CodeSample}\n\`\`\`` || 'Empty'}
              ></MDEditor.Markdown>
              <br />
            </div>
            {item?.TestCase?.map((tc, index) => {
              return (
                <div className={styles.multipleChoiceContainer}>
                  <div className={styles.answer}>
                    <div>Input: </div>
                    <div>{tc.Input}</div>
                  </div>
                  <div className={styles.answer}>
                    <div>Output: </div>
                    <div>{tc.Output}</div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <>
            <div>
              <b>CodeSample: </b>
              <MDEditor.Markdown
                className="problem"
                source={`\`\`\`\n${item?.CodeSample}\n\`\`\`` || 'Empty'}
              ></MDEditor.Markdown>
              <br />
            </div>
            {item?.Answer?.map((choice, index) => {
              return (
                <div className={styles.multipleChoiceContainer}>
                  <div className={styles.answer}>{choice}</div>
                  <div className={styles.answer}>
                    {checkCorrect(item.CorrectAnswer, index) ? (
                      <CheckCircleFilled style={{ color:"green", fontSize: '32px' }} />
                    ) : (
                      <CloseCircleFilled  style={{ color:"red", fontSize: '32px' }} />
                    )}
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    );
  });
};

const InviteModal = ({
  isModalVisible,
  closeModal,
  dispatch,
  listInvitedList,
  testID,
  setListInvitedEmail,
}) => {
  const [listEmail, setListEmail] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [sendLoading, setSendLoading] = useState(false);
  const readFileContent = (file) => {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = (event) => {
        try {
          const bstr = event.target.result;
          const wb = XLSX.read(bstr, { type: 'binary' });
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          resolve(ws);
        } catch (error) {
          reject('You must upload xlxs file !!!');
        }
      };
      reader.onerror = (error) => reject('Something wrong happened !!!!');
      reader.readAsBinaryString(file);
    });
  };

  const sendInvite = () => {
    setSendLoading(true);

    dispatch({
      type: 'test/inviteUser',
      payload: {
        testID,
        listEmail: _.difference(listEmail, listInvitedList),
        onSuccess: () => {
          message.success('Send invite successfully !!!');
          setSendLoading(false);
          dispatch({
            type: 'test/getInvitedEmailList',
            payload: {
              testID,
              onSuccess: (data) => {
                setListInvitedEmail(data);
              },
              onFail: () => {
                // message.error('Cannot load invited email list, something wrong happened !!!');
              },
            },
          });
          closeModal();
          setListEmail([]);
          setFileList([]);
        },
        onFail: () => {
          message.error('Cannot send invite, something wrong happened !!!');
          setSendLoading(false);
          closeModal();
          setListEmail([]);
          setFileList([]);
        },
      },
    });
  };

  const handleUpload = () => {
    const newListEmail = [];
    setUploading(true);
    readFileContent(fileList[0])
      .then((content) => {
        Object.values(content).forEach((item) => {
          if (typeof item === 'object' && item.h) {
            newListEmail.push(item.h);
          }
        });
        setListEmail(_.union(listEmail, newListEmail));
        setFileList([]);
        setUploading(false);
      })
      .catch((error) => {
        message.error(error);
        setFileList([]);
        setUploading(false);
      });
  };

  const handleChange = (value) => {
    setListEmail(_.uniq(value));
  };

  const props = {
    onRemove: (file) => {
      setFileList([]);
    },
    beforeUpload: (file) => {
      setFileList([file]);
    },
    fileList,
  };
  return (
    <Modal
      title="Invite User By Email"
      visible={isModalVisible}
      okText="Send invite"
      onOk={sendInvite}
      onCancel={closeModal}
      confirmLoading={sendLoading}
      width={1000}
    >
      <div className={`custom`}>
        <div style={{ width: '100%', marginBottom: 10 }}>
          <Select
            placeholder="Please select which student you want to send mail"
            mode="tags"
            onChange={handleChange}
            style={{ width: '100%' }}
            value={listEmail}
            open={false}
          >
            {listEmail.map((email) => {
              return <Option key={email}>{email}</Option>;
            })}
          </Select>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
          <Upload {...props} maxCount={1}>
            <Button icon={<UploadOutlined />} style={{ marginRight: 12 }}>
              Select Excel File
            </Button>
          </Upload>
          <Button
            type="primary"
            onClick={handleUpload}
            disabled={fileList.length === 0}
            loading={uploading}
          >
            {uploading ? 'Uploading' : 'Start Upload'}
          </Button>
        </div>
        <div style={{ marginTop: 20, maxHeight: 500, overflowY: 'scroll' }}>
          <List
            size="small"
            header={<b>Invited list</b>}
            bordered
            dataSource={listInvitedList}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
        </div>
      </div>
    </Modal>
  );
};

export default connect(({ test: { testById } }) => ({
  test: testById,
}))(TestDetail);
