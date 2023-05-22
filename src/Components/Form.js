import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../redux/modules/todos';
import { nanoid } from 'nanoid';
import styled from 'styled-components';

function Form() {
const dispatch = useDispatch();
const [title, setTitle] = useState('');
const [body, setBody] = useState('');
const [image, setImage] = useState('');

const onTitleChange = (e) => setTitle(e.target.value);
const onBodyChange = (e) => setBody(e.target.value);
const onImageChange = (e) => setImage(e.target.files[0]);

const onAddBtnClick = (e) => {
e.preventDefault();
if (title === '' || body === ''|| image ==='') {
alert('Please enter a title and body for the todo.');
return;
}
const newTodo = {
id: nanoid(),
title,
body,
image,
isDone: false,
};
dispatch(addTodo(newTodo));
setTitle('');
setBody('');
setImage(null);
};

return (
<Section>
<FormArea>
<Label htmlFor="form-title">
Title
<Input 
         type="text"
         id="form-title"
         value={title}
         onChange={onTitleChange}
       />
</Label>
<Label htmlFor="form-body">
Body
<Input
         type="text"
         id="form-body"
         value={body}
         onChange={onBodyChange}
       />
</Label>
<Label htmlFor="form-image">
<Input type="file" id="form-image"onChange={onImageChange}/>
</Label>
<FormButton onClick={onAddBtnClick}>
등록하기
</FormButton>
</FormArea>
</Section>
)
}

export default Form;

const Section = styled.section` 
height: 100px; 
display: flex; 
align-items: center; 
padding: 20px 30px;
background-color: lightgrey; 
border-radius: 10px;`

const FormArea = styled.form` 
width: 100%;`

const Label = styled.label` 
margin-right: 5px;`

const Input = styled.input` 
width: 260px; 
height: 40px; 
margin: 0 20px; 
border: none; 
border-radius: 10px;`

const FormButton = styled.button` 
border: none; 
float: right; 
background-color: teal;
color: white;`