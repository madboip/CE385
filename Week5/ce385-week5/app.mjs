import express from "express";

const app = express()
app.use(express.json());
const TODOS = [
    {id:"1", title:"สวัสดี6811", done: true, priority:"High"},
    {id:"2", title:"สวัสดี6812", done: false, priority:"Low"},
    {id:"3", title:"สวัสดี6813", done: true, priority:"High"},
    {id:"4", title:"สวัสดี6814", done: false, priority:"Normal"},
];

const PRIORITIES = ["High", "Normal", "Low"];
function validateTodo(req, res, next) {
    const {title, priority} = req.body ?? {};

    if (typeof title !== "string" || title.trim() === ""){
    }
    if (priority !== undefined && !PRIORITIES.includes(priority)) {
        return res.status(400).json({ error: "priority ไม่ถูกต้อง"});
    }
    return next();
}

const todoRouter = express.Router();
todoRouter.get("/health", (req, res) => {
    res.json({ status: "ok"});
});

todoRouter.get("/", (req, res) => { 
    res.json(TODOS.map((t) =>  ({...t})));
});

todoRouter.get("/:id", (req, res) => {
    const todo = TODOS.find((t) => t.id === req.params.id);
    if (!todo) {
        return res.status(404).json({ error: 'ไม่พบรายการ ' + req.params.id });
    }
return res.json({...todo});
});

todoRouter.post("/todos", validateTodo, (req, res) => {
    const created = {
        id: String(TODOS.length + 1),
        title: req.body.title,
        done: false,    
        priority: req.body.priority ?? "Normal",
    };
    TODOS.push(created);
    res.status(201).json({...created});
})

app.use("/api/v1/todos", todoRouter);

app.listen(3000, () => {
    console.log("เซิฟเว่อร์ทำงานที่ http://localhost:3000");
})