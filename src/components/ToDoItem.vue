<template>
  <li
      class="list-group-item"
      :class="{completed: task.completed}"
  >
    <div>
      <input
              v-on:change="$emit('task-checked', task.id)"
              type="checkbox"
              :checked="task.completed"
      >
    </div>
    <div
            @click="$emit('task-edited', task.id)"
            class="col-8 title-col"
    >
      {{task.title}}
    </div>
    <div>
      <button
              @click="$emit('task-removed', task.id)"
              type="button"
              class="btn btn-outline-danger btn-sm"
      >
        Delete
      </button>
    </div>
  </li>
</template>

<script>
  export default {
    props: {
      task: {
        type: Object,
        required: true
      }
    }
  }
</script>
<style scoped>
  .completed {
    text-decoration: line-through;
  }
  .title-col {
  }
  .delete-col {
  }
</style>
