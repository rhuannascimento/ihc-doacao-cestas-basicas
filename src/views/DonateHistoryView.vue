<template>
    <div class="pa-2">
        <DonateListComponent :historyView="true"/>
    </div>
</template>

<script>
import DonateListComponent from '@/components/DonateListComponent.vue';
export default {
    components: {
        DonateListComponent
    }
}
</script>

<style lang="scss" scoped></style>