const STUDENTS = [
    {id:"3201", name:"somchai", score:79},
    {id:"3202", name:"somsak", score:79},
];

function fetchStudentById(id, callback){
    setTimeout(() => {
       const student = STUDENTS.find((s) => s.id === id);
       callback(student);
    }, 400);
}

function fetchStudentById(id) {
    return new Promise((reslove) => {
        setTimeout(() => reslove(STUDENTS.find((s) => s.id === id)), 400);
    });
}

fetchStudentById("3202")
    .then((student) => {
        console.log("ชั้น 1: ได้นักศึกษา =", student.name);
        return student.score;
    })
    .then((score) => {
        console.log("ชั้น 2: ได้คะแนน  =", score);
        
        return score >= 60 ? "B" : "F" ;
    })
    .then((grade) => {
        console.log("ชั้น 3: ได้เกรด   =", grade);
    })

