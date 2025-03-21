import { AiFillGithub, AiFillGoogleCircle, AiFillWechat } from 'react-icons/ai'
import { Alert, Button, Checkbox, Col, Divider, Form, Input, Row } from 'antd'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

import { LoginStateEnum, useLoginStateContext } from './providers/LoginStateProvider'
import { SignInReq } from '@/api/services/userService'
import { useSignIn } from '@/store/user-setting'
import { toast } from 'sonner'

// Todo:后续改为其他账号
const DEFAULT_USER = {
  email: '739507690@qq.com',
  password: '123456',
}

function LoginForm() {
  const { loginState, setLoginState } = useLoginStateContext()
  const { t } = useTranslation()
  const signIn = useSignIn()

  const [loading, setLoading] = useState(false)

  const handleFinish = async ({ email, password }: SignInReq) => {
    setLoading(true)
    try {
      await signIn({ email, password })
    } catch (err) {
      toast.error('登录失败，请检查用户名和密码是否正确')
    } finally {
      setLoading(false)
    }
  }

  if (loginState !== LoginStateEnum.LOGIN) return null

  return (
    <>
      <div className="mb-4 text-2xl font-bold xl:text-3xl">{t('sys.login.signInFormTitle')}</div>
      <Form
        name="login"
        size="large"
        initialValues={{
          remember: true,
          email: DEFAULT_USER.email,
          password: DEFAULT_USER.password,
        }}
        onFinish={handleFinish}
      >
        <div className="mb-4 flex flex-col">
          <Alert
            description={
              <div className="flex flex-col">
                <div className="flex">
                  <span className="flex-shrink-0 text-text-disabled">{t('sys.login.userName')}:</span>
                  <span className="ml-1 text-text-secondary">{DEFAULT_USER.email}</span>
                </div>
                <div className="flex">
                  <span className="flex-shrink-0 text-text-disabled">{t('sys.login.password')}:</span>
                  <span className="ml-1 text-text-secondary">{DEFAULT_USER.password}</span>
                </div>
              </div>
            }
            showIcon
          />
        </div>

        <Form.Item name="email" rules={[{ required: true, message: '邮箱格式有误' }]}>
          <Input placeholder="请输入邮箱" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: '密码格式有误' }]}>
          <Input.Password type="password" placeholder="请输入密码" />
        </Form.Item>
        <Form.Item>
          <Row align="middle">
            <Col span={12}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>{t('sys.login.rememberMe')}</Checkbox>
              </Form.Item>
            </Col>
            <Col span={12} className="text-right">
              <Button
                type="link"
                className="!underline"
                // onClick={() => setLoginState(LoginStateEnum.RESET_PASSWORD)}
                size="small"
              >
                {t('sys.login.forgetPassword')}
              </Button>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full" loading={loading}>
            {t('sys.login.loginButton')}
          </Button>
        </Form.Item>

        <Row align="middle" gutter={8}>
          <Col flex="1">
            <Button
              // onClick={() => setLoginState(LoginStateEnum.REGISTER)}
              disabled={loading}
              className="w-full !text-sm"
            >
              {t('sys.login.signUpFormTitle')}
            </Button>
          </Col>
        </Row>

        <Divider className="!text-xs">{t('sys.login.otherSignIn')}</Divider>

        <div className="flex cursor-pointer justify-around text-2xl">
          <AiFillGithub />
          <AiFillWechat />
          <AiFillGoogleCircle />
        </div>
      </Form>
    </>
  )
}

export default LoginForm
