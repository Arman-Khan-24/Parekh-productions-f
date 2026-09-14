import React, { useEffect, useLayoutEffect, useRef } from 'react';
import SiteChrome from './components/SiteChrome.jsx';
import MainContent from './components/MainContent.jsx';
import FooterSection from './components/FooterSection.jsx';

const runtimeScripts = [
  '/assets/vendor/316749041a62.js',
  '/assets/vendor/e9d4f19029da.js',
  '/assets/vendor/69b1ef85bbc4.js',
  '/assets/vendor/5e5cb824e0f7.js',
  '/assets/vendor/55ccea4552c7.js',
  '/assets/vendor/fe1ca3aa5ed9.js',
  '/assets/vendor/960866c1c4f8.js',
];

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector('script[data-offsiteio-runtime="' + src + '"]');
    if (existing) return resolve();
    const script = document.createElement('script');
    script.src = src;
    script.async = false;
    script.dataset.offsiteioRuntime = src;
    script.onload = resolve;
    script.onerror = () => reject(new Error('Could not load local runtime: ' + src));
    document.body.appendChild(script);
  });
}

function initializeLocalSwipers() {
  const $ = window.jQuery;
  const Swiper = window.Swiper;
  if (!$ || !Swiper) return;
  $('.slider-main_component').each(function initializeSwiper() {
    const root = $(this);
    new Swiper(root.find('.swiper')[0], {
      speed: Number(root.attr('slider-duration')) || 300,
      loop: root.attr('loop-mode') === 'true',
      slidesPerView: 1,
      spaceBetween: '4%',
      autoplay: { delay: 3000, disableOnInteraction: false },
      mousewheel: { forceToAxis: true },
      keyboard: { enabled: true, onlyInViewport: true },
      breakpoints: { 480: { slidesPerView: 1, spaceBetween: '4%' }, 768: { slidesPerView: 2, spaceBetween: '4%' }, 992: { slidesPerView: 3, spaceBetween: '2%' } },
      pagination: { el: root.find('.swiper-bullet-wrapper')[0], clickable: true },
      navigation: { nextEl: root.find('.swiper-next')[0], prevEl: root.find('.swiper-prev')[0] },
      scrollbar: { el: root.find('.swiper-drag-wrapper')[0], draggable: true },
    });
  });
}

function initializeViewportVideoPlayback() {
  const videos = Array.from(document.querySelectorAll('video'));
  if (!videos.length) return () => {};

  document.querySelectorAll('[data-autoplay="true"]').forEach((element) => {
    element.setAttribute('data-autoplay', 'false');
  });

  videos.forEach((video) => {
    video.autoplay = false;
    video.removeAttribute('autoplay');
    video.preload = 'none';
    video.muted = true;
    video.playsInline = true;
  });

  if (!('IntersectionObserver' in window)) {
    videos.forEach((video) => video.play().catch(() => {}));
    return () => {};
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      const video = target;
      if (isIntersecting) {
        if (video.readyState === 0) video.load();
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, { rootMargin: '300px 0px', threshold: 0.01 });

  videos.forEach((video) => observer.observe(video));
  return () => observer.disconnect();
}

export default function App() {
  const pageRef = useRef(null);
  useLayoutEffect(() => initializeViewportVideoPlayback(), []);
  useEffect(() => {
    const html = document.documentElement;
    html.dataset.wfDomain = 'localhost';
    html.dataset.wfPage = '678768b2aa54e5fbec5d2fd9';
    html.dataset.wfSite = '678768b1aa54e5fbec5d2f79';
    html.lang = 'en';
    const year = pageRef.current?.querySelector('#Year');
    if (year) year.textContent = new Date().getFullYear();
    const contact = pageRef.current?.querySelector('.footer');
    if (contact) contact.id = 'Contact';
    let cancelled = false;
    Promise.all(runtimeScripts.map(loadScript)).then(() => {
      document.dispatchEvent(new Event('readystatechange'));
      if (!cancelled) initializeLocalSwipers();
    }).catch(error => console.error(error));
    return () => { cancelled = true; };
  }, []);
  return <div ref={pageRef} className="contents"><SiteChrome /><MainContent /><FooterSection /><a className="whatsapp-float" href="https://wa.me/918657754937" target="_blank" rel="noreferrer" aria-label="Chat with Parekh Productions on WhatsApp"><svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M19.11 17.23c-.27-.14-1.59-.78-1.84-.87-.25-.09-.43-.14-.61.14-.18.27-.7.87-.86 1.05-.16.18-.32.2-.59.07-.27-.14-1.12-.41-2.14-1.32-.79-.7-1.32-1.56-1.48-1.83-.16-.27-.02-.42.12-.56.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27s.98 2.63 1.11 2.81c.14.18 1.92 2.93 4.65 4.11.65.28 1.16.45 1.56.58.66.21 1.26.18 1.74.11.53-.08 1.59-.65 1.82-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.32ZM16.02 4.27a11.65 11.65 0 0 0-9.89 17.8L4.5 27.5l5.56-1.59a11.65 11.65 0 1 0 5.96-21.64Zm0 21.22c-1.94 0-3.83-.52-5.49-1.5l-.39-.23-3.3.94.96-3.21-.25-.4a9.64 9.64 0 1 1 8.47 4.4Z"/></svg></a></div>;
}
