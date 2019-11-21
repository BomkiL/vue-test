<template>
    <nav v-if="totalPages > 1">
        <ul class="pagination">
            <li
                class="page-item"
                :class="{disabled: !showPreviousLink}"
            >
                <a
                    @click="updatePage(currentPage - 1)"
                    class="page-link"
                >
                    Previous
                </a>
            </li>
            <li
                class="page-item"
                :class="{disabled: !showNextLink}"
            >
                <a
                    @click="updatePage(currentPage + 1)"
                    class="page-link"
                >
                    Next
                </a>
            </li>
        </ul>
    </nav>
</template>

<script>
    export default {
        props: {
            tasksTotal: {
                type: Number,
                required: true
            },
            currentPage: {
                type: Number,
                required: true
            },
            tasksPerPage: {
                type: Number,
                required: true
            }
        },
        computed: {
            totalPages() {
                return Math.ceil(this.tasksTotal / this.tasksPerPage);
            },
            showPreviousLink() {
                return this.currentPage > 1;
            },
            showNextLink() {
                return this.currentPage !== this.totalPages;
            }
        },
        methods: {
            updatePage(pageNumber) {
                this.$emit('page-selected', pageNumber);
            }
        }
    }
</script>
