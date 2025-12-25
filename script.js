/**
 * Portfolio Dashboard JavaScript
 * Handles navigation, section switching, and interactive features
 */

// ===========================
// STATE MANAGEMENT
// ===========================

const state = {
    currentSection: 'profile',
    isLoading: false
};

// ===========================
// DOM ELEMENTS
// ===========================

const navItems = document.querySelectorAll('.nav-item[data-section]');
const contentSections = document.querySelectorAll('.content-section');
const documentCards = document.querySelectorAll('.document-card');
const experienceCards = document.querySelectorAll('.experience-card-compact');

// ===========================
// NAVIGATION HANDLER
// ===========================

function switchSection(sectionId) {
    if (state.isLoading || state.currentSection === sectionId) return;

    state.isLoading = true;

    // Remove active class from all nav items
    navItems.forEach(item => item.classList.remove('active'));

    // Add active class to clicked nav item
    const activeNavItem = document.querySelector(`[data-section="${sectionId}"]`);
    if (activeNavItem) {
        activeNavItem.classList.add('active');
    }

    // Hide all sections
    contentSections.forEach(section => {
        section.classList.remove('active');
    });

    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        targetSection.classList.add('fade-in');
    }

    // Update state
    state.currentSection = sectionId;
    state.isLoading = false;

    // Update URL hash without scrolling
    history.pushState(null, null, `#${sectionId}`);
}

// Add click event listeners to nav items
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = item.getAttribute('data-section');
        if (sectionId) {
            switchSection(sectionId);
        }
    });
});

// ===========================
// EXPERIENCE CARD INTERACTIONS
// ===========================

experienceCards.forEach(card => {
    card.addEventListener('click', () => {
        const title = card.querySelector('.exp-card-title').textContent;
        const company = card.querySelector('.exp-card-company').textContent;
        showNotification(`${title} at ${company}`);
    });
});

// ===========================
// DOCUMENT CARD INTERACTIONS
// ===========================

documentCards.forEach(card => {
    card.addEventListener('click', () => {
        const docTitle = card.querySelector('.doc-title').textContent;
        showNotification(`Opening ${docTitle}...`);
    });
});

// ===========================
// NOTIFICATION SYSTEM
// ===========================

function showNotification(message, duration = 2500) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification-toast');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification
    const notification = document.createElement('div');
    notification.className = 'notification-toast';
    notification.textContent = message;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(99, 102, 241, 0.3);
        font-size: 0.875rem;
        font-weight: 500;
        z-index: 10000;
        animation: slideInUp 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Remove after duration
    setTimeout(() => {
        notification.style.animation = 'slideOutDown 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

// ===========================
// PROFILE AVATAR INTERACTION
// ===========================

const profileAvatar = document.querySelector('.avatar-placeholder');
if (profileAvatar) {
    profileAvatar.addEventListener('click', () => {
        profileAvatar.style.transform = 'scale(0.95)';
        setTimeout(() => {
            profileAvatar.style.transform = '';
        }, 200);
    });
}

// ===========================
// SOCIAL LINKS COPY FUNCTIONALITY
// ===========================

const socialLinks = document.querySelectorAll('.social-link');
socialLinks.forEach(link => {
    link.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');

        if (href.startsWith('mailto:')) {
            const email = href.replace('mailto:', '');
            copyToClipboard(email, 'Email copied to clipboard!');
        } else if (href.startsWith('tel:')) {
            const phone = href.replace('tel:', '');
            copyToClipboard(phone, 'Phone number copied to clipboard!');
        } else {
            copyToClipboard(href, 'Link copied to clipboard!');
        }
    });
});

// ===========================
// COPY TO CLIPBOARD HELPER
// ===========================

function copyToClipboard(text, message = 'Copied to clipboard!') {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification(message);
        }).catch(err => {
            console.error('Failed to copy:', err);
        });
    }
}

// ===========================
// DETAIL EDIT ICONS
// ===========================

