let expense = document.querySelector("#exp");
let descrip = document.querySelector("#des");
let category = document.querySelector("#cat");
let addDetails = document.querySelector("#user-table");
let submit = document.querySelector(".btn");

// Apply function when we click on submit
submit.addEventListener("click", addExpenses);

// Function to add expenses in the database
function addExpenses(e) 
{
  e.preventDefault(); // prevent form from submitting

  // create elements that have to append in the table body
  let row = document.createElement("tr");
  let expensecell = document.createElement("td");
  let descripcell = document.createElement("td");
  let categorycell = document.createElement("td");
  let deleteCell = document.createElement("td");
  let editCell = document.createElement("td");
  let del = document.createElement("button");
  let edit = document.createElement("button");

  del.textContent = "Delete";
  edit.textContent = "Edit";
  del.className = "del_edit";
  edit.className = "del_edit";

  expensecell.textContent = expense.value;
  descripcell.textContent = descrip.value;
  categorycell.textContent = category.value;
  deleteCell.appendChild(del);
  editCell.appendChild(edit);

  row.appendChild(expensecell);
  row.appendChild(descripcell);
  row.appendChild(categorycell);
  row.appendChild(deleteCell);
  row.appendChild(editCell);
  addDetails.appendChild(row); //Append into the table Body


  setData(); // calling function to store data in Localstorage

  // Apply Function on Delete Button
  del.addEventListener("click", deleteDetails);

  function deleteDetails() {
    row.remove();
    setData();
  }

  // Apply Function on Edit Button
  edit.addEventListener("click", editDetails);

  function editDetails(e) {
    e.preventDefault();

    // Create input fields for editing
    let newExpenseInput = document.createElement("input");
    newExpenseInput.type = "number";
    newExpenseInput.value = expensecell.textContent;

    let newDescriptionInput = document.createElement("input");
    newDescriptionInput.type = "text";
    newDescriptionInput.value = descripcell.textContent;

    let newCategoryInput = document.createElement("select");
    newCategoryInput.innerHTML = `
      <option value="Fuel">Fuel</option>
      <option value="Movie">Movie</option>
      <option value="Electricity">Electricity</option>
      <option value="Water">Water</option>
    `;
    newCategoryInput.value = categorycell.textContent;

    // Clear the cell content
    expensecell.textContent = "";
    descripcell.textContent = "";
    categorycell.textContent = "";

    // Append input fields to the respective cells
    expensecell.appendChild(newExpenseInput);
    descripcell.appendChild(newDescriptionInput);
    categorycell.appendChild(newCategoryInput);

    // Create Save button
    let saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.className = "del_edit";

    // Replace the Edit button with the Save button
    editCell.innerHTML = "";
    editCell.appendChild(saveButton);

    // Apply function when clicking the Save button
    saveButton.addEventListener("click", saveDetails);

    function saveDetails() {
      // Update the cell content with the new values from input fields
      expensecell.textContent = newExpenseInput.value;
      descripcell.textContent = newDescriptionInput.value;
      categorycell.textContent = newCategoryInput.value;

      // Remove the input fields and save button
      newExpenseInput.remove();
      newDescriptionInput.remove();
      newCategoryInput.remove();
      saveButton.remove();

      // Restore the Edit button
      editCell.innerHTML = "";
      editCell.appendChild(edit);

      setData();
    }
  }
 
  // Clearing input Field after Submit
  expense.value = "";
  descrip.value = "";
  category.value = "-- Category --";
}
// Function to add details on Local Storage
function setData() {
  localStorage.setItem("details", addDetails.innerHTML);
}

//  To get Data from Local Storage
function getData() {
  addDetails.innerHTML = localStorage.getItem('details');
  
}
getData();

// Apply event delegation on the parent element containing the buttons
addDetails.addEventListener("click", function (event) {
  if (event.target.classList.contains("del_edit")) {
    // Find the parent row element
    const row = event.target.parentElement.parentElement;   // it bring all data in row.
    if (event.target.textContent === "Delete") {
      // Handle delete button click
      row.remove();
      setData();
    } else if (event.target.textContent === "Edit") {
      // Handle edit button click
      var newexp=prompt('Enter new expense',row.children[0].textContent);
      var newdesc=prompt('Enter new Description',row.children[1].textContent);
      var newcate=prompt('Enter new Category',row.children[2].textContent);

      if(newexp!=="" && newexp!== null)
      row.children[0].textContent=newexp;
      if(newdesc!=="" && newdesc!== null)
      row.children[1].textContent=newdesc;
      if(newcate!=="" && newcate!== null)
      row.children[2].textContent=newcate;
      setData();
    }
  }
});
