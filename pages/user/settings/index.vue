<template>
    <div class="user">
        <div class="user-view">
            <div class="page">
                <div class="layout">
                    <div class="row layout-row">
                        <div class="content">
                            <div class="content-title title-st">Settings</div>
                        </div>
                    </div>
                    <div class="row layout-row">
                        <div class="group">
                            <div class="field group-data">
                                <div class="col group-data--col">
                                    <label class="label">First name</label>
                                    <input class="input" v-model="userInfo.firstname" type="text" />
                                </div>
                            </div>
                            <div class="field group-data">
                                <div class="col group-data--col">
                                    <label class="label">Last name</label>
                                    <input class="input" v-model="userInfo.lastname" type="text" />
                                </div>
                            </div>
                            <div class="field group-data">
                                <div class="col group-data--col">
                                    <label class="label">Email</label>
                                    <input class="input" v-model="userInfo.email" type="email" />
                                </div>
                            </div>
                            <div class="field group-data">
                                <div class="col col-pass group-data--col">
                                    <label class="label">Password <span class="label-sm">[To change password, just input here]</span></label>
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
                            <div class="content-title title-sc">College</div>
                        </div>
                    </div>
                    <div class="row layout-row" v-if="user.role === 'user'">
                        <div class="group">
                            <div class="field group-data">
                                <div class="col group-data--col">
                                    <label class="label">Student Number</label>
                                    <input class="input" v-model="userInfo.studentNumber" type="text" />
                                </div>
                            </div>
                            <div class="field group-data">
                                <div class="col group-data--col">
                                    <label class="label">Course</label>
                                    <input class="input" v-model="userInfo.course" type="text" />
                                </div>
                            </div>
                            <div class="field group-data">
                                <div class="col group-data--col">
                                    <label class="label">Section</label>
                                    <input class="input" v-model="userInfo.section" type="text" />
                                </div>
                            </div>
                            <div class="field group-data">
                                <div class="col group-data--col">
                                    <label class="label">Year Graduated</label>
                                    <input class="input" v-model="userInfo.yearGraduated" type="text" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row layout-row" v-else>
                        <div class="group">
                            <div class="field group-data">
                                <div class="col group-data--col">
                                    <label class="label">Department</label>
                                    <input class="input" v-model="userInfo.department" type="text" />
                                </div>
                            </div>
                            <div class="field group-data">
                                <div class="col group-data--col">
                                    <label class="label">Status</label>
                                    <input class="input" v-model="userInfo.status" type="text" />
                                </div>
                            </div>
                            <div class="field group-data">
                                <div class="col group-data--col">
                                    <label class="label">Position</label>
                                    <input class="input" v-model="userInfo.position" type="text" />
                                </div>
                            </div>
                            <div class="field group-data">
                                <div class="col group-data--col">
                                    <label class="label">File Requested</label>
                                    <!-- <input class="input" v-model="userInfo.handlerFile" type="text" /> -->
                                    <select class="input" v-model="userInfo.handlerFile">
                                        <option value="" hidden disabled>File Requested</option>
                                        <option value="Good Moral Certificate">Good Moral Certificate</option>
                                        <option value="Clearance">Clearance</option>
                                        <option value="Transcript of Records">Transcript of Records</option>
                                    </select>   
                                </div>
                            </div>
                        </div>
                    </div> 
                    <div class="row layout-row">
                        <div class="group">
                            <div class="field group-data">
                                <div class="col group-data--col">
                                    <button class="button button-back" @click="redirect">Go Back</button>
                                </div>
                            </div>
                            <div class="field group-data">
                                <div class="col group-data--col">
                                    <button class="button button-submit" @click="submitForm">Update</button>
                                </div>
                            </div>
                        </div> 
                    </div>                 
                </div>
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
                title: 'User Settings',
                userInfo: {
                    firstname: '',
                    lastname: '',
                    email: '',
                    password: '',
                    studentNumber: '',
                    course: '',
                    section: '',
                    yearGraduated: '',
                    department: '',
                    status: '',
                    position: '',
                    handlerFile: '',                    
                },
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

        computed: {
            ...mapState('auth', ['loggedIn', 'user']),
        },

        async asyncData (context) {
            const { data } = await context.$axios.get('/api/users/profile')
            return { userData: data } 
        },        

        methods: {
            redirect() {
                this.$router.push('/')
            }, 

            userFillData() {
                this.userInfo.firstname = this.userData.firstname
                this.userInfo.lastname = this.userData.lastname
                this.userInfo.email = this.userData.email
                this.userInfo.password = this.userData.password
                this.userInfo.studentNumber = this.userData.studentNumber
                this.userInfo.course = this.userData.course
                this.userInfo.section = this.userData.section
                this.userInfo.yearGraduated = this.userData.yearGraduated
                this.userInfo.department = this.userData.department
                this.userInfo.status = this.userData.status
                this.userInfo.position = this.userData.position
                this.userInfo.handlerFile = this.userData.handlerFile                
            },

            async submitForm() {
                try {
                    await this.$axios.patch('/api/users/profile', this.userInfo)
                    location.reload()
                } catch (err) {
                    console.log(err)
                }
            }
        },

        mounted() {
            this.userFillData()
        },        
    }
</script>

<style lang="scss" scoped>

    .page {
        color: var(--col-d-gray);

        .layout {

            &-row {
                display: flex;
                justify-content: center;

                .content {
                    border-bottom: 1.5px solid rgba(var(--col-gray), .5);
                    width: 45vw;

                    &-title {
                        text-transform: uppercase;
                        letter-spacing: .0667em;
                        text-align: center;
                    }
                }

                .title-st {
                    font-size: clamp(1.334rem, 1.867vw,2.067rem);
                }

                .title-sc {
                    font-size: clamp(.767rem, 1.334vw,1.667rem);
                    padding: 2.667vh 0;
                }
            }
            
            &-row:first-child {

                .content {
                    padding: 1.667vh 0 5.667vh;
                }
            }

            &-row:nth-child(n+2) {

                .group {
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    width: 45vw;
                    flex-wrap: wrap;
                    padding: 5.667vh 0;
                    gap: 2rem;
                    border-bottom: 1.5px solid rgba(61, 61, 61, 1);

                    &-data {
                        flex: 1 1 280px;

                        .col {
                            display: flex;
                            flex-direction: column;

                            .label {
                                color: rgba(var(--col-gray), .9);

                                &-sm {
                                    font-size: clamp(.407rem, .467vw, .5rem);
                                }
                            }

                            .input, select {

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

            &-row:last-child {
                border: none;

                .group {
                    justify-content: flex-end;
                    gap: 1rem 1.5rem;
                    padding: 2.667vh 0 5.667vh;
                    border: none;

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
                                    padding: 1.334vh 2.667vw;
                                }
                            }
                        }
                    }
                }                        
            }
        }
    }


</style>