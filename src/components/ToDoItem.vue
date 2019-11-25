<template>
  <li class="list-group-item list-item_container">
    <div
            class="list-item_title"
            :class="{completed: task.completed}"
    >
      <input
              @change="$emit('task-checked', { id: task.id, completed: !task.completed, title: task.title })"
              type="checkbox"
              :checked="task.completed"
      />
      {{task.title}}
    </div>
    <div class="btn-group">
      <button
              @click="$emit('task-edited', task.id)"
              type="button"
              class="btn btn-outline-warning btn-sm"
      >
        Edit
      </button>
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

  .list-item_container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .list-item_title {
    white-space: nowrap;
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .list-item_container input {
    vertical-align: middle;
  }
</style>
