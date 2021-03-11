import { FC, useEffect } from 'react';
import { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { TableListItem } from './data.d';
import { Button, Input, message } from 'antd';
import CreateForm from './components/CreateForm';
import { addRule, queryRule } from './service';
import { connect } from 'umi';
import type { Dispatch } from 'umi';
import type { StateType } from './model';

/**
 * 添加节点
 *
 * @param fields
 */
const handleAdd = async (fields: TableListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addRule(fields);
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试');
    return false;
  }
};

type tableProps = {
  tableData: StateType;
  dispatch: Dispatch;
  loading: boolean;
};

const Table: FC<tableProps> = (props) => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [row, setRow] = useState<TableListItem>();
  const [selectedRows, setSelectedRows] = useState<TableListItem[]>([]);

  const {
    loading,
    dispatch,
    tableData: { list, total },
  } = props;

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '规则名称',
      dataIndex: 'name',
      tip: '规则名称是唯一的 key',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '规则名称为必填项',
          },
        ],
      },
      render: (dom, entity) => {
        return <a onClick={() => setRow(entity)}>{dom}</a>;
      },
    },
    {
      title: '描述',
      dataIndex: 'desc',
      valueType: 'textarea',
    },
    {
      title: '服务调用次数',
      dataIndex: 'callNo',
      sorter: true,
      hideInForm: true,
      renderText: (val: string) => `${val} 万`,
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        0: { text: '关闭', status: 'Default' },
        1: { text: '运行中', status: 'Processing' },
        2: { text: '已上线', status: 'Success' },
        3: { text: '异常', status: 'Error' },
      },
    },
    {
      title: '上次调度时间',
      dataIndex: 'updatedAt',
      sorter: true,
      valueType: 'dateTime',
      hideInForm: true,
      renderFormItem: (item, { defaultRender, ...rest }, form) => {
        const status = form.getFieldValue('status');
        if (`${status}` === '0') {
          return false;
        }
        if (`${status}` === '3') {
          return <Input {...rest} placeholder="请输入异常原因！" />;
        }
        return defaultRender(item);
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        // <a
        //   onClick={() => {
        //     handleUpdateModalVisible(true);
        //     setStepFormValues(record);
        //   }}
        // >
        //   配置
        // </a>,
        // <Divider type="vertical" />,
        <a href="">订阅警报</a>,
      ],
    },
  ];

  useEffect(() => {
    dispatch({
      type: 'tableData/fetch',
      payload: {
        current: 1,
        pageSize: 10,
      },
    });
  }, [1]);

  return (
    <PageContainer>
      <ProTable<TableListItem>
        options={false}
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            新建
          </Button>,
        ]}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
      />

      <CreateForm
        visible={createModalVisible}
        onCancel={() => handleModalVisible(false)}
      >
        <ProTable<TableListItem, TableListItem>
          onSubmit={async (values) => {
            const success = await handleAdd(values);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="key"
          type="form"
          columns={columns}
        />
      </CreateForm>
    </PageContainer>
  );
};

export default connect(
  ({
    tableData,
    loading,
  }: {
    tableData: StateType;
    loading: {
      models: Record<string, boolean>;
    };
  }) => ({
    tableData,
    loading: loading.models.tableData,
  }),
)(Table);
