<template>
    <div class="contact">
        <div class="contact-view">
            <div class="page">
                <div class="layout">
                    <div class="row layout-row">
                        <div class="content">
                            <div class="content-title">Contact</div>
                        </div>
                    </div>
                    <div class="row layout-row">
                        <div class="content">
                            <div class="content-text">Get in Touch</div>
                        </div>
                    </div>
                    <div class="row layout-row">
                        <div class="content">
                            <div class="content-text">r.jericho0586@gmail.com</div>
                            <div class="content-text">09394602656</div>
                        </div>
                    </div>
                    <div class="row layout-row">
                        <div class="content">
                            <div class="content-text">Address</div>
                        </div>
                    </div>
                    <div class="row layout-row">
                        <div class="content">
                            <div class="content-text">Taguig City Manila</div>
                            <div class="content-text">Philippines</div>
                        </div>
                    </div>
                    <div class="row layout-row">
                        <div class="content">
                            <nuxt-link class="content-text" to="/">LinkedIn</nuxt-link>
                            <nuxt-link class="content-text" to="/">Twitter</nuxt-link>
                            <nuxt-link class="content-text" to="/">Facebook</nuxt-link>
                        </div>
                    </div>                    
                </div>
                <div class="layout-bg">
                    <img class="image" :src="require('@/static/img/home-bg.jpg')">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                title: 'Contact'
            }
        },

        head() {
            return {
                title: this.title,
                meta: [
                    {
                        hid: '',
                        name: '',
                        content: '',
                    }
                ]
            }
        }, 

    }
</script>

<style lang="scss" scoped>

    .page {
        color: var(--col-d-gray);
        position: relative;

        .layout {          

            &-row:first-child, &-row:nth-child(2n) {
                padding: 5.667vh 0 1.9667vh;

                .content {

                    &-text {
                        color: rgba(61, 61, 61, .5);
                    }
                }            
            }

            &-row:last-child {

                .content {

                    &-text {
                        display: block;
                        color: var(--col-d-gray);
                        text-transform: capitalize;
                        font-size: clamp(.707rem, .906vw, .997rem);
                        transition: color .5s ease;
                        width: 10%;

                        &:hover {
                            color: rgba(61, 61, 61, .5);
                        }
                    }
                }
            }
        }

        .layout-bg {
            position: absolute;
            top: 35vh;
            left: 47vw;
            transform: translate(-50%, -50%);

            .image {
                object-fit: cover;
                height: 60vh;
                width: 55vw;
            }
        }
    }

</style>