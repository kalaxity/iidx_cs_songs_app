// JSON = ['Genre', 'Song', 'Artist', 'BPM', 'SPB', 'SPN', 'SPH', 'SPA',
//         'SP黒A', 'DPN', 'DPH', 'DPA', 'DP黒A']

var ooo;

Vue.component('selecter', {
    props: ["songname", "lampname", "lamp"],
    methods: {
        changeListener: function(event) {
            addLamp(this.songname, this.lampname, event.target.selectedIndex);
        },
        loadListener: function() {
            //console.log(this.songname);
        }
    },
    mounted() {
        console.log(getLamp(this.songname));
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
        openDB();
        // let lamps = [];
        // for (let song of this.songs) {
        //     lamps[song.Song] = getLamp(song.Song);
        // }
    }
});

var change_version_btn = new Vue({
    el: '#change_version_button',
    data: {
        versions:  ['3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th',
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

// 最初Cookie使おうとしたけどやめた 気が変わると悪いので残しておく
// window.onload = function () {
//     if (document.cookie.split(';').some((item) => item.includes('cookie=YES'))) {
//         return;
//     }
//     alert("このサイトではCookieを利用しています");
//     document.cookie = 'cookie=YES';
// };

/**
 * @type {IDBDatabase}
 */
let db;

/**
 * DBを開く関数
 */
function openDB() {
    let request = window.indexedDB.open("lampDB", 3);

    request.onerror = function(event) {
        console.log(event);
    };

    request.onsuccess = function(event) {
        db = event.target.result;
        console.log(db);
        db.onerror = function(event) {
            console.log("Error: " + event.target.errorCode);
        };
    };

    request.onupgradeneeded = function(event) {
        db = event.target.result;
        let objectStore = db.createObjectStore("songs", { keyPath: "songName" } );
        objectStore.createIndex("lampN",  "lampN",  { unique: false });
        objectStore.createIndex("lampH",  "lampH",  { unique: false });
        objectStore.createIndex("lampA",  "lampA",  { unique: false });
        objectStore.createIndex("lampBA", "lampBA", { unique: false });
    };
}


/**
 * ランプデータをDBから取得 なければレコードを作成する
 * @param {String} songName 曲名
 * @returns {Object} 難易度別のランプデータ
 */
function getLamp(songName) {
    let transaction = db.transaction(["songs"], "readwrite");
    let objectStore = transaction.objectStore("songs");
    let request = objectStore.get(songName);
    var ret = [null];

    request.onerror = function(event) {
        console.log("Error: " + event.target.errorCode);
        return;
    };
    request.onsuccess = function(ret) {
        let data = request.result;
        console.log(ret);
        if (data === undefined) {
            // レコード作成
            console.log("make new record");
            let request = objectStore.add({
                songName: songName,
                lampN:  0,
                lampH:  0,
                lampA:  0,
                lampBA: 0
            });
            ret[0] = {
                n:  0,
                h:  0,
                a:  0,
                ba: 0
            }; 
        } else {
            ret[0] = {
                n:  data.lampN,
                h:  data.lampH,
                a:  data.lampA,
                ba: data.lampBA
            };
        }
        
        //return event.target.result;
    };
    //console.log(ret[0]);
    
}


/**
 * DBにランプを追加
 * @param {String} songName 曲名
 * @param {String} lampName 曲の難易度(N, H, A, BA)
 * @param {Number} lamp ランプ番号
 */
function addLamp(songName, lampName, lamp) {
    let objectStore = db.transaction(["songs"], "readwrite").objectStore("songs");
    let request = objectStore.get(songName);

    request.onerror = function(event) {
        console.log("Error: " + event.target.errorCode);
    };

    request.onsuccess = function(event) {
        console.log(request.result);
        let data = request.result;

        // jsのswitch文はstringも受け付ける
        switch (lampName) {
            case "N":
                data.lampN = lamp;
                break;
            case "H":
                data.lampH = lamp;
                break;
            case "A":
                data.lampA = lamp;
                break;
            case "BA":
                data.lampBA = lamp;
                break;
            default:
                break;
        }

        // 更新したオブジェクトをDBに書き戻す
        let requestUpdate = objectStore.put(data);
        requestUpdate.onerror = function(event) {
            console.log("Error: " + event.target.errorCode);
        };
        requestUpdate.onsuccess = function(event) {
            console.log("書き戻し成功");
        };
    };

}
