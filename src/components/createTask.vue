<template>
    <div class="input-group mb-3">
        <input
                type="text"
                class="form-control shadow-none"
                placeholder="Title"
                v-model="title"
        />
        <div
                @click="onClickCreate"
                class="input-group-append"
        >
            <button type="submit" class="btn btn-primary mb-2">
                Add task
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                title: ''
            }
        },
        methods: {
            onClickCreate() {
                if (this.title.trim()) {
                    this.$emit('task-submitted', this.title);
                    this.title = '';
                }
            }
        }
    }
</script>
