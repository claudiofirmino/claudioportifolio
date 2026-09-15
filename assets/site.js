document.addEventListener('DOMContentLoaded', () => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    if (reducedMotion || !('IntersectionObserver' in window)) {
      revealEls.forEach(el => el.classList.add('is-visible'));
    } else {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.16, rootMargin: '0px 0px -6% 0px' });
      revealEls.forEach(el => observer.observe(el));
    }
  }

  function resetMediaExcept(currentPoster) {
    document.querySelectorAll('.media-poster.playing').forEach(poster => {
      if (poster === currentPoster) return;
      const activeMedia = poster.querySelector('.inline-video, .embed-frame');
      if (activeMedia) {
        if (activeMedia.tagName === 'VIDEO') {
          try { activeMedia.pause(); } catch (e) {}
        }
        activeMedia.remove();
      }
      poster.classList.remove('playing');
    });
  }

  document.querySelectorAll('.media-entry[data-inline-media], .media-entry[data-embed-src]').forEach(entry => {
    const button = entry.querySelector('.play-btn');
    const poster = entry.querySelector('.media-poster');
    const localVideoSrc = entry.getAttribute('data-inline-media');
    const embedSrc = entry.getAttribute('data-embed-src');
    const embedKind = entry.getAttribute('data-embed-kind') || (embedSrc ? 'iframe' : 'video');
    const src = embedSrc || localVideoSrc;

    if (!button || !poster || !src) return;

    button.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();

      resetMediaExcept(poster);

      let activeMedia = poster.querySelector('.inline-video, .embed-frame');
      if (!activeMedia) {
        if (embedKind === 'video') {
          const video = document.createElement('video');
          video.className = 'inline-video';
          video.src = src;
          video.controls = true;
          video.playsInline = true;
          video.preload = 'metadata';
          poster.appendChild(video);
          poster.classList.add('playing');
          video.play().catch(() => {});
          video.addEventListener('ended', () => { video.currentTime = 0; });
          activeMedia = video;
        } else {
          const iframe = document.createElement('iframe');
          iframe.className = 'embed-frame';
          iframe.src = src;
          iframe.title = entry.getAttribute('data-embed-title') || 'Vídeo incorporado';
          iframe.loading = 'lazy';
          iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
          iframe.allowFullscreen = true;
          iframe.referrerPolicy = 'strict-origin-when-cross-origin';
          poster.appendChild(iframe);
          poster.classList.add('playing');
          activeMedia = iframe;
        }
      }
    });
  });
});

// YouTube error 153: a local file (file://) does not send the HTTP Referer
// required by YouTube. When hosted on HTTP/HTTPS the same embed works normally.
if (window.location.protocol === 'file:') {
  const warning = document.createElement('div');
  warning.className = 'local-preview-warning is-visible';
  warning.innerHTML = '<strong>Prévia local:</strong> para o player do YouTube funcionar sem o erro 153, abra o site pelo arquivo <strong>ABRIR_SITE.command</strong> (Mac) ou <strong>ABRIR_SITE_WINDOWS.bat</strong> (Windows), em vez de abrir o index.html diretamente.';
  document.body.appendChild(warning);
}
