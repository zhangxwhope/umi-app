import { IRouteComponentProps } from 'umi'
import React from 'react'
import { history } from 'umi';

if (history.location.pathname === '/') history.push('/home') // 重定向到子路由

export default function Layout(props: IRouteComponentProps) {
  const childrenWithProps  = React.Children.map(props.children, child => React.cloneElement(child, { foo: 'bar' }))
  return <div>Layout { childrenWithProps }</div>
}