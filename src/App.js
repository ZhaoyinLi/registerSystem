import React from 'react';
import './App.css';
import Sidebar from './Sidebar';
import CourseArea from './CourseArea';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import SearchAndFilter from './SearchAndFilter';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allCourses: {},
      filteredCourses: [],
      subjects: [],
      cart: [],
      finish:[],
      sort:[],
    };
    this.searchAndFilter = new SearchAndFilter();
    this.addCourse = this.addCourse.bind(this);
  }

  async componentDidMount() {
    
     await fetch('https://mysqlcs639.cs.wisc.edu:5000/classes').then(
      res => res.json()

    ).then(data => this.setState({ allCourses: data, filteredCourses: data, subjects: this.getSubjects(data) }));
     
    fetch('https://mysqlcs639.cs.wisc.edu/students/5022025924/classes/completed').then(
      res => res.json()
    ).then(data => {
      let key=data['data'];
      let all =this.state.allCourses;
      let taken=this.state.finish;
      for(let i=0;i<key.length;i++){
        taken.push(all[key[i]])
    }
   this.setState({finish:taken})
      
   });
}


  getSubjects(data) {
    let subjects = [];
    subjects.push("All");

    for (const course of Object.values(data)) {
      if (subjects.indexOf(course.subject) === -1)
        subjects.push(course.subject);
    }

    return subjects;
  }

  setCourses(courses) {
    this.setState({ filteredCourses: courses })
  }

  addCourse(course) {
    // get thie cart list from state
    let addedCourses = this.state.cart;
    addedCourses.push(course);
    // update the state
    this.setState({ cart: addedCourses })
    // may miss a step
  }

  removeCourse(course) {
    let removeCourses = this.state.cart;
    for(let i=0;i<removeCourses.length;i++){
      if(removeCourses[i].name===course.name){
        removeCourses.splice(i,1);
      }
    }
    this.setState({cart:removeCourses});
  }

  sortCourse(course) {
    let sortCourses = Object.keys(this.state.filteredCourses);
    sortCourses.forEach(k => {
      let words = this.state.filteredCourses[k].keywords.splice(k,1);
    for(let i = 0; i < words.length; i++) {
      if(course.keywords.includes(words[i])) {
        this.state.sort.push(this.state.filteredCourses[k]);
       // break;
      }
    }
  })
    this.setState({filteredCourses:this.state.sort});
   // this.props.sortCourses(this.searchAndFilter.searchAndFilter(this.props.courses));
  }

  render() {
    return (
      <>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />
        <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
          <Tab eventKey="home" title="Home">
            <Sidebar setCourses={(courses) => this.setCourses(courses)} courses={this.state.allCourses} subjects={this.state.subjects} />
            <div style={{ marginLeft: '20vw' }}>
              <CourseArea data={this.state.filteredCourses} addCourse={course => this.addCourse(course)} />

            </div>
          </Tab>
          <Tab eventKey="shoppingCart" title="Shopping Cart">
            <CourseArea data={this.state.cart} removeCourse={course => this.removeCourse(course)}></CourseArea>
          </Tab>
          <Tab eventKey="finish" title="Finish Courses">
            <CourseArea data={this.state.finish} sortCourse={course => this.sortCourse(course)}></CourseArea>
          </Tab>
        </Tabs>
      </>
    )
  }
}

export default App;
