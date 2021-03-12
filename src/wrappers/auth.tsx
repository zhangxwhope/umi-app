import { Redirect, IRouteComponentProps } from 'umi';

export default (props: IRouteComponentProps) => {
  // const { isLogin } = useAuth()
  const isLogin = true;
  if (isLogin) {
    return <div>{props.children}</div>;
  } else {
    return <Redirect to="/login" />;
  }
};
