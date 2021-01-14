<template>
    <div class="task-wrapper">
        <div class="heading ">
            <h2 v-html="welcomeName"></h2>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HomePage',
    props: ['welcomeName']
}
</script>