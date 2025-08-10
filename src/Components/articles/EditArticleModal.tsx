import { Button, Form, Input, Modal, notification, Select } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { updateArticle } from "../../app/redux/features/articles/articlesSlice";
import { IArticle } from "../../types/IArticle.type";


interface Props {
  article: IArticle;
  onClose: () => void;
}

const EditArticleModal: React.FC<Props> = ({ article, onClose }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onSave = (values: Partial<IArticle>) => {
    const updatedArticle = { ...article, ...values };
    dispatch(updateArticle(updatedArticle));
    notification.success({ message: "Article updated successfully!" });
    onClose();
  };

  return (
    <Modal
      title="Edit Article"
      open={true}
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          title: article.title,
          content: article.content,
          status: article.status,
        }}
        onFinish={onSave}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please enter a title" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="content"
          label="Content"
          rules={[{ required: true, message: "Please enter content" }]}
        >
          <Input.TextArea rows={6} />
        </Form.Item>
        <Form.Item name="status" label="Status" rules={[{ required: true }]}>
          <Select>
            <Select.Option value="Published">Published</Select.Option>
            <Select.Option value="Draft">Draft</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary" block>
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditArticleModal;
