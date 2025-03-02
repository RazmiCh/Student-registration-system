document.addEventListener("DOMContentLoaded", function() {
    const studentForm = document.getElementById("studentForm");
    const studentTableBody = document.getElementById("studentTableBody");

    let students = JSON.parse(localStorage.getItem("students")) || [];

    function displayStudents() {
        studentTableBody.innerHTML = "";
        students.forEach((student, index) => {
            let row = `<tr>
                <td>${student.name}</td>
                <td>${student.studentId}</td>
                <td>${student.email}</td>
                <td>${student.contact}</td>
                <td>
                    <button class="edit-btn" onclick="editStudent(${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteStudent(${index})">Delete</button>
                </td>
            </tr>`;
            studentTableBody.innerHTML += row;
        });
    }

    function validateInputs(name, studentId, email, contact) {
        const nameRegex = /^[A-Za-z ]+$/;
        const studentIdRegex = /^[0-9]+$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const contactRegex = /^[0-9]{10}$/;

        if (!nameRegex.test(name)) {
            alert("Invalid name! Only letters are allowed.");
            return false;
        }
        if (!studentIdRegex.test(studentId)) {
            alert("Invalid Student ID! Only numbers are allowed.");
            return false;
        }
        if (!emailRegex.test(email)) {
            alert("Invalid email format!");
            return false;
        }
        if (!contactRegex.test(contact)) {
            alert("Invalid contact number! Enter a 10-digit number.");
            return false;
        }
        return true;
    }

    studentForm.addEventListener("submit", function(e) {
        e.preventDefault();
        let name = document.getElementById("name").value.trim();
        let studentId = document.getElementById("studentId").value.trim();
        let email = document.getElementById("email").value.trim();
        let contact = document.getElementById("contact").value.trim();

        if (!validateInputs(name, studentId, email, contact)) return;

        // Check if we're editing an existing student or adding a new one
        let index = studentForm.getAttribute("data-edit-index");
        if (index !== null) {
            students[index] = { name, studentId, email, contact };  // Update student
            studentForm.removeAttribute("data-edit-index");  // Clear edit flag
        } else {
            students.push({ name, studentId, email, contact });  // Add new student
        }

        localStorage.setItem("students", JSON.stringify(students));
        displayStudents();
        studentForm.reset();
    });

    window.deleteStudent = function(index) {
        if (confirm("Are you sure you want to delete this record?")) {
            students.splice(index, 1);
            localStorage.setItem("students", JSON.stringify(students));
            displayStudents();
        }
    };

    window.editStudent = function(index) {
        let student = students[index];
        document.getElementById("name").value = student.name;
        document.getElementById("studentId").value = student.studentId;
        document.getElementById("email").value = student.email;
        document.getElementById("contact").value = student.contact;

        studentForm.setAttribute("data-edit-index", index);  
    };
     // Initially display students when the page loads
    displayStudents();
});
