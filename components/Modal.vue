<template>
    <transition name="fade">
        <div class="modal" v-if="$store.state.modal.toggle">
            <div class="modal-view">
                <div class="page">
                    <div class="row">
                        <h3>Submit a request</h3>
                    </div>
                    <div class="row">
                        <p>
                            Submitting a request will automatically send to the corresponding professor. 
                            Please check the <span> <nuxt-link to="/user/request">Request Page</nuxt-link></span> to know the status of your request.
                        </p>
                    </div>
                    <div class="row">
                        <button class="btn btn-cancel" @click.prevent="toggle" :title="cancel">Cancel</button>
                        <button class="btn btn-submit" @click.prevent="submitForm">Submit</button>
                    </div>
                </div>
                <div class="close-svg">
                    <svg xmlns="http://www.w3.org/2000/svg" class="close" @click.prevent="toggle" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>           
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import { mapState, mapMutations } from 'vuex'

    export default {
        props: ['documentData'],
        data() {
            return {
                cancel: 'Cancel request',
                action: 'Waiting for approval'
            }
        },

        computed: {
            ...mapState('auth', ['loggedIn', 'user']),
        },

        methods: {
            ...mapMutations({ toggle: 'modal/TOGGLE' }),

            async submitForm() {
                try {
                    await this.$axios.$post('/api/documents/', {
                        document: this.documentData,
                        action: this.action,
                        studentFirstName: this.user.firstname,
                        studentLastName: this.user.lastname,
                        studentEmail: this.user.email
                    })
                    this.$store.dispatch('modal/toggle')
                    this.$router.push('/')
                } catch (err) {
                    console.log(err)
                }
            }
        },
    }
</script>

<style lang="scss" scoped>

    .modal {
        z-index: 150;
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100%;
        background: rgba(var(--col-black), .533);
        
        display: flex;
        align-items: center;
        justify-content: center;
        
        &-view {
            padding: 2rem;
            background-color: rgba(var(--col-white), 1);
            position: relative;
            width: 28vw;

            .page {

                .row:first-child, .row:nth-child(2) {
                    padding-left: 2rem;
                    padding-right: 2rem;
                }

                .row:first-child {
                    margin: 3em 0 1.5em;
                   color: rgba(var(--col-gray), 1);
                }

                .row:nth-child(2) {
                    width: 85%;
                    margin-bottom: 3.5em;

                    p {
                        font-size: clamp(.67rem, .74vw, .85rem);
                        color: rgba(var(--col-gray), .8);
                        text-align: justify;
                        line-height: 1.63;

                        span {
                            color: rgba(var(--col-black), 1);

                            a {
                                text-transform: none;
                                letter-spacing: 0;
                                transition: color .1s ease;

                                &:hover {
                                    color: rgba(254, 75, 8, 1);
                                }
                            }
                        }
                    }
                }
                
                .row:last-child {
                    display: flex;
                    justify-content: flex-end;

                    .btn {
                        padding: 1.334vh 1.667vw;
                        font-size: clamp(.67rem, .7vw, .75rem);
                        letter-spacing: .15em;
                        cursor: pointer;
                        outline: none;
                        border: none;
                        border-radius: .2em;
                    }

                    .btn-submit {
                        background-color: rgba(var(--col-black), 1);
                        color: rgba(var(--col-white), 1);
                        margin-right: 1.5em;
                    }

                    .btn-cancel {
                        background-color: rgba(var(--col-white), .1);
                    }
                }
            }

            .close-svg {
                position: absolute;
                right: 7%;
                top: 7%;

                svg {
                    height: 1.2em;
                    width: 1.2em;
                    color: rgba(var(--col-gray), .5);
                    cursor: pointer;
                }
            }
        }
    }    

</style>