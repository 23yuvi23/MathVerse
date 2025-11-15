// JavaScript for Mobile Menu Toggle 
document.getElementById("menu-toggle").addEventListener("click", function () {
    let menu = document.getElementById("mobile-menu");

    if (menu.classList.contains("hidden")) {
        menu.classList.remove("hidden");

        setTimeout(() => {
            menu.classList.remove("scale-y-0","overflow-hidden");
        }, 10);
     
    } else {
        menu.classList.add("scale-y-0","overflow-hidden");
        setTimeout(() => menu.classList.add("hidden"), 300);
    }
});




function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

function toggleMenu() {
    document.getElementById('mobile-menu').classList.toggle('hidden');
}

// Scroll to Teacher Directory when "Book a Session" is clicked
document.querySelectorAll(".book-session-btn").forEach(button => {
    button.addEventListener("click", function () {
        scrollToSection("teacherDirectory");
    });
});

// Scroll to Contact Us when "Contact" in navbar is clicked
document.querySelectorAll("nav button").forEach(button => {
    if (button.textContent.trim() === "Contact") {
        button.addEventListener("click", function () {
            scrollToSection("contactUs");
        });
    }
});

// Teacher Data
const teachers = [
    { name: "John Doe", board: "CBSE", class: "10", subject: "Maths", experience: "5 Years", image: "/public/assets/teacher1.jpeg" },
    { name: "Jane Smith", board: "IB", class: "12", subject: "Accounts", experience: "8 Years", image: "/public/assets/teacher2.jpg" },
    { name: "Alice Brown", board: "NIOS", class: "9", subject: "CS/IT", experience: "6 Years", image: "/public/assets/teacher3.jpg" },
    { name: "Michael Lee", board: "IGCSE", class: "11", subject: "Maths", experience: "7 Years", image: "/public/assets/teacher4.jpg" },
    { name: "Sara Wilson", board: "CBSE", class: "10", subject: "Accounts", experience: "5 Years", image: "/public/assets/teacher5.jpg" },
    { name: "Robert Johnson", board: "IB", class: "12", subject: "CS/IT", experience: "10 Years", image: "/public/assets/teacher6.jpg" },
    { name: "Emily Davis", board: "NIOS", class: "9", subject: "Maths", experience: "4 Years", image: "/public/assets/teacher7.jpg" },
    { name: "Chris Miller", board: "IGCSE", class: "11", subject: "Accounts", experience: "6 Years", image: "/public/assets/teacher8.jpg" },
    { name: "Sophia Martinez", board: "CBSE", class: "12", subject: "CS/IT", experience: "9 Years", image: "/public/assets/teacher9.jpg" },
    { name: "Daniel Clark", board: "IB", class: "10", subject: "Maths", experience: "3 Years", image: "/public/assets/teacher10.png" },

    // Adding Dr. Komal Choudhary
    { 
        name: "Dr. Komal Choudhary", 
        board: "IGCSE, IB, CBSE", 
        class: "10 11 12 O, AS, A level", 
        subject: "Maths (Calculus, Algebra, Statistics and Probability, Operation Research)", 
        experience: "16 Years", 
        image: "/public/assets/teacher11.png" 
    }

];

function displayTeachers(filteredTeachers) {
    const container = document.getElementById("teacherCards");
    container.innerHTML = "";

    filteredTeachers.forEach(teacher => {
        let card = document.createElement("div");
        card.className = 'bg-white p-6 rounded-lg shadow-lg hover:scale-105 transition-transform';
        card.innerHTML = `
            <div class="w-full h-48">
                <img src="${teacher.image}" class="w-full h-full object-cover rounded-lg" alt="${teacher.name}">
            </div>
            <div class="teacher-info text-center mt-4">
                <h3 class="text-xl font-bold">${teacher.name}</h3>
                <p class="text-gray-700"><strong>Board:</strong> ${teacher.board}</p>
                <p class="text-gray-700"><strong>Class:</strong> ${teacher.class}</p>
                <p class="text-gray-700"><strong>Subject:</strong> ${teacher.subject}</p>
                <p class="text-gray-700"><strong>Experience:</strong> ${teacher.experience}</p>
                <button class="view-details mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full">View Details</button>
            </div>
        `;
        
        card.querySelector(".view-details").addEventListener("click", function() {
            this.textContent = "Book Now";
            scrollToSection("contactUs");
        });
        
        container.appendChild(card);
    });
}
window.onload = () => displayTeachers(teachers);

