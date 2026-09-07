const STUDENTS = [
    {id:"3201", name:"somchai", major:"CE", score:79},
    {id:"3202", name:"somsak", major:"DE", score:87},
    {id:"3203", name:"sommoy", major:"GE", score:63},
    {id:"3204", name:"sommhai", major:"RE", score:53},      
];

function fetchStudentByIdAsync(id) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const student = STUDENTS.find((s) => s.id === id);
                if (student) resolve({...student});
                if (typeof id !== "string" || id.trim() === "") {
                reject(new Error("รหัสนักศึกษาไม่ถูกต้อง"));
            }
                else reject(new Error(`ไม่พบรหัสนักศึกษา ${id}`));
            }, 300);
        });
}

fetchStudentByIdAsync("3203")
  .then((student) => {
    const calgrade = student.score >= 60 ? "B" : "F";
    return {name: student.name, grade: calgrade};
  })
  .then((score) => {
    console.log("ขั้น 2: ได้คะแนน   =", score,);
    return `รายงานนักศึกษา ${data.name} ได้เกรด ${grade}`;
  })
  .then((grade) => {
    console.log("ขั้น 3: ได้เกรด     =", grade);
  })
  .catch((error) => {
    console.log("ล้มเหลว:", error.message); 
  })
  .finally(() => {
    console.log("finally : ทำงานเสมอ");
  });


