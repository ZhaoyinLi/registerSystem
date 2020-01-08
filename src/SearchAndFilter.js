class SearchAndFilter {
  searchAndFilter(courses, search, subject, minimumCredits, maximumCredits,label) {
    if(search !== '') {
      let coursesAfterSearch = [];

      for(const course of Object.values(courses)) {
        for(const keyword of course.keywords) {
          if(keyword.includes(search)) {
            coursesAfterSearch.push(course);
            break;
          }
        }
      }
      courses = coursesAfterSearch;
    }

    if(subject !== 'All') {
      let coursesAfterSubject = [];

      for(const course of Object.values(courses)) {
        if(course.subject === subject)
          coursesAfterSubject.push(course)
      }
      courses = coursesAfterSubject;
    }

    if(minimumCredits !== '') {
      let coursesAfterMinimumCredits = [];

      for(const course of Object.values(courses)) {
        if(course.credits >= parseInt(minimumCredits))
          coursesAfterMinimumCredits.push(course);
      }
      courses = coursesAfterMinimumCredits;
    }

    if(maximumCredits !== '') {
      let coursesAfterMaximumCredits = [];

      for(const course of Object.values(courses)) {
        if(course.credits <= parseInt(maximumCredits))
          coursesAfterMaximumCredits.push(course);
      }
      courses = coursesAfterMaximumCredits;
    }

    if(label !== '') {
      let coursesAfterLabel = [];
      
      for(const course of Object.values(courses)) {
        for(const keyword of course.keywords) {
          for(let i=0;i<keyword.length;i++){
          if(keyword.includes(label[i])) {
            if(!coursesAfterLabel.includes(course)){
            coursesAfterLabel.push(course);
            break;
            }
           }
          }
        }
      }
      courses = coursesAfterLabel;
    }


    return courses;
  }
}
export default SearchAndFilter;


