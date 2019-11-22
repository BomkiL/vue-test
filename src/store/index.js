import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase/app'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]')
  },
  mutations: {
    createTask(state, task) {
      state.tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    deleteTask(state, id) {
      state.tasks = state.tasks.filter((task) => task.id !== id);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    checkTask(state, id) {
      state.tasks.some((task) => {
        if (task.id === id) {
          task.completed = !task.completed;
          return true;
        }
      });
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    changeTitle(state, editData) {
      state.tasks.some((task) => {
        if (task.id === editData.id) {
          task.title = editData.title;
          return true;
        }
      });
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
  },
  actions: {
    createTask({commit}, task) {
      commit('createTask', task);
    },
    deleteTask({commit}, taskDate) {
      commit('deleteTask', taskDate);
    },
    checkTask({commit}, id) {
      commit('checkTask', id);
    },
    changeTitle({commit}, editData) {
      commit('changeTitle', editData);
    },
    async fetchData() {
      const data = await firebase.database().ref('tasks');
    }
  },
  getters: {
    tasks: state => {
      return state.tasks.slice().sort((a, b) =>  b.id - a.id);
    },
    getTasksTotal: state => {
      return state.tasks.length;
    },
    getTask: state => id => {
      return state.tasks.find(task => task.id === id) || false;
    }
  }
});
