<template>
<div>
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
