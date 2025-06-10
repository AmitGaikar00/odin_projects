function createDropdown(options) {
  const {
    containerId, // ID of the container element
    buttonText, // Text for the dropdown button
    items, // Array of dropdown items (text and value)
  } = options;

  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Dropdown container with ID '${containerId}' not found.`);
    return;
  }

  // Create the button
  const button = document.createElement("button");
  button.textContent = buttonText;
  container.appendChild(button);

  // Create the dropdown content
  const dropdownList = document.createElement("ul");
  dropdownList.style.display = "none"; // Initially hidden
  container.appendChild(dropdownList);

  // Populate the dropdown list
  items.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = item.text;
    listItem.dataset.value = item.value;
    dropdownList.appendChild(listItem);
  });

  // Toggle dropdown visibility
  button.addEventListener("click", () => {
    dropdownList.style.display =
      dropdownList.style.display === "none" ? "block" : "none";
  });
}

module.exports = createDropdown;
