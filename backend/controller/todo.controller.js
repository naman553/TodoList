import Todo from "../model/todo.model.js"
export const createTodo =async (req,res)=>{
    const todo =new Todo({
        text:req.body.text,
        completed:req.body.completed,
        user:req.user._id
    });

    try {
        const newTodo= await todo.save();
        res.status(201).json({message:"todo created", newTodo})
    } catch (error) {
        console.log(error);
        res.status(400).json({message:"error in creating todo"})
    }
}

export const getTodos = async(req,res)=>{
    try {
        const todos =await Todo.find({user:req.user._id})
        res.status(201).json({message:"fetched todos successfully",todos})
    } catch (error) {
        console.log(error)
    }
}


export const updateTodo= async(req,res) =>{
    try {
        const todo =await Todo.findByIdAndUpdate(req.params.id , req.body , {
            new: true,
        })
        res.status(201).json({message:"updated todo successfully",todo})

    } catch (error) {
        console.log(error);
        res.status(400).json({message:"error updating the todo"});
    }
} 


export const deleteTodo= async (req,res) =>{
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.status(201).json({message:"deleted todo successfully"})
    } catch (error) {
        res.status(400).json({message:"error deleting the todo"});
    }
}