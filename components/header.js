Vue.component("header-component", {
    template:  `<section class="hero is-primary">
                    <div class="hero-body">
                        <div class="container">
                            <h1 class="title has-text-centered">
                                BeatmaniaIIDX CS クリアランプマネージャ
                            </h1>
                        </div>
                    </div>
                    <div class="hero-foot">
                        <nav class="tabs is-boxed is-fullwidth">
                            <div class="container">
                                <ul>
                                    <li>
                                        <a href="./index.html" class="navbar-item">
                                            Home
                                        </a>
                                    </li>
                                    <li>
                                        <a href="./about.html" class="navbar-item">
                                            About
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </section>`
});

new Vue({
    el: "#header"
});