const TEACHER_TRAINING_ENDPOINT = "/api/register";

function setTeacherTrainingMessage(message, type) {
  const messageBox = document.getElementById("teacherTrainingMessage");
  if (!messageBox) return;
  messageBox.textContent = message;
  messageBox.className = `admission-message is-${type}`;
}

function showTeacherTrainingSuccessPanel(message) {
  const form = document.getElementById("teacherTrainingForm");
  const successPanel = document.getElementById("teacherTrainingSuccessPanel");
  const successMessage = document.getElementById("teacherTrainingSuccessMessage");
  const messageBox = document.getElementById("teacherTrainingMessage");

  if (form) {
    form.style.display = "none";
  }
  if (successPanel) {
    successPanel.hidden = false;
    successPanel.style.display = "block";
    successPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  if (successMessage) {
    successMessage.textContent = message;
  }
  if (messageBox) {
    messageBox.textContent = "";
    messageBox.className = "admission-message";
  }
}

function setTeacherTrainingLoadingOverlay(isVisible) {
  const overlay = document.getElementById("teacherTrainingLoadingOverlay");
  if (!overlay) return;

  overlay.hidden = !isVisible;
  overlay.setAttribute("aria-hidden", String(!isVisible));
  overlay.classList.toggle("is-visible", isVisible);
  document.body.classList.toggle("is-loading", isVisible);
  document.body.classList.toggle("is-admission-submitting", isVisible);
}

function setTeacherTrainingFieldError(fieldName, message) {
  const field = document.querySelector(`.field [name="${fieldName}"]`);
  if (!field) return;
  const wrapper = field.closest(".field");
  const errorBox = wrapper ? wrapper.querySelector(".field-error") : null;
  if (wrapper) {
    wrapper.classList.add("is-invalid");
  }
  if (errorBox) {
    errorBox.textContent = message;
  }
}

function clearTeacherTrainingFieldError(fieldName) {
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

function clearAllTeacherTrainingFieldErrors(form) {
  form.querySelectorAll(".field").forEach((wrapper) => {
    wrapper.classList.remove("is-invalid");
    const errorBox = wrapper.querySelector(".field-error");
    if (errorBox) {
      errorBox.textContent = "";
    }
  });
}

function revealTeacherTrainingMessage(message, type) {
  setTeacherTrainingMessage(message, type);
  const messageBox = document.getElementById("teacherTrainingMessage");
  if (messageBox) {
    messageBox.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

function collectTeacherTrainingPayload(form) {
  return {
    action: "teacherTrainingAdmission",
    fullName: form.fullName.value.trim(),
    mobile: form.mobile.value.trim(),
    email: form.email.value.trim(),
    city: form.city.value.trim(),
    profession: form.profession.value,
    education: form.education.value.trim(),
    trainingType: form.trainingType.value,
    mode: form.mode.value,
    notes: form.notes.value.trim(),
    website: form.website.value.trim(),
  };
}

function validateTeacherTrainingPayload(payload) {
  const errors = {};
  if (payload.website) {
    errors.website = "Unable to submit form right now.";
  }
  if (!payload.fullName) {
    errors.fullName = "Full Name is required.";
  }
  if (!payload.mobile) {
    errors.mobile = "Mobile is required.";
  } else if (!/^[0-9+\-()\s]{10,20}$/.test(payload.mobile)) {
    errors.mobile = "Please enter a valid mobile number.";
  }
  if (!payload.email) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!payload.trainingType) {
    errors.trainingType = "Please select a training type.";
  }
  if (!payload.mode) {
    errors.mode = "Please select a mode.";
  }
  return errors;
}

async function submitTeacherTrainingForm(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const submitButton = document.getElementById("teacherTrainingSubmit");
  const payload = collectTeacherTrainingPayload(form);
  const validationErrors = validateTeacherTrainingPayload(payload);

  clearAllTeacherTrainingFieldErrors(form);
  const invalidFields = Object.keys(validationErrors);

  if (invalidFields.length) {
    invalidFields.forEach((fieldName) => {
      setTeacherTrainingFieldError(fieldName, validationErrors[fieldName]);
    });
    const firstInvalid = form.querySelector(`[name="${invalidFields[0]}"]`);
    if (firstInvalid) {
      firstInvalid.focus();
      firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    revealTeacherTrainingMessage("Please fill the highlighted fields.", "error");
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = "Processing...";
  setTeacherTrainingLoadingOverlay(true);
  setTeacherTrainingMessage("Processing your registration...", "loading");

  try {
    const response = await fetch(TEACHER_TRAINING_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    if (!response.ok || !result.success) {
      throw new Error(result.message || "Unable to save registration.");
    }

    form.reset();
    showTeacherTrainingSuccessPanel("Registration completed successfully.");
  } catch (error) {
    revealTeacherTrainingMessage(
      error.message || "Something went wrong. Please try again or contact us on WhatsApp.",
      "error"
    );
  } finally {
    setTeacherTrainingLoadingOverlay(false);
    submitButton.disabled = false;
    submitButton.textContent = "Submit Registration";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("teacherTrainingForm");
  if (!form) return;

  form.querySelectorAll("input, select, textarea").forEach((field) => {
    field.addEventListener("input", () => clearTeacherTrainingFieldError(field.name));
    field.addEventListener("change", () => clearTeacherTrainingFieldError(field.name));
  });

  form.addEventListener("submit", submitTeacherTrainingForm);
});