const editIcons = document.querySelectorAll('.detail-title i');
editIcons.forEach(icon => {
    icon.addEventListener('click', (e) => {
        e.preventDefault();
        const detailGroup = icon.closest('.detail-group');
        const groupTitle = detailGroup.querySelector('.detail-title').textContent.trim();
        showNotification(`Edit ${groupTitle} (feature coming soon)`);
    });
});

// ===========================
// ACTIVITY ITEMS ANIMATION
// ===========================

const activityItems = document.querySelectorAll('.activity-item');
activityItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
});

// ===========================
// SKILL TAG INTERACTIONS
// ===========================

const skillTags = document.querySelectorAll('.skill-tag');
skillTags.forEach(tag => {
    tag.addEventListener('click', () => {
        const skillName = tag.textContent;
        showNotification(`${skillName} - Click to learn more (coming soon)`);
    });
});

// ===========================
// PROGRESS BAR ANIMATION
// ===========================

function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        const targetWidth = bar.style.width;
        bar.style.width = '0';

        setTimeout(() => {
            bar.style.width = targetWidth;
        }, 100);
    });
}

// Observe skills section for progress bar animation
const skillsSection = document.getElementById('skills');
if (skillsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBars();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    observer.observe(skillsSection);
}

// ===========================
// GITHUB LINK INTERACTIONS
// ===========================

const githubLinks = document.querySelectorAll('.github-link');
githubLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'scale(1.2) rotate(5deg)';
    });

    link.addEventListener('mouseleave', () => {
        link.style.transform = '';
    });
});

// ===========================
// KEYBOARD SHORTCUTS
// ===========================

document.addEventListener('keydown', (e) => {
    // Alt + Number keys for quick navigation
    if (e.altKey && !e.shiftKey && !e.ctrlKey) {
        const keyMap = {
            '1': 'profile',
            '2': 'skills',
            '3': 'projects',
            '4': 'experience',
            '5': 'contact'
        };

        const sectionId = keyMap[e.key];
        if (sectionId) {
            e.preventDefault();
            switchSection(sectionId);
            showNotification(`Navigated to ${sectionId}`);
        }
    }

    // Escape key to go back to profile
    if (e.key === 'Escape' && state.currentSection !== 'profile') {
        switchSection('profile');
    }
});

// ===========================
// URL HASH NAVIGATION
// ===========================

function handleHashNavigation() {
    const hash = window.location.hash.slice(1);
    const validSections = ['profile', 'skills', 'projects', 'experience', 'contact'];

    if (hash && validSections.includes(hash)) {
        switchSection(hash);
    }
}

// Handle initial hash on page load
window.addEventListener('load', handleHashNavigation);

// Handle hash changes (back/forward navigation)
window.addEventListener('hashchange', handleHashNavigation);

// ===========================
// RESPONSIVE MOBILE MENU
// ===========================

function handleMobileLayout() {
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
        // Hide tooltips on mobile
        const tooltips = document.querySelectorAll('.nav-tooltip');
        tooltips.forEach(tooltip => {
            tooltip.style.display = 'none';
        });
    }
}

window.addEventListener('resize', handleMobileLayout);
handleMobileLayout();

// ===========================
// LOADING ANIMATION
// ===========================

