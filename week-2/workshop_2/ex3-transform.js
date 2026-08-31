function toGrade(score) {
    if (score >= 80) return "A";
    if (score >= 75) return "B+";
    if (score >= 70) return "B";
    if (score >= 65) return "C+";
    if (score >= 60) return "C";
    if (score >= 55) return "D+";
    if (score >= 50) return "D";
    return "F";
}

const students = [
    { id: "6501", name: "สมชาย", major: "CE", score: 78 },
    { id: "6502", name: "สมหญิง", major: "CE", score: 91 },
    { id: "6503", name: "มานี", major: "IT", score: 45 },
    { id: "6504", name: "มีนา", major: "IT", score: 66 },
    { id: "6505", name: "ปิติ", major: "CE", score: 58 },
    { id: "6506", name: "ชูใจ", major: "IT", score: 84 }
];

function getNames(students) {
    return students.map((s) => s.name);
}

function getPassedStudents(students) {
    return students.filter((s) => s.score >= 50);
}

function getTotalScore(students) {
    return students.reduce((total, s) => total + s.score, 0);
}

function getAverageScore(students) {
    if (students.length === 0) return 0;

    const total = students.reduce((total, s) => total + s.score, 0);

    return (total / students.length).toFixed(2);
}

function countByGrade(students) {
    return students.reduce((counter, s) => {
        const grade = toGrade(s.score);
        counter[grade] = (counter[grade] ?? 0) + 1;
        return counter;
    }, {});
}

function getTopStudent(students) {
    if (students.length === 0) return undefined;

    return students.reduce((best, s) => {
        return s.score > best.score ? s : best;
    });
}

console.log("ชื่อทั้งหมด =", getNames(students));

console.log("คนที่สอบผ่าน =", getPassedStudents(students));

console.log("คะแนนรวม =", getTotalScore(students));

console.log("คะแนนเฉลี่ย =", getAverageScore(students));

console.log("จำนวนตามเกรด =", countByGrade(students));

console.log("คะแนนสูงสุด =", getTopStudent(students));

const cePassedAverage = students
    .filter((s) => s.major === "CE" && s.score >= 50)
    .map((s) => s.score)
    .reduce((total, score, index, scores) => {
        return total + score / scores.length;
    }, 0);

console.log("คะแนนเฉลี่ย CE ที่สอบผ่าน =", cePassedAverage);

console.log("\nทดสอบ array ว่าง");

console.log("getNames([]) =", getNames([]));
console.log("getPassedStudents([]) =", getPassedStudents([]));
console.log("getTotalScore([]) =", getTotalScore([]));
console.log("getAverageScore([]) =", getAverageScore([]));
console.log("countByGrade([]) =", countByGrade([]));
console.log("getTopStudent([]) =", getTopStudent([]));