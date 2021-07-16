import React from 'react';
import { connect } from 'dva';
import { PageHeader, Table } from 'antd'
class Ranking extends React.Component {
    constructor(props) {
        super(props);
        let id = props.location.state;
        console.log(props.location.state)
        this.props.dispatch({
            type: 'testDev/fetchRankList',
            payload: id
        })
    }

    getData = () => {
        let {rankList}  = this.props.testDev ;
        var count = 1;
        rankList.map(e => {
            e.key = count++;
            return e;
        })
        return rankList
    }

    getColumns = () => {
        return [
            {
                title: 'No',
                dataIndex: 'key'
            },
            {
                title: 'Username',
                dataIndex: 'UserName',
            },
            {
                title: 'Doing Time',
                dataIndex: 'DoingTime'
            },
            {
                title: 'Score',
                dataIndex: 'Score'
            },  
            {
                title: 'Correct Percent (%)',
                dataIndex: 'CorrectPercent'
            },
            {
                title: 'Date',
                dataIndex: 'CreatedAt'
            },
        ]
    }

    render() {
        console.log(this.getData())
        return (
            <>
                <PageHeader
                    className="site-page-header"
                    title="Ranking"
                    subTitle="Test ABC"
                    onBack={() => history.goBack()}
                    />
                <Table style= {{width:'100%'}}columns={this.getColumns()} dataSource={this.getData()} />
            </>
        )
    }
}

export default connect(({ testDev, loading }) => ({
    testDev,
    loading: loading.effects['testDev/fetchRankList'],
  }))(Ranking);
  