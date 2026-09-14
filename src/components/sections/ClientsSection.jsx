import React from 'react';

const groups = [
  { title: 'Corporate Expo', items: ['Screentex India 2023 - photos and highlight video - 1 day', 'Phoenix Hospitality - photos - 1 day', 'Finbridge Expo 2024 - Mumbai - photos and highlight video - 2 days', 'Finbridge Expo 2024 - Ahmedabad - photos and highlight video - 2 days', 'Finbridge Expo 2025 - Mumbai - photos and highlight video - 2 days', 'IFTEX India Expo 2026 - photos and four highlight videos - 3 days', 'Finbridge Expo 2026 - photos and highlight video - 2 days'] },
  { title: 'Festivals & Concerts', items: ['YV Care Festival 2023 - 2 day event', 'Celebrities: Ali Sagar, Amy Aela & Shreya Ghodavat, Sneha Ullal, Rajpal Yadav, Sara Khan', 'Performances: Kabir Cafe, Shaina Super Squad, Shin Hong, Jungles Band, Takshaka'] },
  { title: 'Product Launches', items: ['ZEISS - photos and reel video - 1 day', 'Yamaha Shoot - photos and reel video - 1 day'] },
  { title: 'Sports Events', items: ['Himalaya brand shoot in collaboration with Bangalore Indian Cricket Team', 'Concern India sports event'] },
  { title: 'Ad Films', items: ['Volvo Ad film', 'Coolberg Ad film', 'Goldmedal India', 'WAQT Ad film'] },
  { title: 'Films & Shows', items: ['Short Film - Abla Movie', 'Motriedien', 'Ganga - Show', 'Upcoming Ganga Show - full production - Tridevi, Kshamta, Aavaran'] },
  { title: 'Jewellery', items: ['Two highlight videos and photography for a jewellery brand'] },
];

export default function ClientsSection() {
  return <div id="clients" className="clients-inline"><div className="clients-heading"><div className="section-caption"><div className="section-caption-text">OUR CLIENTS</div></div><h2>Work we have produced</h2><p>Explore selected corporate events, launches, concerts, campaigns and productions delivered by Parekh Productions.</p></div><div className="clients-grid">{groups.map(group => <article className="client-card" key={group.title}><h3>{group.title}</h3><ul>{group.items.map(item => <li key={item}>{item}</li>)}</ul><div className="client-card-media">Photos &amp; videos</div></article>)}</div></div>;
}
