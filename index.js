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
      this.$http.get("http://api.openweathermap.org/data/2.5/weather?zip=21703,us&units=imperial&appid=7bc54dac6977ca3f07a995b649f12243").then(function(res){
        this.temp = res.body.main.temp.toFixed(0) + " °F";
        this.weather = res.body.weather[0].description.replace(/\b\w/g, function(l){ return l.toUpperCase(); });
      }, function(res){
        this.temp = "404";
        this.weather = "Error Contacting Server";
      });
    },
  },
  computed:{
    now: function(){
      return new Date();
    },
    tod: function(){
      return this.now.getHours();
    },
    season: function(){
      let month = this.now.getMonth();
      if( month == 11 || month <= 2 ){
        return 'winter';
      } else if( month > 2 && month <= 4 ){
        return 'spring';
      } else if( month > 4 && month <= 7 ){
        return 'summer';
      } else {
        return 'fall';
      }
    },
    bgClass: function(){
      return {
        'm1':this.tod >= 6 && this.tod < 11 && this.season == 'winter',
        'm2':this.tod >= 6 && this.tod < 11 && this.season == 'spring',
        'm3':this.tod >= 6 && this.tod < 11 && this.season == 'summer',
        'm4':this.tod >= 6 && this.tod < 11 && this.season == 'fall',
        'd1':this.tod >= 11 && this.tod < 18 && this.season == 'winter',
        'd2':this.tod >= 11 && this.tod < 18 && this.season == 'spring',
        'd3':this.tod >= 11 && this.tod < 18 && this.season == 'summer',
        'd4':this.tod >= 11 && this.tod < 18 && this.season == 'fall',
        'n1':this.tod >= 18 || this.tod < 6 && this.season == 'winter',
        'n2':this.tod >= 18 || this.tod < 6 && this.season == 'spring',
        'n3':this.tod >= 18 || this.tod < 6 && this.season == 'summer',
        'n4':this.tod >= 18 || this.tod < 6 && this.season == 'fall'
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
         link:"http://play.google.com/music/listen"},
        {title:"Soundcloud",
         link:"http://soundcloud.com/stream"}
      ],
      "Work":[
        {title:"GitLab",
         link:"https://gitlab.com/dashboard/projects"},
              {title:"GitHub",
               link:"https://github.com"},
         {title:"Todoist",
          link:"https://en.todoist.com"},
         {title:"Pomodoro",
          link:"https://app.pomodoneapp.com/#/dashboard"},
         {title:"Paletton",
          link:"http://paletton.com"},
         {title:"ColorCodes",
          link:"http://htmlcolorcodes.com/color-picker/"},
         {title:"SkillShare",
          link:"https://skillshare.com"}
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
      "Chan":[
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
        {title:"Ballp.it",
         link:"https://ballp.it"},
        {title:"Discord",
         link:"https://discordapp.com/channels/@me"},
        {title:"Reddit",
         link:"http://www.reddit.com"},
        {title:"Twitter",
         link:"http://www.twitter.com"},
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
