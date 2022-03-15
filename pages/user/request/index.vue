<template>
    <div class="user">
        <div class="user-view">
            <div class="page">
                <div class="layout">
                    <div class="row layout-row layout-border">
                        <div class="content">
                            <div class="label" v-if="!loggedIn">Request List</div>
                            <div class="label" v-else>
                                <template v-if="user.role === 'user'">
                                    Request List
                                </template> 
                                <template v-else>
                                    <div class="handler" v-if="user.handlerFile === 'Good Moral Certificate'">
                                        Request List [Good Moral Certificate - Ready to Pickup]
                                    </div>
                                    <div class="handler" v-else-if="user.handlerFile === 'Clearance'">
                                        Request List [Clearance - Ready to Pickup]
                                    </div>
                                    <div class="handler" v-else-if="user.handlerFile === 'Transcript of Records'">
                                        Request List [Transcript of Records - Ready to Pickup]
                                    </div>                                
                                </template> 
                            </div>
                        </div>
                        <div class="content">
                            <div class="label counter" v-if="!loggedIn">0 Request</div>
                            <div class="label" v-else>
                                <template v-if="user.role === 'user'">{{ count }} Request</template>
                                <template v-else>
                                    <div class="handler" v-if="user.handlerFile === 'Good Moral Certificate'">{{ gmcCount }} Request</div>
                                    <div class="handler" v-else-if="user.handlerFile === 'Clearance'">{{ clrCount }} Request</div>
                                    <div class="handler" v-else-if="user.handlerFile === 'Transcript of Records'">{{ torCount }} Request</div>
                                </template>
                            </div>
                        </div>
                    </div>
                    <div class="row layout-row" v-if="!loggedIn">
                        <div class="group not-loggedIn">
                            <div class="">No Request Yet</div>
                        </div>
                    </div>
                    <div class="row layout-row" v-else>
                        <template v-if="user.role === 'user'">
                            <div class="group" v-for="item in list" :key="item._id">
                                <div class="data">
                                    <div class="text">{{ item.document }}</div>
                                    <div class="subtext">
                                        {{ item.action }}
                                        <template v-if="item.document === 'Waiting to release'">
                                            by Prof. {{ item.clientName }}
                                        </template>
                                    </div>
                                </div>
                                <div class="data">
                                    <div class="date">{{ $moment(item.createdAt).format('ll') }}</div>
                                </div>
                            </div>
                        </template>
                        <template v-else>
                            <div class="handler" v-if="user.handlerFile === 'Good Moral Certificate'">
                                <div class="group" v-for="item in gmcList" :key="item._id">
                                    <div class="data">
                                        <div class="text">{{ item.studentLastName }}, {{ item.studentFirstName }}</div>
                                        <div class="subtext">{{ item.action }} by Prof. {{ item.clientName }} </div>
                                    </div>
                                    <div class="data">
                                        <div class="date">{{ $moment(item.createdAt).format('ll') }}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="handler" v-else-if="user.handlerFile === 'Clearance'">
                                <div class="group" v-for="item in clrList" :key="item._id">
                                    <div class="data">
                                        <div class="text">{{ item.studentLastName }}, {{ item.studentFirstName }}</div>
                                        <div class="subtext">{{ item.action }} by Prof. {{ item.clientName }} </div>
                                    </div>
                                    <div class="data">
                                        <div class="date">{{ $moment(item.createdAt).format('ll') }}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="handler" v-else-if="user.handlerFile === 'Transcript of Records'">
                                <div class="group" v-for="item in torList" :key="item._id">
                                    <div class="data">
                                        <div class="text">{{ item.studentLastName }}, {{ item.studentFirstName }}</div>
                                        <div class="subtext">{{ item.action }} by Prof. {{ item.clientName }} </div>
                                    </div>
                                    <div class="data">
                                        <div class="date">{{ $moment(item.createdAt).format('ll') }}</div>
                                    </div>
                                </div>
                            </div>
                        </template>                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        data() {
            return {
                list: null,
                count: null,
                gmcList: null,
                gmcCount: null,
                clrList: null,
                clrCount: null,
                torList: null,
                torCount: null,
                title: 'Request List'
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

        computed: {
            ...mapState('auth', ['loggedIn', 'user']),
        },

        mounted () {
            loadList: {
                if (this.loggedIn) {
                    this.$axios.$get('/api/documents/list/').then(response => {
                        this.list = response
                    }).catch(err => {
                        console.log(err)
                    })
                }
            }

            countList: {
                if (this.loggedIn) {
                    this.$axios.$get('/api/documents/list/count').then(response => {
                        this.count = response
                    }).catch(err => {
                        console.log(err)
                    })
                }
            }

            gmcListData: {
                if (this.loggedIn) {
                    this.$axios.$get('/api/gmc/state/rp').then(response => {
                        this.gmcList = response
                    }).catch(err => {
                        console.log(err)
                    })
                }
            }

            gmcCountList: {
                if (this.loggedIn) {
                    this.$axios.$get('/api/gmc/state/rp/count').then(response => {
                        this.gmcCount = response
                    }).catch(err => {
                        console.log(err)
                    })
                }
            }            

            clrListData: {
                if (this.loggedIn) {
                    this.$axios.$get('/api/clr/state/rp').then(response => {
                        this.clrList = response
                    }).catch(err => {
                        console.log(err)
                    })
                }
            }

            clrCountList: {
                if (this.loggedIn) {
                    this.$axios.$get('/api/clr/state/rp/count').then(response => {
                        this.clrCount = response
                    }).catch(err => {
                        console.log(err)
                    })
                }
            }             

            torListData: {
                if (this.loggedIn) {
                    this.$axios.$get('/api/tor/state/rp').then(response => {
                        this.torList = response
                    }).catch(err => {
                        console.log(err)
                    })
                }
            }
            
            torCountList: {
                if (this.loggedIn) {
                    this.$axios.$get('/api/tor/state/rp/count').then(response => {
                        this.torCount = response
                    }).catch(err => {
                        console.log(err)
                    })
                }
            }             
        },
    }
</script>

<style lang="scss" scoped>

    .page {

        .layout {
            width: 50vw;

            &-row:first-child {
                @include spaceBetween;

                .content {
                    padding: 2.667vh 0 3.667vh;

                    .counter {
                        color: rgba(61, 61, 61, .5);
                    }
                }
            }

            &-row:nth-child(2) {
                
                .group {
                    @include spaceBetween;
                    align-items: flex-start;
                    border-bottom: 1.5px solid rgba(var(--col-gray), .9);
                    padding: 6.667vh .6vw;

                    .text {
                        font-size: clamp(.9rem, 1.5vw, 1.9rem);
                        text-transform: capitalize;
                        padding: .45vh 0;
                    }

                    .subtext {
                        font-size: clamp(.74rem, .9vw, .967rem);
                        color: rgba(var(--col-gray), .5);
                        letter-spacing: .15em;
                    }

                    .date {
                        color: rgba(var(--col-gray), .8);
                        letter-spacing: .0667em;
                        padding-top: 1rem;
                    }
                }

                .not-loggedIn {
                    padding: 4.667vh 0;
                }
            }
        }
    }

</style>