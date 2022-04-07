import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDeleting } from '../../actions/notes'
import { useForm } from '../../hooks/useForm'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

    const dispatch = useDispatch()
    const {active: note} = useSelector(state => state.notes)
    const [formValues, handleInputChange, reset] = useForm(note);
    const {body,title} = formValues;

    const activeId = useRef(note.id)
    //con esto sacamos una captura del id en cada momento

    useEffect(() => {
      
        if(note.id !== activeId.current){
        reset(note);
        activeId.current = note.id
        //se iguala para no generar loop infinito
    }
    }, [note, reset])
    /*este useEffect esta porque cuando se modificaba la nota activa
    no se mostraba en la pantalla, porque al modificarse no 
    modificaba el useForm.*/ 
    useEffect(() => {

        dispatch(activeNote(formValues.id, {...formValues}))
      
    }, [formValues,dispatch]);
    const handleDelete = () => {
        dispatch(startDeleting(activeId))
    }
    

  return (
    <div className='notes__main-content'>
        <NotesAppBar/>
        <div className='notes__content'>
            <input
                type={'text'}
                placeholder='Some awesome title'
                className='notes__title-input'
                autoComplete='off'
                name='title'
                value={title}
                onChange={target => handleInputChange(target)}
            />
            <textarea
                placeholder='What happened today'
                className='notes__textarea'
                name='body'
                value={body}
                onChange={target => handleInputChange(target)}
            >
            </textarea>

            {
                (note.url) &&
            <div className='notes__image'>
                <img
                    src={note.url}
                    alt='Landscape'>
                </img>
            </div>
            }
        </div>
            
            <button 
                className='btn btn-danger'
                onClick={handleDelete}
            >
                Delete
            </button>

    </div>
  )
}
