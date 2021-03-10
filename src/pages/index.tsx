// import styles from './index.less';
// import AsyncComponent from '../components/AsyncComponent'
// import { Button } from 'antd-mobile'
import { FC } from 'react';
import { IndexModelState, ConnectProps, Loading, connect } from 'umi';
import { homeBaseURL } from '../../public/config/index.js';
interface PageProps extends ConnectProps {
  index: IndexModelState;
  loading: boolean;
}

const IndexPage: FC<PageProps> = (props: any) => {
  let homeSrc = ''; // console.log(props, 'props')

  const { userInfo, personalInfo, loginState } = props.index;

  if (loginState) {
    const { cardtype = '', cardno = '' } = personalInfo;
    const { loginName = '' } = userInfo;

    if (cardtype && cardno) {
      homeSrc = `${homeBaseURL}#/homepage?thirdCall=1&userId=${loginName}&zjlx=${cardtype}&zjhm=${cardno}&loginState=1`;
    } else {
      // TODO 获取个人信息
      props.query();
    }
  } else {
    homeSrc = `${homeBaseURL}#/homepage?thirdCall=1&loginState=0`;
  }

  return (
    <div className="home-wrapper">
      {/* <h1 className={styles.title}>Page index</h1>
      <Button type="primary">click</Button>
      <AsyncComponent /> */}
      <iframe src={homeSrc} className="home-frame">
        <p>Your browser does not support iframes.</p>
      </iframe>
    </div>
  );
};

export default connect(
  ({ index, loading }: { index: IndexModelState; loading: Loading }) => ({
    index,
    loading: loading.models.index,
  }),
  {
    query: (payload: any) => {
      return {
        type: 'index/query',
        payload,
      };
    },
  }
)(IndexPage);
