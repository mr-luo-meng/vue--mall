<template>
    <div v-show="$store.state.loading">
        <img src="../assets/images/lazyload.gif" alt="">
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
    div{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        background: rgba(255, 255, 255, 0.6);
        display:flex;
        justify-content: center;
        align-items: center;
    }
</style>
