<template>
    <div class="file">
        <div class="file-view" v-if="user.role === 'user'">
            <div class="page">
                <ul class="file-request">
                    <li class="row file-request--item">
                        <div class="content">
                            <div class="content-top">Code - GMC</div>
                            <div class="content-center">Good Moral Certificate</div>
                        </div>
                    </li>
                    <li class="row file-request--item">
                        <div class="group">
                            <div class="field group-data">
                                <div class="col group-data--col">
                                    <p class="text-form">School Information</p>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="row file-request--item">
                        <div class="group">
                            <div class="field group-data">
                                <div class="col group-data--col">
                                    <p class="col-title">Student Number</p>
                                    <p class="col-text">{{ user.studentNumber }}</p>
                                </div>
                            </div>
                            <div class="field group-data">
                                <div class="col group-data--col">
                                    <p class="col-title">Course</p>
                                    <p class="col-text">{{ user.course }}</p>
                                </div>
                            </div>
                            <div class="field group-data">
                                <div class="col group-data--col">
                                    <p class="col-title">Section</p>
                                    <p class="col-text">{{ user.section }}</p>
                                </div>
                            </div>
                            <div class="field group-data">
                                <div class="col group-data--col">
                                    <p class="col-title">Year Graduated</p>
                                    <p class="col-text">{{ user.yearGraduated }}</p>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="row file-request--item">
                        <div class="group">
                            <div class="field group-data">
                                <div class="col group-data--col">
                                    <button class="button button-back" @click="redirect()">Go Back</button>
                                </div>
                            </div>
                            <div class="field group-data">
                                <div class="col group-data--col">
                                    <template v-if="this.user.document === ''">
                                        <button class="button button-submit" type="submit" @click.prevent="toggle">Submit a Request</button>
                                    </template>
                                    <template v-if="this.user.document === !''">
                                        <button class="button button-submit" type="submit" :disabled="this.user.document === !''">{{ this.user.document }}</button>
                                    </template>                                        
                                </div>
                            </div>
                        </div>                        
                    </li>
                </ul>
                <Modal :showModal="isModalOpen" documentData="Good Moral Certificate" />
            </div>
        </div>
        <div class="file-view" v-else></div>
    </div>
</template>

<script>
    import { mapState, mapMutations, mapGetters } from 'vuex'

    export default {
        middleware: 'auth',

        computed: {
            ...mapState('auth', ['loggedIn', 'user']),
            ...mapGetters({ isModalOpen: 'modal/toggle' }),
        },

        methods: {
            ...mapMutations({ toggle: 'modal/TOGGLE' }),

            redirect() {
                this.$router.push('/')
            },
        }
    }
</script>

<style lang="scss" scoped>

    .file {
        padding: 12.667vh 12.667vw 0;
        transition: all .5s ease;

        &-view {

            .page {

                ul {
                    list-style: none;

                    li {
                        border-bottom: 1.5px solid rgba(61, 61, 61, 1);
                        color: rgba(61, 61, 61, 1);
                    }

                    li:first-child {

                        .content {
                            pointer-events: none;
                            text-transform: uppercase;

                            &-top, &-center {
                                padding: 1.467vh 0;
                            }

                            &-top {
                                font-size: clamp(0.75rem, 0.8vw, 0.855rem);
                            }

                            &-center {
                                font-size: clamp(2.667rem, 6vw, 8.667rem);
                                text-align: center;
                            }
                        }
                    }

                    li:nth-child(n+2) {

                        .group {
                            display: flex;
                            align-items: center;
                            justify-content: space-around;
                            flex-wrap: wrap;
                            padding: 6.667vh 0;
                            gap: 2rem 4rem;

                            &-data {
                                flex: 0 1 500px;
                                border-bottom: 1.5px solid rgba(61, 61, 61, 1);
                                margin: 1.6667vh 0;

                                .col {
                                    font-size: clamp(0.95rem, 1vw, 1.055rem);

                                    &-title {
                                        font-size: clamp(0.8rem, .85vw, 0.9rem);
                                        text-transform: uppercase;
                                        letter-spacing: .15em;
                                    }

                                    p {
                                        padding: 0.667vh 0;
                                    }

                                    &-text {
                                        margin-bottom: 2.667vh;
                                        letter-spacing: .05em;
                                    }
                                }
                            }
                        }
                    }

                    li:nth-child(2) {

                        .group {
                            justify-content: center;
                            letter-spacing: .2em;
                            text-transform: uppercase;
                            text-align: center;
                            padding: 4.667vh 0;

                            &-data {
                                border: none;
                            }
                        }
                    }

                    li:last-child {
                        border: none;

                        .group {
                            justify-content: flex-end;
                            gap: 1rem 2rem;
                            padding: 0.667vh 0;

                            &-data {
                                border: none;
                                flex: none;

                                .col {
                                    display: inline-block;

                                    .button {
                                        padding: 1.334vh 1.667vw;
                                        text-transform: uppercase;
                                        letter-spacing: .15em;
                                        cursor: pointer;
                                        outline: none;
                                        border: none;

                                        &-back {
                                            background-color: rgba(var(--col-gray), .1);
                                        }

                                        &-submit {
                                            background-color: rgba(var(--col-black), .9);
                                            color: rgba(234, 234, 234, 1);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

</style>