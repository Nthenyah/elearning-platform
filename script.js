// Course Data - Stored in JavaScript array
const courses = [
    {
        id: 1,
        title: "Introduction to Web Development",
        description: "Learn the fundamentals of HTML, CSS, and JavaScript to build your first website.",
        duration: "4 weeks",
        lessons: 12,
        level: "Beginner",
        image: "🌐",
        lessons: [
            "HTML Basics and Semantic Structure",
            "CSS Styling and Layouts",
            "JavaScript Fundamentals",
            "DOM Manipulation",
            "Responsive Design",
            "Building Your First Project"
        ],
        completed: false
    },
    {
        id: 2,
        title: "Python Programming Fundamentals",
        description: "Master Python programming from basics to advanced concepts with hands-on projects.",
        duration: "6 weeks",
        lessons: 18,
        level: "Beginner",
        image: "🐍",
        lessons: [
            "Python Syntax and Data Types",
            "Control Structures and Functions",
            "Object-Oriented Programming",
            "File Handling",
            "Error Handling",
            "Working with APIs"
        ],
        completed: false
    },
    {
        id: 3,
        title: "Data Science Essentials",
        description: "Learn data analysis, visualization, and machine learning basics with Python.",
        duration: "8 weeks",
        lessons: 24,
        level: "Intermediate",
        image: "📊",
        lessons: [
            "Data Analysis with Pandas",
            "Data Visualization with Matplotlib",
            "Statistical Analysis",
            "Machine Learning Basics",
            "Data Cleaning Techniques",
            "Real-world Data Projects"
        ],
        completed: false
    }
];

// DOM Elements
const coursesGrid = document.getElementById('coursesGrid');
const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const closeModal = document.querySelector('.close');
const loginForm = document.querySelector('.login-form');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadCourses();
    setupEventListeners();
});

// Load courses into the grid
function loadCourses() {
    coursesGrid.innerHTML = '';
    
    courses.forEach(course => {
        const courseCard = createCourseCard(course);
        coursesGrid.appendChild(courseCard);
    });
}

// Create course card HTML
function createCourseCard(course) {
    const card = document.createElement('div');
    card.className = 'course-card';
    card.innerHTML = `
        <div class="course-image">
            ${course.image}
        </div>
        <div class="course-content">
            <h3>${course.title}</h3>
            <p class="course-description">${course.description}</p>
            <div class="course-meta">
                <span>${course.duration}</span>
                <span>${course.lessons.length} lessons</span>
                <span>${course.level}</span>
            </div>
            <button class="view-details-btn" data-id="${course.id}">View Details</button>
            <button class="mark-completed-btn ${course.completed ? 'completed' : ''}" 
                    data-id="${course.id}">
                ${course.completed ? '✓ Completed' : 'Mark as Completed'}
            </button>
        </div>
    `;
    
    return card;
}

// Setup event listeners
function setupEventListeners() {
    // Login modal
    loginBtn.addEventListener('click', () => {
        loginModal.style.display = 'block';
    });
    
    closeModal.addEventListener('click', () => {
        loginModal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
        }
    });
    
    // Login form submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Login functionality would be implemented here!');
        loginModal.style.display = 'none';
    });
    
    // Course card interactions (event delegation)
    coursesGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('view-details-btn')) {
            const courseId = parseInt(e.target.getAttribute('data-id'));
            showCourseDetails(courseId);
        }
        
        if (e.target.classList.contains('mark-completed-btn') && !e.target.classList.contains('completed')) {
            const courseId = parseInt(e.target.getAttribute('data-id'));
            markCourseCompleted(courseId);
        }
    });
}

// Show course details in modal
function showCourseDetails(courseId) {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;
    
    const modal = document.createElement('div');
    modal.className = 'modal course-details-modal';
    modal.style.display = 'block';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>${course.title}</h2>
            <p><strong>Duration:</strong> ${course.duration}</p>
            <p><strong>Level:</strong> ${course.level}</p>
            <p><strong>Lessons:</strong> ${course.lessons.length}</p>
            <p>${course.description}</p>
            
            <h3>Course Lessons:</h3>
            <ul class="lesson-list">
                ${course.lessons.map(lesson => `
                    <li class="lesson-item">
                        <input type="checkbox" class="lesson-checkbox">
                        <span>${lesson}</span>
                    </li>
                `).join('')}
            </ul>
            
            <button class="mark-completed-btn ${course.completed ? 'completed' : ''}" 
                    onclick="markCourseCompleted(${course.id}); this.parentElement.parentElement.style.display='none'">
                ${course.completed ? '✓ Course Completed' : 'Mark Course as Completed'}
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.close');
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.removeChild(modal);
        }
    });
}

// Mark course as completed
function markCourseCompleted(courseId) {
    const course = courses.find(c => c.id === courseId);
    if (course) {
        course.completed = true;
        
        // Update the button in the course grid
        const completeBtn = document.querySelector(`.mark-completed-btn[data-id="${courseId}"]`);
        if (completeBtn) {
            completeBtn.textContent = '✓ Completed';
            completeBtn.classList.add('completed');
        }
        
        // Show completion message
        alert(`🎉 Congratulations! You've completed "${course.title}"`);
        
        // In a real app, you would save this to localStorage or a database
        saveProgress();
    }
}

// Save progress to localStorage
function saveProgress() {
    const progress = courses.map(course => ({
        id: course.id,
        completed: course.completed
    }));
    localStorage.setItem('courseProgress', JSON.stringify(progress));
}

// Load progress from localStorage
function loadProgress() {
    const savedProgress = localStorage.getItem('courseProgress');
    if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        progress.forEach(item => {
            const course = courses.find(c => c.id === item.id);
            if (course) {
                course.completed = item.completed;
            }
        });
    }
}

// Initialize progress loading
loadProgress();