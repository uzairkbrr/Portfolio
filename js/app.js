
import { experienceData, projectsData, vibeCodedData, achievementsData, socialsData, lessonsData } from './data.js';

// --- Theme Logic ---
const initTheme = () => {
    const themeToggle = document.getElementById('themeToggle');

    // Check local storage or preference
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    // Toggle event
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            localStorage.theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
        });
    }
};

// --- Footer Logic ---
const initFooter = () => {
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

// --- Render Functions ---

const createExperienceItem = (item) => `
    <a href="${item.companyUrl}" target="_blank"
        class="block group relative pl-4 border-l-2 border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors">
        <div class="flex justify-between items-baseline flex-wrap gap-2 mb-1">
            <h3 class="font-medium group-hover:underline decoration-neutral-400 underline-offset-4">${item.role} @ ${item.company}</h3>
            <span class="text-xs text-neutral-500 dark:text-neutral-500 font-mono">${item.date}</span>
        </div>
        <p class="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            ${item.description}
        </p>
    </a>
`;

const createProjectCard = (item, isVibe = false) => `
    <a href="${item.url}" target="_blank" class="block group">
        <div class="h-full p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all hover:shadow-sm">
             <div class="${isVibe ? 'flex justify-between items-start' : ''}">
                <div>
                    <h3 class="font-medium text-neutral-900 dark:text-neutral-100 group-hover:underline decoration-neutral-400 underline-offset-4">
                        ${item.title}
                    </h3>
                    <p class="text-sm text-neutral-500 dark:text-neutral-400 mt-2">${item.description}</p>
                </div>
                 ${isVibe ? '<div class="text-xl group-hover:scale-110 transition-transform">✨</div>' : ''}
            </div>
        </div>
    </a>
`;

const createAchievementItem = (item) => {
    const content = `
        <div class="flex justify-between items-baseline flex-wrap gap-2 mb-1">
            <h3 class="font-medium ${item.url ? 'group-hover:underline decoration-neutral-400 underline-offset-4' : ''}">${item.title}</h3>
        </div>
        <p class="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            ${item.description}
        </p>
    `;

    if (item.url) {
        return `<a href="${item.url}" target="_blank" class="block group relative pl-4 border-l-2 border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors">${content}</a>`;
    } else {
        return `<div class="group relative pl-4 border-l-2 border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors">${content}</div>`;
    }
};

const createSocialLink = (item, index, total) => `
    <a href="${item.url}" ${item.url.startsWith('mailto') ? '' : 'target="_blank"'} class="text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">${item.name}</a>
    ${index < total - 1 ? '<span class="text-neutral-300 dark:text-neutral-700">/</span>' : ''}
`;

const createLessonItem = (text) => `
    <li class="pl-4 border-l-2 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300">
        ${text}
    </li>
`;

// --- Initialization ---

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initFooter();

    // Render Experience
    const experienceContainer = document.getElementById('experience-list');
    if (experienceContainer) {
        experienceContainer.innerHTML = experienceData.map(createExperienceItem).join('');
    }

    // Render Projects
    const projectsContainer = document.getElementById('projects-grid');
    if (projectsContainer) {
        projectsContainer.innerHTML = projectsData.map(item => createProjectCard(item)).join('');
    }

    // Render Vibe Coded
    const vibeContainer = document.getElementById('vibe-grid');
    if (vibeContainer) {
        vibeContainer.innerHTML = vibeCodedData.map(item => createProjectCard(item, true)).join('');
    }

    // Render Achievements
    const achievementsContainer = document.getElementById('achievements-list');
    if (achievementsContainer) {
        achievementsContainer.innerHTML = achievementsData.map(createAchievementItem).join('');
    }

    // Render Socials
    const socialsContainer = document.getElementById('socials-list');
    if (socialsContainer) {
        socialsContainer.innerHTML = socialsData.map((item, index) => createSocialLink(item, index, socialsData.length)).join('');
    }

    // Render Lessons
    const lessonsContainer = document.getElementById('lessons-list');
    if (lessonsContainer) {
        lessonsContainer.innerHTML = lessonsData.map(createLessonItem).join('');
    }
});
