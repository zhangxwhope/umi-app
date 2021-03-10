import type { FC } from 'react'
import React, { useEffect } from 'react'
import moment from 'moment'
import { Modal, Result, List, InputItem, DatePicker, Picker, TextareaItem } from 'antd-mobile'
import { createForm } from 'rc-form'
import type { ListItemDataType } from '../data.d'
import styles from '../style.less'

const Item = List.Item

type OperationModalProps = {
  done: boolean;
  visible: boolean;
  current: Partial<ListItemDataType> | undefined;
  onDone: () => void;
  onSubmit: (values: ListItemDataType) => void;
  onCancel: () => void,
  form: any
}

const OperationModalForm: FC<OperationModalProps> = (props) => {
  const { done, visible, current, onDone, onSubmit, onCancel, form } = props
  const { getFieldProps, isFieldsValidating, getFieldsValue } = props.form

  useEffect(() => {
    if (form && !visible) {
      form.resetFields()
    }
  }, [props.visible])

  useEffect(() => {
    if (current) {
      const { title, createdAt, owner, subDescription } = current
      form.setFieldsValue({
        ...{
          title,
          createdAt,
          owner,
          subDescription
        },
        createdAt: current.createdAt ? moment(current.createdAt) : null,
      })
    }
  }, [props.current])

  const handleSubmit = () => {
    if (!form) return
    if (isFieldsValidating) {
      handleFinish(getFieldsValue())
    }
  }

  const handleFinish = (values: Record<string, any>) => {
    if (onSubmit) {
      onSubmit(values as ListItemDataType)
    }
  }

  const modalFooter = done 
    ? [] 
    : [{ text: '保存', onPress: () => handleSubmit() }, { text: '取消', onPress: () => onCancel() }]

  const getModalContent = () => {
    if (done) {
      return (
        <Result
          title="操作成功"
          message="一系列的信息描述，很短同样也可以带标点。"
          buttonText="知道了"
          buttonType="primary"
          onButtonClick={onDone}
        />
      )
    }

    const usersDict = [
      {
        value: '付晓晓',
        label: '付晓晓'
      },
      {
        value: '周毛毛',
        label: '周毛毛'
      }
    ]

    return (
      <List>
        <Item>
          <InputItem 
             {...getFieldProps('title', {
              initialValue: '',
              rules: [
                {
                  required: true, message: "请输入任务名称"
                }
              ]
            })}
            name="title"
            placeholder="任务名称"
          />
        </Item>
        <Item>
          <DatePicker
            {...getFieldProps('createdAt', {
              initialValue: '',
              rules: [
                {
                  required: true, message: "请选择开始时间"
                }
              ]
            })}
            mode="datetime"
          >
          </DatePicker>
        </Item>
        <Item>
          <Picker
            data={usersDict}
            {...getFieldProps('owner', {
              initialValue: '',
              rules: [
                {
                  required: true, message: "请选择任务负责人"
                }
              ]
            })}
          >
            <Item>请选择</Item>
          </Picker>
        </Item>
        <Item>
          <TextareaItem 
            {...getFieldProps('subDescription', {
              initialValue: '',
              rules: [
                {
                  min: 5, message: "请输入至少五个字符的产品描述！"
                }
              ]
            })}
            placeholder="请输入至少五个字符"
            rows={4}
          />
        </Item>
      </List>
    )
  }  

  return (
    <Modal
      title={done ? null : `任务${current ? '编辑' : '添加'}`}
      visible={visible}
      className={styles.standardListForm}
      popup
      footer={modalFooter}
      onClose={done ? onDone : onCancel}
    >
      {getModalContent()}
    </Modal>
  )
}

const OperationModal = createForm()(OperationModalForm)

export default OperationModal