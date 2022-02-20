<template>
    <div class="user">
        <div class="user-view">
            <div class="page">
                <form class="layout" method="post" @submit.prevent="submitForm">
                    <div class="row layout-row layout-border">
                        <div class="content">
                            <div class="label">Login</div>
                        </div>
                        <div class="content">
                            <nuxt-link class="label create" to="/user/create">Create your account</nuxt-link>
                        </div>
                    </div>
                    <div class="row layout-row">
                        <div class="group">
                            <div class="field group-data">
                                <div class="col group-data--col">
                                    <label class="label">Username</label>
                                    <input class="input" v-model="userInfo.username" type="text" />
                                </div>
                            </div>
                            <div class="field group-data">
                                <div class="col col-pass group-data--col">
                                    <label class="label">Password</label>
                                    <input class="input" v-model="userInfo.password" :type="show ? 'password' : 'text'" />
                                    <svg xmlns="http://www.w3.org/2000/svg" @click="show = !show" :class="{'block': !show, 'hidden': show }" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>                                    
                                </div>  
                            </div>
                        </div>
                    </div>
                    <div class="row layout-row">
                        <div class="content">
                            <nuxt-link class="content-caption" to="/">Password forgotten?</nuxt-link>
                        </div>
                    </div>
                    <div class="row layout-row">
                        <div class="content">
                            <button class="content-button" type="submit">Login</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                userInfo: {
                    username: null,
                    password: null,
                },
                title: 'Login',
                show: true,
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

        methods: {
            async submitForm() {
                try {
                    await this.$auth.loginWith("local", { data: this.userInfo })
                    this.$router.push('/')
                } catch (err) {
                    console.log(err);
                }
            },
        }
    }
</script>

<style lang="scss" scoped>

    .page {
        display: flex;
        justify-content: center;
        transition: all .5s ease;

        .layout {
            width: 40vw;

            &-row:first-child {
                @include spaceBetween;
                
                .content {
                    padding: 2.667vh 0 3.667vh;

                    &-text {
                        text-transform: uppercase;
                        letter-spacing: .2em;
                    }

                    .create {
                        color: rgba(61, 61, 61, .5);
                    }                   
                }                
            }

            &-row:nth-child(2) {

                .group {
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    width: 40vw;
                    flex-wrap: wrap;
                    padding: 5.667vh 0 1.667vh;
                    gap: 2rem;

                    &-data {
                        flex: 1 1 250px;

                        .col {
                            display: flex;
                            flex-direction: column;

                            .label {
                                color: rgba(var(--col-gray), .9);
                            }

                            .input {


                                &:hover, &:focus {
                                    border-color: rgba(var(--col-gray), 1);
                                }
                            }
                        }

                        .col-pass {
                            position: relative;

                            svg {
                                position: absolute;
                                height: 1em;
                                width: 1em;
                                right: 5%;
                                bottom: 20%;
                                color: rgba(61, 61, 61, .5);
                                cursor: pointer;
                            }
                        }                        
                    }
                }                
            }

            &-row:nth-child(3) {

                .content {
                    display: flex;
                    justify-content: flex-end;

                    a {
                        text-transform: none;
                        letter-spacing: .01em;
                    }

                    &-caption {
                        border-bottom: 1px solid rgba(61, 61, 61, .9);
                    }
                }
            }

            &-row:last-child {
                
                .content {
                    display: flex;
                    justify-content: center;
                    transition: padding .3s ease;
                    padding-top: 3vh;

                    &-button {
                        padding: 1.334vh 8.334vw;
                        text-transform: uppercase;
                        letter-spacing: .15em;
                        cursor: pointer;
                        outline: none;
                        border: none;

                        background-color: rgba(var(--col-black), .9);
                        color: rgba(var(--col-white), 1);
                        
                        &:hover {
                            background: rgba(var(--col-black), .8);
                        }
                    }
                }
            }
        }
    }

</style>