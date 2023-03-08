import { useMutation, useQuery } from '@apollo/client';
import { Button, Form, Input, message, Select } from 'antd'
import React from 'react'
import { addEvent, getLocations, getUsers } from './queries';
import moment from 'moment'
import { getEvents } from '../Home/queries'

function NewEvent() {

    const { loading: get_users_loading, data: users_data } = useQuery(getUsers);
    const { loading: get_locations_loading, data: locations_data } = useQuery(getLocations);
    const [saveEvent, { loading }] = useMutation(addEvent, {
        refetchQueries: [
            { query: getEvents }, // DocumentNode object parsed with gql
        ],
    });

    const [messageApi, contextHolder] = message.useMessage();

    const [form] = Form.useForm();

    const handleSubmit = async (values) => {
        const event = {
            ...values,
            date: moment().format('L'),
            from: moment().format('LT'),
            to: moment().add(5, 'hours').calendar()
        };

        try {
            saveEvent({
                variables: {
                    data: event
                }
            })

            messageApi.open({
                type: 'success',
                content: 'Event Paylaşımı Başarılı',
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

            <Form.Item name="location_id" rules={[
                {
                    required: true,
                    message: 'Select a location',
                },
            ]}>
                <Select disabled={get_locations_loading} loading={get_locations_loading} size='large' placeholder='Select a location'>
                    {
                        locations_data && locations_data.locations.map((location) => {
                            return (
                                <Select.Option key={location.id} value={location.id}>
                                    {location.name}
                                </Select.Option>
                            )
                        })
                    }
                </Select>
            </Form.Item>

            <Form.Item name="title" rules={[
                {
                    required: true,
                    message: 'Input Title',
                },
            ]}>
                <Input disabled={loading} placeholder='Title' />
            </Form.Item>

            <Form.Item name="desc" rules={[
                {
                    required: true,
                    message: 'Input Description',
                },
            ]}>
                <Input disabled={loading} placeholder='Description' />
            </Form.Item>

            <Button type="primary" htmlType='submit' loading={loading}>
                Submit
            </Button>

        </Form>
    )
}

export default NewEvent