/**
 * Created by Administrator on 2015/4/7.
 */

var margin = {top:100,left:100,bottom:100,right:100},
    width = $('.canvas').width()-margin.left-margin.right,
    height = $('.canvas').height()-margin.top-margin.bottom;

queue()
    .defer(d3.csv,'data/Data_Budget_Viewers.csv',parse)
    .defer(d3.csv,'data/Data_TVShow_Average.csv',parseAverage)
    .await(dataLoaded);

var ValueYear = [1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014];
var TypeRagnge = ["Action","Adventure","Drama","Fantasy","Comedy","Crime","Biography","Sci-Fi","Thriller","Mystery","History","Horror"];
var colorScale = d3.scale.ordinal()
    .domain(["Action","Adventure","Drama","Fantasy","Comedy","Crime","Biography","Sci-Fi","Thriller","Mystery","History","Horror"])
    .range(["mediumpurpul","khaki","rosybrown","orchid","gold","darkred","sienna","skyblue","coral","mediumvioletred","lightsalmon","palegreen"]);

var SelectID = 0;
var SelectYear = 0;
var moveOnID = 0;
var n = 2, m = 0;
var TypeSelect = "Null";

var scaleX = d3.scale.linear();
var scaleY = d3.scale.linear();
var scaleXFA = d3.scale.linear();
var color = d3.scale.linear();

var barcolor = "teal"

var yGroupMax = 0;
var yStackMax = 0;

function dataLoaded(err,each,average)
{
    console.log(each);
    console.log(average);
    //draw(data);
    m = average.length;

    yGroupMax = d3.max(average,function(d){
        return d.AverageViewers;
    });

    scaleX
        .domain([0,m])
        .range([0,width]);

    scaleXFA
        .domain([0,12])
        .range([0,width]);

    scaleY
        .domain([0,yGroupMax])
        .range([0,height+100]);

    Averagedraw(each,average);
}

