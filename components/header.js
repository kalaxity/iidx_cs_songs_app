Vue.component("header-component", {
    template:  `<section class="hero is-primary">
                    <div class="hero-body">
                        <div class="container">
                            <h1 class="title has-text-centered">
                                BeatmaniaIIDX CS クリアランプマネージャ
                            </h1>
                        </div>
                    </div>
                </section>`
});

new Vue({
    el: "#header"
});