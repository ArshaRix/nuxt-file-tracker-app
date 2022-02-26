<template>
    <div>
        <Modal :showModal="isModalOpen" />
        <button @click.prevent="toggle">Show modal</button>
    </div>
</template>

<script>
    import { mapGetters, mapMutations } from 'vuex'

    export default {
        computed: {
            ...mapGetters({ isModalOpen: 'modal/toggle' }),
        },

        methods: {
            ...mapMutations({ toggle: 'modal/TOGGLE' }),
        },
    }
</script>

<style lang="scss" scoped>

    div {
        @include pad;
    }

</style>