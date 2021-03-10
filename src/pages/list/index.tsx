
import type { FC } from 'react'
import React, { useRef, useState, useEffect } from 'react'
import { findDOMNode } from 'react-dom'
import type { Dispatch } from 'umi'
import { connect } from 'umi'
import { Modal, Card, Grid, Radio, SearchBar, Button, List, Progress, Picker } from 'antd-mobile'
import { PageContainer } from '@ant-design/pro-layout'
import moment from 'moment'
import OperationModal from './components/OperationModal'
import type { StateType } from './model'
import type { ListItemDataType } from './data.d'
import styles from './style.less'

const alert = Modal.alert
const RadioItem = Radio.RadioItem
const Item = List.Item

type ListProps = {
  basicList: StateType;
  dispatch: Dispatch;
  loading: boolean
}

const Info: FC<{
  title: React.ReactNode;
  value: React.ReactNode;
  bordered?: boolean
}> = ({ title, value, bordered }) => (
  <div className={styles.headerInfo}>
    <span>{title}</span>
    <p>{value}</p>
    {bordered && <em />}
  </div>
)

const ListContent = ({
  data: { owner, createdAt, percent }
}: {
  data: ListItemDataType
}) => (
  <div className={styles.listContent}>
    <div className={styles.listContentItem}>
      <span>Owner</span>
      <p>{ owner }</p>
    </div>
    <div className={styles.listContentItem}>
      <span>开始时间</span>
      <p>{ moment(createdAt).format('YYYY-MM-DD HH:mm') }</p>
    </div>
    <div className={styles.listContentItem}>
      <Progress percent={percent} style={{ width: 180 }} position="normal"/>
    </div>
  </div>
)

export const ListBasic: FC<ListProps> = (props) => {
  const addBtn = useRef(null)
  const {
    loading,
    dispatch,
    basicList: { list }
  } = props

  const [radio, setRadio] = useState<string>('all')
  const [done, setDone] = useState<boolean>(false)
  const [visible, setVisible] = useState<boolean>(false)
  const [current, setCurrent] = useState<Partial<ListItemDataType> | undefined>(undefined)
  const [opt, setOpt] = useState<string[]>([])

  useEffect(() => {
    dispatch({
      type: 'basicList/fetch',
      payload: {
        count: 5
      }
    })
  }, [1])

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    pageSize: 5,
    total: 50
  }

  const showModal = () => {
    setVisible(true)
    setCurrent(undefined)
  }

  const showEditModal = (item: ListItemDataType) => {
    setVisible(true)
    setCurrent(item)
  }

  const deleteItem = (id: string) => {
    dispatch({
      type: 'basicList/submit',
      payload: { id }
    })
  }

  const editAndDelete = (key: string[], currentItem: ListItemDataType) => {
    if (key.includes('edit')) showEditModal(currentItem);
    else if (key.includes('delete')) {
      alert('删除任务', '确定删除该任务吗？', [
        { text: '取消' },
        { text: '确认', onPress: () => deleteItem(currentItem.id) }
      ])
    } 
  }

  const radioData = [
    {
      key: 'all',
      text: '全部'
    },
    {
      key: 'progress',
      text: '进行中'
    },
    {
      key: 'waiting',
      text: '等待中'
    }
  ]

  const extraContent = (
    <div className={styles.extraContent}>
      {radioData.map(item => (
        <RadioItem 
          key={item.key}
          checked={radio === item.key}
          onChange={() => setRadio(item.key)}
        >
          {item.text}
        </RadioItem>
      ))}
      <SearchBar 
        className={styles.extraContentSearch} 
        placeholder="请输入" 
        onSubmit={(val: string) => ({})}
      />
    </div>
  )

  const gridData = [
    {
      title: '我的待办',
      value: '8个任务',
      bordered: true
    },
    {
      title: '本周任务平均处理时间',
      value: '32分钟',
      bordered: true
    },
    {
      title: '本周完成任务数',
      value: '24个任务',
      bordered: false
    }
  ]

  const MoreBtnData = [
    {
      value: 'edit',
      label: '编辑',
      children: []
    },
    {
      value: 'delete',
      label: '删除',
      children: []
    }
  ]

  const MoreBtn: FC<{ item: ListItemDataType }> = ({ item }) => (
    <Picker 
      data={MoreBtnData}
      cols={1}
      value={opt}
      onChange={(val: any) => editAndDelete(val, item)}
    >
      <Item>更多</Item>
    </Picker>
  )

  const setAddBtnblur = () => {
    if (addBtn.current) {
      const addBtnDom = findDOMNode(addBtn.current) as HTMLButtonElement
      setTimeout(() => addBtnDom.blur(), 0)
    }
  }

  const handleDone = () => {
    setAddBtnblur()

    setDone(false)
    setVisible(false)
  }

  const handleCancel = () => {
    setAddBtnblur()
    setVisible(false)
  }

  const handleSubmit = (values: ListItemDataType) => {
    setAddBtnblur()

    setDone(true)
    dispatch({
      type: 'basicList/submit',
      payload: values
    })
  }

  return (
    <div>
      <PageContainer>
        <div className={styles.standardList}>
          <Card>
            <Grid 
              data={gridData}
              columnNum={3} 
              hasLine={false}
              renderItem={(dataItem: any) => (
                <Info title={dataItem.title} value={dataItem.value} bordered={dataItem.bordered} />
              )}
            >
            </Grid>
          </Card>

          <Card 
            className={styles.listCard}
          >
            <Card.Header 
              title="基本列表"
              extra={extraContent}
            />
            <Card.Body>
              <Button 
                type="ghost"
                icon="check"
                style={{ width: '100%', marginBottom: 8 }}
                onClick={showModal}
              >
                添加
              </Button>

              <List>  
                {list.map(item => (
                  <Item key={item.id}>
                    <ListContent data={item} />
                    <MoreBtn item={item} />
                  </Item> 
                ))}
              </List>
            </Card.Body>
          </Card>
        </div>
      </PageContainer>

      <OperationModal
        done={done}
        current={current}
        visible={visible}
        onDone={handleDone}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />
    </div>
  )

}

export default connect(
  ({
    basicList,
    loading,
  }: {
    basicList: StateType,
    loading: {
      models: Record<string, boolean>;
    };
  }) => ({
    basicList,
    loading: loading.models.basicList,
  }),
)(ListBasic);