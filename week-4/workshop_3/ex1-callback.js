const STUDENTS = [
    {id:"3201", name:"somchai", major:"CE", score:79},
    {id:"3202", name:"somsak", major:"DE", score:87},
    {id:"3203", name:"sommoy", major:"GE", score:63},
    {id:"3204", name:"sommhai", major:"RE", score:53},      
];

function fetchStudentById(id, callback) {
    setTimeout(() => {
        if (typeof id !== "string" || id.trim() === "") {
            return callback(new Error("รหัสนักศึกษาไม่ถูกต้อง"));
        }
        const student = STUDENTS.find((s) => s.id === id);
        if (!student){
            return callback(new Error(`ไม่พบรหัสนักศึกษา ${id}`));
        }
        callback(null, {...student});
    }, 300);
}
fetchStudentById("3203", (error, student) => {
    if (error) return console.log("ล้มเหลว:", error.message);
    console.log("สำเร็จ :", student.name, "||", student.major);
});

//1. ถ้าลืมตรวจ error แล้วอ่าน .name เลย = มันจะเขียนคำว่า error แทนชื่อโดยที่มีสนใจ if ที่เราทำไว้ข้างบน

//2. ทำไมต้อง return หลังเรียก callback(error) = ถ้าไม่เขียนรีเทิร์นมันก็จะไม่มีค่าส่งคืนมาในส่วยที่เราเขียนไอดีผิด
//   มาให้เราได้เห็น และ ทำให้โปรแกรม error ไปด้วยเลย
