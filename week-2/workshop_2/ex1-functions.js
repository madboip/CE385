
function isValidScore(score = 0, isActive = true){
    return {score, isActive};
}

console.log("", isValidScore(89));
console.log("",isValidScore(67));
console.log("",isValidScore(55));


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

const scores = [89, 67, 55];


