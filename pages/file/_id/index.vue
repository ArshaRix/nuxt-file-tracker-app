<template>
    <div class="file">
        <div class="file-view">
            <div class="page">
                <ul class="file-request">
                    <li class="row file-request--item">
                        <div class="content">
                            <div class="content-top">Request</div>
                            <div class="content-center">{{ documents.document }}</div>
                        </div>
                    </li>
                    <li class="row file-request--item">
                        <div class="group">
                            <div class="field group-data">
                                <div class="col group-data--col">
                                    <p class="text-form">{{ documents.action }}</p>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="row file-request--item">
                        <div class="group">
                            <div class="field group-data">
                                <div class="col group-data--col">
                                    <p class="col-title">Student Number</p>
                                    <p class="col-text">{{ documents.creator.studentNumber }}</p>
                                </div>
                            </div>
                            <div class="field group-data">
                                <div class="col group-data--col">
                                    <p class="col-title">Course</p>
                                    <p class="col-text">{{ documents.creator.course }}</p>
                                </div>
                            </div>
                            <div class="field group-data">
                                <div class="col group-data--col">
                                    <p class="col-title">Section</p>
                                    <p class="col-text">{{ documents.creator.section }}</p>
                                </div>
                            </div>
                            <div class="field group-data">
                                <div class="col group-data--col">
                                    <p class="col-title">Year Graduated</p>
                                    <p class="col-text">{{ documents.creator.yearGraduated }}</p>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="row file-request--item">
                        <div class="group">
                            <div class="field group-data">
                                <div class="col group-data--col" v-if="documents.action === 'Waiting for approval'">
                                    <button class="button button-back" @click="rejectForm">Reject Request</button>
                                </div>
                                <div class="col group-data--col" v-if="documents.action === 'Waiting to release'">
                                    <button class="button button-back" @click="rejectForm">Reject Request</button>
                                </div>
                            </div>
                            <div class="field group-data">
                                <div class="col group-data--col" v-if="documents.action === 'Waiting for approval'">
                                    <button class="button button-submit" type="submit" @click="waitingToReleaseForm">Waiting to Release</button>
                                </div>
                                <div class="col group-data--col" v-else-if="documents.action === 'Waiting to release'">
                                    <button class="button button-submit" type="submit" @click="readyToPickUpForm">Ready to Pickup</button>
                                </div>
                                <div class="col group-data--col" v-else-if="documents.action === 'Ready to pickup'">
                                    <button class="button button-submit" disabled>Process Completed</button>
                                </div>
                            </div>
                        </div>                  
                    </li>                                                     
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        middleware: 'auth',

        data() {
            return {
                actionWR: 'Waiting to release',
                actionRP: 'Ready to pickup',
                actionRM: 'Remarks',
            }
        },

        async asyncData( context ){
            const { data } = await context.$axios.get('/api/documents/' + context.route.params.id)
            return { documents : data }
        },

        computed: {
            ...mapState('auth', ['loggedIn', 'user']),

            name() {
                return this.user.firstname + '' + this.user.lastname
            }
        },

        methods: {
            async waitingToReleaseForm() {
                try {
                    await this.$axios.$patch('/api/documents/' + this.$route.params.id, {
                        action: this.actionWR,
                        clientName: `${this.user.firstname} ${this.user.lastname}`
                    })
                    this.$router.push('/')
                } catch (err) {
                    console.log(err)
                }
            },

            async readyToPickUpForm() {
                try {
                    await this.$axios.$patch('/api/documents/' + this.$route.params.id, {
                        action: this.actionRP,
                        clientName: `${this.user.firstname} ${this.user.lastname}`
                    })
                    this.$router.push('/')
                } catch (err) {
                    console.log(err)
                }
            },

            async rejectForm() {
                try {
                    await this.$axios.$patch('/api/documents/' + this.$route.params.id, {
                        action: this.actionRM,
                        clientName: `${this.user.firstname} ${this.user.lastname}`
                    })
                    this.$router.push('/')
                } catch (err) {
                    console.log(err)
                }
            }            
        },
    }
</script>

<style lang="scss" scoped>

    .file {
        @include pad;
        transition: all .5s ease;

        &-view {

            .page {

                ul {
                    list-style: none;

                    li {
                        border-bottom: 1.5px solid rgba(var(--col-gray), .5);
                        color: rgba(var(--col-gray), 1);
                    }
                    
                    li:first-child {

                        .content {
                            pointer-events: none;
                            text-transform: uppercase;

                            &-top, &-center {
                                padding: 2.667vh 0;
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
                                        color: var(--col-black);
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
                            pointer-events: none;

                            &-data {
                                border: none;

                                .text-form {
                                    color: rgba(254, 75, 8, 1);
                                }
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
                                            background-color: rgba(var(--col-caramel), .5);
                                            border: 1px solid rgba(var(--col-gray), .5);
                                            color: rgba(var(--col-gray), .9);
                                            transition: color .3s ease;

                                            &:hover {
                                                color: rgba(254, 75, 8, .9);
                                            }

                                        }

                                        &-submit {
                                            background-color: rgba(var(--col-black), .9);
                                            color: rgba(var(--col-white), 1);
                                            transition: all .3s ease;

                                            &:hover {
                                                background-color: rgba(var(--col-black), .8);
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
    }

</style>