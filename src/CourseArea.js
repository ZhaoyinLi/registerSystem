import React from 'react';
import './App.css';
import Course from './Course';

class CourseArea extends React.Component {
  getCourses() {

    let courses = [];
    for (const course of Object.entries(this.props.data)) {
      if (this.props.addCourse) {
        courses.push(
          <Course key={course[0]} addCourse={course => { this.props.addCourse(course) }} data={course[1]} />
        )
      } 
      else if (this.props.removeCourse){
        courses.push(
          <Course key={course[0]} removeCourse={(course) => { this.props.removeCourse(course) }} data={course[1]} />
        )
      }
    
    else {
      courses.push(
        <Course key={course[0]} sortCourse={(course) => { this.props.sortCourse(course) }} data={course[1]} />
      )
     }
    }
    return courses;
  }

  render() {
    return (
      <div style={{ margin: '5px' }}>
        {this.getCourses()}
      </div>
    )
  }
}

export default CourseArea;