//filter teacher logic
function filterTeachers() {
    let board = document.getElementById("board").value.trim();
    let studentClass = document.getElementById("class").value.trim();
    let subject = document.getElementById("subject").value.trim();

    let filtered = teachers.filter(teacher => {
        let boardMatch = board === "" || teacher.board.toLowerCase().includes(board.toLowerCase());
        let classMatch = studentClass === "" || teacher.class.toLowerCase().includes(studentClass.toLowerCase());
        let subjectMatch = subject === "" || teacher.subject.toLowerCase().includes(subject.toLowerCase());

        // ✅ Agar koi filter select hai, toh uske hisaab se filter karo
        if (board || studentClass || subject) {
            return boardMatch && classMatch && subjectMatch;
        }

        // ✅ Agar koi filter select nahi hai, toh saare dikhao
        return true;
    });

    displayTeachers(filtered);
}

//onchange events
document.getElementById("board").addEventListener("change", filterTeachers);
document.getElementById("class").addEventListener("change", filterTeachers);
document.getElementById("subject").addEventListener("change", filterTeachers);


// form validation 
document.addEventListener("DOMContentLoaded", function () {
    function validateForm(event) {
        event.preventDefault(); // Prevent form submission

        // Get input values
        let name = document.getElementById("studentName").value.trim();
        let email = document.getElementById("studentEmail").value.trim();
        let studentClass = document.getElementById("studentClass").value.trim();
        let studentBoard = document.getElementById("studentBoard").value.trim();
        let studentSubject = document.getElementById("studentSubject").value.trim();

        // Error elements
        let nameError = document.getElementById("nameError");
        let emailError = document.getElementById("emailError");
        let classError = document.getElementById("classError");
        let boardError = document.getElementById("boardError");
        let subjectError = document.getElementById("subjectError");

        // Clear previous errors
        nameError.textContent = "";
        emailError.textContent = "";
        classError.textContent = "";
        boardError.textContent = "";
        subjectError.textContent = "";

        let isValid = true;

        // Validate Name
        if (name === "") {
            nameError.textContent = "Name is required.";
            isValid = false;
        } else if (name.length < 3) {
            nameError.textContent = "Name must be at least 3 characters.";
            isValid = false;
        }

        // Validate Email
        if (email === "") {
            emailError.textContent = "Email is required.";
            isValid = false;
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            emailError.textContent = "Invalid email format.";
            isValid = false;
        }

        // Validate Class
        if (studentClass === "") {
            classError.textContent = "Please select your class.";
            isValid = false;
        }

        // Validate Board
        if (studentBoard === "") {
            boardError.textContent = "Please select your board.";
            isValid = false;
        }

        // Validate Subject
        if (studentSubject === "") {
            subjectError.textContent = "Subject is required.";
            isValid = false;
        }

        // If valid, submit the form
        if (isValid) {
            // alert("Form submitted successfully!");
            document.getElementById("contactForm").reset(); // Reset form
        }
    }

    document.getElementById("contactForm").addEventListener("submit", validateForm);
});


//connect an email to form


document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission

    let name = document.getElementById("studentName").value;
    let email = document.getElementById("studentEmail").value;
    let studentClass = document.getElementById("studentClass").value;

    let mailtoLink = `mailto:mathverseindia@gmail.com ?subject=New Form Submission&body=
        Name: ${name}%0D%0A
        Email: ${email}%0D%0A
        Class: ${studentClass}`;

    window.location.href = mailtoLink;
});

// add event listener ki mobile menu ke baad pc menu gayab na ho jaye
window.addEventListener("resize", function () {
    let menu = document.getElementById("mobile-menu");
    if (window.innerWidth >= 768) {
        menu.classList.remove("hidden", "scale-y-0", "overflow-hidden");
    } else {
        menu.classList.add("hidden");
    }
});
