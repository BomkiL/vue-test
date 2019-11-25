import Vue from 'vue';
import Vuex from 'vuex';
import  firebaseDB from './../firebase';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: [],
    loading: true,
    tasksPerPage: 5,
    pageNumber: 1
  },
  getters: {
    visibleTasks: state => {
      const sortedTasks = state.tasks.slice().sort((a, b) => b.timestampSeconds - a.timestampSeconds);
      const startTaskIndex = (state.pageNumber - 1) * state.tasksPerPage;

      return sortedTasks.slice(startTaskIndex, startTaskIndex + state.tasksPerPage);
    },
    getTask: state => id => {
      return state.tasks.find(task => task.id === id) || false;
    },
    getTaskTotal: state => {
      return state.tasks.length;
    },
  },
  mutations: {
    fetchTasks(state, tasks) {
      state.tasks = tasks;
    },
    updateLoading(state, loading) {
      state.loading = loading
    },
    createTask(state, task) {
      state.tasks.push({
        id: task.id,
        title: task.title,
        completed: false,
        timestampSeconds: task.timestampSeconds
      });
    },
    deleteTask(state, id) {
      const index = state.tasks.findIndex(item => item.id === id);

      if (index >= 0) {
        state.tasks.splice(index, 1)
      }
    },
    updateTask(state, editData) {
      state.tasks.some((task) => {
        if (task.id === editData.id) {
          task.title = editData.title;
          task.completed = editData.completed;
          return true;
        }
      });
    },
    changePage(state, pageNumber) {
      state.pageNumber = pageNumber;
    }
  },
  actions: {
    fetchTasks({commit}) {
      commit('updateLoading', true);
      firebaseDB.collection('tasks').get().then(querySnapshot => {
        const fetchedTasks = [];
        querySnapshot.forEach(document => {
          const documentData = document.data();

          fetchedTasks.push({
            id: document.id,
            title: documentData.title,
            completed: documentData.completed,
            timestampSeconds: documentData.timestamp.seconds
          });
        });
        commit('fetchTasks', fetchedTasks);
        commit('updateLoading', false);
      });
    },
    createTask({commit}, title) {
      firebaseDB.collection('tasks').add({
        title: title,
        completed: false,
        timestamp: new Date(),
      }).then(document => {
        commit('createTask', {
          id: document.id,
          title: title,
          completed: false,
          timestampSeconds: Date.now(),
        });
      });
    },
    deleteTask({commit}, id) {
      firebaseDB.collection('tasks').doc(id).delete().then(() => {
        commit('deleteTask', id);
      });
    },
    updateTask({commit}, editData) {
      firebaseDB.collection('tasks').doc(editData.id).set({
        title: editData.title,
        completed: editData.completed,
      }, { merge: true }).then(() => {
        commit('updateTask', editData)
      })
    },
    changePage({commit}, pageNumber) {
      if (pageNumber > 1 && this.getters.visibleTasks.length === 0) {
        pageNumber = Math.ceil(this.state.tasks.length / this.state.tasksPerPage);
      }
      commit('changePage', pageNumber);
    },
  }
});