function Averagedraw(each,average)
{
    var BudgetandViewers = average;
    var eachEBandViewers = each;

    var yAxis = d3.svg.axis()
        .scale(scaleY)
        .orient('left')
        .ticks(10);

    var xAxis = d3.svg.axis()
        .scale(scaleX)
        .orient('top')
        .ticks(m);

    var X2Axis = d3.svg.axis()
        .scale(scaleXFA)
        .orient('top')
        .ticks(12);

    var svg = d3.select("div.canvas").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var XLine=svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + -20 + ")")
        .call(xAxis)
        .style("fill","white")
        .style("opacity",1);

    var XAFLine =svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + -20 + ")")
        .call(X2Axis)
        .style("fill","white")
        .style("opacity",0);

    var YLine = svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate("+0+",0)")
        .call(yAxis)
        .style("fill","white")
        .style("opacity",1);

    var textY = svg.append("g")
        .attr("class","text")
        .append('text')
        .text('million')
        .style('fill','white')
        .attr("x",10)
        .style("font-family","Helvetica")
        .attr("y",height+96);

    var textX = svg.append("g")
        .attr("class","text")
        .append('text')
        .text('month')
        .style('fill','white')
        .attr("x",width-18)
        .attr("y",0)
        .style("font-family","Helvetica")
        .style("opacity",0);

    var textSubTitle = svg.append("g")
        .attr("class","text")
        .append('text')
        .text('This project is to show the data of budget and viewers for several')
        .style('fill','white')
        .attr("x",-100)
        .attr("y",-80)
        .style("font-family","Helvetica")
        .style("font-size",16)
        .style("opacity",1);

    var textSubTitle2nd = svg.append("g")
        .attr("class","text")
        .append('text')
        .text('American TV shows and try to find some relationship between them.')
        .style('fill','white')
        .attr("x",-100)
        .attr("y",-62)
        .style("font-family","Helvetica")
        .style("font-size",16)
        .style("opacity",1);

    var textThirdTitle = svg.append("g")
        .attr("class","text")
        .append('text')
        .text('In this view, the project show the budget, air time and viewers for')
        .style('fill','white')
        .attr("x",-100)
        .attr("y",-80)
        .style("font-family","Helvetica")
        .style("font-size",16)
        .style("opacity",0);

    var textThirdTitle2nd = svg.append("g")
        .attr("class","text")
        .append('text')
        .text('each episodes of each TV shows.')
        .style('fill','white')
        .attr("x",-100)
        .attr("y",-62)
        .style("font-family","Helvetica")
        .style("font-size",16)
        .style("opacity",0);

    var RectText = svg
        .selectAll("rect")
        .data(BudgetandViewers)
        .enter();

    var CirleText = svg
        .selectAll("circle")
        .data(eachEBandViewers)
        .enter();

    var TextShowOverR = RectText
        .append("text")
        .text(null)
        .attr("x",730)
        .attr("y",-70)
        .style("fill","white")
        .style("font-family","Helvetica")
        .style("font-size",18)
        .style("opacity",0);

    var TextShowOverC = CirleText
        .append("text")
        .text(null)
        .attr("x",560)
        .attr("y",-70)
        .style("fill","white")
        .style("font-family","Helvetica")
        .style("font-size",18)
        .style("opacity",1);

    var svgRect = svg
        .selectAll("rect")
        .data(BudgetandViewers)
        .enter();


    //rect1  part
    var rect1 = svgRect
        .append("rect")
        .attr("class", "rect")
        .attr("x",function(d,i)
        {
            var widthNum = d.TVSID/m;
            widthNum = widthNum*width;
            return widthNum;
        })
        .attr("y",0)
        .attr("width",5)
        .attr("height",function(d) {
            var barHeight = d.AverageBudget * 25;
            return barHeight + "px";
        })
        .style('fill',"teal")
        .on("mouseover",function(){
            d3.select(this)
                .style("fill",function(d)
                {
                    moveOnID = d.TVSID;
                    return "lightskyblue"
                });

            TextShowOverR
                .transition()
                .duration(500)
                .text(function(d){
                    if(d.TVSID == moveOnID) {
                        return d.TVname+" Budget: " + d.AverageBudget.toString() + " M";
                    }
                })
                .style("opacity",1);

        })
        .on("mouseout",function(){
            d3.select(this)
                .style("fill","teal")

            TextShowOverR
                .transition()
                .duration(500)
                .text(null)
                .style("opacity",0);

        })
        .on("click",function(){

            moveOnID = 0;

            yGroupMax = d3.max(eachEBandViewers,function(d){
                return d.viewers + 5;
            });

            scaleY
                .domain([0,yGroupMax])
                .range([0,height+100]);

            yAxis
                .scale(scaleY);

            YLine
                .transition()
                .duration(1000)
                .call(yAxis);

            TypeText
                .transition()
                .duration(1000)
                .text("Null")
                .style("opacity",1);

            SelectTypeShowing
                .transition()
                .duration(1000)
                .style("opacity",0.5);

            TypeText
                .transition()
                .duration(1000)
                .style("opacity",1);

            SelectTypeShowing
                .transition()
                .duration(1000)
                .style("opacity",0.5);

            SelectYearShowing
                .transition()
                .duration(1000)
                .style("opacity",0.5);

            textThirdTitle2nd
                .transition()
                .duration(1000)
                .style("opacity",1);

            textThirdTitle
                .transition()
                .duration(1000)
                .style("opacity",1);

            TextKeyBudget
                .transition()
                .duration(1000)
                .style("opacity",0);

            TextKeyViewers
                .transition()
                .duration(1000)
                .style("opacity",0);

            ColorKeyBudget
                .transition()
                .duration(1000)
                .style("opacity",0);

            ColorKeyViewers
                .transition()
                .duration(1000)
                .style("opacity",0);

            textSubTitle2nd
                .transition()
                .duration(1000)
                .style("opacity",0);

            textSubTitle
                .transition()
                .duration(1000)
                .style("opacity",0);

            textX
                .transition()
                .duration(1000)
                .style("opacity",1);

            XLine
                .transition()
                .duration(1000)
                .style("opacity",0);

            XAFLine
                .transition()
                .duration(1000)
                .style("opacity",1);

            rect1
                .transition()
                .duration(1000)
                .attr("height",0+"px");

            rect2
                .transition()
                .duration(1000)
                .attr("height",0+"px");

            d3.select(this)
                .style("fill",function(d,i)
                {
                    SelectYear = d.TVYEAR;
                    SelectID = d.TVSID;
                    return "teal";
                })

            console.log(SelectYear);

            SelectYearTextShowing
                .transition()
                .duration(1000)
                .style("opacity",1)
                .text(function()
                {
                    return SelectYear.toString();
                });

            circle
                .transition()
                .duration(1000)
                .attr("r",function(d)
                {
                    if(SelectYear == d.Year)
                    {
                        return d.budget*3;
                    }
                    else
                    {
                        return 0;
                    }
                })
                .attr("cx",function(d)
                {
                    var Xlocation = d.Month/12*width + d.Day/30*width/13;
                    if(SelectYear == d.Year)
                    {
                        return Xlocation
                    }
                    else
                    {
                        return 0;
                    }
                })
                .style("fill",function(d)
                {
                    if(d.SID == SelectID)
                    {
                        return  "bisque";
                    }
                    else
                    {
                        return "mintcream";
                    }
                });
        })
    //rect1  part

    //rect2  part
    var rect2 = svgRect
        .append("rect")
        .attr("class", "rect")
        .attr("x",function(d)
        {
            var widthNum = d.TVSID/m;
            widthNum = widthNum*width;
            return widthNum+5;
        })
        .attr("y",0)
        .attr("width",5)
        .attr("height",function(d) {
            var barHeight = d.AverageViewers * 25;
            return barHeight + "px";
        })
        .style('fill',"sandybrown")
        .on("mouseover",function(){

            d3.select(this)
                .style("fill",function(d)
                {
                    moveOnID = d.TVSID;
                    return "firebrick"
                });

            TextShowOverR
                .transition()
                .duration(500)
                .text(function(d){
                    if(d.TVSID == moveOnID) {
                        return d.TVname+" Viewers: " + d.AverageViewers.toString() + " M";
                    }
                })
                .style("opacity",1);
        })
        .on("mouseout",function(){
            d3.select(this)
                .style("fill","sandybrown")

            TextShowOverR
                .transition()
                .duration(500)
                .text(null)
                .style("opacity",0);
        })
        .on("click",function(){

            moveOnID = 0;

            yGroupMax = d3.max(eachEBandViewers,function(d){
                return d.viewers + 5;
            });

            scaleY
                .domain([0,yGroupMax])
                .range([0,height+100]);

            yAxis
                .scale(scaleY);

            YLine
                .transition()
                .duration(1000)
                .call(yAxis);

            TypeText
                .transition()
                .duration(1000)
                .text("Null")
                .style("opacity",1);

            SelectTypeShowing
                .transition()
                .duration(1000)
                .style("opacity",0.5);

            SelectYearShowing
                .transition()
                .duration(1000)
                .style("opacity",0.5);

            textThirdTitle2nd
                .transition()
                .duration(1000)
                .style("opacity",1);

            textThirdTitle
                .transition()
                .duration(1000)
                .style("opacity",1);

            TextKeyBudget
                .transition()
                .duration(1000)
                .style("opacity",0);

            TextKeyViewers
                .transition()
                .duration(1000)
                .style("opacity",0);

            ColorKeyBudget
                .transition()
                .duration(1000)
                .style("opacity",0);

            ColorKeyViewers
                .transition()
                .duration(1000)
                .style("opacity",0);

            textSubTitle2nd
                .transition()
                .duration(1000)
                .style("opacity",0);

            textSubTitle
                .transition()
                .duration(1000)
                .style("opacity",0);

            textX
                .transition()
                .duration(1000)
                .style("opacity",1);

            XLine
                .transition()
                .duration(1000)
                .style("opacity",0);

            XAFLine
                .transition()
                .duration(1000)
                .style("opacity",1);

            rect1
                .transition()
                .duration(1000)
                .attr("height",0+"px");

            rect2
                .transition()
                .duration(1000)
                .attr("height",0+"px");

            d3.select(this)
                .style("fill",function(d,i)
                {
                    SelectYear = d.TVYEAR;
                    SelectID = d.TVSID;
                    return "sandybrown";
                })

            console.log(SelectYear);

            SelectYearTextShowing
                .transition()
                .duration(1000)
                .style("opacity",1)
                .text(function()
                {
                    return SelectYear.toString();
                });

            circle
                .transition()
                .duration(1000)
                .attr("r",function(d)
                {
                    if(SelectYear == d.Year)
                    {
                        return d.budget*3;
                    }
                    else
                    {
                        return 0;
                    }
                })
                .attr("cx",function(d)
                {
                    var Xlocation = d.Month/12*width + d.Day/30*width/13;
                    if(SelectYear == d.Year)
                    {
                        return Xlocation
                    }
                    else
                    {
                        return 0;
                    }
                })
                .style("fill",function(d)
                {
                    if(d.SID == SelectID)
                    {
                        return  "bisque";
                    }
                    else
                    {
                        return "mintcream";
                    }
                })
        });
        //rect2  part

    var svgCircle = svg
        .selectAll("circle")
        .data(eachEBandViewers)
        .enter();

    //circle part
    var circle = svgCircle
        .append("circle")
        .attr("cx",function(d)
        {
            var Xlocation = d.Month/12*width;
            if(SelectYear == d.Year)
            {
                console.log(Xlocation);
                return Xlocation
            }
            else
            {
                return 0;
            }
        })
        .attr("cy",function(d){
                return d.viewers/(yGroupMax+5)*height;
        })
        .on("mouseover",function(){

            d3.select(this)
                .append("text")
                .text(function(d)
                {
                    moveOnID = d.TVID;
                    return null
                });

            console.log(moveOnID);

            TextShowOverC
                .transition()
                .duration(500)
                .text(function(d)
                {
                    if(d.TVID == moveOnID)
                    {
                        return d.name + " Budget: " + d.budget + " Viewers: " + d.viewers;
                    }
                })
                .style("opacity",1);
        })
        .on("mouseout",function(){

            TextShowOverC
                .transition()
                .duration(500)
                .text(null)
                .style("opacity",0);

        })
        .attr("r",0)
        .style("opacity",0.8)
        .on("click",function(){

            moveOnID = 0;

            yGroupMax = d3.max(BudgetandViewers,function(d){
                return d.AverageViewers;
            });

            scaleY
                .domain([0,yGroupMax])
                .range([0,height+100]);

            yAxis
                .scale(scaleY);

            YLine
                .transition()
                .duration(1000)
                .call(yAxis);

            TypeText
                .transition()
                .duration(1000)
                .text("Null")
                .style("opacity",0);

            SelectTypeShowing
                .transition()
                .duration(1000)
                .style("opacity",0);

            SelectYearTextShowing
                .transition()
                .duration(1000)
                .style("opacity",0)
                .text("0");

            SelectYearShowing
                .transition()
                .duration(1000)
                .style("opacity",0);

            textThirdTitle2nd
                .transition()
                .duration(1000)
                .style("opacity",0);

            textThirdTitle
                .transition()
                .duration(1000)
                .style("opacity",0);

            TextKeyBudget
                .transition()
                .duration(1000)
                .style("opacity",1);

            TextKeyViewers
                .transition()
                .duration(1000)
                .style("opacity",1);

            ColorKeyBudget
                .transition()
                .duration(1000)
                .style("opacity",1);

            ColorKeyViewers
                .transition()
                .duration(1000)
                .style("opacity",1);

            textSubTitle2nd
                .transition()
                .duration(1000)
                .style("opacity",1);

            textSubTitle
                .transition()
                .duration(1000)
                .style("opacity",1);

            textX
                .transition()
                .duration(1000)
                .style("opacity",0);

            XLine
                .transition()
                .duration(1000)
                .style("opacity",1);

            XAFLine
                .transition()
                .duration(1000)
                .style("opacity",0);

            circle
                .transition()
                .duration(1000)
                .attr("r",0)
                .attr("cx",0);

            rect1
                .transition()
                .duration(1000)
                .attr("height",function(d) {
                    var barHeight = d.AverageBudget * 25;
                    return barHeight + "px";
                });

            rect2
                .transition()
                .duration(1000)
                .attr("height",function(d) {
                    var barHeight = d.AverageViewers * 25;
                    return barHeight + "px";
                });
        });
    //circle part

    //TypeSelect Part

    var TextType = svg.append("g")
        .selectAll("text")
        .data(TypeRagnge)
        .enter()
        .append("text")
        .text(function(d)
        {
            return d;
        })
        .attr("y",33)
        .attr("x",width+58)
        .style("font-family","Helvetica")
        .style("fill","white")
        .attr("text-anchor", "middle")
        .style("opacity",0);

    var TypeBar = svg.append("g")
        .selectAll("rect")
        .data(TypeRagnge)
        .enter()
        .append('rect')
        .attr("class","rect")
        .style('fill','dimgray')
        .attr("x",width+30)
        .attr("y",20)
        .attr("width",60)
        .attr("height",20)
        .style("opacity",0)
        .on("click",function(){

            d3.select(this)
                .style("fill",function(d)
                {
                    TypeSelect = d;
                    return 'dimgray';
                })

            TypeText
                .text(function()
                {
                    return TypeSelect;
                })

            TextType
                .transition()
                .duration(1000)
                .attr("y",33)
                .style("opacity",0);

            TypeBar
                .transition()
                .duration(1000)
                .attr("y",20)
                .style("opacity",0);

            circle
                .transition()
                .duration(1000)
                .style("fill",function(d)
                {
                    if((d.TypeNo1 == TypeSelect)||(d.TypeNo2 == TypeSelect)||(d.TypeNo3 == TypeSelect))
                    {
                        return colorScale(TypeSelect);
                    }
                    else if(d.SID == SelectID)
                    {
                        return  "bisque";
                    }
                    else
                    {
                        return "mintcream";
                    }
                })
        })

    var TypeText = svg.append("g")
        .append('text')
        .text(function()
        {
            return TypeSelect;
        })
        .style("font-family","Helvetica")
        .style("fill","white")
        .attr("text-anchor", "middle")
        .attr("x",width+58)
        .attr("y",33)
        .style("opacity",0);

    var SelectTypeShowing = svg.append("g")
        .attr("class","rect")
        .append('rect')
        .style('fill','dimgray')
        .attr("x",width+30)
        .attr("y",20)
        .attr("width",60)
        .attr("height",20)
        .style("opacity",0)
        .on("mouseover",function(){
            d3.select(this)
                .style("fill","maroom")
        })
        .on("mouseout",function(){
            d3.select(this)
                .style("fill","dimgray")
        })
        .on("click",function(){

            TextType
                .transition()
                .duration(1000)
                .attr("y",function(d,i)
                {
                    return 53+i*20;
                })
                .style("opacity",1);

            TypeBar
                .transition()
                .duration(1000)
                .attr("y",function(d,i)
                {
                    return 40+i*20;
                })
                .style("opacity",0.5);
        })

    var TextKeyBudget = svg.append("g")
        .attr("class","text")
        .append('text')
        .text('Budget')
        .style('fill','white')
        .attr("x",1480)
        .attr("y",-80)
        .style("font-family","Helvetica")
        .style("font-size",16)
        .style("opacity",1);

    var TextKeyViewers = svg.append("g")
        .attr("class","text")
        .append('text')
        .text('Viewers')
        .style('fill','white')
        .attr("x",1610)
        .attr("y",-80)
        .style("font-family","Helvetica")
        .style("font-size",16)
        .style("opacity",1);

    var ColorKeyBudget = svg.append("g")
        .attr("class","rect")
        .append('rect')
        .style('fill','teal')
        .attr("x",1430)
        .attr("y",-100)
        .attr("width",40)
        .attr("height",20)
        .style("opacity",1);

    var ColorKeyViewers = svg.append("g")
        .attr("class","rect")
        .append('rect')
        .style('fill','sandybrown')
        .attr("x",1560)
        .attr("y",-100)
        .attr("width",40)
        .attr("height",20)
        .style("opacity",1);

    //ValueYear
    var BoxText = svg.append("g")
        .selectAll("text")
        .data(ValueYear)
        .enter()
        .append('text')
        .text(function(d)
        {
            return d.toString();
        })
        .style("font-family","Helvetica")
        .style("fill","white")
        .attr("text-anchor", "middle")
        .attr("x",width+58)
        .attr("y",0)
        .style("opacity",0);

    var SelectBox = svg.append("g")
        .selectAll("rect")
        .data(ValueYear)
        .enter()
        .append('rect')
        .attr("class","rect")
        .attr("x",width+30)
        .attr("y",0)
        .attr("width",60)
        .attr("height",20)
        .style("fill","dimgray")
        .style("opacity",0)
        .on("mouseover",function(){
            d3.select(this)
                .style("fill","maroom")
        })
        .on("mouseout",function(){
            d3.select(this)
                .style("fill","dimgray")
        })
        .on("click",function()
        {
            d3.select(this)
                .style("fill",function(d,i)
                {
                    console.log(d);
                    SelectYear = d;
                    return "dimgray";
                })

            circle
                .transition()
                .duration(1000)
                .attr("r",function(d)
                {
                    if(SelectYear == d.Year)
                    {
                        return d.budget*3;
                    }
                    else
                    {
                        return 0;
                    }
                })
                .attr("cx",function(d)
                {
                    var Xlocation = d.Month/12*width + d.Day/30*width/13;
                    if(SelectYear == d.Year)
                    {
                        return Xlocation
                    }
                    else
                    {
                        return 0;
                    }
                })
                .style("fill",function(d)
                {
                    if(d.SID == SelectID)
                    {
                        return  "bisque";
                    }
                    else
                    {
                        return "mintcream";
                    }
                })

            BoxText
                .transition()
                .duration(1000)
                .attr("y",0)
                .style("opacity",0);

            SelectBox
                .transition()
                .duration(1000)
                .attr("y",0)
                .style("opacity",0);

            SelectYearTextShowing
                .transition()
                .duration(1000)
                .text(function()
                {
                    return SelectYear.toString();
                });
        })

    var SelectYearTextShowing = svg.append("g")
        .append('text')
        .text(function()
        {
            return SelectYear.toString();
        })
        .style("font-family","Helvetica")
        .style("fill","white")
        .attr("text-anchor", "middle")
        .attr("x",width+58)
        .attr("y",-7)
        .style("opacity",0);

    var SelectYearShowing = svg.append("g")
        .attr("class","rect")
        .append('rect')
        .style('fill','dimgray')
        .attr("x",width+30)
        .attr("y",-20)
        .attr("width",60)
        .attr("height",20)
        .style("opacity",0)
        .on("click",function()
        {
            BoxText
                .transition()
                .duration(1000)
                .attr("y",function(d,i)
                {
                    return 13+i*20;
                })
                .style("opacity",1);

            SelectBox
                .transition()
                .duration(1000)
                .attr("y",function(d,i)
                {
                    return i*20;
                })
                .style("opacity",0.5);
        })

}

function parse(d){

    var newRow = {};

    newRow.name = d.Name;
    newRow.viewers = +d.USViewers;
    newRow.budget = +d.Budget;
    newRow.Year = +d.year;
    newRow.Month = +d.month;
    newRow.Day = +d.day;
    newRow.Datetime = d.Date;
    newRow.SID = +d.TVSiteID;
    newRow.TVID = +d.SiteID;
    newRow.TypeNUM = +d.TypeNumber;
    newRow.TypeNo1 = d.Type1;
    newRow.TypeNo2 = d.Type2;
    newRow.TypeNo3 = d.Type3;

    return newRow;
}

function parseAverage(d)
{
    var newAverageRow = {};

    newAverageRow.TVname = d.Name;
    newAverageRow.AverageViewers = +d.Viewers;
    newAverageRow.AverageBudget = +d.Budget;
    newAverageRow.TVSID = +d.TVSiteID;
    newAverageRow.TVYEAR = +d.AirYear;

    return newAverageRow;
}