export default class HeroSlider {
    id: string;
    slider: HTMLElement;
    activeIndex: number;
    prev: HTMLElement;
    next: HTMLElement;
    paginations: Array<HTMLElement>;
    slides: Array<Slide>;

    constructor(id: string){
        this.id = id;
        this.slider = document.getElementById(this.id);
        this.paginations = [];
        this.slides = [];
        this.activeIndex = 0;
        this.init();
    }

    init(){

        let parent = this.slider.parentElement;
        parent.className = 'monk-slider-container';

        this.slider.className = 'monk-slider';

        
        
        this.prev = document.createElement('span');
        this.next = document.createElement('span');

        this.prev.className = 'slider-nav-btn prev-btn';
        this.prev.addEventListener('click', this.slidePrev.bind(this));

        this.next.className = 'slider-nav-btn next-btn';
        this.next.addEventListener('click', this.slideNext.bind(this));
        parent.appendChild(this.prev);
        parent.appendChild(this.next);

        this.update();
        let scope = this;
        //window.addEventListener('resize', scope.slide.bind(scope))
        
    }

    slidePrev(){
        if(this.activeIndex === 0){
            return;
        }else {
            this.slide.call(this, (this.activeIndex - 1));
        }
    }

    slideNext(){
        if(this.activeIndex === this.slides.length - 1){
            return;
        }else {
            this.slide.call(this, (this.activeIndex + 1));
        }
    }
    slide(index: number) {
        this.slides[this.activeIndex].removeActive();
        this.activeIndex = index || 0;
        this.slider.style.transform = "translate(" + (-1 * this.activeIndex * 100) + "vw, 0px)";
        setTimeout(function(scope: any){
            scope.slides[scope.activeIndex].setActive(true);
            scope.paginate()
        }, 500, this);
        var bg_image = this.slider.parentNode.querySelector('.bg_image') as HTMLElement, offset = 330;
        if(window.innerWidth < 768){
            offset = 0;
        }
        if(bg_image){
            let img_width = bg_image.offsetWidth,
            slider_width = this.slider.offsetWidth;
            if(this.activeIndex === 0){
                bg_image.style.transform = "translate(0, 0px)";
            }else if(this.activeIndex === this.slides.length - 1){
                bg_image.style.transform = "translate(-" + (img_width - offset) + "px, 0px)";
            }else {//Roll over the background image as a parallax - distribute the image between 9 slides
                var translate = -1 * this.activeIndex * ((img_width - window.innerWidth) / (this.slides.length - 2));
                bg_image.style.transform = "translate(" + translate + "px, 0px)";
            }
            
        }

    }

    addPaginations(){
        let pagination = this.slider.parentNode.querySelector('.pagination'),
        scope = this;
        if(!pagination){
            pagination = document.createElement('div');
            pagination.className = 'pagination';
            this.slider.parentNode.appendChild(pagination);
        }
        pagination.innerHTML = "";
        
        for(let i=0; i < this.slides.length; i++){
            var page = document.createElement('span');
            page.className = 'page';
            page.setAttribute('data-index', i + "");
            page.innerHTML = "" + (i);
            page.addEventListener('click', function(e){
                //var el = e.target
                var index = Number(this.getAttribute('data-index')) || 0;
                scope.slide.call(scope, index);
            })
            pagination.appendChild(page);
        }

    }

    paginate(){
        // Set pagination active to current index
        let pages = this.slider.parentNode.querySelectorAll('.pagination .page')
        for(let i=0; i<pages.length; i++){
            if(i!== this.activeIndex && pages[i].hasAttribute('active')){
                pages[i].removeAttribute('active');
            }else if(i === this.activeIndex){
                pages[i].setAttribute('active', 'true');
            }
        }
        if(this.activeIndex === 0){
            this.prev.style.display = 'none';
        }else {
            this.prev.style.display = 'inline'
        }

        if(this.activeIndex === this.slides.length - 1){
            this.next.style.display = 'none';
        }else {
            this.next.style.display = 'inline'
        }
    }

    update(){
        let lis = document.querySelectorAll('#' + this.id + " > li");
        this.slides = [];
        for(let i=0; i<lis.length; i++){
            var slide = new Slide(lis[i], i+1);
            if(i===0){
                slide.setActive();
            }
            this.slides.push(slide);
        }
        this.slider.style.width = (this.slides.length * 100) + 'vw';
        this.addPaginations();
        this.paginate();
    }
}

class Slide {
    el: Element;
    index: number;
    constructor(el: Element, index: number){
        this.el = el;
        this.index = index;
        this.init();
    }
    init(){
        this.el.className = 'monk-slider-item';
        this.el.setAttribute('data-index', this.index + "")
    }

    setActive(){
        this.el.setAttribute('active', 'true');
    }

    removeActive(){
        this.el.removeAttribute('active');
    }
}