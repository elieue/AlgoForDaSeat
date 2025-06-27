function toCamelCase(str) {
  return str.replace(/_([a-z])/g, (_, g) => g.toUpperCase());
}

function normalizeObjects(raw) {
  return {
    id: raw.application_id,
    lrn: raw.lrn || raw.application_id,
    applicationId: raw.application_id,
    fullName: raw.full_name,
    email: raw.email,
    grades: parseFloat(raw.gpa) || 0,
    examScore: parseFloat(raw.entrance_exam_score) || 0,
    address: raw.address,
    proximity: parseFloat(raw.proximity) || 0,
    monthlyIncome: parseFloat(raw.parents_income) || 0,
    economicStatus: raw.economic_status,
    gender: raw.gender,
    ethnicity: raw.ethnicity,
    age: parseInt(raw.age) || 0,
    schoolAttended: raw.school_attended,
    motherName: raw.parent_mother,
    fatherName: raw.parent_father,
    submissionTimestamp: raw.submission_date,
    status: raw.final_status || 'pending', // Default to pending if no status
    supportingDocuments: ['Birth Certificate', 'Report Card'], // Default documents
    // Additional fields that might be needed
    itrOrIndigent: raw.itr_or_indigent,
    // Keep original fields for backward compatibility
    application_id: raw.application_id,
    full_name: raw.full_name,
    gpa: parseFloat(raw.gpa),
    entrance_exam_score: parseFloat(raw.entrance_exam_score),
    parents_income: parseFloat(raw.parents_income),
    parent_mother: raw.parent_mother,
    parent_father: raw.parent_father,
    economic_status: raw.economic_status,
    school_attended: raw.school_attended,
    submission_date: raw.submission_date,
    final_status: raw.final_status || 'pending'
  };
}

module.exports = { normalizeObjects };