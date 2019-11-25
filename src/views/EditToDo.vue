<template>
  <b-container class="container-wrapper">
    <h4 class="mt-2">Editing</h4>
    <div class="form-group mb-2">
      <input
              type="text"
              class="form-control shadow-none"
              id="taskTitle"
              placeholder="Title"
              v-model="title"
      />
    </div>
    <div class="text-center">
      <div class="btn-group">
        <button
                @click="onClickSave"
                type="button"
                class="btn btn-success"
        >
          Save
        </button>
        <button
                @click="onClickCancel"
                type="button"
                class="btn btn-danger"
        >
          Cancel
        </button>
      </div>
    </div>
  </b-container>
</template>

<script>
  export default {
    computed: {
      task() {
        return this.$store.getters.getTask(this.$route.params.id);
      }
    },
    beforeMount: function() {
      this.title = this.task.title;
    },
    data() {
      return {
        title: ''
      }
    },
    methods: {
      onClickSave() {
        this.$store.dispatch('updateTask', {
          id: this.task.id,
          title: this.title,
          completed: this.task.completed,
        }).then(() => {
          this.$router.back();
        });
      },
      onClickCancel() {
        this.$router.back();
      },
    },
  }
</script>
