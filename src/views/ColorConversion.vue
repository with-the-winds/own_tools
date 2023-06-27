<!--
 * @Date: 2023-06-27 09:53:23
 * @LastEditors: with-the-winds
 * @LastEditTime: 2023-06-27 15:17:35
 * @Description: 头部注释
 * @FilePath: \own_tools\src\views\ColorConversion.vue
-->
<template>
  <div class="box-wrap">
    <div class="title no-select">RGB转16进制工具</div>
    <div class="input-wrap">
      <div class="rgb-wrap">
        <div class="no-select">红(R:0~255)</div>
        <input v-model="redValue" @input="validateInput('redValue')">
      </div>
      <div class="rgb-wrap">
        <div class="no-select">绿(R:0~255)</div>
        <input v-model="greenValue" @input="validateInput('greenValue')">
      </div>
      <div class="rgb-wrap">
        <div class="no-select">蓝(R:0~255)</div>
        <input v-model="blueValue" @input="validateInput('blue')">
      </div>

      
      <div class="hex-wrap">
        <div class="no-select">HEX值(不可缩写)</div>
        <input ref="inputRef" v-model="hexValue" @input="validateColor">
        <div class="copy-btn" @click="copyToClipboard">
          <i class="iconfont icon-fuzhi"></i>
          <span class="no-select">复制代码</span>
        </div>
      </div>
      <div class="color-result" :style="{backgroundColor: hexValue}"></div>
     
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      redValue: 0,
      greenValue: 0,
      blueValue: 0,
      hexValue: '#000000'
    }
  },
  methods: {
    // 校验0~255验证
    validateInput(type) {
      const inputValue = type === 'redValue' ? this.redValue : (type === 'greenValue' ? this.greenValue : this.blueValue)
      // 删除非数字字符
      const sanitizedValue = inputValue.replace(/[^\d]/g, '');
      // 截取前三位数字
      const numberValue = sanitizedValue.slice(0, 3);
      // 将截取的值转换为整数
      let value = parseInt(numberValue, 10);
      // 判断输入的值是否在合法范围内
      if (isNaN(value) || value < 0 || value > 255) {
        // 如果不合法，将输入的值进行修正
        value = Math.min(Math.max(value, 0), 255);
      }
      // 更新输入框的值
      if (type === 'redValue') {
        this.redValue = String(value);
      } else if (type === 'greenValue') {
        this.greenValue = String(value);
      } else {
        this.blueValue = String(value);
      }
      this.rgbTohex()
    },
    // 把十进制转成16进制
    rgbTohex() {
      if(isNaN(this.redValue) || isNaN(this.greenValue) || isNaN(this.blueValue)) return;
      const redHex = parseInt(this.redValue) < 16 ? '0' + parseInt(this.redValue).toString(16) : parseInt(this.redValue).toString(16)
      const greenHex = parseInt(this.greenValue) < 16 ? '0' + parseInt(this.greenValue).toString(16) : parseInt(this.greenValue).toString(16)
      const blueHex = parseInt(this.blueValue) < 16 ? '0' + parseInt(this.blueValue).toString(16) : parseInt(this.blueValue).toString(16)
      this.hexValue = '#' + redHex + greenHex + blueHex
    },
    // 校验#000000 - #ffffff
    validateColor() {
      const regex = /^#([A-Fa-f0-9]{0,6})$/;
      if (!regex.test(this.hexValue)) {
        this.hexValue = this.hexValue.slice(0, -1); // 移除最后一个字符
      }
      this.hexTorgb()
    },
    // 十六进制转十进制
    hexTorgb() {
      const regex = /^#([A-Fa-f0-9]{6})$/;
      if(!regex.test(this.hexValue)) return;
      const redHex = this.hexValue.slice(1,3)
      const greenHex = this.hexValue.slice(3,5)
      const blueHex = this.hexValue.slice(5,7)
      this.redValue = parseInt(redHex, 16)
      this.greenValue = parseInt(greenHex, 16)
      this.blueValue = parseInt(blueHex, 16)
    },
    // 复制到剪贴板
    copyToClipboard() {
      // 兼容非安全域，非安全域下不可使用navigator.clipboard.writeText
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(this.hexValue).then(() => {
          ElMessage({message: '已复制到剪贴板', type: 'success', duration: 1500})
        }).catch((error) => {
          console.error("复制失败：", error);
        })
      } else {
        const input = this.$refs.inputRef;
        input.select();
        input.setSelectionRange(0, 99999); // 适用于不同浏览器的兼容性处理
        document.execCommand("copy");
        input.setSelectionRange(0, 0); // 清除选中状态
        ElMessage({message: '已复制到剪贴板', type: 'success', duration: 1500})
      }
      
    }
  }
}
</script>

<style scoped lang="scss">
.box-wrap {
  width: calc(100% - 40px);
  border: 1px solid var(--border-color);
  margin: 0 auto;
  .title {
    box-sizing: border-box;
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid var(--border-color);
    background-color: #fdfcfb;
    color: #000;
    font-weight: bolder;
    padding-left: 20px;
  }
  // rgb 输入框
  .input-wrap {
    background-color: #fff;
    box-sizing: border-box;
    padding: 20px;
    .rgb-wrap {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: nowrap;
      height: 40px;
      input {
        margin-left: 10px;
      }
    }
  }
  // 十六进制输入框
  .hex-wrap {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    input {
      margin-left: 10px;
    }
    .copy-btn {
      margin-left: 10px;
      cursor: pointer;
      span {
        margin-left: 2px;
      }
    }
  }
  // 颜色结果
  .color-result {
    width: 100%;
    height: 200px;
    background-color: #000;
  }
}
</style>