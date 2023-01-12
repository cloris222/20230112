// Section03 生物種族 -----------------------------------------------------
$('#race a').on('click', function () {
  $('#race a').removeClass('active')
  $(this).addClass('active')
})

// section05
const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  speed:1000,
  spaceBetween:15,
  centeredSlides:true,
  autoplay:{
    delay:5000
  },
  slidesPerView:'auto',
  effect:'coverflow',
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },

  breakpoints:{
    576:{
      slidesPerView:2
    },
    768:{
      slidesPerView:3
    },
    920:{
      slidesPerView:3
    },
    1200:{
      slidesPerView:4
    },
  },

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  
});