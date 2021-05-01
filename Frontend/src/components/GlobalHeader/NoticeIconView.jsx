import React, { Component } from 'react';
import { connect } from 'umi';
import { Tag, message, Spin } from 'antd';
import groupBy from 'lodash/groupBy';
import moment from 'moment';
import NoticeIcon from '../NoticeIcon';
import styles from './index.less';
import './style.less'
import firebase from '@/utils/firebase'
class GlobalHeaderRight extends Component {
  constructor (props){
    super(props)
    this.state = {
      loading:true,
      loadingMore: false,
      limit: 5,
      viewMoreText:"Load More"
    }
  }
  componentDidMount(){
    const { dispatch } = this.props;
    this.fb(dispatch)
    console.log(firebase.auth().currentUser)
    if (firebase.auth().currentUser !== null) 
        console.log("user id: " + firebase.auth().currentUser.uid);
  }
  fb = (dispatch) =>{
    const notiRef = firebase.database().ref(`notifications/zcwVw4Rjp7b0lRmVZQt6ZXmspql1`).orderByChild('datetime').limitToFirst(this.state.limit)
    let temp = [];
    notiRef.on('value', (snapshot)=>{
      temp = []
      snapshot.forEach((childSnapshot) => {
        let tmp = {}
        tmp.key = childSnapshot.key;
        tmp.read = childSnapshot.val().read;
        tmp.title = childSnapshot.val().description;
        tmp.datetime = childSnapshot.val().datetime;
        tmp.type = childSnapshot.val().type
        // ...
        temp.push(tmp)
      });
      
      if (dispatch) {
        this.setState({
          loading: false,
          loadingMore: false
        }, () =>
        dispatch({
          type: 'global/fetchNotices',
          payload: temp
        }))
        ;
      }
    })
    
  }

  changeReadState = (clickedItem) => {
    const { key } = clickedItem;
    const { dispatch } = this.props;
    if(clickedItem.read) return
    if (dispatch) {
      dispatch({
        type: 'global/changeNoticeReadState',
        payload: key,
      });
    }
  };

  handleNoticeClear = () => { // mark all as read
    const notiRef = firebase.database().ref(`notifications/zcwVw4Rjp7b0lRmVZQt6ZXmspql1`);
    notiRef.once('value', (snapshot)=>{
      snapshot.forEach(function(child) {
        child.ref.update({read: true});
    });
    firebase.database().ref(`users/zcwVw4Rjp7b0lRmVZQt6ZXmspql1`).update({unreadCount: 0})
  });
}

  getNoticeData = () => {
    const { notices } = this.props;
    if (!notices || notices.length === 0 || !Array.isArray(notices)) {
      return {};
    }

    const newNotices = notices.map((notice) => {
      const newNotice = { ...notice };

      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime).locale('en').fromNow();
      }

      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }

      if ( newNotice.type) {
        const color = {
          Notification:'green',
          todo: '',
          processing: 'blue',
          urgent: 'red',
          doing: 'gold',
        }[newNotice.type];
        newNotice.extra = (
          <Tag
            color={color}
            style={{
              marginRight: 0,
            }}
          >
            {newNotice.type}
          </Tag>
        );
      }

      return newNotice;
    });
    return groupBy(newNotices, 'type');
  };

  getUnreadData = (noticeData) => {
    const unreadMsg = {};
    Object.keys(noticeData).forEach((key) => {
      const value = noticeData[key];

      if (!unreadMsg[key]) {
        unreadMsg[key] = 0;
      }

      if (Array.isArray(value)) {
        unreadMsg[key] = value.filter((item) => !item.read).length;
      }
    });
    return unreadMsg;
  };
  handleViewMore = () =>{
    this.setState({limit: this.state.limit + 5,
    loadingMore: !this.state.loadingMore},
    ()=>{
      this.fb(this.props.dispatch)
      if(this.state.limit >=this.props.currentUser.totalNotiCount)
      this.setState({
        viewMoreText:``
    })
    }
    )
  }
  render() {
    const { currentUser, onNoticeVisibleChange } = this.props;
    const noticeData = this.getNoticeData();
    const unreadMsg = this.getUnreadData(noticeData);
    return (
      <Spin 
      size='small' 
      spinning={this.state.loading} 
      >
          <NoticeIcon
        className={`${styles.action} custom`}
        count={currentUser && currentUser.unreadCount}
        onItemClick={(item) => {
          this.changeReadState(item);
        }}
        loading={this.state.loading}
        clearText="Read All"
        viewMoreText={this.state.viewMoreText}
        onClear={this.handleNoticeClear}
        onPopupVisibleChange={onNoticeVisibleChange}
        onViewMore={this.handleViewMore}
        clearClose
      >
        <NoticeIcon.Tab
        className="custom"
          tabKey="notification"
          count={unreadMsg.Notification}
          list={noticeData.Notification}
          title="Notifications"
          emptyText="You don't have any notifications."
          showViewMore
          loading = {this.state.loadingMore}
        />
        {/* <NoticeIcon.Tab
          tabKey="message"
          count={unreadMsg.message}
          list={noticeData.message}
          title="消息"
          emptyText="您已读完所有消息"
          showViewMore
        />
        <NoticeIcon.Tab
          tabKey="event"
          title="待办"
          emptyText="你已完成所有待办"
          count={unreadMsg.event}
          list={noticeData.event}
          showViewMore
        /> */}
      </NoticeIcon>
    
        </Spin>
      );
  }
}

export default connect(({ user, global }) => ({
  currentUser: user.currentUser,
  collapsed: global.collapsed,
  notices: global.notices,
}))(GlobalHeaderRight);
