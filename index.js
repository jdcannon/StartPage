Vue.component('page-link', {
    template:'<a :href="link">{{title}}</a>',
    props:['link','title']
});
Vue.component('page-menu', {
    props: ['items', 'menuTitle'],
    template:'<div class="menu">' +
             '<a href="#">{{menuTitle}}</a>' +
             '<ul>' +
             '<li v-for="item in items">' +
             '<page-link :link="item.link" :title="item.title"></page-link>' +
             '</li>' +
             '</ul>' +
             '</div>'
});

Vue.component('weather', {
		props: ['temp', 'weather'],
		template:'<div class="weather">' +
						 '<div class="temp">{{temp}}</div>' +
						 '<div class="conds">{{weather}}</div>' +
						 '</div>'
});

Vue.component('today', {
		props: ['day', 'time'],
		template:'<div class="weather">' +
						 '<div class="day">{{day}}</div>' +
						 '<div class="time">{{time}}</div>' +
						 '</div>'
});


var app = new Vue({
    el: '#target',
    methods: {
        search: function(event){
            searchBar(this.searchTerm);
        },
				updateTime: function(){
						var options = {hour12: false}
						var now = new Date();
						this.day = now.toDateString();
						this.time = now.toLocaleTimeString('en-us', options).slice(0,-3);
				},
				getWeather: function(){
						this.$http.get("http://api.openweathermap.org/data/2.5/weather?zip=35476,us&units=imperial&appid=7bc54dac6977ca3f07a995b649f12243").then(function(res){
								this.temp = res.body.main.temp.toFixed(0) + " °F";
								this.weather = res.body.weather[0].description.replace(/\b\w/g, function(l){ return l.toUpperCase(); });
						}, function(res){
								this.temp = "404";
								this.weather = "Error Contacting Server";
						});
				},																																																																												 
    },
    computed:{
        tod: function(){
            var now = new Date();
            return now.getHours();
        },
        bgClass: function(){
            return {
                'm2':this.tod >= 6 && this.tod < 11,
                'd2':this.tod >= 11 && this.tod < 18,
                'n1':this.tod >= 18 || this.tod < 6
            }
        }
    },
    data:{
				day: "",
				time: "",
        searchTerm: "",
				temp:"",
				weather:"",
        menu:{
            "Media":[
                {title:"Youtube",
                 link:"http://www.youtube.com/feed/subscriptions"},
                {title:"Netflix",
                 link:"http://www.netflix.com/"},
                {title:"Google Music",
                 link:"http://play.google.com/music/listen"}
            ],
            "Forums":[
                {title:"Ballp.it",
                 link:"https://ballp.it"},
                {title:"Nixers",
                 link:"https://nixers.net/"}
            ],
            "SomethingAwful":[
                {title:"YOSPOS",
                 link:"http://forums.somethingawful.com/forumdisplay.php?forumid=219"},
                {title:"PYF",
                 link:"http://forums.somethingawful.com/forumdisplay.php?forumid=167"},
                {title:"LP",
                 link:"http://forums.somethingawful.com/forumdisplay.php?forumid=191"},
                {title:"GWS",
                 link:"http://forums.somethingawful.com/forumdisplay.php?forumid=161"}
            ],
            "chan":[
                {title:"4/g/",
                 link:"http://boards.4chan.org/g"},
                {title:"4/3/",
                 link:"http://boards.4chan.org/3"},
                {title:"4/gd/",
                 link:"http://boards.4chan.org/gd"},
                {title:"4/wg/",
                 link:"http://boards.4chan.org/wg"},
                {title:"4/diy/",
                 link:"http://boards.4chan.org/diy"},
                {title:"4/tg/",
                 link:"http://boards.4chan.org/tg"},
                {title:"8/leftypol/",
                 link:"https://8ch.net/leftypol/index.html"}
            ],
            "Misc":[
                {title:"Discord",
                 link:"https://discordapp.com/channels/@me"},
                {title:"Reddit",
                 link:"http://www.reddit.com"},
                {title:"GitLab",
                 link:"https://gitlab.com/dashboard/projects"},
                {title:"Twitch",
                 link:"https://twitch.tv/directory/following"}
            ]
        }
    }
});

window.onload = function(){
		app.getWeather();
		app.updateTime();
		var timer=window.setInterval(app.updateTime, 60000);
		var weather = window.setInterval(app.getWeather(), 1000*60*15);
};
