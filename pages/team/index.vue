<template>
    <div class="team">
        <div class="team-view">
            <div class="page">
                <div class="layout">
                    <div class="row layout-row">
                        <div class="content">
                            <div class="content-title title-h1">Team</div>
                        </div>                        
                    </div>
                    <div class="row layout-row">
                        <div class="content">
                            <div class="content-box">
                                <div class="box-image">
                                    <img class="image" :src="require('@/static/img/test-subject-04.jpg')">
                                </div>
                                <div class="box-data">
                                    <div class="name">Jericho Ramos</div>
                                    <div class="position">Developer</div>
                                </div>
                            </div>
                            <div class="content-box">
                                <div class="box-image">
                                    <img class="image" :src="require('@/static/img/test-subject-02.jpeg')">
                                </div>
                                <div class="box-data">
                                    <div class="name">Jack Labutap</div>
                                    <div class="position">Researcher</div>
                                </div>
                            </div>
                            <div class="content-box">
                                <div class="box-image">
                                    <img class="image" :src="require('@/static/img/test-subject-03.jpeg')">
                                </div>
                                <div class="box-data">
                                    <div class="name">Stella Marie Leray</div>
                                    <div class="position">Researcher</div>
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
    export default {
        data() {
            return {
                title: 'Team'
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

    }
</script>

<style lang="scss" scoped>

    .page {
        color: var(--col-d-gray);

        .layout {
            
            &-row:first-child {
                padding: 5.667vh 0 3.6667vh;
            }
            
            &-row:nth-child(2) {

                .content {
                    display: flex;
                    justify-content: space-around;
                    flex-wrap: wrap;
                    gap: 1rem 2rem;

                    &-box {
                        flex: 1 1 250px;
                        display: grid;
                        grid-template-rows: 1fr minmax(50px, 5%);
                        height: 60vh;

                        .box-image {

                            .image {
                                object-fit: cover;
                                height: 100%;
                                width: 90%;
                            }
                        }

                        .box-data {
                            text-align: center;
                            text-transform: uppercase;

                            .name, .position {
                                padding: 0.334vh 0;
                            }

                            .name {
                                padding-top: 1em;
                            }

                            .position {
                                letter-spacing: .05em;
                                color: rgba(61, 61, 61, .6);
                            }
                        }
                    }
                }
            }
        }
    }

</style>