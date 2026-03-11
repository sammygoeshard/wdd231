/* 
    Renders course cards, supports All/CSE/WDD filters, and computes visible credits.
    Assumes the following HTML hooks exist:
     - <div id="courseGrid"></div>
     - <p id="creditTotal"></p>
     - filter buttons with .filter-btn and data-filter="all|cse|wdd"
*/

const courses = [
  {
    subject: 'CSE',
    number: 110,
    title: 'Introduction to Programming',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description:
      'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
    technology: ['Python'],
    completed: true 
  },
  {
    subject: 'WDD',
    number: 130,
    title: 'Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description:
      'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
    technology: ['HTML', 'CSS'],
    completed: true 
  },
  {
    subject: 'CSE',
    number: 111,
    title: 'Programming with Functions',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description:
      'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
    technology: ['Python'],
    completed: true 
  },
  {
    subject: 'CSE',
    number: 210,
    title: 'Programming with Classes',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description:
      'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
    technology: ['C#'],
    completed: false
  },
  {
    subject: 'WDD',
    number: 131,
    title: 'Dynamic Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description:
      'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
    technology: ['HTML', 'CSS', 'JavaScript'],
    completed: true 
  },
  {
    subject: 'WDD',
    number: 231,
    title: 'Frontend Web Development I',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description:
      'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
    technology: ['HTML', 'CSS', 'JavaScript'],
    completed: false // currently taking
  }
];

/* =========================
   State & Helpers
   ========================= */
const state = {
  filter: 'all' // 'all' | 'cse' | 'wdd'
};

const qs  = (sel, ctx = document) => ctx.querySelector(sel);
const qsa = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

function formatCourseCode(course) {
  return `${course.subject} ${course.number}`;
}

function bySubject(filter) {
  if (filter === 'cse') return (c) => c.subject === 'CSE';
  if (filter === 'wdd') return (c) => c.subject === 'WDD';
  return () => true; // all
}

/* =========================
   Rendering
   ========================= */
function renderCourses(list) {
  const grid = qs('#courseGrid');
  const totalEl = qs('#creditTotal');

  if (!grid || !totalEl) return;

  // Clear existing
  grid.textContent = '';

  // Build fragment to minimize reflow
  const frag = document.createDocumentFragment();

  list.forEach((c) => {
    const card = document.createElement('article');
    card.className = `course-card ${c.completed ? 'completed' : 'incomplete'}`;
    card.setAttribute('tabindex', '0'); // keyboard focusable card

    // Title (course code)
    const code = document.createElement('div');
    code.className = 'code';
    code.textContent = formatCourseCode(c);

    // Right aligned credits / status
    const meta = document.createElement('div');
    meta.className = 'credits';
    meta.innerHTML = `
      <span>${c.credits} cr</span>
    `;

    // Subtitle (course title)
    const title = document.createElement('div');
    title.className = 'name';
    title.style.gridColumn = '1 / -1';
    title.style.color = 'var(--muted)';
    title.textContent = c.title;

    // Accessible status
    card.setAttribute(
      'aria-label',
      `${formatCourseCode(c)} — ${c.title}. ${c.credits} credits. ${c.completed ? 'Completed' : 'Not completed'}`
    );

    card.append(code, meta, title);
    frag.appendChild(card);
  });

  grid.appendChild(frag);

  // Credits total for the visible list
  const total = list.reduce((sum, c) => sum + Number(c.credits || 0), 0);
  totalEl.innerHTML = `The total credits for courses listed above is <strong>${total}</strong>.`;
}

/* =========================
   Filters (All / CSE / WDD)
   ========================= */
function setFilter(filter) {
  state.filter = filter;
  const show = courses.filter(bySubject(state.filter));
  updatePressedButtons(filter);
  renderCourses(show);
}

function updatePressedButtons(active) {
  qsa('.filter-btn').forEach((btn) => {
    const isActive = btn.dataset.filter === active;
    btn.setAttribute('aria-pressed', String(isActive));
  });
}

/* =========================
   Initialization
   ========================= */
function initCoursesUI() {
  // Wire up filter buttons
  qsa('.filter-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter || 'all';
      setFilter(filter);
    });
  });

  // Initial view: All
  setFilter('all');
}

/* Because the script is loaded with defer, DOM is ready here */
initCoursesUI();

/* =========================
   Optional: simple API to trigger a re-render if data changes later
   ========================= */
// Call window.dispatchEvent(new CustomEvent('courses:updated')) after mutating `courses`
window.addEventListener('courses:updated', () => {
  const show = courses.filter(bySubject(state.filter));
  renderCourses(show);
});