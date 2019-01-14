<template>
    <fragment v-if="status !== 'after'">
        <div class="block">
            <p class="digit">{{ hours | two_digits }}</p>
            <p class="text">{{ hours_text }}</p>
        </div>
        <div class="block">
            <p class="digit">{{ minutes | two_digits }}</p>
            <p class="text">{{ minutes_text }}</p>
        </div>
        <div class="block">
            <p class="digit">{{ seconds | two_digits }}</p>
            <p class="text">{{ seconds_text }}</p>
        </div>
    </fragment>
    <fragment v-else>
        <div class="block">
            <p class="message">Контест завершен</p>
        </div>
    </fragment>
</template>
<script>
import { db } from '../db'

export default {

    created() {
        this.fb_ref.on('value', this.update_data);
    },

    methods: {
        update_data(snapshot) {
            this.duration = snapshot.val().duration;
            this.start = Math.trunc(Date.parse(snapshot.val().start) / 1000);
        }
    },

    mounted() {
        window.setInterval(() => {
            this.now = Math.trunc((new Date()).getTime() / 1000);
        },1000);
    },

    props : {
        name : {
            type: String
        }
    },

    data() {
        return {
            now: Math.trunc((new Date()).getTime() / 1000),
            fb_ref: db.ref('timers/' + this.$route.params.timer_name),
            start: 0,
            duration: 0
        }
    },
    
    computed: {
        status() {
            if (this.now < this.start) {
                return 'before';
            }
            if (this.now < this.end) {
                return 'running';
            }
            return 'after';
        },

        end() {
            return this.start + this.duration;
        },

        next_event() {
            if (this.status == 'before') {
                return this.start;
            }
            return this.end;
        },

        seconds() {
            return (this.next_event - this.now) % 60;
        },

        minutes() {
            return Math.trunc((this.next_event - this.now) / 60) % 60;
        },

        hours() {
            return Math.trunc((this.next_event - this.now) / 60 / 60) % 24;
        },

        days() {
            return Math.trunc((this.next_event - this.now) / 60 / 60 / 24);
        },

        minutes_text() {
            if (10 <= this.minutes && this.minutes <= 20) {
                return 'минут';
            }
            if (this.minutes % 10 == 0) {
                return 'минут';
            }
            if (this.minutes % 10 == 1) {
                return 'минута';
            }
            if (this.minutes % 10 <= 4) {
                return 'минуты';
            }
            return 'минут';
        },

        hours_text() {
            if (10 <= this.hours && this.hours <= 20) {
                return 'часов';
            }
            if (this.hours % 10 == 0) {
                return 'часов';
            }
            if (this.hours % 10 == 1) {
                return 'час';
            }
            if (this.hours % 10 <= 4) {
                return 'часа';
            }
            return 'часов';
        },

        seconds_text() {
            if (10 <= this.seconds && this.seconds <= 20) {
                return 'секунд';
            }
            if (this.seconds % 10 == 0) {
                return 'секунд';
            }
            if (this.seconds % 10 == 1) {
                return 'секунда';
            }
            if (this.seconds % 10 <= 4) {
                return 'секунды';
            }
            return 'секунд';
        }
    }
}

</script>
<style>
@import url(https://fonts.googleapis.com/css?family=Roboto+Condensed:400|Roboto:100);

.block {
    display: flex;
    flex-direction: column;
    margin: 20px;
}

.text {
    color: #1abc9c;
    font-size: 5vw;
    font-family: 'Roboto Condensed', serif;
    font-weight: 400;
    margin-top:10px;
    margin-bottom: 10px;
    text-align: center;
}

.digit {
    color: #ecf0f1;
    font-size: 25vw;
    font-weight: 100;
    font-family: 'Roboto', serif;
    margin: 10px;
    text-align: center;
}

.message {
    color: #ecf0f1;
    font-size: 20vw;
    font-weight: 100;
    font-family: 'Roboto', serif;
    margin: 10px;
    text-align: center;
}
</style>
