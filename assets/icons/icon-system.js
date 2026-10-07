(()=>{
  const base='assets/icons/';
  const gameById={coin:'coin-scramble',tag:'plaza-tag',quiz:'room-quiz',balloon:'balloon-pop',sprint:'plaza-sprint',fishing:'pond-fishing',floor:'tumble-tiles',connect4:'four-in-a-row',tictactoe:'noughts-and-crosses',scavenger:'village-scavenger',relay:'obstacle-relay',potato:'hot-potato',simon:'mayor-says',hide:'hide-and-seek',statues:'musical-statues',memory:'memory-match',pattern:'pattern-parade',draw:'draw-and-guess',cats:'cat-herding',bridge:'bridge-builders',curling:'coin-curling',charades:'emote-charades',sneaky:'sneaky-snug',snap:'scavenger-snap',puffs:'dodge-puffs',freeze:'freeze-tag',treasure:'treasure-dig',snowball:'snowball-toss',lantern:'lantern-hunt',petal:'petal-catch'};
  const gameByName={};
  Object.values(gameById).forEach(slug=>gameByName[slug.replaceAll('-',' ')]=slug);
  Object.assign(gameByName,{'noughts & crosses':'noughts-and-crosses','hide & seek':'hide-and-seek'});
  const img=(name,extra='')=>{const node=document.createElement('img');node.className=`cs-custom-icon ${extra}`.trim();node.src=`${base}${name}.svg`;node.alt='';node.setAttribute('aria-hidden','true');return node;};
  const replaceGraphic=(button,name)=>{
    if(!button||button.dataset.csIcon===name)return;
    button.dataset.csIcon=name;button.classList.add('cs-iconified');
    const old=button.querySelector(':scope > svg,:scope > .cs-custom-icon');
    const icon=img(name);
    if(old)old.replaceWith(icon);else button.prepend(icon);
  };
  const gameSlugFromText=text=>{
    const value=String(text||'').toLowerCase();
    return Object.entries(gameByName).find(([name])=>value.includes(name))?.[1]||null;
  };
  const enhance=root=>{
    if(!(root instanceof Element||root===document))return;
    const scope=root===document?document:root;
    scope.querySelectorAll?.('.tabbar button').forEach(button=>{
      const label=button.textContent.trim().toLowerCase();
      replaceGraphic(button,label==='world'?'plaza':label==='play'?'minigames':label.includes('home')?'house':label==='style'?'style':'play');
    });
    scope.querySelectorAll?.('.practice-grid [data-solo-game]').forEach(button=>{
      const slug=gameById[button.dataset.soloGame];if(!slug)return;
      const mark=button.querySelector('.practice-mark');if(!mark||mark.dataset.csIcon)return;
      mark.dataset.csIcon=slug;mark.replaceChildren(img(`minigame-${slug}`));
    });
    scope.querySelectorAll?.('.room-game-hud,.play-entry.active').forEach(panel=>{
      const slug=gameSlugFromText(panel.textContent);if(!slug||panel.dataset.csGameIcon===slug)return;
      panel.dataset.csGameIcon=slug;panel.classList.add('cs-has-game-icon');
      panel.querySelector(':scope > .cs-live-game-icon')?.remove();panel.prepend(img(`minigame-${slug}`,'cs-live-game-icon'));
    });
    scope.querySelectorAll?.('button,a').forEach(button=>{
      const clue=`${button.getAttribute('aria-label')||''} ${button.getAttribute('title')||''} ${button.textContent||''}`.trim().toLowerCase();
      let name='';
      if(button.closest('.tabbar,.practice-grid,.snug-start-panel'))return;
      if(clue.includes('pause')||clue.includes('help'))name='pause-help';
      else if(clue.includes('notification')||clue.includes('notify me'))name='notifications';
      else if(clue.includes('voice')||clue.includes('microphone')||button.classList.contains('voice-toggle-dock'))name='voice';
      else if(clue.includes('local chat')||clue==='chat'||clue.includes('open chat'))name='chat';
      else if(clue.includes('photo mode')||clue.includes('take photo')||clue.includes('capture photo'))name='photo';
      else if(clue.includes('rotate camera left'))name='camera-left';
      else if(clue.includes('rotate camera right'))name='camera-right';
      else if(clue.includes('zoom camera in'))name='camera-zoom-in';
      else if(clue.includes('zoom camera out'))name='camera-zoom-out';
      else if(clue.includes('camera controls'))name='camera-controls';
      else if(button.classList.contains('shop-link')||clue.includes('browse unlocks')||clue==='shop')name='shop';
      if(name)replaceGraphic(button,name);
    });
  };
  const run=()=>enhance(document);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
  new MutationObserver(records=>records.forEach(record=>record.addedNodes.forEach(node=>{if(node.nodeType===1)enhance(node);}))).observe(document.documentElement,{childList:true,subtree:true});
  addEventListener('snug-minigame-start',run);
  window.__cylindricIconSystem={version:'0.9.45',enhance:run,gameById};
})();
