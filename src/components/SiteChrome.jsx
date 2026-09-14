import React, { useEffect, useState } from 'react';
const links = [['Services', '#services'], ['Our Work', '#clients'], ['Locations', '#destinations'], ['About Parekh', '#why-offsiteio'], ['FAQs', '#faq']];
export default function SiteChrome() {
  const [open, setOpen] = useState(false);
  const [showCta, setShowCta] = useState(false);
  useEffect(() => { const onScroll = () => setShowCta(window.scrollY > Math.max(260, window.innerHeight * .65)); window.addEventListener('scroll', onScroll, { passive: true }); onScroll(); return () => window.removeEventListener('scroll', onScroll); }, []);
  const close = () => setOpen(false);
  return <>
    <div className="cursor-wrapper"><div className="cursor" /></div>
    <header className={`navbar w-nav ${open ? 'nav-is-open' : ''}`}><div className="nav-container">
      <a href="#Hero" className="nav-brand w-nav-brand" onClick={close}><img src="assets/parekh-productions-logo.png" alt="Parekh Productions" className="logo" /></a>
      <nav className={`nav-menu-block w-nav-menu ${open ? 'w--open' : ''}`} aria-label="Primary navigation"><div className="nav-links-wrapper">{links.map(([label, href]) => <a key={href} href={href} className="menu-link-clas" onClick={close}>{label}</a>)}</div><div className="nav-cta-block-mobile"><a href="#Contact" className="button-secondary-v2" onClick={close}>Book a Consultation</a></div></nav>
      <div className={`nav-cta-block nav-scroll-cta ${showCta ? 'is-visible' : ''}`}><a href="#Contact" className="button-primary" onClick={close}>Book a Consultation</a></div>
      <button type="button" className="nav-menu-button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(value => !value)}><span /><span /><span /></button>
    </div></header>
  </>;
}
