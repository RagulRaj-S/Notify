import React from 'react';
import * as firebase from 'firebase';
import Navbar from './Navbar'
import DisplayNotes from './DisplayNotes'
import 'materialize-css/dist/css/materialize.min.css'
import AOS from 'aos'
AOS.init();


class Notes extends React.Component {
  constructor () {
    super();
    this.state = {
      notes: [],
      title: '',
      note: ''
    }
    this.createNote = this.createNote.bind(this);
  }

  onChangeHandler (evt, key) {
    this.setState({
      [key]: evt.target.value
    });
  }

  createNote () {
    var id = this.props.match.params.notes_id;
    if (this.state.title !== '' && this.state.note !== '') {
      firebase.database().ref(id).push({
        title: this.state.title,
        note: this.state.note,
      })
    }
    this.state.title="";
    this.state.note="";
  }

  componentDidMount () {
    this.db = firebase.database();
    this.listenForChange();
  }

  listenForChange () {
    var id = this.props.match.params.notes_id;
    this.db.ref(id).on('child_added', snapshot => {
      let note = {
        id: snapshot.key,
        title: snapshot.val().title,
        note: snapshot.val().note
      }
      let notes = this.state.notes;
      notes.push(note);

      this.setState({
        notes: notes
      });
    });

    this.db.ref(id).on('child_removed', snapshot => {
      let notes = this.state.notes;
      notes = notes.filter(note => note.id !== snapshot.key);

      this.setState({
        notes: notes
      });
    });
  }
  
   
    render(){
        return (
            <div className="notes">
              <Navbar />   
            <div className="container"> 
              <div classname="row">
                <div className="card"> 
                  <div className="card-content">
                    <input type="text" align="left" name="notes-title" id="notes-title" placeholder="Title" value={this.state.title} onChange={(evt) => this.onChangeHandler(evt, 'title')}></input>
                    <textarea name="notes-note" id="notes-note" placeholder="Your Note" value={this.state.note} onChange={(evt) => this.onChangeHandler(evt, 'note')}/> 
                    <button class="btn-floating btn-large halfway-fab black" onClick={this.createNote}>
                      <i class="material-icons add">add</i>
                    </button>
                    {/* <a class="waves-effect waves-light btn">button</a> */}
                  </div> 
                </div> 
              </div> 
            </div> 
            <DisplayNotes notes={this.state.notes} note_id={this.props.match.params.notes_id}/>
          </div>
        );
    }
  }

export default Notes;
