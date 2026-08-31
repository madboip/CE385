const students = [
    {
        id: "6501",
        name: "สมชาย",
        major: "CE",
        score: 78,
        contact: {
            email: "somchai@gmail.com",
            phone: "081-111-1111"
        }
    },
    {
        id: "6502",
        name: "สมหญิง",
        major: "CE",
        score: 91,
        contact: {
            email: "somying@gmail.com",
            phone: "081-222-2222"
        }
    },
    {
        id: "6503",
        name: "มานี",
        major: "IT",
        score: 45,
        contact: {
            email: "manee@gmail.com",
            phone: "081-333-3333"
        }
    },
    {
        id: "6504",
        name: "มีนา",
        major: "IT",
        score: 66,
        contact: {
            email: "meena@gmail.com",
            phone: "081-444-4444"
        }
    },
    {
        id: "6505",
        name: "ปิติ",
        major: "CE",
        score: 58,
        contact: {
            email: "piti@gmail.com",
            phone: "081-555-5555"
        }
    },
    {
        id: "6506",
        name: "ชูใจ",
        major: "IT",
        score: 84,
        contact: {
            email: "choojai@gmail.com",
            phone: "081-666-6666"
        }
    }
];

function findById(students, id) {
    return students.find((s) => s.id === id);
}

function findByMajor(students, major) {
    return students.filter((s) => s.major === major);
}

function hasFailingStudent(students) {
    return students.some((s) => s.score < 50);
}

function getEmail(students, id) {
    const student = students.find((s) => s.id === id);
    return student?.contact?.email ?? "ไม่พบข้อมูลติดต่อ";
}


console.log("findById 6501 =", findById(students, "6501"));

console.log("findById 9999 =", findById(students, "9999"));

console.log("findByMajor CE =", findByMajor(students, "CE"));

console.log("hasFailingStudent =", hasFailingStudent(students));

console.log("getEmail 6501 =", getEmail(students, "6501"));

console.log("getEmail 9999 =", getEmail(students, "9999"));

const newStudents = [
    ...students,
    {
        id: "6507",
        name: "กานต์",
        major: "CE",
        score: 72
    }
];

console.log("getEmail 6507 =", getEmail(newStudents, "6507"));