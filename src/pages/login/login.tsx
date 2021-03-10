import styles from './login.less';
import { IRouteComponentProps, Loading, connect } from 'umi';
import { List, Button, InputItem, Checkbox } from 'antd-mobile';
import { createForm } from 'rc-form';
import sha1 from 'sha1';

const Item = List.Item;
const AgreeItem = Checkbox.AgreeItem;

const NormalLoginForm = (props: IRouteComponentProps) => {
  const { dispatch } = props;
  const { getFieldProps, getFieldsValue } = props.form;

  const onFinish = () => {
    const values = getFieldsValue();
    console.log('Received values of form:', values);
    const { username, password } = values;
    dispatch({
      type: 'index/login',
      payload: {
        username,
        password: sha1(password).toUpperCase(), // 密码SHA1加密，转换大写
        appType: '5', // 移动端登录
      },
    });
  };

  return (
    <div className={styles.loginWrapper}>
      <List>
        <Item>
          <InputItem
            {...getFieldProps('username', {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: 'Please input your Username!',
                },
              ],
            })}
            name="username"
            placeholder="Username"
          ></InputItem>
        </Item>
        <Item>
          <InputItem
            {...getFieldProps('password', {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ],
            })}
            type="password"
            name="password"
            placeholder="Password"
          ></InputItem>
        </Item>
        <Item>
          <AgreeItem data-seed="remember" defaultChecked>
            Remember me
          </AgreeItem>
        </Item>
        <Item>
          <Button type="primary" onClick={onFinish}>
            Log in
          </Button>
        </Item>
      </List>
    </div>
  );
};

const NormalLoginFormWrap = createForm()(NormalLoginForm);

export default connect(({ loading }: { loading: Loading }) => ({
  loading: loading.models.index,
}))(NormalLoginFormWrap);
