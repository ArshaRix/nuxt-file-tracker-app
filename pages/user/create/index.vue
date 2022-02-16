<template>
    <div class="user create">
        <div class="user-view">
            <div class="page">
                <form class="layout" method="post" @submit.prevent="submitForm">
                    <div class="row layout-row layout-border">
                        <div class="content">
                            <div class="label">Create your account</div>
                        </div>
                        <div class="content">
                            <nuxt-link class="label create" to="/login">Login</nuxt-link>
                        </div>
                    </div>
                    <div class="row layout-row">
                        <div class="group">
                            <div class="field group-data">
                                <div class="col group-data--col">
                                    <label class="label">First Name</label>
                                    <input class="input" v-model="userInfo.firstname" type="text" required />
                                </div>
                            </div>
                            <div class="field group-data">
                                <div class="col group-data--col">
                                    <label class="label">Last Name</label>
                                    <input class="input" v-model="userInfo.lastname" type="text" required />
                                </div>  
                            </div>
                        </div>
                    </div>
                    <div class="row layout-row">
                        <div class="group">
                            <div class="field group-data">
                                <div class="col group-data--col">
                                    <label class="label">Email</label>
                                    <input class="input" v-model="userInfo.email" type="text" required />
                                </div>
                            </div>
                            <div class="field group-data">
                                <div class="col group-data--col">
                                    <label class="label">Username</label>
                                    <input class="input" v-model="userInfo.username" type="text" required />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row layout-row">
                        <div class="group">
                            <div class="field group-data">
                                <div class="col group-data--col">
                                    <label class="label">Password</label>
                                    <input class="input" v-model="userInfo.password" type="password" required />
                                </div>
                            </div>
                            <div class="field group-data">
                                <div class="col group-data--col">
                                    <label class="label">Confirm Password</label>
                                    <input class="input" type="password" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row layout-row">
                        <div class="group-radio">
                            <p class="title-h3">Role:</p>
                            <input type="radio" value="user" id="user-1" v-model="radio_value" checked>
                            <label class="label" for="user-1">Student</label>                       
                            <input type="radio" value="client" id="user-2" v-model="radio_value">
                            <label class="label" for="user-2">Professor</label>
                        </div>
                    </div>
                    <div class="row layout-row">
                        <div class="content">
                            <button class="content-button">Create an Account</button>
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
                    email: null,
                    firstname: null,
                    lastname: null,
                    username: null,
                    password: null
                },
                radio_value: 'user',
                registered: 'no',
                title: 'Create your account'
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
                    await this.$axios.$post('/api/users/', {
                        email: this.userInfo.email,
                        firstname: this.userInfo.firstname,
                        lastname: this.userInfo.lastname,
                        username: this.userInfo.username,
                        password: this.userInfo.password,
                        role: this.radio_value,
                        registered: this.registered
                    })
                    .then((res) => {

                        this.$auth.loginWith("local", { 
                            data: {
                                username: this.userInfo.username,
                                password: this.userInfo.password
                            }
                        })
                        this.$router.push('/')
                    })
                } catch (err) {
                    console.log(err);
                }
            },
        }
    }
</script>

<style lang="scss" scoped>

    .page {

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

            &-row:nth-child(n+2) {

                .group {
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    width: 40vw;
                    flex-wrap: wrap;
                    padding: 1.667vh 0 1.667vh;
                    gap: 2rem;

                    &-data {
                        flex: 1 1 250px;

                        .col {
                            display: flex;
                            flex-direction: column;

                            label {
                                color: rgba(var(--col-gray), .9);
                            }

                            input {

                                &:hover, &:focus {
                                    border-color: rgba(var(--col-gray), 1);
                                }
                            }
                        }
                    }
                }                
            }

            &-row:nth-child(2) {

                .group {
                    padding-top: 5.667vh;
                }
            }

            &-row:nth-child(5) {
                padding-top: 2.667vh;

                p {
                    text-transform: uppercase;
                    padding-right: 1.667vw;
                    color: rgba(var(--col-gray), .8);
                }

                .group-radio {
                    display: flex;
                    align-items: center;
                    margin-bottom: 2em;

                    input[type=radio] {
                        position: absolute;
                        opacity: 0;
                        z-index: -1;
                    }
                    
                    label {
                        position: relative;
                        text-transform: uppercase;
                        margin-right: 2em;
                        padding-left: 2em;
                        padding-right: 1em;
                        line-height: 2;
                        cursor: pointer;
                        color: rgba(61, 61, 61, .5);
                        
                        &::before {
                            box-sizing: border-box;
                            content: " ";
                            position: absolute;
                            top: 0.3em;
                            left: 0;
                            display: block;
                            width: 1.4em;
                            height: 1.4em;
                            border: 1px solid rgba(61, 61, 61, .8);
                            border-radius: .25em;
                            z-index: -1;                            
                        }
                    }

                    // label:first-child {
                    //     padding-right: 1em;
                    // }

                    input[type=radio] + label::before {
                        border-radius: .01em;
                    }
                    
                    input[type=radio]:checked + label {
                        padding-left: 1em;
                        color: rgba(61, 61, 61, .8);

                        &:before {
                            top: 0;
                            width: 100%;
                            height: 2em;
                            background-color: rgba(242, 241, 229, .3);
                        }
                    }

                    label, label::before {
                        -webkit-transition: .25s all ease;
                        -o-transition: .25s all ease;
                        transition: .25s all ease;
                    }

                }
            }

            &-row:last-child {
                
                .content {
                    display: flex;
                    justify-content: center;
                    transition: padding .3s ease;
                    padding-top: 1.5vh;

                    &-button {
                        padding: 1.334vh 4.334vw;
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