<template>
    <header class="header">
        <div class="header-view" :class="{ navScroll: scrollPosition > 50 }">
            <div class="page">
                <div class="row">
                    <div class="nav nav-top">
                        <nuxt-link class="link" to="/">The Chronoa Project</nuxt-link>
                    </div>
                </div>
                <div class="row">
                    <div class="nav nav-center">
                        <div class="item">
                            <nuxt-link class="link" to="/about">About</nuxt-link>
                        </div>
                        <div class="item">
                            <nuxt-link class="link" to="/team">Team</nuxt-link>
                        </div>
                        <div class="item">
                            <nuxt-link class="link" to="/contact">Contact</nuxt-link>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="nav nav-bottom">
                        <div class="item" v-if="!loggedIn">
                            <nuxt-link class="link" to="/login">Login</nuxt-link>
                        </div>
                        <div class="item dropdown" v-else>
                            <a class="label" href="">{{ user.firstname }}</a>
                            <ul>
                                <li><nuxt-link class="label" to="/user/settings">Settings</nuxt-link></li>
                                <li><a class="label" href="#" @click="$auth.logout()">Logout</a></li>
                            </ul>
                        </div>
                        <div class="item item-request">
                            <nuxt-link class="link" to="/user/request">Request</nuxt-link>
                        </div>                        
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        data() {
            return {
                scrollPosition: null,
            }
        },

        computed: {
            ...mapState('auth', ['loggedIn', 'user']),
        },

        methods: {
            updateScroll() {
                this.scrollPosition = window.scrollY
            }
        },

        mounted () {
            window.addEventListener('scroll', this.updateScroll);
        },

    }
</script>

<style lang="scss" scoped>

    .header {
        top: 0;
        position: absolute;
        width: 100%;

        &-view {
            transition: all .3s ease;
            padding: 0 var(--pw);

            .page {
                @include spaceBetween;
                border-bottom: 1.5px solid rgba(var(--col-gray), .9);

                .nav {
                    display: flex;
                    align-items: center;

                    .item {
                        transition: all .3s ease;
                        padding: 4.667vh 2vw;
                    }
                }

                .nav-top {

                    .link {
                        font-weight: 600;
                    }
                }

                .nav-center, .nav-bottom {
                    a.nuxt-link-active {
                        color: rgba(61, 61, 61, .5);
                    }
                }

                .nav-center {

                    .link {
                        font-weight: 300;
                    }
                }

                .nav-bottom {

                    .item {
                        padding: 4.667vh .8vw;
                    }

                    .item-request {
                        
                        a {
                            color: rgba(61, 61, 61, .6);
                        }
                    }
                }
                
            }
        }

        .dropdown {
            position: relative;
            display: inline-block;

            a {
                transition: all .3s ease;
            }

            ul {
                display: none;
                position: absolute;
                background-color: #fff;
                min-width: 100px;
                box-shadow: 0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12);
                list-style: none;
                transition: all .5s ease;
                right: .01rem;
                margin-top: .2rem;
                
                li {
                    width: 100%;
                    padding: 0 2px;

                    &:hover {
                        background: rgba(var(--col-caramel), .5);
                    }

                    a {
                        text-decoration: none;
                        padding: 7px 10px;
                        display: block;
                        font-size: clamp(.607rem, .837vw, .89rem);  
                    }
                }
            }

            &:hover ul {
                display: block;
            }
        }

        .navScroll {

            .rows {

                .nav {

                    .item {
                        padding-top: 2.334vh;
                        padding-bottom: 2.334vh;
                    }
                }
            }

        }
    }

</style>