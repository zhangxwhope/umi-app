import type { Request, Response } from 'express';
import type { TableListItem } from './data.d';

const genList = (current: number | string, pageSize: number | string) => {
  const tableListDataSource = [];

  for (let i = 0; i < pageSize; i += 1) {
    const index = (Number(current) - 1) * 10 + i;
    tableListDataSource.push({
      key: index,
      disabled: i % 6 === 0,
      href: 'https://ant.design',
      avatar: [
        'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
        'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
      ][i % 2],
      name: `TradeCode ${index}`,
      owner: '曲丽丽',
      desc: '这是一段描述',
      callNo: Math.floor(Math.random() * 1000),
      status: (Math.floor(Math.random() * 10) % 4).toString(),
      updatedAt: new Date(),
      createdAt: new Date(),
      progress: Math.ceil(Math.random() * 100),
    });
  }
  tableListDataSource.reverse();
  return tableListDataSource;
};

let tableListDataSource = genList(1, 100);

function getRule(req: Request, res: Response) {
  // const { current = 1, pageSize = 10 } = req.query
  // let dataSource = [...tableListDataSource].slice(
  //   ((current as number) - 1) * (pageSize as number),
  //   (current as number) * (pageSize as number),
  // );

  const dataSource = genList(1, 10);

  // const result = {
  //   data: dataSource,
  //   total: tableListDataSource.length,
  //   success: true,
  //   // pageSize,
  //   // current: parseInt(`${current}`, 10) || 1,
  // };

  return res.json(dataSource);
}

function postRule(req: Request, res: Response) {
  const { method, name, desc, key } = req.body;

  switch (method) {
    case 'post':
      (() => {
        const i = Math.ceil(Math.random() * 10000);
        const newRule = {
          key: tableListDataSource.length,
          href: 'https://ant.design',
          avatar: [
            'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
            'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
          ][i % 2],
          name,
          owner: '曲丽丽',
          desc,
          callNo: Math.floor(Math.random() * 1000),
          status: (Math.floor(Math.random() * 10) % 2).toString(),
          updatedAt: new Date(),
          createdAt: new Date(),
          progress: Math.ceil(Math.random() * 100),
        };
        tableListDataSource.unshift(newRule);
        return res.json(newRule);
      })();
      break;
    case 'delete':
      break;
    case 'update':
      break;
    default:
      break;
  }
}

export default {
  'GET /api/rule': getRule,
  'POST /api/rule': postRule,
};
