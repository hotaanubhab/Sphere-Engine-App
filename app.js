//dependencies
const env = require("./environment.js");
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Prob = require('./models/prob')
const request = require('request');
var favicon = require('serve-favicon');

//app
const app = express();

//Mongo connection and listen
const dbURI = env.MONGO_URI;
mongoose.connect(dbURI, {useNewUrlParser:true,useUnifiedTopology:true})
    .then((result)=> {
        console.log('Connected to DB');
        //listening
        app.listen(process.env.PORT || 3000);
    })
    .catch((err) => console.log(err));

//view engine
app.set('view engine','ejs')

// define access parameters
var accessToken = env.ACCESS_TOKEN;
var endpoint = env.PROBLEMS_API;

//middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended:true }));
app.use(express.json());
app.use(morgan('dev'));

//routes
app.get('/',(req,res)=>{
    res.render('index');
})

app.get('/problems',async (req,res)=>{
    await Prob.find()
        .then((result)=>{
            console.log(result);
           res.render('problems',{probs:result});
        })
        .catch((err)=>{
            console.log(err);
        });
    
})

app.get('/submit/:id',(req,res)=>{
    // send request
    let prob;
request({
    url: 'https://' + endpoint + '/api/v4/compilers?access_token=' + accessToken,
    method: 'GET'
}, function (error, response, body) {
	
    if (error) {
        console.log('Connection problem');
    }
    
    // process response
    if (response) {
        if (response.statusCode === 200) {
            //console.log(JSON.parse(response.body));  //list of compilers in JSON
            // define request parameters
            var problemId = req.params.id;
            console.log(problemId);
            // send request
            request({
                
                url: 'https://' + endpoint + '/api/v4/problems/' + problemId + '?access_token=' + accessToken,
                method: 'GET'
            }, function (error, resp, body) {
                
                if (error) {
                    console.log('Connection problem');
                }
                
                // process response
                if (resp) {
                    if (resp.statusCode === 200) {
                        prob=JSON.parse(resp.body); // problem data in JSON
                        res.render('submit',{langs:JSON.parse(response.body).items,problemId:req.params.id,prob:prob});
                    } else {
                        if (resp.statusCode === 401) {
                            console.log('Invalid access token');
                        } else if (resp.statusCode === 403) {
                            console.log('Access denied');
                        } else if (resp.statusCode === 404) {
                            console.log('Problem not found');
                        }
                    }
                }
            });
        } else {
            if (response.statusCode === 401) {
                console.log('Invalid access token');
            }
        }
    }
});
})
app.post('/submit',(req,res)=>{
    
// define request parameters
var submissionData = req.body;

// send request
request({
    url: 'https://' + endpoint + '/api/v4/submissions?access_token=' + accessToken,
    method: 'POST',
    form: submissionData
}, function (error, response, body) {
    
    if (error) {
        console.log('Connection problem');
    }
    
    // process response
    if (response) {
        if (response.statusCode === 201) {
            console.log(JSON.parse(response.body)); // submission data in JSON
            // define request parameters
            var submissionId = JSON.parse(response.body).id;

            // send request
            setTimeout(function(){ 
                request({
                    url: 'https://' + endpoint + '/api/v4/submissions/' + submissionId + '?access_token=' + accessToken,
                    method: 'GET'
                }, function (error, response, body) {
                    
                    if (error) {
                        console.log('Connection problem');
                    }
                    
                    // process response
                    if (response) {
                        if (response.statusCode === 200) {
                            //console.log(JSON.parse(response.body)); // submission data in JSON
                            res.render('status',{s:JSON.parse(response.body)})
                        } else {
                            if (response.statusCode === 401) {
                                console.log('Invalid access token');
                            } else if (response.statusCode === 403) {
                                console.log('Access denied');
                            } else if (response.statusCode === 404) {
                                console.log('Submision not found');
                            }
                        }
                    }
                });
             }, 6000);
            
        } else {
            if (response.statusCode === 401) {
                console.log('Invalid access token');
            } else if (response.statusCode === 402) {
                console.log('Unable to create submission');
            } else if (response.statusCode === 400) {
                var body = JSON.parse(response.body);
                console.log('Error code: ' + body.error_code + ', details available in the message: ' + body.message)
            }
        }
    }
});
})


app.get('/details',(req,res)=>{
    res.render('details');
})

//Create question routes

app.get('/create',(req,res)=>{
    res.render('create');
})
app.post('/create',(req,res)=>{
    var problemData = {
        name: req.body.name,
        masterjudgeId: req.body.masterjudgeId,
        body: req.body.body
    };
    
    // send request
    request({
        url: 'https://' + endpoint + '/api/v4/problems?access_token=' + accessToken,
        method: 'POST',
        form: problemData
    }, function (error, response, body) {
        
        if (error) {
            console.log('Connection problem');
        }
        
        // process response
        if (response) {
            if (response.statusCode === 201) {
                console.log(JSON.parse(response.body)); // problem data in JSON
                let pdata = JSON.parse(response.body);
                const prob = new Prob({name:req.body.name,id:pdata.id,code:pdata.code});
                prob.save()
                    .then((result)=>{
                        res.render('create');
                    })
                    .catch((err)=>{
                        console.log(err);
                    });
            } else {
                if (response.statusCode === 401) {
                    console.log('Invalid access token');
                } else if (response.statusCode === 400) {
                    var body = JSON.parse(response.body);
                    console.log('Error code: ' + body.error_code + ', details available in the message: ' + body.message)
                }
            }
        }
    });
    
})

//Add Testcase Routes

app.get('/testcase',(req,res)=>{
    res.render('testcase');
})
app.post('/testcase',(req,res)=>{
    // define request parameters
var problemId = req.body.id;
var testcaseData = {
    input: req.body.input,
    output: req.body.output,
    timelimit: req.body.timeLimit,
    judgeId: 1
};

// send request
request({
    
    url: 'https://' + endpoint + '/api/v4/problems/' + problemId +  '/testcases?access_token=' + accessToken,
    method: 'POST',
    form: testcaseData
}, function (error, response, body) {
    
    if (error) {
        console.log('Connection problem');
    }
    
    // process response
    if (response) {
        if (response.statusCode === 201) {
            console.log(JSON.parse(response.body)); // testcase data in JSON
        }
        else {
            if (response.statusCode === 401) {
                console.log('Invalid access token');
            } else if (response.statusCode === 403) {
                console.log('Access denied');
            } else if (response.statusCode === 404) {
                console.log('Problem does not exist');
            } else if (response.statusCode === 400) {
                var body = JSON.parse(response.body);
                console.log('Error code: ' + body.error_code + ', details available in the message: ' + body.message)
            }
        }
    }
});
    res.redirect('/testcase');
})
