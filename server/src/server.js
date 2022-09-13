const express = require("express");
const cors = require("cors");
const middleware = require("./middleware");

const app = express();

const port = 5000;

app.use(cors());
app.use(middleware.decodeToken)

app.get("/api/todo", (req, res) => {
    console.log(req.config.headers)
    return res.json({
        todos: [
            {
                title: 'task 1',
            },
            {
                title: 'task 2',
            },
        ]
    })
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});