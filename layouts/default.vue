<template>
    <div class="default">
        <Header />
        <Nuxt />
    </div>
</template>

<script>
    export default {
        name: 'default'
    }
</script>

<style lang="scss">

    .default {
        position: relative;

        .home, .about, .contact, .team, .user {
            @include pad;

            .page {
                transition: all .5s ease;

                .request, .layout {

                    &-row {

                        .content, .group {

                            &-title {
                                @include title;
                            }

                            .name {
                                @include subtitle;
                            }                            

                            &-text, .text {
                                @include text;
                            }

                            .label {
                                @include label;
                            }

                            &-caption, .position {
                                @include caption;
                            }
                            
                            .input {
                                @include input;
                            }
                        }
                    }

                    &-border {
                        border-bottom: 1.5px solid rgba(var(--col-gray), .9);
                    }
                }
            }
        }

        .user, .home {

            .page {
                display: flex;
                justify-content: center;       
            }

            .page-user {

                li {
                    display: flex;
                    justify-content: center;               
                }
            }
        }
    }

    .fade-enter-active, 
    .fade-leave-active { 
        transition: opacity .5s; 
    }
    .fade-enter, 
    .fade-leave-active { 
        opacity: 0; 
    }    

</style>