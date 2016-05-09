//get the search term

function readText (form) {
    search_term = document.getElementById('search-term').value;
    console.log(search_term);

//construct the URL

var JSON_URL = "https://api.pushshift.io/reddit/facet/subreddit?q="+search_term+"&after=7d"

//parse the json

var width = 300
var height = 300

var format = d3.format(",d"),
color = d3.scale.category20c();

d3.json(JSON_URL, function(datum) {

    var data = datum['data']

    for (i = 1; i < 50; i++) { 

        var subredditName = data[i]['subreddit'];
        var subredditMentions = parseFloat(data[i]['count']);
        var diameter = subredditMentions/20

        function getRandomizer(min, max) {
            return function() {
                return Math.floor( Math.random() * ( 1 + max - min ) ) + min;
            }
        }

        var randomX = getRandomizer(100,200)
        var randomY = getRandomizer(120,210)

        //console.log(randomX, randomY)

        var svg = d3.select('#dataviz').append('svg')
            .attr('width', width)
            .attr('height', height);

        var circles = svg.append('circle')
            .attr('cx', randomX)
            .attr('cy', randomY)
            .attr('r', diameter/10)
            .style('fill',"#B7F9EC")
            .on("mouseover", null);

        circles.transition()
            .duration(1000)
            .delay(100)
            .attr('r', diameter);

            circles.on('mouseover', mouseEnter);
            circles.on('mouseout', mouseLeave);

        var subredditNames = svg.append('text')
            .attr('x',150)
            .attr('y', 200)
            .text(subredditName)
            .style('fill', "black");

        var subredditMentionsText = svg.append('text')
            .attr('x',150)
            .attr('y', 220)
            .text(subredditMentions)
            .style('fill', "black")
            .style('opacity', 0);
        
        function mouseEnter() {
            circles.style('fill', '#E5E3E5');
            console.log(subredditMentions);
            subredditMentionsText.style('opacity',100);
        }
        
        function mouseLeave() {
            circles.style('fill', '#B7F9EC');
            subredditMentionsText.style('opacity',0);

    }

}

})

}

