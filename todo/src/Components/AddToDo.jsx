import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Switch from '@mui/material/Switch';
 const AddToDo = (props)=> {
// Set minimum today
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0 so need to add 1 to make it 1!
var yyyy = today.getFullYear();
if(dd<10){
  dd='0'+dd
} 
if(mm<10){
  mm='0'+mm
} 

today = yyyy+'-'+mm+'-'+dd;
// End setting min date
// States
const [isDark,setIsDark]=useState(false)
const [newTodo,setNewTodo]=useState(false)
const [todo,setTodo]=useState([])
const [todoArr,setTodoArr]=useState([])
const [isArchived,setIsArchived]=useState(false)
const [isDone,setIsDone]=useState(false)
// End if states
// Handlers
const handleNewTodoOnClick = ()=>{
setNewTodo(true)
setTodo(...todo,{title:"", description:"",startDate:"",endDate:"",done:false,archived:false})
}
const handleDeleteNewTodoOnClick = ()=>{
    setNewTodo(false)
    setTodo([])
}
const handleNewTodoOnChange=(e)=>{
setTodo({...todo, [e.target.name]:e.target.value})
}
const onSubmitNewTodoHandler = (e)=> {
   e.preventDefault();
    setTodoArr([...todoArr,todo])
    setTodo([])
    setNewTodo(false)
}
const handleDeleteItem=(index)=>{
let list = [...todoArr]
list.splice(index,1)
setTodoArr(list)
}
const handleOnChangeItem=(e,index)=>{
    let list = [...todoArr]
    list[index][e.target.name]=e.target.value
    setTodoArr(list)
    }
    const handleArchiveItem=(index)=>{
        let list = [...todoArr]
        list[index].archived=true
        setTodoArr(list)
        }
        const handleDoneItem=(index)=>{
            let list = [...todoArr]
            list[index].done=true
            setTodoArr(list)
            } 
console.log(todoArr)
// End of handlers
console.log(todo)
  return (
    <>
    <div className="position-absolute"> <Switch onClick={()=>{setIsDark(!isDark)}} /></div>

    <div className={isDark ?"w-100  vh-100 bg-dark text-white overflow-hidden" : "w-100  vh-100  overflow-hidden"}>
  <h1 className='text-center  mb-3'>To-Do App</h1>

{newTodo ?
   <form onSubmit={onSubmitNewTodoHandler} className='container m-auto row m-0 p-2 g-3'>
    <div className="col-md-6">
    <TextField id="outlined-basic" label="Title" variant="outlined" className='form-control' name='title' onChange={handleNewTodoOnChange} />
    </div>
    <div className="col-md-6">
    <TextField id="outlined-basic" label="Description" variant="outlined" className='form-control' name='description' onChange={handleNewTodoOnChange} />
    </div>
    <div className="col-md-6">
        <label htmlFor="startDate">Start</label>
       <input type="date" min={today} className="form-control" name='startDate' onChange={handleNewTodoOnChange} />
    </div>
    <div className="col-md-6">
        <label htmlFor="endDate">End</label>
       <input type="date" className="form-control" name='endDate' disabled={todo.startDate==="" ? true:false} min={todo.startDate}  onChange={handleNewTodoOnChange} />
    </div>
    <div className="col-md-6 text-start">
    <Button onClick={handleDeleteNewTodoOnClick} variant="outlined" color="error">
        Cancel
      </Button>
    </div>
    <div className="col-md-6 text-end">
    <Button variant="outlined" color="success" type="submit">
        Add To-Do
      </Button>
    </div>
   </form> : <div className="row m-0 p-0 justify-content-center align-items-center">
    <div className="col-12 text-center">
    <Button variant="contained" color="success" onClick={handleNewTodoOnClick} >
        Add New To-Do
      </Button>
    </div>
   </div> 
   }

   <div className="row my-3 p-2">
<div className="col-12 text-center">
<ButtonGroup variant="contained" aria-label="outlined primary button group">
      <Button onClick={()=>{
        setIsArchived(false)
        setIsDone(false)
      }}>
        All
        </Button>
      <Button onClick={()=>{
        setIsArchived(true)
        setIsDone(false)
      }}>Archived</Button>
      <Button onClick={()=>{
        setIsArchived(false)
        setIsDone(true)
      }}>Done</Button>
    </ButtonGroup>
</div>
   </div>
   
<div className="row container m-auto my-3 p-2"> 


{todoArr.map((item, index)=>{
    
return isArchived && item.archived===true ?
 (<div key={index} className="col-12 row m-0 g-4">
<div className="col-2">
<TextField
        onChange={(e)=>{handleOnChangeItem(e,index)}}
        name="title"
          id="outlined"
          label="Title"
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
          value={item.title}
        />
</div>
<div className="col-2">
<TextField
onChange={(e)=>{handleOnChangeItem(e,index)}}
name="description"
          id="outlined"
          label="Description"
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
          value={item.description}
        />
</div>
<div className="col-2">
<TextField
onChange={(e)=>{handleOnChangeItem(e,index)}}
name="startDate"
          id="outlined"
          label="Start-Date"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          value={item.startDate}
        />
</div>
<div className="col-2">
<TextField
          onChange={(e)=>{handleOnChangeItem(e,index)}}
          name="endDate"
          id="outlined"
          label="End-Date"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          value={item.endDate}
        />
</div>
<div className="col-4 row m-0 p-0 gx-2 align-items-center justify-content-center">
<div className="col">
      <Button onClick={()=>{handleDeleteItem(index)}} variant="contained" color="error">
        Delete
      </Button>
</div>

<div className="col">
      <Button onClick={()=>{
        handleDoneItem(index)
      }} variant="contained" color="success">
        Done
      </Button>
</div>
</div>
</div>): isDone && item.done===true ?
(<div key={index} className="col-12 row m-0 g-4">
<div className="col-2">
<TextField
        onChange={(e)=>{handleOnChangeItem(e,index)}}
        name="title"
          id="outlined"
          label="Title"
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
          value={item.title}
        />
</div>
<div className="col-2">
<TextField
onChange={(e)=>{handleOnChangeItem(e,index)}}
name="description"
          id="outlined"
          label="Description"
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
          value={item.description}
        />
</div>
<div className="col-2">
<TextField
onChange={(e)=>{handleOnChangeItem(e,index)}}
name="startDate"
          id="outlined"
          label="Start-Date"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          value={item.startDate}
        />
</div>
<div className="col-2">
<TextField
          onChange={(e)=>{handleOnChangeItem(e,index)}}
          name="endDate"
          id="outlined"
          label="End-Date"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          value={item.endDate}
        />
</div>
<div className="col-4 row m-0 p-0 gx-2 align-items-center justify-content-center">
<div className="col">
      <Button onClick={()=>{handleDeleteItem(index)}} variant="contained" color="error">
        Delete
      </Button>
</div>
<div className="col">
      <Button onClick={()=>{
       handleArchiveItem(index)
      }} variant="contained" color="warning">
        Archive
      </Button>
</div>

</div>
</div>) : isArchived===false&&isDone===false ? (<div key={index} className="col-12 row m-0 g-4">
<div className="col-2">
<TextField
        onChange={(e)=>{handleOnChangeItem(e,index)}}
        name="title"
          id="outlined"
          label="Title"
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
          value={item.title}
        />
</div>
<div className="col-2">
<TextField
onChange={(e)=>{handleOnChangeItem(e,index)}}
name="description"
          id="outlined"
          label="Description"
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
          value={item.description}
        />
</div>
<div className="col-2">
<TextField
onChange={(e)=>{handleOnChangeItem(e,index)}}
name="startDate"
          id="outlined"
          label="Start-Date"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          value={item.startDate}
        />
</div>
<div className="col-2">
<TextField
          onChange={(e)=>{handleOnChangeItem(e,index)}}
          name="endDate"
          id="outlined"
          label="End-Date"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          value={item.endDate}
        />
</div>
<div className="col-4 row m-0 p-0 gx-2 align-items-center justify-content-center">
<div className="col">
      <Button onClick={()=>{handleDeleteItem(index)}} variant="contained" color="error">
        Delete
      </Button>
</div>
<div className="col">
      <Button onClick={()=>{
       handleArchiveItem(index)
      }} variant="contained" color="warning">
        Archive
      </Button>
</div>
<div className="col">
      <Button onClick={()=>{
        handleDoneItem(index)
      }} variant="contained" color="success">
        Done
      </Button>
</div>
</div>
</div>):""
})}

</div>
    </div>
    </>
  )
}


export default AddToDo