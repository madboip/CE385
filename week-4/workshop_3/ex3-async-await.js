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

// ส่วนที่ 1 — แบบลำดับ (รอทีละตัว)[cite: 1]
async function reportSequential() {
  console.log("--- 1. แบบตามลำดับ (Sequential) ---");
  const t0 = Date.now();
  const ids = ["3201", "3202", "3203"];
  
  for (const id of ids) {
    const student = await fetchStudentByIdAsync(id);
    console.log(`โหลดข้อมูลเสร็จ: ${student.name}`);
  }

}

// ส่วนที่ 2 — แบบขนาน (ดึงพร้อมกัน)[cite: 1]
async function reportParallel() {
  console.log("\n--- 2. แบบขนาน (Parallel) ---");
  const t0 = Date.now();
  const ids = ["3201", "3202", "3203"];
  
  const results = await Promise.all(ids.map(id => fetchStudentByIdAsync(id)));
  results.forEach(student => console.log(`โหลดข้อมูลเสร็จ: ${student.name}`));
}

// ส่วนที่ 3 — ป้องกัน Error ครบสูตร[cite: 1]
async function safeReport(id) {
  try {
    const student = await fetchStudentByIdAsync(id);
    const grade = student.score >= 60 ? "B" : "F";
    console.log(`พบข้อมูล: ${student.name} (เกรด ${grade})`);
  } catch (error) {
    console.log(`ตรวจไม่พบ: ${error.message}`);
  } finally {
    console.log(`-- จบการตรวจสอบ ${id} --\n`);
  }
}

// นำทั้งหมดมารันใน main() โดยใช้ await บังคับรอให้จบเป็นส่วนๆ[cite: 1]
async function main() {
  await reportSequential();
  await reportParallel();
  await safeReport("3201"); // หาเจอ
  await safeReport("9999"); // หาไม่เจอ แต่ห้าม crash
}

main();


//1. ทำไม try-catch ครอบ await จับ reject ได้แต่ครอบ callback ธรรมดาไม่ได้? = เพราะ await หยุดการทำงานของ function บรรทัดนั้นจนกว่า promise ทำงานจบทำให้ขึ้น error
//   ที่เกิดขึ้นส่งต่อเข้าไปใน catch บล็อกเดิมได้แต่ callback โค้ดจะไหลผ่าน try-catch ไปจนจบก่อนที่ error จะเกิด

//2. ทดลอง "ลืม await" หน้า Promise.all = ค่าที่ได้จะเป็นก้อนออบเจ็กต์ Promise แบบ pending ค้างไว้ ไม่ใช่อาร์เรย์ผลลัพธ์
//   ทำให้ถ้าเอาไป .forEach() หรืออ่านค่าโปรแกรมจะ Error (Crash) ทันที 
