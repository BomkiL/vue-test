<template>
  <b-container>
    <h4 class="mt-2">Editing</h4>
    <div class="form-group mb-2">
      <input
              type="text"
              class="form-control"
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
        return this.$store.getters.getTask(parseInt(this.$route.params.id, 10));
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
        this.$store.dispatch('changeTitle', {
          id: this.task.id,
          title: this.title
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
