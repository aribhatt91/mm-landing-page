export default class Splash {
    timeOut: number = 4000;
    constructor(){
        this.init();
    }
    init() {
        var splash = document.createElement('div');
        splash.className = 'splash';
        splash.innerHTML = '<div class="monk"></div><div class="monk-text"><span class="first">Patience!</span></div>';
        document.body.appendChild(splash);
        this.animateMonk();
        setTimeout(() => {
            this.destroy();
        }, this.timeOut);
    }
    animateMonk(){
        setTimeout(() => {
            document.querySelector('.splash > .monk').classList.add('drop');
        }, 200);
        setTimeout(() => {
            document.querySelector('.splash > .monk').classList.add('bounce');
            this.animateText();
        }, 700);
    }
    animateText(){
        document.querySelector('.splash > .monk-text').classList.add('zap');
        setTimeout(() => {
            document.querySelector('.splash > .monk-text').insertAdjacentHTML('beforeend', '<span class="second"> young padawan...</span>');
            if(document.querySelector('#monk-slider > li[active]')){
                document.querySelector('#monk-slider > li[active]').removeAttribute('active');
            }
        }, 2000);
    }
    destroy(){
        (document.querySelector('.splash') as HTMLElement).style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(document.querySelector('.splash'));
            document.querySelector('#monk-slider > li:first-child').setAttribute('active', 'true');
        }, 400);
        
    }
}