import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
Vue.use(axios)
export default new Vuex.Store({
  state: {
    list: [],
    //  文本框的内容
    inputValue: 'aaa',
    //  下一个Id
    nextId: 5,
    viewKey: 'all'
  },
  mutations: {
    initList (state, list) {
      state.list = list
    },
    //  为store中的inputValue 赋值
    setInputValue (state, val) {
      state.inputValue = val
    },
    //  添加列表项
    addItem (state) {
      // eslint-disable-next-line no-unused-vars
      const obj = {
        id: state.nextId,
        info: state.inputValue.trim(),
        done: false
      }
      state.list.push(obj)
      state.nextId++
      state.inputValue = ''
    },
    //  根据ID删除对应项
    removeItem (state, id) {
      //  根据ID查找对应索引
      const i = state.list.findIndex(x => x.id === id)
      //  根据索引 删除对应元素
      if (i !== -1) {
        state.list.splice(i, 1)
      }
    },
    //  修改列表项的选中状态
    changeStatus (state, param) {
      //  查找索引
      const i = state.list.findIndex(x => x.id === param.id)
      if (i !== -1) {
        state.list[i].done = param.status
      }
    },
    //  清除已完成的任务
    cleanDone (state) {
      state.list = state.list.filter(x => x.done === false)
    },
    //  修改视图的关键字
    changeViewKey (state, key) {
      state.viewKey = key
    }
  },
  actions: {
    getList (context) {
      axios.get('/list.json').then(({ data }) => {
        console.log(data)
        context.commit('initList', data)
      })
    }
  },
  getters: {
    //  统计未完成任务条数
    unDone (state) {
      return state.list.filter(x => x.done === false).length
    },
    infolist (state) {
      if (state.viewKey === 'all') {
        return state.list
      }
      if (state.viewKey === 'undone') {
        return state.list.filter(x => !x.done)
      }
      if (state.viewKey === 'done') {
        return state.list.filter(x => x.done)
      }
      return state.list
    }
  },
  modules: {
  }
})
