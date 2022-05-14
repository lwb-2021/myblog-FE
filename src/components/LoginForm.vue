<template>
  <div style="width: 350px" class="div-form">
    <h1 style="text-align: center">
      登录
    </h1>
    <t-form ref="form" :data="formData" :colon="true" :label-width="0" @reset="onReset" @submit="onSubmit">
      <t-form-item name="username">
        <t-input v-model="formData.username" clearable placeholder="请输入账户名">
          <template #prefix-icon>
            <desktop-icon />
          </template>
        </t-input>
      </t-form-item>
      <t-form-item name="password">
        <t-input v-model="formData.password" type="password" clearable placeholder="请输入密码">
          <template #prefix-icon>
            <lock-on-icon />
          </template>
        </t-input>
      </t-form-item>
      <t-form-item style="padding-top: 8px">
        <t-button theme="primary" type="submit" block>登录</t-button>
      </t-form-item>
    </t-form>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import { DesktopIcon, LockOnIcon } from 'tdesign-icons-vue-next';
import axios from "axios";
import {setCookie} from "../utils/utils";

const INITIAL_DATA = {
  username: "",
  password: "",
};

export default defineComponent({
  name: "LoginForm",
  components: {
    DesktopIcon,
    LockOnIcon,
  },
  setup() {
    const formData = ref({ ...INITIAL_DATA });
    const onReset = () => {
      MessagePlugin.success('重置成功');
    };
    const onSubmit = ({ validateResult, firstError }) => {
      let message_instance = MessagePlugin.loading("正在处理中")
      if (validateResult === true) {
        axios.post("/api/account/login", JSON.parse(JSON.stringify(formData.value)))
            .then((response) => {
              if(response.status === 200){
                axios.defaults.withCredentials = true
                axios.post("/api/user/login_from_user_center", JSON.parse(JSON.stringify(response.data.data)))
                    .then((response) => {
                        if(response.status === 200){
                            setCookie("JWT_TOKEN", response.headers["authorization"], 1)
                            MessagePlugin.close(message_instance)
                            MessagePlugin.success("登录成功")
                        }
                    })
              }
            }
        )
      } else {
        console.log('Validate Errors: ', firstError, validateResult);
        MessagePlugin.warning(firstError);
      }
    };

    return {
      formData,
      onReset,
      onSubmit,
    };
  },
});
</script>

<style>
div.div-form{
  margin: 100px auto;
}
</style>