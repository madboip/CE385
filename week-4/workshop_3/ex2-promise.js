const STUDENTS = [
  { id: "3201", name: "somchai", major: "CE", score: 79 },
  { id: "3202", name: "somsak", major: "DE", score: 87 },
  { id: "3203", name: "sommoy", major: "GE", score: 63 },
  { id: "3204", name: "sommhai", major: "RE", score: 53 },
];

// ส่วนที่ 1 — สร้างฟังก์ชันคืนค่าเป็น Promise
function fetchStudentByIdAsync(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      
      if (typeof id !== "string" || id.trim() === "") {
        return reject(new Error("รหัสนักศึกษาไม่ถูกต้อง"));
      }
      
      const student = STUDENTS.find((s) => s.id === id);
      if (!student) {
        return reject(new Error(`ไม่พบรหัสนักศึกษา ${id}`));
      }
      
      resolve({ ...student }); 
    }, 300);
  });
}

// ส่วนที่ 2 — เรียกใช้ครบ 3 กรณี[cite: 1]
console.log("--- ทดสอบ 3 กรณี ---");

fetchStudentByIdAsync("3203") 
  .then((s) => console.log("เจอ:", s.name))
  .catch((e) => console.log("พัง:", e.message))
  .finally(() => console.log("finally ทำงานเสมอ (1)"));

fetchStudentByIdAsync("9999")
  .then((s) => console.log("เจอ:", s.name))
  .catch((e) => console.log("พัง:", e.message))
  .finally(() => console.log("finally ทำงานเสมอ (2)"));

fetchStudentByIdAsync(42) 
  .then((s) => console.log("เจอ:", s.name))
  .catch((e) => console.log("พัง:", e.message))
  .finally(() => console.log("finally ทำงานเสมอ (3)"));


setTimeout(() => {
// ส่วนที่ 3 — เขียน "โซ่" 3 ขั้น แต่ละขั้นต้อง return ส่งต่อ
console.log("\n--- ทดสอบ Chain 3 ขั้น ---");

fetchStudentByIdAsync("3201")
  .then((student) => {
    const calgrade = student.score >= 60 ? "B" : "F";
    return { name: student.name, grade: calgrade }; // ต้องมี return เพื่อส่งค่าไปขั้นต่อไป
  })
  .then((data) => {
    return `รายงาน: ${data.name} ได้เกรด ${data.grade}`; // ต้องมี return เพื่อส่งข้อความไปขั้นต่อไป[cite: 1]
  })
  .then((reportText) => {
    console.log(reportText);
  })
  .catch((error) => {
    console.log("ล้มเหลว:", error.message);
  });
}, 1000); // ดีเลย์ไว้ให้ log 3 กรณีแรกแสดงเสร็จก่อน
