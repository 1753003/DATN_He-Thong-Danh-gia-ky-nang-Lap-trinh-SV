import React from 'react';
import { FolderAddOutlined } from '@ant-design/icons';

const NoData = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <FolderAddOutlined style={{ fontSize: 40 }} />
      <p>No Data</p>
    </div>
  );
};

export default NoData;
