import React, { Component , useState} from 'react';
import 'materialize-css/dist/css/materialize.min.css'
import * as firebase from 'firebase';
import './css/DisplayNotes.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 


export class DisplayNotes extends Component {
  constructor (props) {
    super(props);
    this.state = {
      newNotes: [],
      newTitle: '',
      newNote: ''
    }
    this.submit = this.submit.bind(this);
  }
  onChangeHandler (evt, key) {
    this.setState({
      [key]: evt.target.value
    });
  }

  componentDidMount () {
    this.db = firebase.database();
  }

  listenForChange () {
    const note_id=this.props.note_id;
    console.log(note_id)
    this.db.ref(note_id).on('child_changed', snapshot => {
      let newNote = {
        id: note_id,
        title: snapshot.val().title,
        note: snapshot.val().note
      }
      let newNotes = this.state.newNotes;
      this.props.notes.push(newNote);
      console.log(this.props.notes)

      this.setState({
        newNotes:newNotes
      });
    });
  }

  
  submit(id)  {
    confirmAlert({
      childrenElement: () => <div>
        {this.props.notes.map(note => (
        <div className="note" key={note.id}>
          {note.id===id &&
                      <div class="card-content">
                      <input align="left" name="notes-title" id="notes-title" placeholder="Title" onChange={(evt) => this.onChangeHandler(evt, 'newTitle')} ></input>
                      <textarea name="notes-note" id="notes-note" placeholder="Your Note" onChange={(evt) => this.onChangeHandler(evt, 'newNote')}>{note.note}</textarea>
                    </div>
                 }
            </div>
        ))}
        </div>,
      buttons: [
        {
          label: 'Save',
          onClick: () => {
          alert("ok")
          if (this.state.newNote !== '') {
            const note_id=this.props.note_id;
            console.log(id)
            console.log(this.state.newNote)
           this.db.ref(note_id).child(id).update({
              note: this.state.newNote,
            }).catch(function(error) {
                  console.error("Error removing document: ", error);
              });
              }
            }
        
      }
        ,
        {
          label: 'No',
          onClick: () => alert('Click No')
        }
      ]
    });
 }
 removeNote(id){
    confirmAlert({
      childrenElement: () => <div>
              <h6>Are you sure, you want to delete this note!</h6>
        </div>,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            const note_id=this.props.note_id;
            firebase.database().ref(note_id).child(id).remove();
        }
        
      }
        ,
        {
          label: 'No',
          onClick: () => alert('Note was not deleted!')
        }
      ]
    });
  }
  render() {
    return (
      <section className="notes-wrapper">
        <h3>Notes</h3>
        <div className="Displaynotes">
          {this.props.notes.map(note => (
            <div className="note" key={note.id}>
            <div class="index container">
                <div class="card blue-grey darken-1 hoverable">
                  <div class="card-content white-text">
                  <i className="material-icons delete" onClick={() => this.removeNote(note.id)}>delete</i>
                  <span class="card-title" align="left">{note.title}</span>
                  <p align="left">{note.note}</p>
                  <span class="btn-floating btn-large halfway-fab pink" onClick={() => this.submit(note.id)} href="#modal1" >
                    <i class="material-icons edit">edit</i>
                  </span>
                </div>
                </div>
              </div>
          </div>
          ))}
        </div>
      </section>
    )
  }
}
export default DisplayNotes;
