<template>
    <div class="home">
        <div class="home-view" v-if="loggedIn">
            <UserMisc v-if="user.registered === 'no'" />
            <div class="page-user" v-if="user.role === 'user'">
                <ul class="request-list">
                    <li class="row request-list--item" v-for="request in requestList" :key="request.id">
                        <nuxt-link class="link" :to="'/file/' + request.link">
                            <div class="link-ct link-top">Request 00{{ request.id }}</div> 
                            <div class="link-ct link-center">{{ request.item }}</div>
                            <div class="link-ct link-bottom">
                                <div class="underline">See More</div>
                            </div>
                        </nuxt-link>
                    </li>
                </ul>
            </div>
            <div class="page-client" v-else>
                <div class="page-client--head">
                    <div class="filter">
                        <div class="filter-text" @click="show = !show">Filter by</div>
                        <div class="filter-sort" v-show="!show">
                            <label class="filter-sort--option">
                                <input class="option" type="radio" value="Waiting for approval" v-model="selected" checked />
                                Waiting for approval
                            </label>
                            <label class="filter-sort--option">
                                <input class="option" type="radio" value="Waiting to release" v-model="selected" />
                                Waiting to release
                            </label>                         
                            <label class="filter-sort--option">
                                <input class="option" type="radio" value="Ready to Pickup" v-model="selected" />
                                Ready to Pickup
                            </label>                         
                            <label class="filter-sort--option">
                                <input class="option" type="radio" value="Remarks" v-model="selected" />
                                Remarks
                            </label>                         
                        </div>
                    </div>
                    <div class="search">
                        <input type="search" name="search" placeholder="Search by name" v-model="select">
                    </div>
                </div>
                <div class="page-client--content" >
                    <div class="request request-list" v-if="user.handlerFile === 'Good Moral Certificate'">
                        <template v-if="selected === 'Waiting for approval'">
                            <nuxt-link class="link request-list--item" :to="'/file/' + document._id" v-for="document in gmcStateWaList" :key="document._id">
                                <div class="link-top">{{ $moment(document.createdAt).format('ll') }} - {{ $moment(document.createdAt).format('LT') }}</div>
                                <div class="link-group f-group">
                                    <div class="link-group--title">
                                        <p>Name</p>
                                    </div>
                                    <div class="link-group--text">
                                        <p>{{ document.creator.firstname }} {{ document.creator.lastname }}</p>
                                    </div>
                                </div>
                                <div class="link-group">
                                    <div class="link-group--title">
                                        <p>Request</p>
                                    </div>
                                    <div class="link-group--text">
                                        <p>{{ document.document }}</p>
                                    </div>
                                </div>
                                <div class="link-bottom">
                                    <button class="button-arrow">→</button>
                                </div>
                            </nuxt-link>
                        </template>
                        <template v-else-if="selected === 'Waiting to release'">
                            <nuxt-link class="link request-list--item" :to="'/file/' + document._id" v-for="document in gmcStateWrList" :key="document._id">
                                <div class="link-top">{{ $moment(document.createdAt).format('ll') }}</div>
                                <div class="link-group f-group">
                                    <div class="link-group--title">
                                        <p>Name</p>
                                    </div>
                                    <div class="link-group--text">
                                        <p>{{ document.creator.firstname }} {{ document.creator.lastname }}</p>
                                    </div>
                                </div>
                                <div class="link-group">
                                    <div class="link-group--title">
                                        <p>Request</p>
                                    </div>
                                    <div class="link-group--text">
                                        <p>{{ document.document }}</p>
                                    </div>
                                </div>
                                <div class="link-bottom">
                                    <button class="button-arrow">→</button>
                                </div>
                            </nuxt-link>
                        </template>
                        <template v-else-if="selected === 'Ready to pickup'">
                            <nuxt-link class="link request-list--item" :to="'/file/' + document._id" v-for="document in gmcStateRpList" :key="document._id">
                                <div class="link-top">{{ $moment(document.createdAt).format('ll') }}</div>
                                <div class="link-group f-group">
                                    <div class="link-group--title">
                                        <p>Name</p>
                                    </div>
                                    <div class="link-group--text">
                                        <p>{{ document.creator.firstname }} {{ document.creator.lastname }}</p>
                                    </div>
                                </div>
                                <div class="link-group">
                                    <div class="link-group--title">
                                        <p>Request</p>
                                    </div>
                                    <div class="link-group--text">
                                        <p>{{ document.document }}</p>
                                    </div>
                                </div>
                                <div class="link-bottom">
                                    <button class="button-arrow">→</button>
                                </div>
                            </nuxt-link>
                        </template>
                        <template v-else>
                            <nuxt-link class="link request-list--item" :to="'/file/' + document._id" v-for="document in gmcStateRmList" :key="document._id">
                                <div class="link-top">{{ $moment(document.createdAt).format('ll') }}</div>
                                <div class="link-group f-group">
                                    <div class="link-group--title">
                                        <p>Name</p>
                                    </div>
                                    <div class="link-group--text">
                                        <p>{{ document.creator.firstname }} {{ document.creator.lastname }}</p>
                                    </div>
                                </div>
                                <div class="link-group">
                                    <div class="link-group--title">
                                        <p>Request</p>
                                    </div>
                                    <div class="link-group--text">
                                        <p>{{ document.document }}</p>
                                    </div>
                                </div>
                                <div class="link-bottom">
                                    <button class="button-arrow">→</button>
                                </div>
                            </nuxt-link>
                        </template>                                   
                    </div>
                    <div class="request request-list" v-else-if="user.handlerFile === 'Clearance'">
                        <template v-if="selected === 'Waiting for approval'">
                            <nuxt-link class="link request-list--item" :to="'/file/' + document._id" v-for="document in clrStateWaList" :key="document._id">
                                <div class="link-top">{{ $moment(document.createdAt).format('ll') }}</div>
                                <div class="link-group f-group">
                                    <div class="link-group--title">
                                        <p>Name</p>
                                    </div>
                                    <div class="link-group--text">
                                        <p>{{ document.creator.firstname }} {{ document.creator.lastname }}</p>
                                    </div>
                                </div>
                                <div class="link-group">
                                    <div class="link-group--title">
                                        <p>Request</p>
                                    </div>
                                    <div class="link-group--text">
                                        <p>{{ document.document }}</p>
                                    </div>
                                </div>
                                <div class="link-bottom">
                                    <button class="button-arrow">→</button>
                                </div>
                            </nuxt-link>
                        </template>
                        <template v-else-if="selected === 'Waiting to release'">
                            <nuxt-link class="link request-list--item" :to="'/file/' + document._id" v-for="document in clrStateWrList" :key="document._id">
                                <div class="link-top">{{ $moment(document.createdAt).format('ll') }}</div>
                                <div class="link-group f-group">
                                    <div class="link-group--title">
                                        <p>Name</p>
                                    </div>
                                    <div class="link-group--text">
                                        <p>{{ document.creator.firstname }} {{ document.creator.lastname }}</p>
                                    </div>
                                </div>
                                <div class="link-group">
                                    <div class="link-group--title">
                                        <p>Request</p>
                                    </div>
                                    <div class="link-group--text">
                                        <p>{{ document.document }}</p>
                                    </div>
                                </div>
                                <div class="link-bottom">
                                    <button class="button-arrow">→</button>
                                </div>
                            </nuxt-link>
                        </template>
                        <template v-else-if="selected === 'Ready to pickup'">
                            <nuxt-link class="link request-list--item" :to="'/file/' + document._id" v-for="document in clrStateRpList" :key="document._id">
                                <div class="link-top">{{ $moment(document.createdAt).format('ll') }}</div>
                                <div class="link-group f-group">
                                    <div class="link-group--title">
                                        <p>Name</p>
                                    </div>
                                    <div class="link-group--text">
                                        <p>{{ document.creator.firstname }} {{ document.creator.lastname }}</p>
                                    </div>
                                </div>
                                <div class="link-group">
                                    <div class="link-group--title">
                                        <p>Request</p>
                                    </div>
                                    <div class="link-group--text">
                                        <p>{{ document.document }}</p>
                                    </div>
                                </div>
                                <div class="link-bottom">
                                    <button class="button-arrow">→</button>
                                </div>
                            </nuxt-link>
                        </template>
                        <template v-else>
                            <nuxt-link class="link request-list--item" :to="'/file/' + document._id" v-for="document in clrStateRmList" :key="document._id">
                                <div class="link-top">{{ $moment(document.createdAt).format('ll') }}</div>
                                <div class="link-group f-group">
                                    <div class="link-group--title">
                                        <p>Name</p>
                                    </div>
                                    <div class="link-group--text">
                                        <p>{{ document.creator.firstname }} {{ document.creator.lastname }}</p>
                                    </div>
                                </div>
                                <div class="link-group">
                                    <div class="link-group--title">
                                        <p>Request</p>
                                    </div>
                                    <div class="link-group--text">
                                        <p>{{ document.document }}</p>
                                    </div>
                                </div>
                                <div class="link-bottom">
                                    <button class="button-arrow">→</button>
                                </div>
                            </nuxt-link>
                        </template>  
                    </div>
                    <div class="request request-list" v-else-if="user.handlerFile === 'Transcript of Records'">
                        <template v-if="selected === 'Waiting for approval'">
                            <nuxt-link class="link request-list--item" :to="'/file/' + document._id" v-for="document in torStateWaList" :key="document._id">
                                <div class="link-top">{{ $moment(document.createdAt).format('ll') }}</div>
                                <div class="link-group f-group">
                                    <div class="link-group--title">
                                        <p>Name</p>
                                    </div>
                                    <div class="link-group--text">
                                        <p>{{ document.creator.firstname }} {{ document.creator.lastname }}</p>
                                    </div>
                                </div>
                                <div class="link-group">
                                    <div class="link-group--title">
                                        <p>Request</p>
                                    </div>
                                    <div class="link-group--text">
                                        <p>{{ document.document }}</p>
                                    </div>
                                </div>
                                <div class="link-bottom">
                                    <button class="button-arrow">→</button>
                                </div>
                            </nuxt-link>
                        </template>
                        <template v-else-if="selected === 'Waiting to release'">
                            <nuxt-link class="link request-list--item" :to="'/file/' + document._id" v-for="document in torStateWrList" :key="document._id">
                                <div class="link-top">{{ $moment(document.createdAt).format('ll') }}</div>
                                <div class="link-group f-group">
                                    <div class="link-group--title">
                                        <p>Name</p>
                                    </div>
                                    <div class="link-group--text">
                                        <p>{{ document.creator.firstname }} {{ document.creator.lastname }}</p>
                                    </div>
                                </div>
                                <div class="link-group">
                                    <div class="link-group--title">
                                        <p>Request</p>
                                    </div>
                                    <div class="link-group--text">
                                        <p>{{ document.document }}</p>
                                    </div>
                                </div>
                                <div class="link-bottom">
                                    <button class="button-arrow">→</button>
                                </div>
                            </nuxt-link>
                        </template>
                        <template v-else-if="selected === 'Ready to pickup'">
                            <nuxt-link class="link request-list--item" :to="'/file/' + document._id" v-for="document in torStateRpList" :key="document._id">
                                <div class="link-top">{{ $moment(document.createdAt).format('ll') }}</div>
                                <div class="link-group f-group">
                                    <div class="link-group--title">
                                        <p>Name</p>
                                    </div>
                                    <div class="link-group--text">
                                        <p>{{ document.creator.firstname }} {{ document.creator.lastname }}</p>
                                    </div>
                                </div>
                                <div class="link-group">
                                    <div class="link-group--title">
                                        <p>Request</p>
                                    </div>
                                    <div class="link-group--text">
                                        <p>{{ document.document }}</p>
                                    </div>
                                </div>
                                <div class="link-bottom">
                                    <button class="button-arrow">→</button>
                                </div>
                            </nuxt-link>
                        </template>
                        <template v-else>
                            <nuxt-link class="link request-list--item" :to="'/file/' + document._id" v-for="document in torStateRmList" :key="document._id">
                                <div class="link-top">{{ $moment(document.createdAt).format('ll') }}</div>
                                <div class="link-group f-group">
                                    <div class="link-group--title">
                                        <p>Name</p>
                                    </div>
                                    <div class="link-group--text">
                                        <p>{{ document.creator.firstname }} {{ document.creator.lastname }}</p>
                                    </div>
                                </div>
                                <div class="link-group">
                                    <div class="link-group--title">
                                        <p>Request</p>
                                    </div>
                                    <div class="link-group--text">
                                        <p>{{ document.document }}</p>
                                    </div>
                                </div>
                                <div class="link-bottom">
                                    <button class="button-arrow">→</button>
                                </div>
                            </nuxt-link>
                        </template>  
                    </div>
                </div>
            </div>
        </div>
        <div class="home-view" v-else>
            <div class="page-index">
                <div class="page-index--hero">
                    <div class="hero hero-left">Request</div>
                    <div class="hero hero-right">& Track</div>
                </div>
                <div class="page-index--parag">
                    <div class="parag">To design a system that can store the students records</div>
                    <div class="parag parag-next">To design and develop a system that can be access anywhere with internet connection</div>
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
                selected: 'Waiting for approval',
                show: true,
                requestList: [
                    {
                        id: 1,
                        item: 'Good Moral Certificate',
                        link: 'good-moral',
                    },
                    {
                        id: 2,
                        item: 'Clearance',
                        link: 'clearance',
                    },
                    {
                        id: 3,
                        item: 'Transcript of Records',
                        link: 'transcript-of-records',
                    },
                    {
                        id: 4,
                        item: 'Alumni Form',
                    },
                    {
                        id: 5,
                        item: 'Form ###',
                    },
                ],
                select: '',             
            }
        },

        computed: {
            ...mapState('auth', ['loggedIn', 'user']),
            ...mapState('gmc', ['gmcStateWa', 'gmcStateWr', 'gmcStateRp', 'gmcStateRm']),
            ...mapState('clr', ['clrStateWa', 'clrStateWr', 'clrStateRp', 'clrStateRm']),
            ...mapState('tor', ['torStateWa', 'torStateWr', 'torStateRp', 'torStateRm']),
            
            
            // Good Moral
            gmcStateWaList() {
                var self = this
                return this.gmcStateWa.filter((document) => {
                    return document.studentFirstName.toLowerCase().indexOf(self.select.toLowerCase()) >= 0 || 
                    document.studentLastName.toLowerCase().indexOf(self.select.toLowerCase()) >= 0
                })
            },

            gmcStateWrList() {
                var self = this
                return this.gmcStateWr.filter((document) => {
                    return document.studentFirstName.toLowerCase().indexOf(self.select.toLowerCase()) >= 0 || 
                    document.studentLastName.toLowerCase().indexOf(self.select.toLowerCase()) >= 0
                })
            },

            gmcStateRpList() {
                var self = this
                return this.gmcStateRp.filter((document) => {
                    return document.studentFirstName.toLowerCase().indexOf(self.select.toLowerCase()) >= 0 || 
                    document.studentLastName.toLowerCase().indexOf(self.select.toLowerCase()) >= 0
                })
            },

            gmcStateRmList() {
                var self = this
                return this.gmcStateRm.filter((document) => {
                    return document.studentFirstName.toLowerCase().indexOf(self.select.toLowerCase()) >= 0 || 
                    document.studentLastName.toLowerCase().indexOf(self.select.toLowerCase()) >= 0
                })
            },

            // Clearance
            clrStateWaList() {
                var self = this
                return this.clrStateWa.filter((document) => {
                    return document.studentFirstName.toLowerCase().indexOf(self.select.toLowerCase()) >= 0 || 
                    document.studentLastName.toLowerCase().indexOf(self.select.toLowerCase()) >= 0
                })
            },

            clrStateWrList() {
                var self = this
                return this.clrStateWr.filter((document) => {
                    return document.studentFirstName.toLowerCase().indexOf(self.select.toLowerCase()) >= 0 || 
                    document.studentLastName.toLowerCase().indexOf(self.select.toLowerCase()) >= 0
                })
            },

            clrStateRpList() {
                var self = this
                return this.clrStateRp.filter((document) => {
                    return document.studentFirstName.toLowerCase().indexOf(self.select.toLowerCase()) >= 0 || 
                    document.studentLastName.toLowerCase().indexOf(self.select.toLowerCase()) >= 0
                })
            },

            clrStateRmList() {
                var self = this
                return this.clrStateRm.filter((document) => {
                    return document.studentFirstName.toLowerCase().indexOf(self.select.toLowerCase()) >= 0 || 
                    document.studentLastName.toLowerCase().indexOf(self.select.toLowerCase()) >= 0
                })
            },

            // Transcript of Records
            torStateWaList() {
                var self = this
                return this.torStateWa.filter((document) => {
                    return document.studentFirstName.toLowerCase().indexOf(self.select.toLowerCase()) >= 0 || 
                    document.studentLastName.toLowerCase().indexOf(self.select.toLowerCase()) >= 0
                })
            },

            torStateWrList() {
                var self = this
                return this.torStateWr.filter((document) => {
                    return document.studentFirstName.toLowerCase().indexOf(self.select.toLowerCase()) >= 0 || 
                    document.studentLastName.toLowerCase().indexOf(self.select.toLowerCase()) >= 0
                })
            },

            torStateRpList() {
                var self = this
                return this.torStateRp.filter((document) => {
                    return document.studentFirstName.toLowerCase().indexOf(self.select.toLowerCase()) >= 0 || 
                    document.studentLastName.toLowerCase().indexOf(self.select.toLowerCase()) >= 0
                })
            },

            torStateRmList() {
                var self = this
                return this.torStateRm.filter((document) => {
                    return document.studentFirstName.toLowerCase().indexOf(self.select.toLowerCase()) >= 0 || 
                    document.studentLastName.toLowerCase().indexOf(self.select.toLowerCase()) >= 0
                })
            },
        },

        created() {
            // Good Moral
            this.$store.dispatch('gmc/loadStateWa')
            this.$store.dispatch('gmc/loadStateWr')
            this.$store.dispatch('gmc/loadStateRp')
            this.$store.dispatch('gmc/loadStateRm')

            // Clearance
            this.$store.dispatch('clr/loadStateWa')
            this.$store.dispatch('clr/loadStateWr')
            this.$store.dispatch('clr/loadStateRp')
            this.$store.dispatch('clr/loadStateRm')

            // Transcript or Records
            this.$store.dispatch('tor/loadStateWa')
            this.$store.dispatch('tor/loadStateWr')
            this.$store.dispatch('tor/loadStateRp')
            this.$store.dispatch('tor/loadStateRm')            
        },
    }
