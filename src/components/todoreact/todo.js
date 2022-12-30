import React, { useState, useEffect } from 'react'
import "./style.css"

const getLocalData = () => {
    const lists = localStorage.getItem("todolist");
    if (lists)
        return JSON.parse(lists);
}

const Todo = () => {

    const [inputData, setInputData] = useState("");
    const [items, setItems] = useState(getLocalData());

    const updateItems = (item) => {
        if (item) {
            const myNewInputData = {
                id: new Date().getTime().toString(),
                name: item
            }
            setItems([...items, myNewInputData]);
            setInputData("");
        }

    }

    const deleteItem = (index) => {

        const newList = items.filter((currElem) => {
            return currElem.id !== index;
        })

        setItems(newList);
    }

    const removeAll = () => {
        setItems([]);
    }

    useEffect(() => {
        localStorage.setItem("todolist", JSON.stringify(items));
    }, [items])


    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src="./images/todo.svg" alt="todologo" />
                        <figcaption>Add Your List Here ✌️</figcaption>
                    </figure>
                    <div className="addItems">
                        <input type="text" placeholder='✍️ Add Items'
                            className='form-control' value={inputData} onChange={(event) => setInputData(event.target.value)} />
                        <i className="fa fa-plus add-btn" onClick={() => updateItems(inputData)}></i>
                    </div>
                    <div className="showItems">
                        {
                            items.map((currElem) => {
                                return <div className="eachItem" key={currElem.id}>
                                    <h3>{currElem.name}</h3>
                                    <div className="todo-btn">
                                        <i className="far fa-edit add-btn"></i>
                                        <i className="far fa-trash-alt add-btn" onClick={() => deleteItem(currElem.id)}></i>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                    <div className="showItems">
                        <button className='btn effect04' data-sm-link-text="Remove All" onClick={() => removeAll()}>
                            <span>Checklist</span></button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Todo