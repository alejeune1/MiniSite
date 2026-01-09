(() => {
  if (window.__ADMIN_LOADED__) return;
  window.__ADMIN_LOADED__ = true;

  console.log("admin.js charg\u00e9");

const SUPABASE_URL = "https://yvuhqyhufyskldhqqmjp.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2dWhxeWh1Znlza2xkaHFxbWpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4NTM3ODMsImV4cCI6MjA4MzQyOTc4M30.lQ9TfaQsLvnO1B7N8u0a-NTj8GVYNchtrlC33idanz0";

const loginSection = document.getElementById('login-section');
const dashboard = document.getElementById('dashboard');
const loginForm = document.getElementById('login-form');
const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');
const loginMessage = document.getElementById('login-message');
const logoutBtn = document.getElementById('logout-btn');
const userEmail = document.getElementById('user-email');
const appMessage = document.getElementById('app-message');
const appError = document.getElementById('app-error');

const courseList = document.getElementById('course-list');
const courseEmpty = document.getElementById('course-empty');
const courseLoading = document.getElementById('course-loading');
const courseCreateForm = document.getElementById('course-create-form');
const courseTitle = document.getElementById('course-title');
const courseDescription = document.getElementById('course-description');
const courseSlug = document.getElementById('course-slug');
const courseStatus = document.getElementById('course-status');

const courseEditor = document.getElementById('course-editor');
const courseSelected = document.getElementById('course-selected');
const courseEditForm = document.getElementById('course-edit-form');
const editTitle = document.getElementById('edit-title');
const editDescription = document.getElementById('edit-description');
const editSlug = document.getElementById('edit-slug');
const editStatus = document.getElementById('edit-status');
const courseDeleteBtn = document.getElementById('course-delete-btn');

const blockManager = document.getElementById('block-manager');
const blockList = document.getElementById('block-list');
const blockEmpty = document.getElementById('block-empty');
const blockTextForm = document.getElementById('block-text-form');
const blockTextHtml = document.getElementById('block-text-html');
const blockImageForm = document.getElementById('block-image-form');
const blockImageUrl = document.getElementById('block-image-url');
const blockImageCaption = document.getElementById('block-image-caption');
const blockLinksForm = document.getElementById('block-links-form');
const linksItems = document.getElementById('links-items');
const addLinkItemBtn = document.getElementById('add-link-item');

let currentCourse = null;
let currentBlocks = [];
let coursesById = new Map();
let coursesCache = [];

const COURSES_CACHE_KEY = 'admin-courses-cache-v1';

const supaClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/`/g, '&#96;');
}

function showElement(element, visible) {
  element.classList.toggle('hidden', !visible);
}

function clearLoginMessage() {
  loginMessage.textContent = '';
  loginMessage.classList.add('hidden');
}

function showLoginError(message) {
  loginMessage.textContent = message;
  loginMessage.classList.remove('hidden');
}

function clearAppMessages() {
  appMessage.textContent = '';
  appMessage.classList.add('hidden');
  appError.textContent = '';
  appError.classList.add('hidden');
}

function showAppMessage(message) {
  appMessage.textContent = message;
  appMessage.classList.remove('hidden');
  appError.classList.add('hidden');
}

function showAppError(message) {
  appError.textContent = message;
  appError.classList.remove('hidden');
  appMessage.classList.add('hidden');
}

function formatWriteError(error) {
  if (!error) {
    return 'Erreur inconnue.';
  }
  const message = (error.message || '').toLowerCase();
  if (message.includes('permission') || message.includes('rls') || error.code === '42501') {
    return 'Action refusee. Votre compte ne semble pas admin.';
  }
  return `Erreur: ${error.message || 'Action impossible.'}`;
}

function formatDate(isoDate) {
  if (!isoDate) {
    return '';
  }
  const parsed = new Date(isoDate);
  if (Number.isNaN(parsed.getTime())) {
    return '';
  }
  return parsed.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function showCourseLoading(message) {
  courseLoading.textContent = message;
  courseLoading.classList.remove('hidden');
}

function hideCourseLoading() {
  courseLoading.classList.add('hidden');
}

function clearCourseStates() {
  courseEmpty.classList.add('hidden');
  hideCourseLoading();
}

function renderCourseSkeleton() {
  courseList.innerHTML = `
    <li class="course-item skeleton-card">
      <div class="skeleton-line skeleton-title"></div>
      <div class="skeleton-line"></div>
      <div class="skeleton-line skeleton-short"></div>
    </li>
    <li class="course-item skeleton-card">
      <div class="skeleton-line skeleton-title"></div>
      <div class="skeleton-line"></div>
      <div class="skeleton-line skeleton-short"></div>
    </li>
  `;
}

function readCoursesCache() {
  try {
    const raw = sessionStorage.getItem(COURSES_CACHE_KEY);
    if (!raw) {
      return null;
    }
    const payload = JSON.parse(raw);
    if (!payload || !Array.isArray(payload.courses)) {
      return null;
    }
    return payload;
  } catch (error) {
    return null;
  }
}

function storeCoursesCache(courses) {
  try {
    sessionStorage.setItem(COURSES_CACHE_KEY, JSON.stringify({
      ts: Date.now(),
      courses
    }));
  } catch (error) {
    /* ignore storage errors */
  }
}

function sortCourses(courses) {
  return [...courses].sort((a, b) => {
    const timeA = a?.updated_at ? new Date(a.updated_at).getTime() : 0;
    const timeB = b?.updated_at ? new Date(b.updated_at).getTime() : 0;
    if (timeA !== timeB) {
      return timeB - timeA;
    }
    const titleA = (a?.title || a?.slug || '').toLowerCase();
    const titleB = (b?.title || b?.slug || '').toLowerCase();
    return titleA.localeCompare(titleB);
  });
}

function setCoursesCache(courses) {
  coursesCache = Array.isArray(courses) ? sortCourses(courses) : [];
  renderCourses(coursesCache);
  storeCoursesCache(coursesCache);
}

function upsertCourse(course) {
  if (!course) {
    return;
  }
  const list = Array.isArray(coursesCache) ? [...coursesCache] : [];
  const index = list.findIndex((item) => item.id === course.id);
  if (index >= 0) {
    list[index] = { ...list[index], ...course };
  } else {
    list.unshift(course);
  }
  setCoursesCache(list);
}

function removeCourseFromCache(courseId) {
  if (!courseId) {
    return;
  }
  const list = Array.isArray(coursesCache)
    ? coursesCache.filter((course) => course.id !== courseId)
    : [];
  setCoursesCache(list);
}

function isConfigReady() {
  return !SUPABASE_URL.includes('PASTE_') && !SUPABASE_ANON_KEY.includes('PASTE_');
}

function lockLoginForm() {
  loginEmail.disabled = true;
  loginPassword.disabled = true;
  loginForm.querySelector('button[type="submit"]').disabled = true;
}

function resetCourseEditor() {
  currentCourse = null;
  courseSelected.textContent = 'Selectionnez un cours.';
  courseEditForm.reset();
  showElement(courseEditor, false);
  showElement(blockManager, false);
  blockList.innerHTML = '';
  blockEmpty.classList.add('hidden');
}

function setCourseEditor(course) {
  currentCourse = course;
  courseSelected.textContent = `Cours selectionne: ${course.title || course.slug || course.id}`;
  editTitle.value = course.title || '';
  editDescription.value = course.description || '';
  editSlug.value = course.slug || '';
  editStatus.value = course.status || 'draft';
  showElement(courseEditor, true);
  showElement(blockManager, true);
}

function createLinkRowHtml(label = '', url = '') {
  return `
    <div class="link-row">
      <input type="text" class="link-label" placeholder="Label" value="${escapeAttr(label)}">
      <input type="text" class="link-url" placeholder="URL" value="${escapeAttr(url)}">
      <button type="button" class="small-btn" data-action="remove-link">Supprimer</button>
    </div>
  `;
}

function addLinkRow(container, label = '', url = '') {
  container.insertAdjacentHTML('beforeend', createLinkRowHtml(label, url));
}

function readLinkItems(container) {
  const rows = Array.from(container.querySelectorAll('.link-row'));
  const items = rows.map((row) => {
    const label = row.querySelector('.link-label').value.trim();
    const url = row.querySelector('.link-url').value.trim();
    if (!label && !url) {
      return null;
    }
    return { label, url };
  }).filter(Boolean);
  return items;
}

function renderBlocks() {
  if (!currentBlocks.length) {
    blockList.innerHTML = '';
    blockEmpty.classList.remove('hidden');
    return;
  }

  blockEmpty.classList.add('hidden');

  blockList.innerHTML = currentBlocks.map((block, index) => {
    const type = block.type || 'text';
    let body = '';

    if (type === 'text') {
      const htmlValue = escapeHtml(block.content?.html || '');
      body = `
        <label>HTML</label>
        <textarea rows="4" data-field="html">${htmlValue}</textarea>
        <div class="admin-actions">
          <button type="button" class="small-btn" data-action="save">Enregistrer</button>
        </div>
      `;
    } else if (type === 'image') {
      const url = escapeAttr(block.content?.url || '');
      const caption = escapeAttr(block.content?.caption || '');
      body = `
        <label>URL</label>
        <input type="text" data-field="url" value="${url}">
        <label>Legende</label>
        <input type="text" data-field="caption" value="${caption}">
        <div class="admin-actions">
          <button type="button" class="small-btn" data-action="save">Enregistrer</button>
        </div>
      `;
    } else if (type === 'links') {
      const items = Array.isArray(block.content?.items) ? block.content.items : [];
      const rows = items.length
        ? items.map((item) => createLinkRowHtml(item.label || '', item.url || '')).join('')
        : createLinkRowHtml('', '');

      body = `
        <div class="links-items">
          ${rows}
        </div>
        <div class="admin-actions">
          <button type="button" class="small-btn" data-action="add-link">Ajouter un lien</button>
          <button type="button" class="small-btn" data-action="save">Enregistrer</button>
        </div>
      `;
    } else {
      const fallback = escapeHtml(JSON.stringify(block.content || {}, null, 2));
      body = `
        <label>Contenu</label>
        <textarea rows="4" data-field="raw" disabled>${fallback}</textarea>
      `;
    }

    return `
      <div class="block-item" data-id="${escapeAttr(block.id)}" data-type="${escapeAttr(type)}" data-index="${index}">
        <div class="block-item-header">
          <strong>Bloc ${index + 1} - ${escapeHtml(type)}</strong>
          <div class="block-actions">
            <button type="button" class="small-btn" data-action="up">Monter</button>
            <button type="button" class="small-btn" data-action="down">Descendre</button>
            <button type="button" class="small-btn" data-action="delete">Supprimer</button>
          </div>
        </div>
        <div class="block-item-body">
          ${body}
        </div>
      </div>
    `;
  }).join('');
}

async function loadBlocks() {
  if (!currentCourse) {
    return;
  }

  const { data, error } = await supaClient
    .from('course_blocks')
    .select('id,course_id,type,content,order')
    .eq('course_id', currentCourse.id)
    .order('order', { ascending: true });

  if (error) {
    showAppError(error.message || 'Erreur lors du chargement des blocs.');
    return;
  }

  currentBlocks = data || [];
  renderBlocks();
}

function renderCourses(courses) {
  coursesById = new Map();
  if (!courses.length) {
    courseList.innerHTML = '';
    courseEmpty.classList.remove('hidden');
    return;
  }

  courseEmpty.classList.add('hidden');

  courseList.innerHTML = courses.map((course) => {
    coursesById.set(course.id, course);
    const title = escapeHtml(course.title || 'Cours');
    const description = escapeHtml(course.description || '');
    const status = course.status === 'published' ? 'published' : 'draft';
    const updatedAt = formatDate(course.updated_at);

    return `
      <li class="course-item">
        <h3>${title} <span class="muted">(${status})</span></h3>
        ${description ? `<p>${description}</p>` : ''}
        ${updatedAt ? `<p class="muted">Mise a jour : ${escapeHtml(updatedAt)}</p>` : ''}
        <div class="admin-actions">
          <button type="button" class="small-btn" data-action="select-course" data-id="${escapeAttr(course.id)}">Editer</button>
        </div>
      </li>
    `;
  }).join('');
}

async function loadCourses(selectedId) {
  clearAppMessages();
  clearCourseStates();

  const cached = readCoursesCache();
  if (cached) {
    setCoursesCache(cached.courses);
    showCourseLoading('Actualisation...');
  } else {
    renderCourseSkeleton();
    showCourseLoading('Chargement...');
  }

  const { data, error } = await supaClient
    .from('courses')
    .select('id,slug,title,description,status,updated_at')
    .order('updated_at', { ascending: false });

  if (error) {
    hideCourseLoading();
    if (!cached) {
      showAppError(error.message || 'Erreur lors du chargement des cours.');
    }
    return;
  }

  const courses = data || [];
  setCoursesCache(courses);
  hideCourseLoading();

  if (!courses.length) {
    resetCourseEditor();
    return;
  }

  if (selectedId && coursesById.has(selectedId)) {
    setCourseEditor(coursesById.get(selectedId));
    await loadBlocks();
    return;
  }

  if (currentCourse && !coursesById.has(currentCourse.id)) {
    resetCourseEditor();
  }
}

async function createCourse(event) {
  event.preventDefault();
  clearAppMessages();

  const payload = {
    title: courseTitle.value.trim(),
    description: courseDescription.value.trim(),
    slug: courseSlug.value.trim(),
    status: courseStatus.value
  };

  const { data, error } = await supaClient
    .from('courses')
    .insert(payload)
    .select()
    .single();

  if (error) {
    showAppError(formatWriteError(error));
    return;
  }

  courseCreateForm.reset();
  showAppMessage('Cours cree.');
  upsertCourse(data);
  setCourseEditor(data);
  currentBlocks = [];
  renderBlocks();
}

async function updateCourse(event) {
  event.preventDefault();
  clearAppMessages();

  if (!currentCourse) {
    showAppError('Aucun cours selectionne.');
    return;
  }

  const updates = {
    title: editTitle.value.trim(),
    description: editDescription.value.trim(),
    slug: editSlug.value.trim(),
    status: editStatus.value
  };

  const { data, error } = await supaClient
    .from('courses')
    .update(updates)
    .eq('id', currentCourse.id)
    .select()
    .single();

  if (error) {
    showAppError(formatWriteError(error));
    return;
  }

  showAppMessage('Cours mis a jour.');
  upsertCourse(data);
  setCourseEditor(data);
}

async function deleteCourse() {
  clearAppMessages();

  if (!currentCourse) {
    showAppError('Aucun cours selectionne.');
    return;
  }

  const confirmed = window.confirm('Supprimer ce cours et tous ses blocs ?');
  if (!confirmed) {
    return;
  }

  const { error } = await supaClient
    .from('courses')
    .delete()
    .eq('id', currentCourse.id);

  if (error) {
    showAppError(formatWriteError(error));
    return;
  }

  const deletedId = currentCourse.id;
  showAppMessage('Cours supprime.');
  resetCourseEditor();
  removeCourseFromCache(deletedId);
}

function getNextBlockOrder() {
  const maxOrder = currentBlocks.reduce((max, block) => {
    if (typeof block.order === 'number') {
      return Math.max(max, block.order);
    }
    return max;
  }, 0);
  return maxOrder + 1;
}

async function addTextBlock(event) {
  event.preventDefault();
  clearAppMessages();

  if (!currentCourse) {
    showAppError('Selectionnez un cours avant d\'ajouter un bloc.');
    return;
  }

  const html = blockTextHtml.value.trim();
  const payload = {
    course_id: currentCourse.id,
    type: 'text',
    content: { html },
    order: getNextBlockOrder()
  };

  const { error } = await supaClient
    .from('course_blocks')
    .insert(payload);

  if (error) {
    showAppError(formatWriteError(error));
    return;
  }

  blockTextForm.reset();
  showAppMessage('Bloc texte ajoute.');
  await loadBlocks();
}

async function addImageBlock(event) {
  event.preventDefault();
  clearAppMessages();

  if (!currentCourse) {
    showAppError('Selectionnez un cours avant d\'ajouter un bloc.');
    return;
  }

  const url = blockImageUrl.value.trim();
  const caption = blockImageCaption.value.trim();
  const payload = {
    course_id: currentCourse.id,
    type: 'image',
    content: { url, caption },
    order: getNextBlockOrder()
  };

  const { error } = await supaClient
    .from('course_blocks')
    .insert(payload);

  if (error) {
    showAppError(formatWriteError(error));
    return;
  }

  blockImageForm.reset();
  showAppMessage('Bloc image ajoute.');
  await loadBlocks();
}

function resetLinksForm() {
  linksItems.innerHTML = '';
  addLinkRow(linksItems, '', '');
}

async function addLinksBlock(event) {
  event.preventDefault();
  clearAppMessages();

  if (!currentCourse) {
    showAppError('Selectionnez un cours avant d\'ajouter un bloc.');
    return;
  }

  const items = readLinkItems(linksItems);
  if (!items.length) {
    showAppError('Ajoutez au moins un lien.');
    return;
  }

  const payload = {
    course_id: currentCourse.id,
    type: 'links',
    content: { items },
    order: getNextBlockOrder()
  };

  const { error } = await supaClient
    .from('course_blocks')
    .insert(payload);

  if (error) {
    showAppError(formatWriteError(error));
    return;
  }

  resetLinksForm();
  showAppMessage('Bloc liens ajoute.');
  await loadBlocks();
}

async function saveBlock(blockElement) {
  const blockId = blockElement.dataset.id;
  const type = blockElement.dataset.type;
  let content = {};

  if (type === 'text') {
    const textarea = blockElement.querySelector('textarea[data-field="html"]');
    content = { html: textarea.value.trim() };
  } else if (type === 'image') {
    const urlInput = blockElement.querySelector('input[data-field="url"]');
    const captionInput = blockElement.querySelector('input[data-field="caption"]');
    content = {
      url: urlInput.value.trim(),
      caption: captionInput.value.trim()
    };
  } else if (type === 'links') {
    const items = readLinkItems(blockElement.querySelector('.links-items'));
    content = { items };
  }

  const { error } = await supaClient
    .from('course_blocks')
    .update({ content })
    .eq('id', blockId);

  if (error) {
    showAppError(formatWriteError(error));
    return;
  }

  showAppMessage('Bloc mis a jour.');
  await loadBlocks();
}

async function deleteBlock(blockElement) {
  const blockId = blockElement.dataset.id;
  const confirmed = window.confirm('Supprimer ce bloc ?');
  if (!confirmed) {
    return;
  }

  const { error } = await supaClient
    .from('course_blocks')
    .delete()
    .eq('id', blockId);

  if (error) {
    showAppError(formatWriteError(error));
    return;
  }

  showAppMessage('Bloc supprime.');
  await loadBlocks();
}

async function reorderBlock(index, direction) {
  const targetIndex = index + direction;
  if (targetIndex < 0 || targetIndex >= currentBlocks.length) {
    return;
  }

  const current = currentBlocks[index];
  const target = currentBlocks[targetIndex];
  if (!current || !target) {
    return;
  }

  const currentOrder = typeof current.order === 'number' ? current.order : index;
  const targetOrder = typeof target.order === 'number' ? target.order : targetIndex;

  const { error: errorA } = await supaClient
    .from('course_blocks')
    .update({ order: targetOrder })
    .eq('id', current.id);

  if (errorA) {
    showAppError(formatWriteError(errorA));
    return;
  }

  const { error: errorB } = await supaClient
    .from('course_blocks')
    .update({ order: currentOrder })
    .eq('id', target.id);

  if (errorB) {
    showAppError(formatWriteError(errorB));
    return;
  }

  await loadBlocks();
}

function handleBlockListClick(event) {
  const action = event.target.dataset.action;
  if (!action) {
    return;
  }

  const blockElement = event.target.closest('.block-item');
  if (!blockElement) {
    return;
  }

  if (action === 'add-link') {
    const container = blockElement.querySelector('.links-items');
    addLinkRow(container, '', '');
    return;
  }

  if (action === 'remove-link') {
    const row = event.target.closest('.link-row');
    if (!row) {
      return;
    }
    const container = row.parentElement;
    const rows = container.querySelectorAll('.link-row');
    if (rows.length <= 1) {
      row.querySelector('.link-label').value = '';
      row.querySelector('.link-url').value = '';
      return;
    }
    row.remove();
    return;
  }

  const index = Number(blockElement.dataset.index);

  if (action === 'up') {
    reorderBlock(index, -1);
    return;
  }

  if (action === 'down') {
    reorderBlock(index, 1);
    return;
  }

  if (action === 'delete') {
    deleteBlock(blockElement);
    return;
  }

  if (action === 'save') {
    saveBlock(blockElement);
  }
}

function handleCourseListClick(event) {
  const action = event.target.dataset.action;
  if (action !== 'select-course') {
    return;
  }

  const courseId = event.target.dataset.id;
  if (!courseId) {
    return;
  }

  clearAppMessages();
  setCourseEditor(coursesById.get(courseId));
  loadBlocks();
}

async function updateUI(session) {
  if (session?.user) {
    clearLoginMessage();
    showElement(loginSection, false);
    showElement(dashboard, true);
    userEmail.textContent = session.user.email || '-';
    await loadCourses(currentCourse?.id);
  } else {
    showElement(loginSection, true);
    showElement(dashboard, false);
    resetCourseEditor();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log("submit login d\u00e9tect\u00e9");
    clearLoginMessage();

    if (!isConfigReady()) {
      showLoginError('Configurez SUPABASE_URL et SUPABASE_ANON_KEY dans admin/admin.js.');
      return;
    }

    const email = loginEmail.value.trim();
    const password = loginPassword.value;

    const { error } = await supaClient.auth.signInWithPassword({ email, password });
    if (error) {
      showLoginError(error.message || 'Connexion impossible.');
      return;
    }

    loginForm.reset();
  });

  logoutBtn.addEventListener('click', async () => {
    clearAppMessages();
    await supaClient.auth.signOut();
  });

  courseCreateForm.addEventListener('submit', createCourse);
  courseEditForm.addEventListener('submit', updateCourse);
  courseDeleteBtn.addEventListener('click', deleteCourse);
  blockTextForm.addEventListener('submit', addTextBlock);
  blockImageForm.addEventListener('submit', addImageBlock);
  blockLinksForm.addEventListener('submit', addLinksBlock);
  courseList.addEventListener('click', handleCourseListClick);
  blockList.addEventListener('click', handleBlockListClick);
  addLinkItemBtn.addEventListener('click', () => addLinkRow(linksItems, '', ''));

  supaClient.auth.onAuthStateChange((event, session) => {
    console.log("auth state change", session);
    updateUI(session);
  });

  (async () => {
    if (!isConfigReady()) {
      showLoginError('Configurez SUPABASE_URL et SUPABASE_ANON_KEY dans admin/admin.js.');
      lockLoginForm();
      return;
    }

    resetLinksForm();
    const { data } = await supaClient.auth.getSession();
    updateUI(data.session);
  })();
});
})();
