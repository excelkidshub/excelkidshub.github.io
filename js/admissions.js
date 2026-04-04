const ADMISSIONS_ENDPOINT =
  "/api/register";

function setAdmissionMessage(message, type) {
  const messageBox = document.getElementById("admissionMessage");
  if (!messageBox) return;
  messageBox.textContent = message;
  messageBox.className = `admission-message is-${type}`;
}

function setFieldError(fieldName, message) {
  const field = document.querySelector(`.field [name="${fieldName}"]`);
  if (!field) return;
  const wrapper = field.closest(".field");
  const errorBox = wrapper ? wrapper.querySelector(".field-error") : null;
  if (wrapper) {
    wrapper.classList.add("is-invalid");
  }
  if (errorBox) {
    errorBox.textContent = "";
  }
}

function clearFieldError(fieldName) {
  const field = document.querySelector(`.field [name="${fieldName}"]`);
  if (!field) return;
  const wrapper = field.closest(".field");
  const errorBox = wrapper ? wrapper.querySelector(".field-error") : null;
  if (wrapper) {
    wrapper.classList.remove("is-invalid");
  }
  if (errorBox) {
    errorBox.textContent = "";
  }
}

function clearAllFieldErrors(form) {
  form.querySelectorAll(".field").forEach((wrapper) => {
    wrapper.classList.remove("is-invalid");
    const errorBox = wrapper.querySelector(".field-error");
    if (errorBox) {
      errorBox.textContent = "";
    }
  });
}

function collectAdmissionPayload(form) {
  return {
    parentName: form.parentName.value.trim(),
    mobile: form.mobile.value.trim(),
    email: form.email.value.trim(),
    address: form.address.value.trim(),
    city: form.city.value.trim(),
    studentName: form.studentName.value.trim(),
    age: form.age.value.trim(),
    gender: form.gender.value,
    school: form.school.value.trim(),
    grade: form.grade.value.trim(),
    level: form.level.value,
    mode: form.mode.value,
    admissionSource: form.admissionSource.value || "Website",
    notes: form.notes.value.trim(),
    website: form.website.value.trim(),
  };
}

function validateAdmissionPayload(payload) {
  const errors = {};
  if (payload.website) {
    errors.website = "Unable to submit form right now.";
  }
  if (!payload.parentName) {
    errors.parentName = "Parent Name is required.";
  }
  if (!payload.mobile) {
    errors.mobile = "Mobile is required.";
  } else if (!/^[0-9+\-()\s]{10,20}$/.test(payload.mobile)) {
    errors.mobile = "Please enter a valid mobile number.";
  }
  if (payload.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!payload.studentName) {
    errors.studentName = "Student Name is required.";
  }
  if (!payload.level) {
    errors.level = "Please select a level.";
  }
  if (!payload.mode) {
    errors.mode = "Please select a mode.";
  }
  if (payload.age && (Number(payload.age) <= 0 || Number(payload.age) > 18)) {
    errors.age = "Please enter a valid age.";
  }
  return errors;
}

async function submitAdmissionForm(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const submitButton = document.getElementById("admissionSubmit");
  const payload = collectAdmissionPayload(form);
  const validationErrors = validateAdmissionPayload(payload);

  clearAllFieldErrors(form);
  const invalidFields = Object.keys(validationErrors);

  if (invalidFields.length) {
    invalidFields.forEach((fieldName) => {
      setFieldError(fieldName, validationErrors[fieldName]);
    });
    const firstInvalid = form.querySelector(`[name="${invalidFields[0]}"]`);
    if (firstInvalid) {
      firstInvalid.focus();
      firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    setAdmissionMessage("Please fill the highlighted fields.", "error");
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = "Submitting...";
  setAdmissionMessage("Submitting your admission...", "loading");

  try {
    const response = await fetch(ADMISSIONS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    if (!response.ok || !result.success) {
      throw new Error(result.message || "Unable to save admission.");
    }

    form.reset();
    setAdmissionMessage("Registration completed successfully.", "success");
  } catch (error) {
    setAdmissionMessage(
      error.message || "Something went wrong. Please try again or contact us on WhatsApp.",
      "error"
    );
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Submit Admission";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("admissionForm");
  if (!form) return;

  form.querySelectorAll("input, select, textarea").forEach((field) => {
    field.addEventListener("input", () => clearFieldError(field.name));
    field.addEventListener("change", () => clearFieldError(field.name));
  });

  form.addEventListener("submit", submitAdmissionForm);
});
