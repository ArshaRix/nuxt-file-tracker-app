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
                                <div class="col group-data--col">
                                    <label class="label">Password</label>
                                    <input class="input" v-model="userInfo.password" type="password" />
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
                title: 'Login'
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