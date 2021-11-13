var icon = document.querySelectorAll('.wrapper');

function mainFunc()
{
    var clear=1, usernum, trace;

    // clear
    for (i=0; i<icon.length; i++) {
        icon[i].style.backgroundColor='initial';
        res = document.querySelector('.result');
        res.innerHTML = '';
        res.style.backgroundColor = 'initial';
    }

    // hover icons
    for (i=0; i<(icon.length/2)-1; i++) {
        icon[i].addEventListener('mouseenter', run);
        icon[i].addEventListener('mouseleave', clears);
        icon[i].addEventListener('mouseup', test);
    }
    
    //refresh button
    icon[6].addEventListener('mouseenter', run);
    icon[6].addEventListener('mouseleave', clears);

    
    return 0;
}


function run(e) 
{
    e.target.style.backgroundColor='#c4c4c4';
    e.target.style.borderRadius='.5rem';
    return 0;
}


function clears(e) {
    e.target.style.backgroundColor='initial';
    return 0;
}


// input user
// 0 batu
// 1 gunting
// 2 kertas
function test(e) 
{
    if (e.target.className=='resizeimg') {
        e.target.parentNode.style.backgroundColor='#d4d4d4';
        e.target.parentNode.style.borderRadius='.5rem';   
        if (e.target.alt=='batu') {
            usernum=0
        } else if (e.target.alt=='gunting') {
            usernum=1
        } else {
            usernum=2
        } 
    } else {
        e.target.style.backgroundColor='#d4d4d4';
        e.target.style.borderRadius='.5rem';
        if (e.target.childNodes[1].alt=='batu') {
            usernum=0
        } else if (e.target.childNodes[1].alt=='gunting') {
            usernum=1
        } else {
            usernum=2
        }
    }

 
    // 0 batu
    // 1 gunting
    // 2 kertas
    if (usernum==0) {
        var1 = 'batu';
    } else if (usernum==1) {
        var1 = 'gunting';
    } else if (usernum==2){
        var1 = 'kertas';
    }

    game(usernum);

    for (i=0; i<icon.length/2; i++) {
        icon[i].removeEventListener('mouseenter', run);
        icon[i].removeEventListener('mouseleave', clears);
        icon[i].removeEventListener('mouseup', test);
    }
    return 0;
}


// how the game works
function game(input1) {
    const compnum = Math.floor(Math.random() * 3);
    if (compnum==0) {
        trace=0
    } else if(0-compnum<0) {
        if (0-compnum==-1) {
            trace=2
        } else {
            trace=1
        }
    }

   
    // hover comp choice
    document.querySelectorAll('.wrapper')[3+trace].style.backgroundColor='#d4d4d4';
    document.querySelectorAll('.wrapper')[3+trace].style.borderRadius='.5rem';


    // conclusion
    if (compnum==0) {
        var2 = 'batu';
    } else if (compnum==1) {
        var2 = 'gunting';
    } else {
        var2 = 'kertas';
    }


    // win-lose logic
    if (input1==compnum) {
        console.log(`${var1} VS ${var2} DRAW`);
        displayDraw();
    } else if (((input1==0) && (compnum==1)) || (input1==1 && compnum==2) || (input1==2 && compnum==0)) {
        console.log(`${var1} VS ${var2} WIN`);
        displayWin('PLAYER 1');
    } else {
        console.log(`${var1} VS ${var2} LOSE`);
        displayWin('COM');
    }
    return 0;
} 


/*displays*/
function displayWin(name) {
    res = document.querySelector('.result');
    res.innerHTML = '<h3>' + name + '</h3><h3>WIN</h3>';
    res.style.backgroundColor = '#4C9654';
    res.style.borderRadius = '10px';
    res.style.zIndex = 1;
    return 0;
}


function displayDraw() {
    res = document.querySelector('.result');
    res.innerHTML = '<h3>DRAW</h3>';
    res.style.backgroundColor = '#035B0C';
    res.style.borderRadius = '10px';
    res.style.zIndex = 1;
    return 0;
}