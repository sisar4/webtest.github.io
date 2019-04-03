var newsList=[];
var newsNumber;
var scrollMainDirection;
var scrollSecondDirection;

window.onload = function() {
    newsNumber=0;
    updateContents();
    loadMouse();
};

function scroller1()
{
    var objDiv = document.getElementById("mainScrollableDiv");
    if((objDiv.scrollHeight-objDiv.clientHeight)>0)/*rimuovere if? le notizie a rotazione possono prendere piu' posto*/
    {
        var top=false;
        var bottom = false;
        if(objDiv.scrollTop==0)
        {
            scrollMainDirection=0;
            top=true;
        }
        else if(objDiv.scrollTop>=((objDiv.scrollHeight-objDiv.clientHeight)-1))
        {
            scrollMainDirection=1;
            bottom = true;
        }
        if(scrollMainDirection==0)
            {if(top){objDiv.scrollTop+=1;setTimeout(scroller1, 3000);}
            else
               {objDiv.scrollTop+=5;setTimeout(scroller1, 100);}}
        else
            {if(bottom){objDiv.scrollTop-=1;setTimeout(scroller1, 3000);}
            else {objDiv.scrollTop-=5;setTimeout(scroller1, 100);}}
    }   
}
function scroller2()
{
    var objDiv = document.getElementById("secondScrollableDiv");
    if((objDiv.scrollHeight-objDiv.clientHeight)>0)/*rimuovere if? le notizie a rotazione possono prendere piu' posto*/
    {
        var top=false;
        var bottom = false;
        if(objDiv.scrollTop==0)
        {
            scrollSecondDirection=0;
            top=true;
        }
        else if(objDiv.scrollTop>=((objDiv.scrollHeight-objDiv.clientHeight)-1))
        {
            scrollSecondDirection=1;
            bottom = true;
        }
        if(scrollSecondDirection==0)
            {if(top){objDiv.scrollTop+=1;setTimeout(scroller2, 3000);}
            else
               {objDiv.scrollTop+=5;setTimeout(scroller2, 100);}}
        else
            {if(bottom){objDiv.scrollTop-=1;setTimeout(scroller2, 3000);}
               else{objDiv.scrollTop-=5;setTimeout(scroller2, 100);} }
           /*alert("posizione top "+objDiv.scrollTop+" max "+(objDiv.scrollHeight-objDiv.clientHeight))*/
           
    }   
}

function newsMover()
{
    if(newsList.length>0)
    {
        if(newsNumber>=newsList.length)
            {newsNumber=0;}
        document.getElementById('newsPart').innerHTML = newsList[newsNumber];
        if(newsList[newsNumber].length>10)
            {setTimeout(newsMover, ((newsList[newsNumber].length)/13)*1000);}
        else
            {setTimeout(newsMover, 3000);}
        newsNumber++;
    }
    else
        {document.getElementById('newsPart').innerHTML = 'Non ci sono avvisi';}
}
function newsMoverSpecial()
{
    if(newsList.length>0)
    {
        document.getElementById('newsPart').innerHTML = "<marquee>"+newsList.join('    -    ') + "</marquee>";
    }
    else
        {document.getElementById('newsPart').innerHTML = 'Non ci sono avvisi';}
}

