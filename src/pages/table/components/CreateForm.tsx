import type { FC } from 'react';
import { Modal } from 'antd';

type CreateFormProps = {
  visible: boolean;
  onCancel: () => void;
};

const CreateForm: FC<CreateFormProps> = (props) => {
  const { visible, onCancel } = props;

  return (
    <Modal
      visible={visible}
      title="新建规则"
      destroyOnClose
      onCancel={() => onCancel()}
      footer={null}
    >
      {props.children}
    </Modal>
  );
};

export default CreateForm;
