var express = require('express');

var app = express();

var handlebars = require('express-handlebars').create({ defaultLayout: 'main' });

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

var fortunes = [
    "You will have a pleasure surprise.",
    "Do not fear what you don't know.",
    "Rivers need spring.",
    "Whenever possible, keep it simple.",
    "Conquer your fears or they will conquer you.",
];

app.get('/', function(req, res){
    res.render('home');
});

app.get('/about', function(req, res){
    var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render('about', { fortune: randomFortune });
});

//404 catch-all 处理器(middleware)
app.use(function(req, res, next){
    res.status(404);
    res.render('404');
});

//500 错误处理器 (middleware)
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + 
    app.get('port') + '; \n press Ctrl-C to terminate.');
});