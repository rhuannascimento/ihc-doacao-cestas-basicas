<template>
    <div class="pa-2">
       <DonateListComponent :adminView="true" />
    </div>
</template>

<script>
import DonateListComponent from '@/components/DonateListComponent.vue';
    export default {
        components:{
            DonateListComponent
        }
    }
</script>

<style scoped>

</style>