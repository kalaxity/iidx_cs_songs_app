/**
 * @type {Storage}
 */
 let db = localStorage


 /**
  * ランプデータをDBから取得 なければ新規作成
  * @param {String} songName 曲名
  * @param {String} diff 難易度
  * @returns {Number} ランプデータ
  */
 function getLamp(songName, diff) {
     let lamp = db.getItem(songName + ", " + diff);
     if (lamp === null) {
         db.setItem(songName + ", " + diff, "0");
         lamp = "0";
     }
     return parseInt(lamp);
 }
 
 
 /**
  * DBにランプを追加
  * @param {String} songName 曲名
  * @param {String} diff 曲の難易度(N, H, A, BA)
  * @param {Number} lamp ランプ
  */
 function addLamp(songName, diff, lamp) {
     db.setItem(songName + ", " + diff, lamp.toString());
 }
 

// JSON = ['Genre', 'Song', 'Artist', 'BPM', 'SPB', 'SPN', 'SPH', 'SPA',
//         'SP黒A', 'DPN', 'DPH', 'DPA', 'DP黒A']

let selector = Vue.component('selecter', {
    //replace: false,
    props: ["songname", "diff", "lamp"],
    methods: {
        changeListener: function(event) {
            addLamp(this.songname, this.diff, event.target.selectedIndex);
        },
        loadListener: function() {
            //console.log(this.$el.options.selectedIndex);
            this.$el.options[getLamp(this.songname, this.diff)].selected = true;
            console.log(this.$el.options.selectedIndex);
        }
    },
    mounted() {
        console.log(this.songname);
        this.loadListener();
    },
    watch: {
        songname: function() {
            this.loadListener();
        }
    },
    template:  `<select v-on:change="changeListener($event)">
                    <option value="0"></option>
                    <option value="1">FC</option>
                    <option value="2">H</option>
                    <option value="3">C</option>
                    <option value="4">E</option>
                    <option value="5">F</option>
                </select>`
});

let app = new Vue({
    el: '#songlist',
    data() {
        return {
            songs: {},
            version: 3
        };
    },
    methods: {
        getJsonData: function() {
            axios.get('./json/cs' + this.version + '.json')
                .then(response => { this.songs = response.data })
                .catch(err => { console.log(err) });
        },
        getVersion: function() {
            return this.version;
        },
        setVersion: function(ver) {
            this.version = ver;
        }
    },
    mounted() {
        this.getJsonData();
    }
});

let change_version_btn = new Vue({
    el: '#change_version_button',
    data: {
        versions:  ['3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th',
                    '11th RED', '12th HappySky', '13th DD',
                    '14th GOLD', '15th DJT', '16th EMP']
    },
    methods: {
        changeVersion(ver) {
            //document.getElementById("table").innerHTML = "";
            //selector.$destroy();
            app.setVersion(ver);
            app.getJsonData();
            //app.$forceUpdate();
            //selector.loadListener();
        }
    }
});