function updateContents()
{
        var res = JSON.parse('{ "ora":["1", "9:05"], "avvisi":[ "topolino e minnie", "ammoniaca", "il pacco del corriere è quadarato ma lui pensa che sia un rattangolo 2D", "corriere internato per problemi psichici", "Sconvolto dalla felicità, Florentino Ariza passò il resto del pomeriggio a mangiare rose e a leggere la missiva, ripassandola lettera per lettera più volte e mangiando più rose quanto più la leggeva, e a mezzanotte l’aveva letta così tanto e aveva mangiato così tante rose che la madre dovette stenderlo a terra come un vitello per fargli ingoiare un decotto di olio di ricino. (Gabriel García Márquez)" ], "sostituzioni": [ { "sostituto":"Ford", "sostituisce":"Henry", "classe":"2M", "aula":"07-TW", "durata":"1", "daOra":"1"}, { "sostituto":"Pino", "sostituisce":"Gino", "classe":"3A ET", "aula":"LEIS", "durata":"1", "daOra":"2"}, { "sostituto":"aaaa", "sostituisce":"AAAA", "classe":"3A ET", "aula":"LEIS", "durata":"3", "daOra":"2"}, { "sostituto":"Antonio", "sostituisce":"La Quaglia", "classe":"5A TL", "aula":"08-2W", "durata":"1", "daOra":"3" }, { "sostituto":"Feraverto", "sostituisce":"Magnacani", "classe":"Immagina", "aula":"puoi", "durata":"2", "daOra":"2" }, { "sostituto":"Matt", "sostituisce":"Groening", "classe":"Fumettista", "aula":"Disegno", "durata":"1", "daOra":"4" }, { "sostituto":"Ultimo", "sostituisce":"Ultima", "classe":"Lavapiatti", "aula":"Cucina", "durata":"1", "daOra":"5" }, { "sostituto":"Ma sono di troppo?", "sostituisce":"Non ho voglia di lavorare", "classe":"Fannullone", "aula":"Macchinetta del caffé", "durata":"1", "daOra":"6" } ] }');
        var params = window.location.search.substr(1);
        try{
            var param =params.split("=");
            if(param[1]>0&&param[1]<8)
            {res.ora[0]=param[1];}

        }            catch(err){}
        /*aggiorna ora di lezione*/       
        document.getElementById('currentHour').innerHTML = 'Ora '+res.ora[0]+'<br/>Termine '+res.ora[1];
        /*aggiorna avvisi lista avvisi e avvia la funzione per farle scorrere*/
        newsList=res.avvisi;
        newsMover();
        /*aggiorna tabella sostituzioni*/
        document.getElementById('mainPart').innerHTML='';
        document.getElementById('secondPart').innerHTML='';
        var mainPart = document.getElementById('mainPart');
        var secondPart = document.getElementById('secondPart');
        var mainTable= document.createElement('table');
        var secondTable = document.createElement('table');
        var mainTableForTitle= document.createElement('table');
        var secondTableForTitle = document.createElement('table');
        var title = document.createElement('h3');
        title.setAttribute('class', 'lowMargin');
        var titleContent = document.createTextNode('Sostituzioni');
        title.appendChild(titleContent);
        mainPart.appendChild(title);
        var secondTitle = document.createElement('h3');
        secondTitle.setAttribute('class', 'lowMargin');
        var secondTitleContent = document.createTextNode('Sostituzioni delle prossime ore');
        secondTitle.appendChild(secondTitleContent);
        secondPart.appendChild(secondTitle);
        mainTable.setAttribute('class', 'table');
        secondTable.setAttribute('class', 'table');
        mainTableForTitle.setAttribute('class', 'table');
        secondTableForTitle.setAttribute('class', 'table');
        var mainTableDiv = document.createElement('div');
        var secondTableDiv = document.createElement('div');
        var mainTableDivForTitle = document.createElement('div');
        var secondTableDivForTitle = document.createElement('div');
        mainTableDiv.setAttribute('class', 'scrollableCenterTableDiv');
        secondTableDiv.setAttribute('class', 'scrollableCenterTableDiv');
        mainTableDivForTitle.setAttribute('width', '100%');
        secondTableDivForTitle.setAttribute('width', '100%');
        mainTableDivForTitle.setAttribute('id', 'mainTableDivForTitle');
        secondTableDivForTitle.setAttribute('id', 'secondTableDivForTitle');
        mainTableDiv.setAttribute('id', 'mainScrollableDiv');
        secondTableDiv.setAttribute('id', 'secondScrollableDiv');
        for(var i=0;i<2;i++)
        {
            var tablerow=document.createElement('tr');
            var tablecol1=document.createElement('th');
            var tablecol2=document.createElement('th');
            var tablecol3=document.createElement('th');
            var tablecol4=document.createElement('th');
            var tablecol5=document.createElement('th');
            var tablecol6=document.createElement('th');
            var cellcontent1 = document.createTextNode('Docente');
            var cellcontent2 = document.createTextNode('Docente da sostituire');
            var cellcontent3 = document.createTextNode('Classe');
            var cellcontent4 = document.createTextNode('Aula');
            var cellcontent5 = document.createTextNode('Durata sostituzione');
            var cellcontent6 = document.createTextNode('Ora inizio sostituzione');/*borderedTDOrTh */
            tablecol1.setAttribute('class', 'borderedTDOrTh');
            tablecol2.setAttribute('class', 'borderedTDOrTh');
            tablecol3.setAttribute('class', 'borderedTDOrTh');
            tablecol4.setAttribute('class', 'borderedTDOrTh');
            tablecol5.setAttribute('class', 'borderedTDOrTh');
            tablecol6.setAttribute('class', 'borderedTDOrTh');
            tablecol1.setAttribute('width', '20%');
            tablecol2.setAttribute('width', '20%');
            tablecol3.setAttribute('width', '15%');
            tablecol4.setAttribute('width', '15%');
            tablecol5.setAttribute('width', '15%');
            tablecol6.setAttribute('width', '15%');
            tablecol1.appendChild(cellcontent1);
            tablecol2.appendChild(cellcontent2);
            tablecol3.appendChild(cellcontent3);
            tablecol4.appendChild(cellcontent4);
            tablecol5.appendChild(cellcontent5);
            tablecol6.appendChild(cellcontent6);
            tablerow.appendChild(tablecol1);
            tablerow.appendChild(tablecol2);
            tablerow.appendChild(tablecol3);
            tablerow.appendChild(tablecol4);
            tablerow.appendChild(tablecol5);
            tablerow.appendChild(tablecol6);
            if(i==0)
                {mainTableForTitle.appendChild(tablerow);}
            else
                {secondTableForTitle.appendChild(tablerow);}
          }
        for(var i=0;i<res.sostituzioni.length;i++)                         
        {      

            var tablerow=document.createElement('tr');
            var tablecol1=document.createElement('td');
            var tablecol2=document.createElement('td');
            var tablecol3=document.createElement('td');
            var tablecol4=document.createElement('td');
            var tablecol5=document.createElement('td');
            var tablecol6=document.createElement('td');
            var cellcontent1 = document.createTextNode(res.sostituzioni[i].sostituto);
            var cellcontent2 = document.createTextNode(res.sostituzioni[i].sostituisce);
            var cellcontent3 = document.createTextNode(res.sostituzioni[i].classe);
            var cellcontent4 = document.createTextNode(res.sostituzioni[i].aula);
            var cellcontent5 = document.createTextNode(res.sostituzioni[i].durata);
            var cellcontent6 = document.createTextNode(res.sostituzioni[i].daOra);
            tablecol1.setAttribute('class', 'borderedTDOrTh');
            tablecol2.setAttribute('class', 'borderedTDOrTh');
            tablecol3.setAttribute('class', 'borderedTDOrTh');
            tablecol4.setAttribute('class', 'borderedTDOrTh');
            tablecol5.setAttribute('class', 'borderedTDOrTh');
            tablecol6.setAttribute('class', 'borderedTDOrTh');
            tablecol1.setAttribute('width', '20%');
            tablecol2.setAttribute('width', '20%');
            tablecol3.setAttribute('width', '15%');
            tablecol4.setAttribute('width', '15%');
            tablecol5.setAttribute('width', '15%');
            tablecol6.setAttribute('width', '15%');
            tablecol1.appendChild(cellcontent1);
            tablecol2.appendChild(cellcontent2);
            tablecol3.appendChild(cellcontent3);
            tablecol4.appendChild(cellcontent4);
            tablecol5.appendChild(cellcontent5);
            tablecol6.appendChild(cellcontent6);
            tablerow.appendChild(tablecol1);
            tablerow.appendChild(tablecol2);
            tablerow.appendChild(tablecol3);
            tablerow.appendChild(tablecol4);
            tablerow.appendChild(tablecol5);
            tablerow.appendChild(tablecol6);
            if(res.sostituzioni[i].daOra==res.ora[0] || ((+res.sostituzioni[i].daOra + +( +res.sostituzioni[i].durata - 1))>= +res.ora[0] && +res.sostituzioni[i].daOra <= +res.ora[0]))/*|| (res.sostituzioni[i].daOra>=(res.ora[0]-(res.sostituzioni[i].durata-1)))*/
            {                                          /* */
                mainTable.appendChild(tablerow);
            }
            else if(res.sostituzioni[i].daOra>res.ora[0])/*sostituizioni successive a quest'ora vanno nella seconda tabella */
            {
                secondTable.appendChild(tablerow);
            }
        }
        
        mainTableDiv.appendChild(mainTable);
        secondTableDiv.appendChild(secondTable);
        mainTableDivForTitle.appendChild(mainTableForTitle);
        mainPart.appendChild(mainTableDivForTitle);
        mainPart.appendChild(mainTableDiv);
        secondTableDivForTitle.appendChild(secondTableForTitle);
        secondPart.appendChild(secondTableDivForTitle);
        secondPart.appendChild(secondTableDiv);


        mainTableDivForTitle.style.paddingRight = mainTableDiv.offsetWidth - mainTableDiv.clientWidth + "px";
        secondTableDivForTitle.style.paddingRight = secondTableDiv.offsetWidth - secondTableDiv.clientWidth + "px";

        scroller1();
        scroller2();
    
}