// backend.js
import express from "express";

const app = express();
const port = 8000;


const api = "07a042f2cdf746179eb011e0cafcfb4c"





const recipes = {
  recipes: [
    {
      id: "1",
      meal: "Pasta Carbonara",
      author: "Almas",
    },
    {
      id: "2",
      meal: "Mac&Cheese",
      aruthor: "Max"
    },
    {
      id: "3",
      meal: "Pepperoni Pizza",
      author: "Andy"
    },
    {
      id: "4",
      meal: "Ckicken Noodle Soup",
      author: "Hudson"
    },
    {
      id: "5",
      meal: "Tartar",
      author: "Kyle"
    },
  ]
};


app.use(express.json());


app.get("/", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  if (name != undefined && job == undefined){
    let result = findUserByName(name);
    result = { users_list: result };
    res.status(200).send(result);
  } else if (name != undefined || job != undefined) {
    let result = findUserByNameAndJob(name, job);
    result = { users_list: result };
    res.status(200).send(result);
  } else {
    res.status(200).send(users);
  }
});


app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});