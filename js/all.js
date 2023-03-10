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

// ScrollToPlugin滑動效果
$('#navbar .main-link, .backtop a').each(function(i,link){
  $(this).on('click',function(e){
    e.preventDefault();
    if($(this).attr('href')==='#section04' ||$(this).attr('href')==='#section05'){
      gsap.to($(window),{
        scrollTo:{
          y:`#section0${i+1}`
        },
        duration:1.5,
        ease:'back.inOut'
      })
    }else{
      gsap.to($(window),{
        scrollTo:{
          y:`#section0${i+1}`,
          offsetY:150
        },
        duration:1.5,
        ease:'back.inOut'
      })
    }
    
  })
})

// 導覽列滾動收合
gsap.from('#navbar',{
  yPercent:-100,
  pause:false,
  duration:0.5,
  scrollTrigger:{
    start:'top 60%',
    end:()=>'+=' + document.documentElement.scrollHeight,/*end為整份文件高度*/ 
    onEnter(self){
      self.animation.play()
    },
    onUpdate(self){
      // self.direction===-1  =>偵測到捲動軸往上
      // self.direction===1  =>偵測到捲動軸往下
      self.direction===-1? self.animation.play():self.animation.reverse()
    },
  }
})

// scrollTrigger 滾動軸
// backtop回頂端顯示隱藏
gsap.to('.backtop',{
  scrollTrigger:{
    trigger:'#footer',
    start:'top bottom',
    end:'100% bottom',
    toggleActions:'play none none reverse',
    markers:true
  },
  display:'block',
  opacity:1,
  duration:1
})

// 導覽列active位置
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
        // markers:true,
      }
    })
  })

  // 流星
  // 1.創建流星數目
  function createStar(starNumber){
    for(let i = 0; i<starNumber;i++){
      $('.shooting_star').append(`<div class="star"></div>`)
    }
    const stars = gsap.utils.toArray('.star')
    return stars
  }

  // 2.設定流星補間動畫預設值
  function setStarTween(stars){
    gsap.set('.shooting_star',{
      perspective:800
    })
    stars.forEach(function(star,index){
      gsap.set(star,{
        transformOrigin:'0 50%',
        position:'absolute',
        left:gsap.utils.random($(window).width()/2,$(window).width()*2),
        top:gsap.utils.random(-100,-200),
        rotation:-25
      })
    })
  }
  // 3.播放流星動畫
  function playStarTimelines(stars){
    const tl = gsap.timeline({
      repeat:-1
    })
    tl.to(stars,{
      x:`-=${$(window).width()*1.5}`,/*流星往左 */
      y:`+=${$(window).height()*1.5}`,/*流星往下 */
      z:`random(-100,500)`,
      stagger:function(index,star,stars){
        return gsap.utils.random(index+5 ,(index+5)*2,1)
      },
      duration:'random(0.5,3,0.1)',
      ease:'none'
    })
  }
  // 執行管道流程，按照設定的步驟去走流程
  const playStar = gsap.utils.pipe(createStar,setStarTween,playStarTimelines)
  playStar(30)


// 視差效果
// 星空背景
gsap.to('body',{
  scrollTrigger:{
    trigger:'body',
    scrub:3,
    start:'top 0',
    end:'bottom 0',
    // markers:true,
    toggleActions: "play none none reverse",
  },
  backgroundPosition:'0% 100% ',
  ease:'none'
})

// 浮空的島
const float_tl = gsap.timeline({
  scrollTrigger:{
    trigger:'body',
    start:'top 100%',
    end:'bottom 100%',
    scrub:5,
    // markers:true
  },
  ease:'none'
})

float_tl
  .from('.float-wrap-01',{
    left:'-30%',
  })
  .from('.float-wrap-02',{
    right:'-30%',
  },'<')
  .from('.float-wrap-03',{
   bottom:'-100%',
  },'<')

  // 2.自身上下浮動的動畫
  $('.float-island').each(function(i,e){
    gsap.to(e,{
      y:50 * (i+1),
      duration:8 * (i+1),
      repeat:-1,
      yoyo:true,
      ease:'power1.inOut'
    })
  })

  // 霧
  $('.fog').each(function(i,e){
    console.log('e',e)
    console.log('$(e)',$(e))

    // gsap.set()設定duration為0的fog補間動畫,為他們設定css屬性
    gsap.set(e,{
      width:'100%',
      height:'100%',
      background:'url(../../../images/fog.png)no-repeat center/80%',
      opacity:0.8,
      position:'absolute',
      top:'random(0,100)'+'%',

      x:function(){
        return i % 2 === 0? -$(window).width : $(window).width
      }
    })

    // 做動畫
  gsap.to(e,{
    x:function(){
      return i % 2 === 0? $(window).width : -$(window).width
    },
    repeat:-1,
    duration:5,
    ease:'none',
    onRepeat(){
      $(e).css({
        top:gsap.utils.random(0,100)+'%'
      })
    }
  })
  })

  // splitText
  gsap.set('#splitText',{
    perspective:400,
  })

  const tl = gsap.timeline({
    repeat:-1,
    repeatDelay:8,
  })

  // 將段落轉成陣列
  const paragraphs = gsap.utils.toArray('#splitText p')
  const splitTexts = paragraphs.map(function(p){
    return new SplitText(p,{
      charsClass:'charBg'
    })
  })

  splitTexts.forEach(splitText=>{
    const chars = splitText.chars
    console.log('chars',chars)
    tl.from(chars,{
      y:80,
      rotationX:0,
      rotationY:180,
      scale:2,
      transformOrigin:'0% 50% -100',
      opacity:0,
      duration:2,
      ease:'back',
      stagger:0.1,
      onComplete(){
        gsap.to(chars,{
          delay:3,
          duration:2,
          opacity:0,
          y:80,
          scale:2,
          rotationX:180,
          rotationY:0,
          transformOrigin:'0% 50% -100',
          ease:'back',
          stagger:0.1,
        })
      }
    },'+=3')
  })

  
  

