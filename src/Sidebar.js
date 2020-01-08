import React from 'react';
import './App.css';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import SearchAndFilter from './SearchAndFilter';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkBoxes : []
    }
    this.searchAndFilter = new SearchAndFilter();
    this.subject = React.createRef();
    this.minimumCredits = React.createRef();
    this.maximumCredits = React.createRef();
    this.search = React.createRef();
    this.label1=React.createRef();
  }
  
  setCourses(x) {
    let labelArr = this.state.checkBoxes;
    if(x===1){
      if(!labelArr.includes("science"))
      labelArr.push("science");
      else 
      labelArr.splice(labelArr.indexOf("science"),1);
    }
    if(x===2){
      if(!labelArr.includes("biology"))
      labelArr.push("biology");
      else 
      labelArr.splice(labelArr.indexOf("biology"),1);
    }
    if(x===3){
      if(!labelArr.includes("psychology"))
      labelArr.push("psychology");
      else 
      labelArr.splice(labelArr.indexOf("psychology"),1);
    }
    if(x===4){
      if(!labelArr.includes("math"))
      labelArr.push("math");
      else 
      labelArr.splice(labelArr.indexOf("math"),1);
    }
    
    this.setState({checkBoxes : labelArr});
    console.log(this.state.checkBoxes);
    this.props.setCourses(this.searchAndFilter.searchAndFilter(this.props.courses, this.search.current.value, this.subject.current.value, this.minimumCredits.current.value, this.maximumCredits.current.value,this.state.checkBoxes));
     
  }


  handleCreditsKeyDown(e) {
    if(['0','1','2','3','4','5','6','7','8','9','Backspace','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Tab'].indexOf(e.key) === -1)
      e.preventDefault();
  }

  getSubjectOptions() {
    let subjectOptions = [];

    for(const subject of this.props.subjects) {
      subjectOptions.push(<option key={subject}>{subject}</option>);
    }

    return subjectOptions;
  }

  render() {
    return (
      <>
        <Card style={{width: 'calc(20vw - 5px)', marginLeft: '5px', height: 'calc(100vh - 10px)', position: 'fixed'}}>
          <Card.Body>
            <Card.Title>Search and Filter</Card.Title>
            <Form>
              <Form.Group controlId="formKeywords" onChange={() => this.setCourses()} style={{width: '100%'}}>
                <Form.Label>Search</Form.Label>
                <Form.Control type="text" placeholder="Search" autoComplete="off" ref={this.search}/>
              </Form.Group>

              <Form.Group controlId="formSubject">
                <Form.Label>Subject</Form.Label>
                <Form.Control as="select" ref={this.subject} onClick={() => this.setCourses()}>
                  {this.getSubjectOptions()}
                </Form.Control>
              </Form.Group>

              <div style={{display: 'flex', flexDirection: 'row'}}>
                <Form.Group controlId="minimumCredits" onChange={() => this.setCourses()} onKeyDown={(e) => this.handleCreditsKeyDown(e)}>
                  <Form.Label>Credits</Form.Label>
                  <Form.Control type="text" placeholder="minimum" autoComplete="off" ref={this.minimumCredits}/>
                </Form.Group>
                <div style={{marginLeft: '5px', marginRight: '5px', marginTop: '38px'}}>to</div>
                <Form.Group controlId="maximumCredits" style={{marginTop: '32px'}} onChange={() => this.setCourses()} onKeyDown={(e) => this.handleCreditsKeyDown(e)}>
                  <Form.Control type="text" placeholder="maximum" autoComplete="off" ref={this.maximumCredits}/>
                </Form.Group>
              </div>
            </Form> 
        <Form>
        <Form.Label>Check label</Form.Label>
  {['checkbox'].map(type => (
    <div key={`inline-${type}`} className="mb-3">
    
      <Form.Check inline label="science" type={type} id={`inline-${type}-1`} onClick= {() => this.setCourses(1)}/>
      <Form.Check inline label="biology" type={type} id={`inline-${type}-2`} onClick={() => this.setCourses(2)}/>
      <Form.Check inline label="psychology" type={type} id={`inline-${type}-3`} onClick={() => this.setCourses(3)}/>
      <Form.Check inline label="math" type={type} id={`inline-${type}-4`} onClick={() => this.setCourses(4)}/>
    </div>
   
  ))}
</Form>
          </Card.Body>
        </Card>
 
      </>
    )
  }
}

export default Sidebar;
