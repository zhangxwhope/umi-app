import type { FC } from 'react';
import { useState } from 'react';
import { Form, Input, Select, Button } from 'antd';
import type { Dispatch } from 'umi';
import type { StateType } from './model';
import styles from './style.less';
import { login } from './service';
import sha1 from 'sha1';

const FormItem = Form.Item;
const { Option } = Select;

type UserLoginProps = {
  userLogin: StateType;
  dispatch: Dispatch;
};

enum LoginType {
  USER, // 账号
  FACE, // 人脸
  CA, // CA
}

const showTitle = (type: number) => {
  switch (type) {
    case LoginType.USER:
      return {
        cn: '用户账号登录',
        en: 'User account login',
      };
    case LoginType.CA:
      return {
        cn: 'CA账号登录',
        en: 'CA account login',
      };
    case LoginType.FACE:
      return {
        cn: '欢迎登录',
        en: 'Welcome aboard',
      };
    default:
      return {};
  }
};

const UserLogin: FC<UserLoginProps> = ({ userLogin, dispatch }) => {
  const [loginLoading, setLoginLoading] = useState<boolean>(false);
  const [currentType, setCurrentType] = useState<number>(LoginType.USER);
  const [showErrorTitle, setShowErrorTitle] = useState<boolean>(false);
  const [showNumberModel, setShowNumberModel] = useState<boolean>(true);

  const [form] = Form.useForm();
  const [caForm] = Form.useForm();

  const { cn = '', en = '' } = showTitle(currentType);

  const chooseLogin = (type: number) => {
    setCurrentType(type);
  };

  const onFinish = async (values: any) => {
    console.log('Success:', values);
    const { username, password } = values;
    await login({
      username: username,
      password: sha1(password).toUpperCase(),
    });
  };

  // 用户账号登录
  const userContent = () => {
    return (
      <>
        <Form
          name="user-form"
          form={form}
          className={styles.loginForm}
          onFinish={onFinish}
        >
          <FormItem className={styles.formItemWrapper}>
            <FormItem
              name="username"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input
                placeholder="请输入用户名"
                size="large"
                allowClear
                bordered={false}
                maxLength={40}
              />
            </FormItem>
            <img
              className={styles.formItemIcon}
              src={require('@/assets/images/icon-name.png')}
            />
          </FormItem>
          <FormItem className={styles.formItemWrapper}>
            <FormItem
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input
                type="password"
                placeholder="请输入密码"
                size="large"
                allowClear
                bordered={false}
                maxLength={40}
              />
            </FormItem>
            <img
              className={styles.formItemIcon}
              src={require('@/assets/images/icon-pwd.png')}
            />
          </FormItem>
          <FormItem>
            <Button
              className={styles.loginBtn}
              type="primary"
              htmlType="submit"
              shape="round"
              size="large"
              block
              loading={loginLoading}
            >
              登 录
            </Button>
          </FormItem>
          <FormItem>
            <div className={`${styles.forgetTip} clearfix`}>
              <a
                className={`${styles.operateLink} fl`}
                onClick={() => chooseLogin(LoginType.CA)}
              >
                CA账号登录
              </a>
              <a className={`${styles.operateLink} fr`}>卫宁浏览器下载</a>
            </div>
          </FormItem>
        </Form>
        <div className={styles.rightTopImg}>
          <img
            src={require('@/assets/images/login-face.png')}
            onClick={() => chooseLogin(LoginType.FACE)}
          />
        </div>
      </>
    );
  };

  // CA账号登录
  const caContent = () => {
    const options: any[] = [];

    return (
      <>
        <Form name="ca-form" form={caForm} className={styles.loginForm}>
          <FormItem className={styles.formItemWrapper}>
            <FormItem
              name="caName"
              rules={[{ required: true, message: '请选择用户名' }]}
            >
              <Select size="large" placeholder="请选择用户名" bordered={false}>
                {options.map((item) => (
                  <Option value={item.value}>{item.label}</Option>
                ))}
              </Select>
            </FormItem>
            <img
              className={styles.formItemIcon}
              src={require('@/assets/images/icon-name.png')}
            />
          </FormItem>
          <FormItem className={styles.formItemWrapper}>
            <FormItem
              name="pinCode"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input
                type="password"
                placeholder="请输入密码"
                size="large"
                allowClear
                bordered={false}
                maxLength={40}
              />
            </FormItem>
            <img
              className={styles.formItemIcon}
              src={require('@/assets/images/icon-pwd.png')}
            />
          </FormItem>
          <FormItem>
            <Button
              className={styles.loginBtn}
              type="primary"
              htmlType="submit"
              shape="round"
              size="large"
              block
              loading={loginLoading}
            >
              登 录
            </Button>
          </FormItem>
          <FormItem>
            <div className={`${styles.forgetTip} clearfix`}>
              <a
                className={`${styles.operateLink} fl`}
                onClick={() => chooseLogin(LoginType.USER)}
              >
                用户账号登录
              </a>
              <a className={`${styles.operateLink} fr`}>卫宁浏览器下载</a>
            </div>
          </FormItem>
        </Form>
        <div className={styles.rightTopImg}>
          <img
            src={require('@/assets/images/login-face.png')}
            onClick={() => chooseLogin(LoginType.FACE)}
          />
        </div>
      </>
    );
  };

  // 人脸登录
  const faceContent = () => {
    let faceTitle = '请对准摄像头，3s后识别登录';
    let showNumber = 3;

    const showNumberContent = () => {
      if (showNumberModel) {
        return <div className={styles.showNumber}>{showNumber}</div>;
      } else {
        return <></>;
      }
    };

    return (
      <>
        <div className={styles.rightTopImg}>
          <img
            src={require('@/assets/images/login-account.png')}
            onClick={() => chooseLogin(LoginType.USER)}
          />
        </div>
        <div
          className={`${styles.titleTip} ${
            showErrorTitle ? styles.errorTitle : ''
          }`}
        >
          {faceTitle}
        </div>
        <div className={styles.personFace}>
          <span className={styles.personTop}>
            <img src={require('@/assets/images/person-top.png')} />
          </span>
          <span className={styles.personRight}>
            <img src={require('@/assets/images/person-right.png')} />
          </span>
          <span className={styles.personBottom}>
            <img src={require('@/assets/images/person-bottom.png')} />
          </span>
          <span className={styles.personLeft}>
            <img src={require('@/assets/images/person-left.png')} />
          </span>
          {showNumberContent()}
          <video id="video" width="220" height="220" loop muted></video>
          <canvas id="canvas" width="220" height="220"></canvas>
        </div>
      </>
    );
  };

  const renderContent = () => {
    if (currentType === LoginType.USER) {
      return userContent();
    }
    if (currentType === LoginType.CA) {
      return caContent();
    }
    if (currentType === LoginType.FACE) {
      return faceContent();
    }
    return <></>;
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginHeader}>
        <img src={require('@/assets/images/logo-login.png')} />
        <span>社区卫生信息系统</span>
      </div>

      <div className={styles.outContain}>
        <div className={styles.loginBodyRight}>
          <p>{cn}</p>
          <div className={styles.titleEnglish}>{en}</div>
          {renderContent()}
        </div>
      </div>

      <div className={styles.loginFooter}>
        Copyright © {new Date().getFullYear()} 卫宁健康
      </div>
    </div>
  );
};

export default UserLogin;
