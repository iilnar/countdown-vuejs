<template>
<div>
<ul>
    <li v-for="(timer, key) in timers">
        <router-link :to="key">{{ key }}</router-link>
    </li>
</ul>
</div>
</template>

<script>
import { db } from '../db'

export default {

    created() {
        this.fb_ref.on('value', this.update_data);
    },

    data() {
        return {
            fb_ref: db.ref('timers'),
            timers: []
        }
    },
    
    methods: {
        update_data(snapshot) {
            this.timers = snapshot.val();
        }
    },

    computed: {
    }
}
</script>

<style>
</style>
