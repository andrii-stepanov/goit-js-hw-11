import{a as u,S as m,i as c}from"./assets/vendor-BJQmnyJ4.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const d="49339894-31872ba4c3578b0a106bd0c96",g="https://pixabay.com/api/";async function p(a){const t=await u.get(g,{params:{key:d,q:a,image_type:"photo",orientation:"horizontal",safesearch:!0,lang:"en"}});if(t.data.hits.length===0)throw new Error("Sorry, there are no images matching your search query. Please try again!");return t.data}let l;const f=({webformatURL:a,largeImageURL:t,tags:o,likes:s,views:e,comments:r,downloads:n})=>`
    <li class="gallery-item">
      <a class="gallery-link" href="${t}">
        <img
          class="gallery-image"
          src="${a}"
          alt="${o}"
          loading="lazy"
        />
      </a>
      <ul class="description-list">
        <li class="description"><span>Likes:</span> ${s}</li>
        <li class="description"><span>Views:</span> ${e}</li>
        <li class="description"><span>Comments:</span> ${r}</li>
        <li class="description"><span>Downloads:</span> ${n}</li>
      </ul>
    </li>`,h=()=>{l?l.refresh():l=new m(".gallery a",{captions:!0,captionDelay:250,captionsData:"alt"})},i={searchForm:document.querySelector(".form"),imageGallery:document.querySelector(".gallery"),loaderBackdrop:document.querySelector(".backdrop")},y=()=>i.loaderBackdrop.classList.remove("is-hidden"),L=()=>i.loaderBackdrop.classList.add("is-hidden"),b=a=>{c.error({messageColor:"#fff",backgroundColor:"#ef4040",position:"topRight",message:a,timeout:5e3})},S=a=>{a.preventDefault();const t=a.currentTarget.elements["search-text"].value.trim();if(t===""){b("Please enter a search query!");return}y(),i.imageGallery.innerHTML="",p(t).then(({hits:o})=>{if(!o.length){c.error({messageColor:"#fff",close:!1,backgroundColor:"#ef4040",position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!",timeout:1e4});return}const s=o.map(f).join("");i.imageGallery.innerHTML=s,h(),i.searchForm.reset()}).catch(o=>{c.error({messageColor:"#fff",backgroundColor:"#ef4040",position:"topRight",message:`Oops! ${o.message||"Something went wrong. Please try again later."}`,timeout:1e4})}).finally(()=>{L()})};i.searchForm.addEventListener("submit",S);
//# sourceMappingURL=index.js.map
