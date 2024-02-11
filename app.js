const express = require('express'); //including module/package
const app = express(); // creating object
const PORT = process.env.PORT || 3000
//var port = 4000;

const emp = [
    { empid:1, empname:"tushil", empsalary:60000 },
    { empid:2, empname:"golu", empsalary:40000 },
    { empid:3, empname:"mohan", empsalary:55000 }
]

app.use(express.json());//to use data as JSON format. Json() is a built-in middleware function in Express. This method is used to parse the incoming requests with JSON payloads and is based upon the bodyparser. This method returns the middleware that only parses JSON and only looks at the requests where the content-type header matches the type option.(To enable parsing of JSON object in the body of request)

app.get('/',(req,resp)=>{ // get method
    resp.send(emp)
})


app.post('/',(req,resp)=>{  //post method
      
    const newemp={
        empid : req.body.id,
        empname : req.body.name,
        empsalary : req.body.salary,
    }
    emp.push(newemp)
    resp.send(emp)
})

app.put('/:id',(req,resp)=>{  //put method
    //chcecking id is available or not if availabel then get array index for update it
    const  indx = emp.findIndex(emp => emp.empid == parseInt(req.params.id)) // if id match then it return a index value otherwise it return (-1).
    // here emp.empid is our emp objcet id
    // here req.params.id is requested id(params property, This property is an object containing properties mapped to the named route “parameters”. For example, if you have the route /user/:name, then the “name” property is available as req.params.name. This object defaults to {}.) (it contain requested parameter(id))
    if(indx >= 0)
    {
        const updated = {
             empid : parseInt(req.params.id), // here we dont want to replace id so we take id which we passed in request. and parseInt is used to conver the id into integer.
             empname : req.body.name,
             empsalary : req.body.salary,
        }
        emp.splice(indx,1,updated)
        resp.send(emp);
    }
    else{
        resp.status(404).send(`record not found with id: ${req.params.id} `)
    }
})

app.delete('/:id',(req,resp)=>{  // delete method
    const  indx = emp.findIndex(emp => emp.empid == parseInt(req.params.id)) 
    if(indx >= 0)
    {
        emp.splice(indx,1)
        resp.send(emp);
    }
    else{
        resp.status(404).send(`record not found with id: ${req.params.id} `)
    }
})


app.listen(port,console.log('server is running on port no:'+ port));
    
