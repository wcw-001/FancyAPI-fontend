import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { Modal } from 'antd';
import React, {useEffect, useRef} from 'react';
import {ProFormInstance} from "@ant-design/pro-form/lib";

export type Props = {
  values: API.InterfaceInfo
  columns: ProColumns<API.InterfaceInfo>[];
  onCancel: () => void;
  //onSubmit: (values: API.InterfaceInfo) => Promise<void>;
  visible: boolean;
};

const ShowModal: React.FC<Props> = (props) => {
  const { visible, values,columns, onCancel, onSubmit } = props;
  const formRef = useRef<ProFormInstance>();
  console.log(values)
  useEffect(() => {
    if(formRef){
      formRef.current?.setFieldsValue(values)
    }
  }, [values]);
  return (
    <Modal visible={visible} footer={null} onCancel={() => onCancel?.()}>
      <ProTable
        form={{
          submitter: {
            resetButtonProps: { hidden: true },
            submitButtonProps: { hidden: true },
          },
        }}
        type="form"
        formRef={formRef}
        columns={columns}

        onSubmit={async (value) => {
          onSubmit?.(value);
        }}
      />
    </Modal>
  );
};
export default ShowModal;
