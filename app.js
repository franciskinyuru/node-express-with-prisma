const express = require('express');

const dotenv = require('dotenv');

const prisma = require('./db/prisma');

dotenv.config();

const app = express();

const port = 3030;

app.use(express.json());

app.get('/', async(req, res) =>{
      const users = await prisma.user.findMany()
    res.status(200).json({"msg":users});
})
app.get('/:id', async(req, res) =>{
    const id = req.params.id;
    const users = await prisma.user.findUnique({
        where: {
            id: Number(id)
        }
    });
  res.status(200).json({"msg":users});
})

app.post('/', async(req, res) =>{
const {name, email, password} = req.body;
   const createUser= await prisma.user.create({
        data: {
          name: name,
          email:email,
          password: password
        }
      });
    if (createUser) {
        res.status(200).json({"msg":"User created successfully"});
    }else{
        res.status(500).json({"msg":"An error occurred creating user"});
    }
})

app.put('/', async(req, res)=>{
    const id = req.body.id;
    const update= await prisma.user.update({
        where:{id: Number(id)},
        data: req.body
      });
      if(update){
        res.status(200).json({"msg":"User updated succesfully"});
      }else{
        res.status(500).json({"msg":"An issue occured"});
      }

})
app.delete('/', async(req, res)=>{
    const id = req.body.id;
    const remove= await prisma.user.delete({
        where:{id: Number(id)}
      });
      if(remove){
        res.status(200).json({"msg":"User deleted succesfully"});
      }else{
        res.status(500).json({"msg":"An issue occured"});
      }
});

app.post('/user/details', async(req, res)=>{
    try {
        const {user_id, job, jobdesc} = req.body;
   const createUserDetails= await prisma.userDetails.create({
        data: {
          user_id: user_id,
          job: job,
          jobdesc: jobdesc
        }
      });
    if (createUserDetails) {
        res.status(201).json({"msg":"User details created successfully"});
    }else{
        res.status(500).json({"msg":"An error occurred creating user details"});
    }  
    } catch (error) {
        res.status(500).json({"msg":error});
    } 
})

app.get('/user/details', async(req, res) =>{
    const users = await prisma.userDetails.findMany(
        {
            include: {
                User: {
                    select:{
                        name:true,
                        email:true
                    }
                }
              },
        }
    )
  res.status(200).json({"msg":users});
})

app.listen(port, ()=>{
    console.log(`App is listening on port ${port}`);
})