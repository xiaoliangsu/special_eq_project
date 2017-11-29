<style lang="less">
  @import './message.less';
</style>

<template>
  <div class="message-main-con">
    <div class="message-mainlist-con">

      <div v-if="this.author_key==1">
        <Button @click="setCurrentMesType('unread')" long type="text">
          <transition name="mes-current-type-btn">
            <Icon v-show="currentMessageType === 'unread'" type="checkmark"></Icon>
          </transition>
          <span class="mes-type-btn-text">未读消息</span>
          <Badge class="message-count-badge-outer" class-name="message-count-badge" :count="unreadCount"></Badge>
        </Button>
      </div>
      <div v-if="this.author_key==1">
        <Button @click="setCurrentMesType('hasread')" long type="text">
          <transition name="mes-current-type-btn">
            <Icon v-show="currentMessageType === 'hasread'" type="checkmark"></Icon>
          </transition>
          <span class="mes-type-btn-text">已读消息</span>
          <Badge class="message-count-badge-outer" class-name="message-count-badge" :count="hasreadCount"></Badge>
        </Button>
      </div>
      <div>
        <Button @click="setCurrentMesType('systemMsg')" long type="text">
          <transition name="mes-current-type-btn">
            <Icon v-show="currentMessageType === 'systemMsg'" type="checkmark"></Icon>
          </transition>
          <span class="mes-type-btn-text">系统消息</span>
          <Badge class="message-count-badge-outer" class-name="message-count-badge" :count="systemMsgCount"></Badge>
        </Button>
      </div>

      <!--<div>-->
      <!--<Button @click="setCurrentMesType('recyclebin')" long type="text"><transition name="mes-current-type-btn"><Icon v-show="currentMessageType === 'recyclebin'" type="checkmark"></Icon></transition><span class="mes-type-btn-text">回收站</span><Badge class="message-count-badge-outer" class-name="message-count-badge" :count="recyclebinCount"></Badge></Button>-->
      <!--</div>-->
    </div>
    <div class="message-content-con">
      <transition name="view-message">
        <div v-if="showMesTitleList" class="message-title-list-con">
          <Table ref="messageList" :columns="mesTitleColumns" :data="currentMesList" :no-data-text="noDataText"></Table>
        </div>
      </transition>
      <transition name="back-message-list">
        <div v-if="!showMesTitleList" class="message-view-content-con">
          <div class="message-content-top-bar">
            <span class="mes-back-btn-con"><Button type="text" @click="backMesTitleList"><Icon
              type="chevron-left"></Icon>&nbsp;&nbsp;返回</Button></span>
            <h3 class="mes-title">{{ mes.title }}</h3>
          </div>
          <p class="mes-time-con">
            <Icon type="android-time"></Icon>&nbsp;{{ mes.time }}
          </p>
          <div class="message-content-body">
            <p class="message-content">{{ mes.content }}</p>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  import * as messageService from '../../services/message';

  export default {
    name: 'message',
    data () {
      const markAsreadBtn = (h, params) => {
        return h('Button', {
          props: {
            size: 'small'
          },
          on: {
            click: () => {
              this.hasreadMesList.unshift(this.currentMesList.splice(params.index, 1)[0]);
              // console.log(params);
              let submitParams = [params.row.id];
              messageService.noticeRead(submitParams).then(res => {
                if (res.status == 200) {
                  this.$Message.info('该条消息已阅读');
                }
              }).catch(error => {
                console.log(error);
              })
            }
          }
        }, '标为已读');
      };
      const deleteMesBtn = (h, params) => {
        return h('Button', {
          props: {
            size: 'small',
            type: 'error'
          },
          on: {
            click: () => {
              this.recyclebinList.unshift(this.hasreadMesList.splice(params.index, 1)[0]);
            }
          }
        }, '删除');
      };
      const restoreBtn = (h, params) => {
        return h('Button', {
          props: {
            size: 'small'
          },
          on: {
            click: () => {
              this.hasreadMesList.unshift(this.recyclebinList.splice(params.index, 1)[0]);
            }
          }
        }, '还原');
      };
      return {
        author_key: '',
        currentMesList: [],
        unreadMesList: [],
        hasreadMesList: [],
        recyclebinList: [],
        systemMsgList: [],
        currentMessageType: 'unread',
        showMesTitleList: true,
        unreadCount: 0,
        hasreadCount: 0,
        recyclebinCount: 0,
        systemMsgCount: 0,
        noDataText: '暂无未读消息',
        mes: {
          title: '',
          time: '',
          content: ''
        },
        mesTitleColumns: [
          // {
          //     type: 'selection',
          //     width: 50,
          //     align: 'center'
          // },
          {
            title: ' ',
            key: 'content',
            align: 'left',
            ellipsis: true,
            render: (h, params) => {
              if (this.currentMessageType === 'systemMsg') {
                return h('span', {}, params.row.content);
              }
              if (this.currentMessageType === 'unread' || this.currentMessageType === 'hasread') {
                return h('a', {
                  on: {
                    click: () => {
//                    this.showMesTitleList = false;
//                    this.mes.title = params.row.content;
//                    this.mes.time = this.formatDate(params.row.createTime);
//                    this.getContent(params.index);
                      let submitParams = [params.row.id];
                      messageService.noticeRead(submitParams).then(res => {
                        if (res.status == 200) {
                          this.$router.push({
                            path: 'appDetail',
                            query: {
                              applyId: params.row.detailUrl,
                            }
                          });
                          this.hasreadMesList.unshift(this.currentMesList.splice(params.index, 1)[0]);
                          this.$Message.info('该条消息已阅读');

                        }
                      }).catch(error => {
                        console.log(error);
                      })
                    }
                  }
                }, params.row.content);
              }

            }
          },
          {
            title: ' ',
            key: 'time',
            align: 'center',
            width: 200,
            render: (h, params) => {
              return h('span', [
                h('Icon', {
                  props: {
                    type: 'android-time',
                    size: 12
                  },
                  style: {
                    margin: '0 5px'
                  }
                }),
                h('span', {
                  props: {
                    type: 'android-time',
                    size: 12
                  }
                }, params.row.createTime)
              ]);
            }
          },
          {
            title: ' ',
            key: 'asread',
            align: 'center',
            width: 100,
            render: (h, params) => {
              if (this.currentMessageType === 'unread') {
                return h('div', [
                  markAsreadBtn(h, params)
                ]);
              } else if (this.currentMessageType === 'hasread') {
//                return h('div', [
//                  deleteMesBtn(h, params)
//                ]);
              } else {
//                return h('div', [
//                  restoreBtn(h, params)
//                ]);
              }
            }
          }
        ]
      };
    },
    methods: {
      formatDate (time) {
        let date = new Date(time);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();
        return year + '/' + month + '/' + day + '  ' + hour + ':' + minute + ':' + second;
      },
      backMesTitleList () {
        this.showMesTitleList = true;
      },
      setCurrentMesType (type) {
        if (this.currentMessageType !== type) {
          this.showMesTitleList = true;
        }
        this.currentMessageType = type;
        if (type === 'unread') {
          this.noDataText = '暂无未读消息';
          this.currentMesList = this.unreadMesList;
        } else if (type === 'hasread') {
          this.noDataText = '暂无已读消息';
          this.currentMesList = this.hasreadMesList;
        } else {
          this.noDataText = '无系统消息';
          this.currentMesList = this.systemMsgList;
        }
      },
    },
    mounted () {
      this.author_key = localStorage.getItem('author_key');
      console.log(this.author_key == 1)
      if (this.author_key == 1) {
        this.currentMessageType = 'unread';
      } else {
        this.currentMessageType = 'systemMsg';
      }
      messageService.getReminder().then(res => {
        // console.log(res.length)
        // localStorage.setItem('reminder', res.length);
        this.currentMesList = this.unreadMesList = res;

      }).catch(error => {
        console.log(error);
      })
      messageService.getReadReminder().then(res => {
        this.hasreadMesList = res;

      }).catch(error => {
        console.log(error);
      })
      messageService.getSystemMsg().then(res => {

        if (this.author_key == 1) {
          this.systemMsgList = res;
        } else {
          this.currentMesList = this.systemMsgList = res;
        }
      }).catch(error => {
        console.log(error);
      })
      this.unreadCount = this.unreadMesList.length;
      this.hasreadCount = this.hasreadMesList.length;
      this.systemMsgCount = this.systemMsgList.length;
    },
    watch: {
      unreadMesList (arr) {
        this.unreadCount = arr.length;
      },
      hasreadMesList (arr) {
        this.hasreadCount = arr.length;
      },
      systemMsgList (arr) {
        this.systemMsgCount = arr.length;
      }
    }
  };
</script>

