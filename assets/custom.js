// Product page.
if (document.body.classList.contains('product')) {
  let items = document.querySelectorAll('.Product__SlideshowNavItem').length;
  let isArrow = false;
  if (items > 6) {
    isArrow = true;
  }
  var flkty = new Flickity( '.Product__SlideshowNav', {
    asNavFor: ".Product__Slideshow",
    cellAlign: 'left',
    groupCells: true,
    pageDots: false,
    prevNextButtons: isArrow,
    adaptiveHeight: true
  });
  
  var flkty2 = new Flickity( '.Product__Slideshow', {
    pageDots: true,
    adaptiveHeight: true,
    prevNextButtons: true
  });

  // let initMediaID  = document.querySelector('.Product__Slideshow').getAttribute('data-featured_media-id');
  // let itemSlide = document.querySelectorAll('.Product__Slideshow .product__media-item');
  // let initIndex;
  // itemSlide.forEach(function(item) {
  //   if (item.getAttribute('data-media-id').includes(initMediaID)) {
  //     initIndex = parseInt(item.getAttribute('data-index'));
  //   }
  // })

  // flkty.select(initIndex);
  // flkty2.select(initIndex);

  // document.querySelectorAll('.select-size .size-item').forEach((item) =>{
  //   item.addEventListener('click', function(e) {
  //     e.target.closest('.select-size').classList.toggle('show');
  //   });
  // })
}

// Article 
if (document.body.classList.contains('article')) {
  if (window.innerWidth < 750) {
    var flkty = new Flickity( '.related-blogs--content', {
      cellAlign: 'left',
      groupCells: true,
      pageDots: true,
      prevNextButtons: false,
      adaptiveHeight: true
    });
  }

}
// Cart drawer
document.querySelector('body').addEventListener('click', function (e) {
  const drawer = e.target.closest('#cart-notification');
  const cartBtn = e.target.closest('[data-action="open-drawer"]');
  if (drawer) {return}
  if (cartBtn) {
    e.preventDefault();
    if (document.body.classList.contains('template-cart') == false) {
      var data = cartBtn.getAttribute('data-drawer-id');
      if (data) {
        document.getElementById(data).classList.add('active');
        document.querySelector('.PageOverlay').classList.add('is-visible');
        document.querySelector('body').classList.add('overflow-hidden');
      }
    }
  }
  else {
    document.querySelector('.PageOverlay').classList.remove('is-visible');
    document.querySelector('body').classList.remove('overflow-hidden');
    document.getElementById('cart-notification').classList.remove('active');
  }
});

// Tab product.
const tabItems = document.querySelectorAll('.product-recommendations__heading');
if (tabItems.length != 0) {
  tabItems.forEach(item => {
    item.addEventListener('click', function(e) {

      document.querySelector('.is-active').classList.remove('is-active');
      e.target.classList.add('is-active');
      let tabID = e.target.getAttribute('aria-controls');

      document.querySelector('[aria-hidden="false"]').setAttribute('aria-hidden', 'true');
      document.getElementById(tabID).setAttribute('aria-hidden', 'false');

      let parentElm = document.getElementById(tabID);
      let element = parentElm.querySelector('.Carousel');
  
      var swiper = new Swiper(".product-slider", {
        loop: true,
        slidesPerView: 2,
        spaceBetween: 20,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        breakpoints: {
          640: {
            slidesPerView: 2,
             centeredSlides: true
          },
          768: {
            slidesPerView: 3,
            centeredSlides: true
          },
          1024: {
            slidesPerView: 4
          },
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }
      })

    })
  });
}

if (document.querySelector('.product-slider')) {
  var swiper = new Swiper(".product-slider", {
    loop: true,
    slidesPerView: 2,
    spaceBetween: 20,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
         centeredSlides: true
      },
      768: {
        slidesPerView: 3,
        centeredSlides: true
      },
      1024: {
        slidesPerView: 4
      },
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    }
  });
}


if (document.querySelector('.list-product-upsell')) {
  var swiper = new Swiper(".list-product-upsell", {
    slidesPerView: 1,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    }
  });
}

var links = document.links;
for (let i = 0, linksLength = links.length ; i < linksLength ; i++) {
  if (links[i].hostname !== window.location.hostname) {
    links[i].target = '_blank';
    links[i].rel = 'noreferrer noopener';
  }
}
