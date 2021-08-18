import React from 'react';
import * as FileSaver from 'file-saver';
import { Button } from 'antd';
import * as XLSX from 'xlsx';
import { DownloadOutlined } from '@ant-design/icons';
import styles from './index.less';
const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const fileExtension = '.xlsx';

export const exportToCSV = (summaryUser, summaryReport) => {
  console.log('tt', summaryUser);
  console.log('tt', summaryReport);
  const refactorDataUser = [];
  const refactorDataSummary = [];
  const refactorDataDidFinish = [];

  summaryUser.forEach((item) => {
    const { UserName, Rank, CorrectPercent, AnsweredNumber, Score } = item;
    const newItem = {
      'User Name': UserName,
      Rank,
      'Correct Percent': `${CorrectPercent}%`,
      'Answered Number': AnsweredNumber,
      Score,
    };
    refactorDataUser.push(newItem);
  });

  const {
    PercentPass,
    PercentSuccess,
    ReportName,
    numOfQuestion,
    numOfUser,
    time,
    listNotFinish,
  } = summaryReport;
  const newItem = {
    'Percent Perfect': PercentPass,
    PercentSuccess: PercentSuccess,
    'Test Name': ReportName,
    'Number of questions': numOfQuestion,
    'Number of Users': numOfUser,
    'Test Time': time,
  };
  listNotFinish.forEach((user) => {
    const newUser = {
      'User Name': user.userName,
    };
    refactorDataDidFinish.push(newUser);
  });
  refactorDataSummary.push(newItem);

  const wsUser = XLSX.utils.json_to_sheet(refactorDataUser);
  const wsSummary = XLSX.utils.json_to_sheet(refactorDataSummary);
  const wsUserDidNotFinish = XLSX.utils.json_to_sheet(refactorDataDidFinish);
  const wb = {
    Sheets: {
      Summary: wsSummary,
      'User Report': wsUser,
      'User Did Not Finish': wsUserDidNotFinish,
    },
    SheetNames: ['Summary', 'User Report', 'User Did Not Finish'],
  };
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const data = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(data, `Report${fileExtension}`);
};

const ExportCSV = ({ summaryUser, summaryReport, listType }) => {
  return (
    <Button
      onClick={() => {
        exportToCSV(summaryUser, summaryReport);
      }}
      className={styles.button}
    >
      <DownloadOutlined />
      Export
    </Button>
  );
};

export default ExportCSV;