function showLoadingState() {
    const loader = document.createElement('div');
    loader.className = 'loading-overlay';
    loader.innerHTML = '<div class="spinner"></div>';
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
    `;

    document.body.appendChild(loader);

    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 300);
    }, 500);
}

// ===========================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && !this.hasAttribute('data-section')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// ===========================
// ACCESSIBILITY ENHANCEMENTS
// ===========================

// Add aria-labels dynamically
navItems.forEach(item => {
    const section = item.getAttribute('data-section');
    if (section && !item.getAttribute('aria-label')) {
        item.setAttribute('aria-label', `Navigate to ${section}`);
    }
});

// Focus management for keyboard navigation
navItems.forEach(item => {
    item.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            item.click();
        }
    });
});

// ===========================
// ANIMATIONS CSS
// ===========================

const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes slideInUp {
        from {
            transform: translateY(100%);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    @keyframes slideOutDown {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(100%);
            opacity: 0;
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .fade-in {
        animation: fadeIn 0.3s ease;
    }

    .avatar-placeholder {
        transition: transform 0.2s ease;
        cursor: pointer;
    }

    .activity-item {
        animation: fadeIn 0.4s ease forwards;
        opacity: 0;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }

    .spinner {
        width: 40px;
        height: 40px;
        border: 4px solid #f3f4f6;
        border-top-color: #6366f1;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
    }
`;

document.head.appendChild(animationStyles);

// ===========================
// CONSOLE WELCOME MESSAGE
// ===========================

console.log('%c Welcome to Abdelrahman\'s Portfolio! ', 'background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; font-size: 16px; font-weight: bold; padding: 10px 20px; border-radius: 8px;');
console.log('%c Keyboard Shortcuts:', 'color: #6366f1; font-weight: bold; font-size: 14px;');
console.log('Alt + 1-5: Quick navigation between sections');
console.log('Escape: Return to profile');
console.log('Right-click on social links: Copy to clipboard');

// ===========================
// LOCAL TIME CLOCK
// ===========================

function updateLocalTime() {
    const timeElement = document.getElementById('local-time');
    if (timeElement) {
        const now = new Date();

        // Convert to Egypt timezone (UTC+2)
        const egyptTime = new Date(now.toLocaleString('en-US', {
            timeZone: 'Africa/Cairo'
        }));

        const hours = String(egyptTime.getHours()).padStart(2, '0');
        const minutes = String(egyptTime.getMinutes()).padStart(2, '0');
        const seconds = String(egyptTime.getSeconds()).padStart(2, '0');

        timeElement.textContent = `${hours}:${minutes}:${seconds}`;
    }
}

// Update time every second
setInterval(updateLocalTime, 1000);
updateLocalTime(); // Initial call

// ===========================
// PROJECT MODAL FUNCTIONALITY
// ===========================

const projectData = {
    'job-search': {
        title: 'Job Search App',
        icon: 'fa-briefcase',
        description: 'A comprehensive job search platform built with Node.js and Express, featuring advanced filtering capabilities, user authentication, and role-based access control for job seekers and employers.',
        features: [
            'User authentication with JWT token-based security',
            'Advanced job search and filtering system',
            'Company and job posting management',
            'Application tracking system',
            'File upload support for resumes and documents',
            'RESTful API architecture'
        ],
        technologies: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT', 'bcrypt', 'Cloudinary'],
        githubUrl: 'https://github.com/obad7/Job-Search-App'
    },
    'social-app': {
        title: 'Social App',
        icon: 'fa-users',
        description: 'A full-featured social media platform enabling users to create, manage, and interact with posts and comments. Features user authentication, profile management, and administrative controls.',
        features: [
            'Email/password and Gmail login authentication',
            'User profile management with updates',
            'Post creation, updating, soft deletion, and restoration',
            'Comment system with nested replies',
            'Like/unlike functionality',
            'File upload (local storage and Cloudinary)',
            'Role-based access control with admin functionality',
            'Input validation using Joi schema'
        ],
        technologies: ['Express.js', 'MongoDB', 'Mongoose', 'JWT', 'Joi', 'Cloudinary', 'OAuth'],
        githubUrl: 'https://github.com/obad7/Social-App'
    },
    'flower-store': {
        title: 'Flower Store',
        icon: 'fa-shopping-cart',
        description: 'A production-ready e-commerce platform for online flower and gift stores, featuring comprehensive product management, shopping cart, checkout system, and Stripe payment integration with caching and monitoring.',
        features: [
            'NestJS 10 with modular architecture',
            'Redis integration for caching and rate limiting',
            'Swagger API documentation at /api-docs',
            'Winston logging with daily rotation',
            'Docker support for dev and production',
            'Prometheus and Grafana for observability',
            'Stripe payment integration',
            'Health checks and structured error handling'
        ],
        technologies: ['NestJS', 'TypeScript', 'MongoDB', 'Redis', 'Swagger', 'Docker', 'Stripe', 'Prometheus'],
        githubUrl: 'https://github.com/ZiadmMohamed/Flower-Store'
    }
};

// Initialize project modal functionality
function initializeProjectModal() {
    const modal = document.getElementById('projectModal');
    const modalClose = document.querySelector('.project-modal-close');
    const projectCards = document.querySelectorAll('.project-compact-card');

    if (!modal || !modalClose) {
        console.error('Project modal elements not found');
        return;
    }

    // Open modal function
    function openProjectModal(projectId) {
        const project = projectData[projectId];
        if (!project) return;

        // Update modal content
        const modalIcon = document.querySelector('.project-modal-icon i');
        const modalTitle = document.querySelector('.project-modal-title');
        const modalDescription = document.querySelector('.project-modal-description');
        const featuresList = document.querySelector('.project-modal-features');
        const techContainer = document.querySelector('.project-modal-tech');
        const githubLink = document.querySelector('.project-modal-link');

        if (modalIcon) modalIcon.className = `fas ${project.icon}`;
        if (modalTitle) modalTitle.textContent = project.title;
        if (modalDescription) modalDescription.textContent = project.description;

        // Update features list
        if (featuresList) {
            featuresList.innerHTML = '';
            project.features.forEach(feature => {
                const li = document.createElement('li');
                li.textContent = feature;
                featuresList.appendChild(li);
            });
        }

        // Update technologies
        if (techContainer) {
            techContainer.innerHTML = '';
            project.technologies.forEach(tech => {
                const span = document.createElement('span');
                span.className = 'project-modal-tech-tag';
                span.textContent = tech;
                techContainer.appendChild(span);
            });
        }

        // Update GitHub link
        if (githubLink) {
            githubLink.href = project.githubUrl;
            githubLink.setAttribute('target', '_blank');
            githubLink.setAttribute('rel', 'noopener noreferrer');

            // Remove old click listeners and add new one
            const newGithubLink = githubLink.cloneNode(true);
            githubLink.parentNode.replaceChild(newGithubLink, githubLink);

            newGithubLink.addEventListener('click', (e) => {
                e.stopPropagation();
                console.log('Opening GitHub link:', project.githubUrl);
                window.open(project.githubUrl, '_blank', 'noopener,noreferrer');
            });
        }

        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close modal function
    function closeProjectModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Add click events to project cards
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project');
            openProjectModal(projectId);
        });
    });

    // Close modal on close button click
    modalClose.addEventListener('click', closeProjectModal);

    // Prevent modal content clicks from closing modal
    const modalContent = document.querySelector('.project-modal-content');
    if (modalContent) {
        modalContent.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    // Close modal on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeProjectModal();
        }
    });

    // Close modal on Escape key (non-conflicting with existing Escape handler)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            e.stopPropagation();
            closeProjectModal();
        }
    });
}

// ===========================
// INITIALIZATION
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio dashboard loaded successfully!');

    // Set initial section based on hash or default to profile
    handleHashNavigation();

    // Start local time clock
    updateLocalTime();

    // Initialize project modal
    initializeProjectModal();

    // Trigger any initial animations
    setTimeout(() => {
        document.querySelectorAll('.profile-card, .section-card').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';

            setTimeout(() => {
                card.style.transition = 'all 0.4s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 100);
});

// ===========================
// PERFORMANCE MONITORING
// ===========================

if ('performance' in window) {
    window.addEventListener('load', () => {
        const perfData = performance.getEntriesByType('navigation')[0];
        if (perfData) {
            console.log(`Page loaded in ${Math.round(perfData.loadEventEnd - perfData.fetchStart)}ms`);
        }
    });
}
