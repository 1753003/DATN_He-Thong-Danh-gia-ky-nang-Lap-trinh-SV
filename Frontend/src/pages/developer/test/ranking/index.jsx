import React from 'react';
import { connect } from 'dva';
import { history } from 'umi';
import { PageHeader, Table } from 'antd'
import PageLoading from '@/components/PageLoading';
import moment from 'moment';
import Language from '@/locales/index';
class Ranking extends React.Component {
    constructor(props) {
        super(props);
        let id = props.location.state.id;
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
                title: `${Language.ranking_no}`,
                dataIndex: 'key'
            },
            {
                title: `${Language.ranking_username}`,
                dataIndex: 'UserName',
            },
            {
                title: `${Language.ranking_doingTime}`,
                dataIndex: 'DoingTime'
            },
            {
                title: `${Language.ranking_score}`,
                dataIndex: 'Score'
            },  
            {
                title: `${Language.ranking_correctPer}`,
                dataIndex: 'CorrectPercent'
            },
            {
                title: `${Language.ranking_date}`,
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
                    title={Language.pages_test_ranking}
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
  