const params = new URLSearchParams(window.location.search);

function setText(id, paramName) {
  const element = document.getElementById(id);
  element.textContent = params.get(paramName) || "Not provided";
}

setText("firstName", "firstName");
setText("lastName", "lastName");
setText("email", "email");
setText("mobile", "mobile");
setText("organization", "organization");
setText("timestamp", "timestamp");