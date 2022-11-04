<!--
 * @Author: hzm
 * @Date: 2022-11-04 14:19:01
 * @Description: 
-->


<template>
  <div id="banner">
    
  </div>

  <div id="content">
    <!-- 标题 -->
    <div id="title">
      <!--  -->
      <h1 class="title">
      🌈 HElComponentsNext
        
      </h1>

      <h1 class="subtitle">
        基于Element-plus再封装的业务组件库
      </h1>
      <!-- <p class="content">
        <strong>🌈 HElComponentsNext</strong>
        是一个基于 element-plus 开发的一个适用于中后台快速开发的一套业务组件库。主要解决多项目公共组件的协同开发。
      </p>

      <el-button
        class="start-btn"
        type="primary"
        size="large"
        
      >
        开始使用
      </el-button> -->
    </div>

  </div>
</template>

<style lang="scss" scoped>
  #banner {
    width: 100%;
    box-sizing: border-box;
    position: relative;
    min-height: 370px;
    padding-bottom: 30px;

    .logo_box {
      position: absolute;
      right: 0px;
      top: 0px;
      height: 100%;
      width: 100%;
      max-width: 1368px;
      z-index: -1;
      overflow: hidden;
      background: -webkit-linear-gradient(
        815deg,
        rgb(57, 92, 227) 10%,
        rgb(94, 224, 221)
      );

      .logo {
        width: 500px;
        height: 500px;
        top: 0px;
        right: 0px;
        position: absolute;
        transform: translate(-155px, -77px) scale(1);
        user-select: none;
      }
    }
  }

  #content {
    transition: 0.2s;
    max-width: 1350px;
    height: 500px;
    padding: 30px;
    box-sizing: border-box;
    right: 0;
    left: 0;
    margin: auto;
    top: 140px;
    position: absolute;

    // 标题
    #title {
      .logo {
        width: 120px;
        height: 120px;
        user-select: none;
      }

      .title {
        font-size: 32px;
        line-height: 43px;
        text-align: left;
        letter-spacing: -1.2px;
        font-weight: bold;
        word-break: normal;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
        background: -webkit-linear-gradient(
          55deg,
          rgb(57, 92, 227) 10%,
          rgb(94, 224, 221)
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;

        .f-image {
          margin-left: 20px;
        }
      }

      .f-button {
        margin-top: 19px;
      }

      .subtitle {
        margin-top: 10px;
        font-size: 33px;
        font-weight: 700;
        transition: 0.3s;
        font-weight: 500;
        line-height: 50px;
        transition: 0.3s;
      }

      .content {
        transition: 0.3s;
        max-width: 700px;
        margin-top: 30px;
      }

      .f-button-primary {
        margin-top: 30px;
      }
    }

    // 贡献者
    #contributors {
      margin-top: 66px;
      padding: 60px 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      .f-text {
        margin-bottom: 40px;
      }

      .f-button {
        margin-top: 40px;
      }

      .contributors-box {
        max-width: 800px;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;

        .f-avatar {
          margin: 5px;
        }
      }
    }

    // 页脚
    #footer {
      border-top: 1px solid #eee;
      max-width: 800px;
      margin: 0 auto;
      padding: 60px 0;
      box-sizing: border-box;

      .footer-item {
        display: flex;
        justify-content: space-between;
        user-select: none;

        .list {
          .title {
            font-weight: 600;
            line-height: 36px;
            font-size: 15px;
          }

          .item {
            line-height: 36px;
            cursor: pointer;
            font-size: 14px;
          }
        }
      }

      .code {
        margin-top: 30px;
        text-align: center;
        font-size: 15px;
        cursor: pointer;

        a {
          color: #333;
        }
      }
    }
  }

  @media (max-width: 768px) {
    #content {
      top: 200px !important;
    }
  }
</style>
