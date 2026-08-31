const MIN_SCORE = 0;
const MAX_SCORE = 100;

function isValidScore(score) {
    return typeof score === "number" && score >= MIN_SCORE && score <= MAX_SCORE;
}

const GRADE_RULES = [
    { min: 80, grade: "A" },
    { min: 75, grade: "B+" },
    { min: 70, grade: "B" },
    { min: 65, grade: "C+" },
    { min: 60, grade: "C" },
    { min: 55, grade: "D+" },
    { min: 50, grade: "D" },
    { min: 0, grade: "F" }
];

function toGrade(score) {
    if (!isValidScore(score)) return "Invalid";

    const rule = GRADE_RULES.find((r) => score >= r.min);
    return rule.grade;
}

const calculateWorkshopScore = (raw, full = 60, weight = 20) => {
    return (raw / full) * weight;
};

function calculateTotal(workshop, attendance, project, midterm, final) {
    return workshop + attendance + project + midterm + final;
}


//============================================================================================

console.log("isValidScore(89) =", isValidScore(89));
console.log("isValidScore(120) =", isValidScore(120));

console.log("toGrade(89) =", toGrade(89));
console.log("toGrade(67) =", toGrade(67));
console.log("toGrade(55) =", toGrade(55));

console.log("calculateWorkshopScore(48) =", calculateWorkshopScore(48));
console.log(
    "calculateWorkshopScore(48, 60, 20) =",
    calculateWorkshopScore(48, 60, 20)
);

console.log(
    "calculateWorkshopScore(48, undefined, 25) =",
    calculateWorkshopScore(48, undefined, 25)
);
// undefined ทำให้ full ใช้ค่าเริ่มต้น 60

console.log(
    "calculateTotal(18, 10, 20, 25, 20) =",
    calculateTotal(18, 10, 20, 25, 20)
);