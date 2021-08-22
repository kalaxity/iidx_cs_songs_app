Vue.component("footer-component", {
    template:   `<footer class="footer">
                    <div class="container">
                        <p class="has-text-centered">
                            2021 kalax, created by 
                            <a href="https://jp.vuejs.org/index.html">Vue.js</a>
                             and 
                            <a href="https://bulma.io">BULMA</a>
                        </p>
                    </div>
                </footer>`
});

new Vue({
    el: "#footer"
});