
import { fetchData } from './data.js';

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
    <a href="${item.Link || '#'}" target="_blank"
        class="block group relative pl-4 border-l-2 border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors">
        <div class="flex justify-between items-baseline flex-wrap gap-2 mb-1">
            <h3 class="font-medium group-hover:underline decoration-neutral-400 underline-offset-4">${item.Role} @ ${item.Company}</h3>
            <span class="text-xs text-neutral-500 dark:text-neutral-500 font-mono">${item.Date}</span>
        </div>
        <p class="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            ${item.Description}
        </p>
    </a>
`;

const createProjectCard = (item, isVibe = false) => `
    <a href="${item.Link || '#'}" target="_blank" class="block group">
        <div class="h-full p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all hover:shadow-sm">
             <div class="${isVibe ? 'flex justify-between items-start' : ''}">
                <div>
                    <h3 class="font-medium text-neutral-900 dark:text-neutral-100 group-hover:underline decoration-neutral-400 underline-offset-4">
                        ${item.Title}
                    </h3>
                    <p class="text-sm text-neutral-500 dark:text-neutral-400 mt-2">${item.Description}</p>
                </div>
                 ${isVibe ? '<div class="text-xl group-hover:scale-110 transition-transform">✨</div>' : ''}
            </div>
        </div>
    </a>
`;

const createAchievementItem = (item) => {
    const content = `
        <div class="flex justify-between items-baseline flex-wrap gap-2 mb-1">
            <h3 class="font-medium ${item.Link ? 'group-hover:underline decoration-neutral-400 underline-offset-4' : ''}">${item.Title}</h3>
        </div>
        <p class="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            ${item.Description}
        </p>
    `;

    if (item.Link) {
        return `<a href="${item.Link}" target="_blank" class="block group relative pl-4 border-l-2 border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors">${content}</a>`;
    } else {
        return `<div class="group relative pl-4 border-l-2 border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors">${content}</div>`;
    }
};

const createSocialLink = (item, index, total) => `
    <a href="${item.Link}" ${item.Link && item.Link.startsWith('mailto') ? '' : 'target="_blank"'} class="text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">${item.Name}</a>
    ${index < total - 1 ? '<span class="text-neutral-300 dark:text-neutral-700">/</span>' : ''}
`;

const createLessonItem = (text) => `
    <li class="pl-4 border-l-2 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300">
        ${text}
    </li>
`;

// --- Initialization ---

document.addEventListener('DOMContentLoaded', async () => {
    initTheme();
    initFooter();

    // -- Dynamic Data Fetching --

    // 1. Socials
    const socialsContainer = document.getElementById('socials-list');
    if (socialsContainer) {
        // Fetch fetching logic here or use fetchData('socials')
        const socials = await fetchData('socials');
        if (socials && socials.length > 0) {
            socialsContainer.innerHTML = socials.map((item, index) => createSocialLink(item, index, socials.length)).join('');
        }
    }

    // 2. Lessons
    const lessonsContainer = document.getElementById('lessons-list');
    if (lessonsContainer) {
        const lessons = await fetchData('lessons');
        if (lessons && lessons.length > 0) {
            lessonsContainer.innerHTML = lessons.map(row => createLessonItem(row.Lesson)).join('');
        }
    }

    // 3. Projects
    const projectsContainer = document.getElementById('projects-grid');
    if (projectsContainer) {
        const projects = await fetchData('projects');
        if (projects && projects.length > 0) {
            projectsContainer.innerHTML = projects.map(item => createProjectCard(item)).join('');
        }
    }

    // 4. Vibe Coded
    const vibeContainer = document.getElementById('vibe-grid');
    if (vibeContainer) {
        const vibe = await fetchData('vibe_coded');
        if (vibe && vibe.length > 0) {
            vibeContainer.innerHTML = vibe.map(item => createProjectCard(item, true)).join('');
        }
    }

    // 5. Experience
    const experienceContainer = document.getElementById('experience-list');
    if (experienceContainer) {
        const experience = await fetchData('experience');
        if (experience && experience.length > 0) {
            experienceContainer.innerHTML = experience.map(createExperienceItem).join('');
        }
    }

    // 6. Achievements
    const achievementsContainer = document.getElementById('achievements-list');
    if (achievementsContainer) {
        const achievements = await fetchData('achievements');
        if (achievements && achievements.length > 0) {
            achievementsContainer.innerHTML = achievements.map(createAchievementItem).join('');
        }
    }
});
