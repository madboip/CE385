const MIN_SCORE = 0;
const MAX_SCORE = 100;

function isValidScore(score) {
    return typeof score === "number" &&
        score >= MIN_SCORE &&
        score <= MAX_SCORE;
}

function toGrade(score) {
    if (!isValidScore(score)) return "Invalid";

    if (score >= 80) return "A";
    if (score >= 75) return "B+";
    if (score >= 70) return "B";
    if (score >= 65) return "C+";
    if (score >= 60) return "C";
    if (score >= 55) return "D+";
    if (score >= 50) return "D";
    return "F";
}

const calculateWorkshopScore = (raw, full = 60, weight = 20) => {
    return (raw / full) * weight;
};

function calculateTotal(workshop, attendance, project, midterm, final) {
    return workshop + attendance + project + midterm + final;
}

console.log("isValidScore(89) =", isValidScore(89));
console.log("isValidScore(120) =", isValidScore(120));

console.log("toGrade(89) =", toGrade(89));
console.log("toGrade(67) =", toGrade(67));
console.log("toGrade(55) =", toGrade(55));

console.log(
    "calculateWorkshopScore(48) =",
    calculateWorkshopScore(48)
);

console.log(
    "calculateWorkshopScore(48, 60, 20) =",
    calculateWorkshopScore(48, 60, 20)
);

console.log(
    "calculateWorkshopScore(48, undefined, 25) =",
    calculateWorkshopScore(48, undefined, 25)
);

console.log(
    "calculateTotal(18, 10, 20, 25, 20) =",
    calculateTotal(18, 10, 20, 25, 20)
);