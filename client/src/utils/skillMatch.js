export function extractSkills(skills) {
    if (!skills) return [];
    if (typeof skills === "string") {
        return skills
            .split(/[,;\n]+/)
            .map((skill) => skill.trim())
            .filter(Boolean);
    }
    if (Array.isArray(skills)) {
        return skills.map((skill) => String(skill).trim()).filter(Boolean);
    }
    return [];
}

export function computeMatch(userSkills, internshipText) {
    const userSkillList = extractSkills(userSkills).map((skill) => skill.toLowerCase());
    const internshipTextValue = String(internshipText || "").toLowerCase();
    const requiredSkills = internshipTextValue
        .split(/[,;\n]+|\s+/)
        .map((token) => token.replace(/[^a-zA-Z0-9]/g, "").trim())
        .filter(Boolean);

    const matched = requiredSkills.filter((skill, index) => {
        return userSkillList.some((userSkill) => userSkill === skill || userSkill.includes(skill) || skill.includes(userSkill));
    });

    const matchScore = requiredSkills.length === 0 ? 0 : Math.round((matched.length / requiredSkills.length) * 100);
    const missing = Array.from(new Set(requiredSkills.filter((skill) => !matched.includes(skill)))).slice(0, 10);

    return {
        matchScore,
        matched,
        missing,
    };
}

export function computeReadinessScore(student, applicationsCount) {
    const baseScore = 20;
    let score = baseScore;

    if (student?.cv) score += 20;
    if (student?.skills) score += Math.min(extractSkills(student.skills).length * 5, 30);
    if (student?.cgpa) score += Math.min(Number(student.cgpa) * 10, 20);
    if (applicationsCount >= 3) score += 10;

    score = Math.min(100, score);

    let label = "Getting Started";
    if (score >= 80) label = "Career Ready";
    else if (score >= 60) label = "On Track";
    else if (score >= 40) label = "Making Progress";

    return { score, label };
}
