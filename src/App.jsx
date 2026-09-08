import React, { useEffect, useRef } from 'react';
import legacyMarkup from './legacy-body.html?raw';

const runtimeScripts = [
  '/assets/vendor/316749041a62.js',
  '/assets/vendor/e9d4f19029da.js',
  '/assets/vendor/69b1ef85bbc4.js',
  '/assets/vendor/5e5cb824e0f7.js',
  '/assets/vendor/55ccea4552c7.js',
  '/assets/vendor/fe1ca3aa5ed9.js',
  '/assets/vendor/960866c1c4f8.js',
];

const visualMarkup = legacyMarkup
  .replace(/<script[^>]+src="assets\/vendor\/[^\"]+"[^>]*><\/script>/gi, '')
  .replace(/<script>\s*\$\("\.slider-main_component"\)[\s\S]*?<\/script>/gi, '');

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[data-offsiteio-runtime="${src}"]`);
    if (existing) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = false;
    script.dataset.offsiteioRuntime = src;
    script.onload = resolve;
    script.onerror = () => reject(new Error(`Could not load local runtime: ${src}`));
    document.body.appendChild(script);
  });
}

function initializeLocalSwipers() {
  const $ = window.jQuery;
  const Swiper = window.Swiper;
  if (!$ || !Swiper) return;

  $('.slider-main_component').each(function initializeSwiper() {
    let loopMode = false;
    if ($(this).attr('loop-mode') === 'true') loopMode = true;

    let sliderDuration = 300;
    if ($(this).attr('slider-duration') !== undefined) {
      sliderDuration = +$(this).attr('slider-duration');
    }

    new Swiper($(this).find('.swiper')[0], {
      speed: sliderDuration,
      loop: loopMode,
      autoHeight: false,
      centeredSlides: loopMode,
      followFinger: true,
      freeMode: false,
      slideToClickedSlide: false,
      slidesPerView: 1,
      spaceBetween: '4%',
      rewind: false,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      mousewheel: { forceToAxis: true },
      keyboard: { enabled: true, onlyInViewport: true },
      breakpoints: {
        480: { slidesPerView: 1, spaceBetween: '4%' },
        768: { slidesPerView: 2, spaceBetween: '4%' },
        992: { slidesPerView: 3, spaceBetween: '2%' },
      },
      pagination: {
        el: $(this).find('.swiper-bullet-wrapper')[0],
        bulletActiveClass: 'is-active',
        bulletClass: 'swiper-bullet',
        bulletElement: 'button',
        clickable: true,
      },
      navigation: {
        nextEl: $(this).find('.swiper-next')[0],
        prevEl: $(this).find('.swiper-prev')[0],
        disabledClass: 'is-disabled',
      },
      scrollbar: {
        el: $(this).find('.swiper-drag-wrapper')[0],
        draggable: true,
        dragClass: 'swiper-drag',
        snapOnRelease: true,
      },
      slideActiveClass: 'is-active',
      slideDuplicateActiveClass: 'is-active',
    });
  });
}

function App() {
  const pageRef = useRef(null);

  useEffect(() => {
    const html = document.documentElement;
    html.dataset.wfDomain = 'localhost';
    html.dataset.wfPage = '678768b2aa54e5fbec5d2fd9';
    html.dataset.wfSite = '678768b1aa54e5fbec5d2f79';
    html.lang = 'en';

    const year = pageRef.current?.querySelector('#Year');
    if (year) year.textContent = new Date().getFullYear();

    let cancelled = false;
    (async () => {
      try {
        // Insert all local runtime files together so asset-heavy hosts do not
        // serialize every script download behind the previous file.
        await Promise.all(runtimeScripts.map(loadScript));
        // Runtime scripts are loaded after document parsing in React, so replay
        // the lifecycle event Webflow uses for page-load interactions.
        document.dispatchEvent(new Event('readystatechange'));
        if (!cancelled) initializeLocalSwipers();
      } catch (error) {
        console.error(error);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return <div ref={pageRef} className="contents" dangerouslySetInnerHTML={{ __html: visualMarkup }} />;
}

export default App;
