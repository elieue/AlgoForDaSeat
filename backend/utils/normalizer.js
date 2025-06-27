function toCamelCase(str) {
  return str.replace(/_([a-z])/g, (_, g) => g.toUpperCase());
}

function normalizeObjects(raw) {
  return {
    application_id: raw.application_id,
    full_name: raw.full_name,
    email: raw.email,
    gpa: parseFloat(raw.gpa),
    entrance_exam_score: parseFloat(raw.entrance_exam_score),
    address: raw.address,
    proximity: parseFloat(raw.proximity),
    parents_income: parseFloat(raw.parents_income),
    itr_or_indigent: raw.itr_or_indigent,
    gender: raw.gender,
    ethnicity: raw.ethnicity,
    age: parseInt(raw.age),
    school_attended: raw.school_attended,
    parent_mother: raw.parent_mother,
    parent_father: raw.parent_father,
    economic_status: raw.economic_status,
    submission_date: raw.submission_date
  };
}


module.exports = { normalizeObjects };