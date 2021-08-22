// JSON = ['Genre', 'Song', 'Artist', 'BPM', 'SPB', 'SPN', 'SPH', 'SPA',
//         'SP黒A', 'DPN', 'DPH', 'DPA', 'DP黒A']

Vue.component('selecter', {
    template:  `<select name="lamp">
                    <option value="0"></option>
                    <option value="1">FC</option>
                    <option value="2">H</option>
                    <option value="3">C</option>
                    <option value="4">E</option>
                    <option value="5">F</option>
                </select>`
});

var app = new Vue({
    el: '#songlist',
    data() {
        return {
            songs: {},
            version: 3
        };
    },
    methods: {
        getJsonData: function () {
            axios.get('./json/cs' + this.version + '.json')
                .then(response => { this.songs = response.data })
                .catch(err => { console.log(err) });
        },
        getVersion: function () {
            return this.version;
        },
        setVersion: function (ver) {
            this.version = ver;
        }
    },
    mounted() {
        this.getJsonData();
    }
});

var change_version_btn = new Vue({
    el: '#change_version_button',
    data: {
        versions: ['3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th',
                    '11th RED', '12th HappySky', '13th DD',
                    '14th GOLD', '15th DJT', '16th EMP']
    },
    methods: {
        changeVersion(ver) {
            console.log(ver);
            app.setVersion(ver);
            app.getJsonData();
        }
    }
});

window.onload = function () {
    if (document.cookie.split(';').some((item) => item.includes('cookie=YES'))) {
        return;
    }
    alert("このサイトではCookieを利用しています");
    document.cookie = 'cookie=YES';
};