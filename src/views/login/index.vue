<template>
  <div class="login-container">
    <!-- 当前页面的导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录" >
    <template #left>
      <i class="toutiao toutiao-zuojiantou" @click="$router.back()"></i>
    </template>
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="login">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="userFromRules.mobile"
        type='Number'
        maxlength=11
      >
      <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <!-- 给van-field组件配置rules 验证规则
      2.当表单提交的时候会自定触发表单验证
      如果验证通过 自动触发sumbit事件
      如果验证不通过 不会触发sumbit事件 -->
      <van-field
      v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="userFromRules.code"
        type='Number'
        maxlength='6'
      >
      <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
      <template #button>
          <van-count-down :time="1000 * 60" format="ss s" v-if="isCountDownShow" @finish="isCountDownShow = false" />
          <van-button class="send-sms-btn" round size="small" native-type="button" type="default" @click="onSendSms" v-else>发送验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn"  block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user.js'
export default {
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '' // 验证码
      },
      userFromRules: {
        mobile: [{
          required: true,
          message: '手机号不能为空'
        },
        {
          pattern: /^1[3|5|6|8]\d{9}$/,
          message: '请填写正确的手机号'
        }
        ],
        code: [{
          required: true,
          message: '验证码不能为空'
        },
        {
          pattern: /^\d{6}$/,
          message: '验证码格式错误'
        }
        ]
      },
      isCountDownShow: false
    }
  },
  methods: {
    async onSubmit () {
      // 获取表单数据
      const user = this.user
      // 验证表单
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        durationg: 0 // 设置加载持续时间，当下一个toast触发当前的就会被自动关闭
      })
      // 提交表单数据
      try {
        const res = await login(user)
        // this.$Toast({
        //   message: '登录成功'
        // })
        console.log('登录成功', res)
        this.$store.commit('setUser', res.data.data)
        this.$toast.success('登录成功')
        // 登陆成功 跳转回登陆页面
        this.$router.push('/my')
      } catch (err) {
        if (err.response.status === 400) {
          // console.log('用户名或者密码错误')
          this.$toast.fail('手机号或验证码错误')
        } else {
          // console.log(err)
          this.$toast.fail('登录失败')
        }
      }
    },
    async onSendSms () {
      // 校验手机号
      try {
        await this.$refs.login.validate('mobile')
      } catch (err) {
        return console.log('验证失败', err)
      }
      // 验证通过显示倒计时
      this.isCountDownShow = true
      // 获取短信验证码
      try {
        await sendSms(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        // 当验证失败时 应该将倒计时隐藏
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast('发送太频繁, 请稍后重试')
        } else {
          this.$toast('发送失败')
        }
      }
    }

  }
}
</script>

<style scoped lang='less'>
.login-container{
  .toutiao{
    font-size: 37px;
  };
  .send-sms-btn{
    width: 152px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  };
  .login-btn-wrap{
    padding: 53px 33px;
    .login-btn{
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
