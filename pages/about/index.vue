<template>
    <div class="about">
        <div class="about-view">
            <div class="page">
                <div class="layout">
                    <div class="row layout-row">
                        <div class="content">
                            <div class="content-title">About Us</div>
                        </div>                  
                    </div>
                    <div class="row layout-row">
                        <div class="content">
                            <p class="content-text"> <span>The Chronoa Project</span> is an online file tracking system application for graduating students that will allow them to track their credentials from their preferred location without having to visit the university, particularly during this time of the pandemic.</p>
                        </div>
                    </div>
                    <div class="row layout-row">
                        <div class="content">
                            <p class="content-text">In most educational institutions nowadays, large amounts of data are generated consistently. To find specific files amid thousands of others can be a time-consuming and difficult task for administrative and academic staff at educational institutions of this caliber.</p>
                        </div>
                    </div>
                    <div class="row layout-row">
                        <div class="content">
                            <p class="content-text">University department staff members will also profit from this because it will reduce the energy and time spent organizing files and searching for them.</p>
                        </div>
                    </div>
                    <div class="row layout-row">
                        <div class="content">
                            <div class="content-caption">© 2022 <span>The Chronoa Project™.</span> ALL RIGHTS RESERVED.</div>
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
                title: 'About'
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
                padding: 5.667vh 0 1.9667vh;
            }

            &-row:nth-child(n+2) {

                .content {
                    padding: 1.0667vh 0;

                    &-text {
                        width: 55vw;
                    }
                }
            }

            &-row:last-child {

                .content {
                    padding-top: 4.667vh;
                }
            }
        }
    }

</style>