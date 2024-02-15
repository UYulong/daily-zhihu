import React, { memo, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button, Form, Input, Toast } from 'antd-mobile'

import { LoginBox } from './indexCss'
import ButtonAgain from '@/components/ButtonAgain'
import API from '@/apis'

import _ from '@/utils/tools'
import { fetchUserInfo } from '@/store/modules/users'

const Login = memo((props) => {
  const dispatch = useDispatch()

  const navigate = useNavigate(),
    [usp] = useSearchParams()

  const [disabled, setDisabled] = useState(false),
    [text, seText] = useState('发送验证码'),
    [submitLoading, setSubmitLoading] = useState(false)

  const [formIns] = Form.useForm()


  // 定时器
  let timerId = null
  const countDown = () => {
    let num = 10
    seText(`${num}秒后重发`)
    setDisabled(true)

    timerId = setInterval(() => {
      num--
      if (num === 0) {
        seText(`发送验证码`)
        setDisabled(false)
        clearInterval(timerId)
        timerId = null

        return
      }

      seText(`${num}秒后重发`)
    }, 1000)
  }

  useEffect(() => {
    return () => {
      if (timerId) {
        clearInterval(timerId)
        timerId = null
      }
    }
  }, [])

  // 发送验证码
  const send = async () => {
    try {
      await formIns.validateFields(['phone'])

      const phone = formIns.getFieldValue('phone')
      const { code } = await API.sendPhoneCode(phone)
      if (+code === 0) {
        Toast.show({
          icon: 'success',
          content: '发送成功',
        })

        // 开始计时
        countDown()
      }
    } catch (e) {
      console.log(e);
    }
  }

  // 登录
  const submit = async (values) => {
    setSubmitLoading(true)

    try {
      const { phone, code } = values
      const { code: codeVal, token } = await API.userLogin(phone, code)

      if (+codeVal === 0) {
        Toast.show({
          icon: 'success',
          content: '登录成功',
        })

        // 存储 token
        _.storage.set('TK', token)

        // 获取用户信息
        dispatch(fetchUserInfo())

        // 路由跳转
        const to = usp.get("to")
        console.log(to);

        to ? navigate(to, { replace: true }) : navigate('/')
      } else {
        Toast.show({
          icon: 'fail',
          content: '验证码错误',
        })
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitLoading(false)
    }
  }

  return (
    <LoginBox>
      {/* <NavBarAgain title="登录/注册" /> */}

      <Form
        layout='horizontal'
        style={{ '--border-top': 'none', '--border-bottom': 'none' }}
        footer={
          <Button color="primary" type="submit" loading={submitLoading}>
            提交
          </Button>
        }
        form={formIns}
        onFinish={submit}
        initialValues={{ phone: '', code: '' }}
        requiredMarkStyle='none'
      >

        <Form.Item name='phone' label='手机号'
          rules={[
            { required: true, message: '手机号是必填项' },
            { pattern: /^(?:(?:\+|00)86)?1\d{10}$/, message: '手机号格式有误' }
          ]}>
          <Input placeholder='请输入手机号' />
        </Form.Item>

        <Form.Item name='code' label='验证码'
          rules={[
            { required: true, message: '验证码是必填项' },
            { pattern: /^\d{6}$/, message: '验证码格式有误' }
          ]}
          extra={
            <ButtonAgain size='small'
              color='primary'
              disabled={disabled}
              onClick={send}>
              {text}
            </ButtonAgain>
          }>
          <Input />
        </Form.Item>
      </Form >
    </LoginBox >
  )
})

export default Login