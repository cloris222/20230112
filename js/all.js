// modal出現時畫面會發生抖動
$('#reg_btn,#login_btn').on('click',function(){
  $('body,#navbar').css({
    overflow:'auto',
    'padding-right':0
  })
})

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

// gsap
// 註冊plugin
gsap.registerPlugin(ScrollToPlugin,ScrollTrigger,SplitText)

// scrollTrigger 滾動軸

  $('.main-link').each(function(i,e){
    let idName = $(e).attr('href')
    // 動畫對象為每個a連結
    gsap.to(e,{
      scrollTrigger:{
        trigger:`${idName}`,/*觸發對象為有設置id的物件(例#section01-#section05)*/
        start:'top center',
        end:'bottom center',
        // 為每個被觸發的a連結加上active的class
        toggleClass:{
          targets:e,
          className:'active'
        },
        markers:true,
      }
    })
  })



// 視差效果
// 星空背景
gsap.to('body',{
  scrollTrigger:{
    trigger:'body',
    scrub:3,
    start:'top 0',
    end:'bottom 0',
    markers:true,
    toggleActions: "play none none reverse",
  },
  backgroundPosition:'0% 100% ',
  ease:'none'
})