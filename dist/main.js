(()=>{"use strict";const t=(t,e)=>(console.log(t),"high"===e||"low"===e?t.daily[0].temp["high"===e?"max":"min"]:"pop"===e?t.daily[0][e]:t.current[e]),e=async t=>{const e=await fetch(`/.netlify/functions/token-hider/token-hider?q=${n=t,n.split(",").map((t=>t.trim())).join(",")}`).catch((t=>console.log(t)));var n;return console.log(e),200!==e.status&&console.error(`${e.status}: ${e.body}`),await e.json().catch((t=>console.log(t)))},n=(t,e)=>{const n=document.createElement("div");n.classList.add("data__block");const o=document.createElement("span");o.classList.add("data__value"),o.textContent=e;const a=document.createElement("label");return a.classList.add("data__label"),a.textContent=t,n.append(o,a),n},o=t=>{const e=new Date(1e3*t),n=e.getHours()>12?e.getHours()-12:e.getHours();return`${n}:${e.getMinutes()}${n>=12?"PM":"AM"}`};(async()=>{const a=await e("San Diego"),s=document.getElementById("data-section"),c=t(a,"high"),d=t(a,"low"),i=n("High",c),l=n("Low",d);s.append(i,l);const r=t(a,"wind_speed").toFixed(1),u=t(a,"pop"),p=n("Wind",`${r}mph`),g=n("Rain",`${u}%`);s.append(p,g);const m=o(t(a,"sunrise")),h=o(t(a,"sunset")),w=n("Sunrise",m),y=n("Sunset",h);s.append(w,y)})(),(()=>{const t=new Date;document.getElementById("date").textContent=t.toDateString()})()})();