</script>

<style lang="scss" scoped>

    .page-user {
        
        ul {
            list-style: none;

            li {
                border-bottom: 1.5px solid rgba(var(--col-gray), .9);
                align-items: center;
                padding: 6.667vh 0;

                .link {
                    text-align: center;

                    .link-ct {
                        text-transform: uppercase;
                        padding: 1.467vh 0;
                    }

                    &-center {
                        text-decoration: none;
                        font-size: clamp(2.667rem, 5vw, 5.667rem);
                        font-weight: 600;
                        letter-spacing: .15em;
                    }

                    &-bottom {
                        
                        .underline {
                            display: inline-block;
                            padding-bottom: 0.2rem;
                            border-bottom: 1.5px solid rgba(var(--col-gray), .9);
                        }
                    }
                }

            }

            li:nth-child(n+4) {
                pointer-events: none;

                .link {
                    &-top, &-center, &-bottom {
                        color: rgba(var(--col-gray), .05);
                    }

                    &-bottom {
                        
                        .underline {
                            border-bottom: 1.5px solid rgba(240, 240, 240, 0.6667);
                        }
                    }                        
                }
            }

            li:last-child {
                padding-bottom: 2vh;
            }
        }        
    }

    .page-client {
        padding-bottom: 7.667vh;

        &--head {
            @include spaceBetween;
            padding: 4.667vh 0;

            .filter {
                display: flex;
                align-items: center;

                &-text {
                    color: var(--col-d-gray);
                    padding-right: 1.667vw;
                    cursor: pointer;
                }

                &-sort {
                    display: flex;
                    align-items: center;
                    transition: padding .3s ease-in-out;
                    
                    &--option {
                        padding: .333vh .667vw;
                        color: rgba(61, 61, 61, .5);
                        transition: color .5s ease;
                        cursor: pointer;

                        &:hover, &:focus-within {
                            color: rgba(61, 61, 61, 1);
                        }
                    }

                    input[type=radio] {
                        -webkit-appearance: none;
                        appearance: none;
                    }

                    input[type=radio]:checked + label {
                        color: rgba(61, 61, 61, 1);
                    }
                }
            }

            .search {

                input[type=search] {
                    border: none;
                    outline: none;
                    background: transparent;
                    transition: border .3s ease;
                    border-bottom: 1px solid transparent;
                    font-size: 1rem;

                    &:focus {
                        border-color: rgba(61, 61, 61, .3);
                    }

                    &::placeholder {
                        padding: 0 0 .15rem;
                        text-align: right;
                    }

                    &::-webkit-search-decoration, 
                    &::-webkit-search-cancel-button, 
                    &::-webkit-search-results-button, 
                    &::-webkit-search-results-decoration {
                        display: none;
                    }
                }
            }
        }

        &--content {

            .request-list {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
                gap: 1rem 2rem;

                .link {
                    border: 1px solid rgba(var(--col-gray), .3);
                    border-radius: .15em;
                    padding: 3vh 2vw;
                    text-decoration: none;
                    transition: all .3s ease-in-out;
                    text-transform: none;
                    
                    &-top {
                        color: rgba(159, 159, 157, 0.7);
                        font-size: clamp(.75rem, .8vw, .855rem);
                        letter-spacing: .05em;
                    }

                    &-group {
                        font-size: clamp(.85rem, 1.155vw, 1.355rem);

                        &--title {
                            font-size: clamp(0.8rem, .85vw, 0.9rem);
                            color: rgba(159, 159, 157, 1);
                            text-transform: uppercase;
                            letter-spacing: .15em;
                        }

                        p {
                            padding: 0.667vh 0;
                        }

                        &--text {
                            margin-bottom: 2.667vh;
                            letter-spacing: .05em;
                            color: var(--col-black);
                            text-transform: capitalize;
                        }
                    }

                    .f-group {
                        padding: 1.667rem 0 .667rem;
                    }

                    &-bottom {
                        display: flex;
                        justify-content: flex-end;

                        .button-arrow {
                            font-size: clamp(.85rem, 1.155vw, 1.355rem);
                            transition: transform .5s ease;
                            background-color: transparent;
                            outline: none;
                            border: none;
                        }
                    }

                    &:hover {
                        border-color: rgba(var(--col-gray), 1);

                        .link-bottom {

                            .button-arrow {
                                transform: translateX(5px);
                            }
                        }
                    }                     
                }
            }

        }
    }

    .page-index {
        height: 87.333vh;

        &--hero {
            position: absolute;
            top: 50vh;

            .hero {
                font-size: clamp(3.334rem, 10.334vw, 12.667rem);
                text-transform: uppercase;
            }

            .hero-right {
                margin-left: 20.667vw;
            }
        }

        &--parag {
            padding-top: 8.667vh;
            display: flex;

            .parag {
                padding: 0 2.667vw 0 0;
                line-height: 1.63;
                width: 17vw;
                color: rgba(var(--col-gray), .7);
            }
        }
    }    

</style>