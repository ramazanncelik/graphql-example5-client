import { useMutation, useQuery } from '@apollo/client';
import { Button, Col, Form, message, Row, Select } from 'antd';
import React from 'react'
import { addParticipant, getUsers } from './queries';

function NewParticipant({ event_id }) {

    const { loading: get_users_loading, data: users_data } = useQuery(getUsers);
    const [saveParticipant, { loading }] = useMutation(addParticipant);

    const [messageApi, contextHolder] = message.useMessage();

    const [form] = Form.useForm();

    const handleSubmit = async (values) => {
        const participant = {
            ...values,
            event_id
        };

        try {
            saveParticipant({
                variables: {
                    data: participant
                }
            })

            messageApi.open({
                type: 'success',
                content: 'Participant Başariyla Eklendi',
            });

            form.resetFields();
        } catch (error) {
            messageApi.open({
                type: 'error',
                content: error,
            });
        }
    }

    return (
        <Form name='basic' form={form} onFinish={handleSubmit}>
            {contextHolder}
            <Row gutter={24}>
                <Col span={22}>
                    <Form.Item name="user_id" rules={[
                        {
                            required: true,
                            message: 'Select a user',
                        },
                    ]}>
                        <Select disabled={get_users_loading} loading={get_users_loading} size='large' placeholder='Select a user'>
                            {
                                users_data && users_data.users.map((user) => {
                                    return (
                                        <Select.Option key={user.id} value={user.id}>
                                            {user.username}
                                        </Select.Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                </Col>

                <Col span={2}>
                    <Button type='primary' htmlType='submit' loading={loading}>
                        Submit
                    </Button>
                </Col>
            </Row>
        </Form>
    )
}

export default NewParticipant;