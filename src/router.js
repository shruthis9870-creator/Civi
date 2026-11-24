/**
 * CivicFix - Router Service
 * Hash-based Single Page Application Router
 */

export class Router {
  constructor(routes = {}) {
    this.routes = routes;
    this.currentPath = '';
    window.addEventListener('hashchange', () => this.handleRoute());
  }

  addRoute(path, handler) {
    this.routes[path] = handler;
  }

  navigate(hash) {
    window.location.hash = hash;
  }

  handleRoute() {
    const rawHash = window.location.hash || '#/';
    this.currentPath = rawHash;
    const [path] = rawHash.split('?');
    const parts = path.split('/').filter(Boolean);

    // Scroll viewport to top
    const viewport = document.getElementById('app-viewport');
    if (viewport) viewport.scrollTop = 0;
    window.scrollTo(0, 0);

    // Update screen selector dropdown in dev bar
    const jumper = document.getElementById('screen-jumper');
    if (jumper) jumper.value = path;

    // If route is admin, redirect to dedicated admin command center
    if (path.startsWith('#/admin') || path.startsWith('#admin')) {
      const adminTarget = `admin.html${path.replace('#/', '#')}`;
      window.location.href = adminTarget;
      return;
    }

    // Check exact match
    if (this.routes[path]) {
      this.routes[path]();
      this.updateBottomNav(path);
      return;
    }

    // Dynamic routes
    if (path.startsWith('#/report/success')) {
      const ticketId = parts[2] || 'CF-2026-00124';
      if (this.routes['#/report/success/:id']) {
        this.routes['#/report/success/:id'](ticketId);
        this.updateBottomNav(path);
        return;
      }
    }

    if (path.startsWith('#/complaint/')) {
      const ticketId = parts[1] || 'CF-2026-00124';
      if (this.routes['#/complaint/:id']) {
        this.routes['#/complaint/:id'](ticketId);
        this.updateBottomNav(path);
        return;
      }
    }

    // Default route
    if (this.routes['#/']) {
      this.routes['#/']();
    }
    this.updateBottomNav(path);
  }

  updateBottomNav(path) {
    const nav = document.getElementById('global-nav');
    if (!nav) return;

    const showOn = ['#/my-complaints', '#/profile', '#/notifications', '#/complaint/'];
    const shouldShow = showOn.some(prefix => path.startsWith(prefix));

    if (shouldShow) {
      nav.classList.remove('hidden');
    } else {
      nav.classList.add('hidden');
    }

    const links = nav.querySelectorAll('a[data-path]');
    links.forEach(a => {
      const dataPath = a.getAttribute('data-path');
      let isActive = false;
      if (dataPath === 'home' && (path === '#/' || path === '#/landing')) isActive = true;
      if (dataPath === 'my-complaints' && (path === '#/my-complaints' || path.startsWith('#/complaint/'))) isActive = true;
      if (dataPath === 'profile' && (path === '#/profile' || path === '#/notifications')) isActive = true;
      if (dataPath === 'explore' && path.startsWith('#/report')) isActive = true;

      if (isActive) {
        a.className = 'flex flex-col items-center justify-center min-w-[56px] h-12 text-primary font-semibold transition-colors';
      } else {
        a.className = 'flex flex-col items-center justify-center min-w-[56px] h-12 text-on-surface-variant hover:text-primary transition-colors';
      }
    });
  }
}
