import { PageLoading } from '@ant-design/pro-layout'; // loading components from code split
// https://umijs.org/plugin/umi-plugin-react.html#dynamicimport
// import { Spin } from 'antd';
// import Icon, { LoadingOutlined } from '@ant-design/icons';
import styles from './style.less'
// import lg from "@/assets/rsz_lg.png";

// const logo = () => (
//   <img src={lg} />
// );
// const antIcon = <Icon component={logo} style={{ fontSize: 24 }} spin />;
// const PageLoading = () =>{
//   return <div className={styles.body}>
//     <Spin className={styles.spin} indicator={antIcon} />
//   </div> 
// }
// import PropTypes from 'prop-types';
// import TweenOne from 'rc-tween-one';

// const p0 = 'M0,100 L25,100 C34,20 40,0 100,0';
// const p1 = 'M0,100 C5,120 25,130 25,100 C30,60 40,75 58,90 C69,98.5 83,99.5 100,100';
// const ease0 = TweenOne.easing.path(p0);
// const ease1 = TweenOne.easing.path(p1);
// class PageLoading extends React.Component {
//   constructor(props) {
//     super(props);
//     this.animation = [
//       {
//         repeatDelay: 500,
//         y: -70,
//         repeat: -1,
//         yoyo: true,
//         ease: ease0,
//         duration: 1000
//       },
//       {
//         repeatDelay: 500,
//         appearTo: 0,
//         scaleX: 0,
//         scaleY: 2,
//         repeat: -1,
//         yoyo: true,
//         ease: ease1,
//         duration: 1000,
//       }
//     ];
//   }

//   render() {
//     return (
//       <div className={styles.body}>
//         <TweenOne 
//           animation={this.animation}
//           paused={false}
//           className={styles.spin}
//           style={{
//             position: 'absolute',
//             transformOrigin: 'center bottom',
//           }}
//         />
//       </div>
//     );
//   }
// }
export default PageLoading;
