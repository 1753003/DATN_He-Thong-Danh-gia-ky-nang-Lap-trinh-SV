import React from 'react';
import { connect } from 'dva';
import { PageHeader, Table } from 'antd'
import PageLoading from '@/components/PageLoading';
import moment from 'moment';
class Ranking extends React.Component {
    constructor(props) {
        super(props);
        let id = props.location.state.ID;
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
                dataIndex: 'CreatedAt',
                render: date => (
                    <p>
                        {moment(date).format("hh:mm:ss DD/MM/YYYY")}
                    </p>
                )
            },
        ]
    }

    render() {
        console.log(this.getData())
        return (
            <>
                <PageHeader
                    className="ranking-page-header"
                    title="Ranking"
                    subTitle={this.props.location.state.name}
                    onBack={() => history.goBack()}
                    />
                <Table loading={{spinning:this.props.loading,indicator:<PageLoading/>}} style= {{width:'100%'}}columns={this.getColumns()} dataSource={this.getData()} />
            </>
        )
    }
}

export default connect(({ testDev, loading }) => ({
    testDev,
    loading: loading.effects['testDev/fetchRankList'],
  }))(Ranking);
  