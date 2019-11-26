<template>
  <b-container class="container-wrapper">
    <h4 class="mt-4">Tasks</h4>
    <CreateTask @task-submitted="createTask" />
    <Loader v-if="$store.state.loading" />
    <ul v-else-if="tasks.length" class="list-group mb-3">
      <TodoItem
              v-for="item of tasks"
              v-bind:task="item"
              v-bind:key="item.id"
              @task-removed="removeTask"
              @task-checked="checkTask"
              @task-edited="editTask"
      />
    </ul>
    <div v-else>No tasks</div>
    <Pagination
            @page-selected="updatePage"
            v-bind:tasksTotal="$store.state.tasks.length"
            v-bind:currentPage="$store.state.pageNumber"
            v-bind:tasksPerPage="$store.state.tasksPerPage"
    />
  </b-container>
</template>

<script>
  import CreateTask from './../components/createTask';
  import TodoItem from './../components/ToDoItem';
  import Pagination from './../components/Pagination';
  import Loader from './../components/Loader';
  export default {
    name: 'List',
    computed: {
      tasks() {
        return this.$store.getters.visibleTasks;
      },
    },
    created() {
      this.$store.dispatch('fetchTasks').then(() => {
        this.updatePage(parseInt(this.$route.params.page, 10) || 1);
      });
    },
    methods: {
      createTask(title) {
        this.$store.dispatch('createTask', title).then(() => {
          this.updatePage(1);
        });
      },
      removeTask(id) {
        this.$store.dispatch('deleteTask', id);
      },
      checkTask({ id, completed, title }) {
        this.$store.dispatch('updateTask', { id, completed, title });
      },
      editTask(id) {
        this.$router.push(`/edit-to-do/${id}`);
      },
      updatePage(pageNumber) {
        this.$store.dispatch('changePage', pageNumber).then(() => {
          if (this.$route.params.page !== String(pageNumber)) {
            this.$router.push(`/page/${this.$store.state.pageNumber}`);
          }
        });
      },
    },
    components: {
      CreateTask,
      TodoItem,
      Pagination,
      Loader
    }
  }
</script>

<style>
  .container-wrapper.container {
    max-width: 600px;
  }
</style>
