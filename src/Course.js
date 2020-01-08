import React from 'react';
import './App.css';
import { Card, Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';

function btn(listener, text){
  return ( <Button variant="outline-success" onClick={listener}> {text} </Button>)
}

class Course extends React.Component {
  addCourse() {
    let course = this.props.data;
    this.props.addCourse(course);
  }
  removeCourse() {
    let course = this.props.data;
    this.props.removeCourse(course);
  } 
  
  sortCourse() {
    let courses = this.props.data;
    this.props.sortCourse(courses);
    // let courseSort=[];
    // courseSort.push(courses);
  }


   render() {
    
    var button;
    if(this.props.removeCourse){
      button=btn(()=>this.props.removeCourse(this.props.data),"remove");
    }
    else if(this.props.addCourse){
      button=btn(()=>this.props.addCourse(this.props.data),"add to cart");
    }
    else{
      button=(
        <Form>
  {['radio'].map(type => (
    <div key={`inline-${type}`} className="mb-2">
      <Form.Check inline label="Like" type={type} id={`inline-${type}-1` } onClick= {() => this.sortCourse(this.props.data)}  />
      {/* <Form.Check inline label="Dislike" type={type} id={`inline-${type}-2`} />
       */}
    </div>
  ))}
</Form>)
    }
    
    const name = this.props.data.name;
    const number = this.props.data.number;
    const credits = this.props.data.credits;
    const description = this.props.data.description;
    const subject = this.props.data.subject;
    //console.log(sectionList);

    const numberDivStyle = {
      color: 'red',
      fontSize: '35px',
    };
    const nameDivStyle = {
      color: 'black',
      fontSize: '20px',
    };
    const creditsDivStyle = {
      color: 'black',
      fontSize: '15px',
    };

    const subjectDivStyle = {
      color: 'black',
      fontSize: '15px',
    };
    //console.log(this.props.data);
    return (
      <Card>
        <Card.Header style={numberDivStyle}>
          {number}
        </Card.Header>
        <Card.Body>
          <Card.Title style={nameDivStyle}>
            {name}
          </Card.Title>
          <Card.Text style={creditsDivStyle}>
            Credits:{credits}
          </Card.Text>
          <Card.Text style={subjectDivStyle}>
            Subject:{subject}
          </Card.Text>
          <Card.Text>
            {description}
          </Card.Text>
          {button}
        </Card.Body>
        <Card.Text>
        </Card.Text>
      </Card>
    )
  }
}

export default Course;