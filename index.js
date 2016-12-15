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


var app = new Vue({
    el: '#target',
    methods: {
        search: function(event){
            searchBar(this.searchTerm);
        }
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
        searchTerm: "",
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
								{title:"/g/",
								 link:"http://boards.4chan.org/g"},
								{title:"/3/",
								 link:"http://boards.4chan.org/3"},
								{title:"/gd/",
								 link:"http://boards.4chan.org/gd"},
								{title:"/wg/",
								 link:"http://boards.4chan.org/wg"},
								{title:"/diy/",
								 link:"http://boards.4chan.org/diy"},
								{title:"/tg/",
								 link:"http://boards.4chan.org/tg"}
						],
						"Misc":[
								{title:"Discord",
								 link:"https://discordapp.com/channels/@me"},
								{title:"Reddit",
								 link:"http://www.reddit.com"},
								{title:"GitLab",
								 link:"https://gitlab.com/dashboard/projects"}
						]
        }
    }
});
