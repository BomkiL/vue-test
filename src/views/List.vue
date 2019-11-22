<template>
  <b-container class="container-wrapper">
    <h4 class="mt-4">Tasks</h4>
    <CreateTask @task-submitted="createTask" />
    <Loader v-if="loading" />
    <ul v-else-if="tasks.length" class="list-group mb-3">
      <TodoItem
              v-for="item of visibleTasks"
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
            v-bind:tasksTotal="tasks.length"
            v-bind:currentPage="currentPage"
            v-bind:tasksPerPage="tasksPerPage"
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
        return this.$store.getters.tasks;
      }
    },
    data() {
      return {
        currentPage: parseInt(this.$route.params.page, 10) || 1,
        tasksPerPage: 5,
        visibleTasks: [],
        loading: true,
      }
    },
    beforeMount() {
      this.updateVisibleTasks();
    },
    methods: {
      createTask(task) {
        this.$store.dispatch('createTask', task).then(() => {
          this.updatePage(1);
        });
      },
      removeTask(id) {
        this.$store.dispatch('deleteTask', id).then(() => {
          this.updateVisibleTasks();
        });
      },
      checkTask(id) {
        this.$store.dispatch('checkTask', id).then(() => {
          this.updateVisibleTasks();
        });
      },
      editTask(id) {
        this.$router.push(`/edit-to-do/${id}`);
      },
      updatePage(pageNumber) {
        this.currentPage = pageNumber;
        this.updateVisibleTasks();

        if (this.$route.params.page !== String(pageNumber)) {
          this.$router.push(`/page/${pageNumber}`);
        }
      },
      updateVisibleTasks() {
        const currentTaskIndex = (this.currentPage - 1) * this.tasksPerPage;

        this.loading = true;
        this.visibleTasks = this.tasks.slice(currentTaskIndex, currentTaskIndex + this.tasksPerPage);
        this.loading = false;

        if (this.visibleTasks.length === 0 && this.currentPage > 1) {
          const lastPage = Math.ceil(this.tasks.length / this.tasksPerPage);

          this.updatePage(lastPage);
        }
      }
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
