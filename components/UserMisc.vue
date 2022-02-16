<template>
    <div class="content--view">
        <div class="wrapper">
            <div class="misc" v-if="user.role === 'user'">
                <div class="misc--header">Welcome to Chronoa Project</div>
                <div class="misc--section">
                    <form class="form" @submit.prevent="studentForm">
                        <div class="form--group">
                            <input type="text" placeholder="Student Number" v-model="studentData.stnumber">
                            <input type="text" placeholder="Course" v-model="studentData.course">
                        </div>
                        <div class="form--group">
                            <input type="text" placeholder="Section" v-model="studentData.section">
                            <input type="text" placeholder="Year Graduated" v-model="studentData.year">
                        </div>
                        <div class="form--parag">
                            <p>■ <span>This form will be check through school personel.</span></p>
                            <p>■ <span>Make it readable to prevent some problem.</span></p>
                        </div>
                        <div class="form--action">
                            <button type="submit">Proceed</button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="misc" v-else-if="user.role === 'client'">
                <div class="misc--header">Welcome to Chronoa Project</div>
                <div class="misc--section">
                    <form class="form" @submit.prevent="clientForm">
                        <div class="form--group">
                            <input type="text" placeholder="Department" v-model="clientData.department">
                            <input type="text" placeholder="Status e.g., Full Time / Part-Time" v-model="clientData.status">
                        </div>
                        <div class="form--group">
                            <input type="text" placeholder="Position" v-model="clientData.position">
                            <select v-model="selected">
                                <option value="" hidden disabled>Handler Document</option>
                                <option value="Good Moral Certificate">Good Moral Certificate</option>
                                <option value="Clearance">Clearance</option>
                                <option value="Transcript of Records">Transcript of Records</option>
                            </select>
                        </div>
                        <div class="form--parag">
                            <p>■ <span>This will verify if you are truly a professor.</span></p>
                            <p>■ <span>Make it readable to prevent some problem.</span></p>
                        </div>                        
                        <div class="form--action">
                            <button type="submit">Proceed</button>
                        </div>
                    </form>
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
                studentData: {
                    stnumber: null,
                    course: null,
                    section: null,
                    year: null
                },
                clientData: {
                    department: null,
                    status: null,
                    position: null
                },
                selected: '',
                registered: 'yes',
            }
        },

        computed: {
            ...mapState('auth', ['loggedIn', 'user']),
        },

        methods: {

            async studentForm() {
                try {
                    await this.$axios.$patch('/api/users/profile', {
                        studentNumber: this.studentData.stnumber,
                        course: this.studentData.course,
                        section: this.studentData.section,
                        yearGraduated: this.studentData.year,
                        registered: this.registered
                    })

                    window.location.reload()
                } catch (err) {
                    console.log(err)
                }
            },

            async clientForm() {
                try {
                    await this.$axios.$patch('/api/users/profile', {
                        department: this.clientData.department,
                        status: this.clientData.status,
                        position: this.clientData.position,
                        handlerFile: this.selected,
                        registered: this.registered
                    })

                    window.location.reload()
                } catch (err) {
                    console.log(err)
                }
            },

        }
    }
</script>

<style lang="scss" scoped>

    .content--view {
        z-index: 250;
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100%;
        background: rgba(var(--col-black), .533);
        
        display: flex;
        align-items: center;
        justify-content: center;

        .wrapper {
            padding: 2rem;
            background: white;
            width: 40vw;

            .misc {

                &--header {
                    text-align: center;
                    text-transform: uppercase;
                    font-size: 0.95rem;            
                }

                &--section {
                    margin-top: 3rem;

                    .form {

                        &--group {
                            position: relative;
                            display: flex;
                            justify-content: space-between;
                            gap: 1rem;
                            margin: 1rem 0;

                            input, select {
                                width: 100%;
                                display: block;
                                height: 60px;
                                padding: 0 15px;
                                background-color: #FFF;
                                border: 1px solid #dbe0df;
                                transition: all .3s ease-in-out;
                                font-size: 16px;
                                color: #202121;
                                
                                &::placeholder {
                                    color: #C3C4CA;
                                    font-family: 'Helvetica Neue', sans-serif;
                                    font-size: 0.9rem;
                                    font-weight: 300;
                                }
                            }

                            select option {
                                color: #707070;
                            }

                            select:invalid,
                            select option[value=""] {
                                color: #C3C4CA;
                            }
                        }

                        &--parag {
                            margin-top: 1.5rem;

                            p {
                                margin: 0.5rem 0;
                                color: #707070;
                                font-size: 0.7rem;

                                span {
                                    margin-left: 0.5em;
                                    font-size: 0.9rem;
                                }
                            }
                        }

                        &--action {
                            margin-top: 1.5rem;

                            button {
                                width: 100%;
                                display: block;
                                height: 60px;
                                padding: 0 15px;
                                background-color: rgba(var(--col-black), 1);
                                border: 1px solid #dbe0df;
                                transition: all .3s ease-in-out;
                                font-size: 14px;
                                text-transform: uppercase;
                                color: rgba(var(--col-white), 1);
                                cursor: pointer;
                            }
                        }
                    }
                }
            }
        }
    }

</style>