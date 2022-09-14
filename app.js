const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();  

app.set('view engine', 'ejs');

const rootDir = require('./util/rootDir');

const questions = ['Что вы предпочитаете?','Какие книги вы предпочитаете читать?','Что вы скорее можете допустить в работе?','Если вы совершите дурной поступок, то:','Как вы сходитесь с людьми?','Считаете ли вы себя обидчивым(ой)?','Склонны ли вы хохотать, смеяться от души?','Считаете ли вы себя:','Откровенны вы или скрытны?','Любите ли вы заниматься анализом своих переживаний?','Находясь в обществе, вы предпочитаете:','Часто ли вы испытываете недовольство собой?','Любите ли вы что-нибудь организовывать?','Хотелось бы вам вести интимный дневник?','Быстро ли вы переходите от решения к исполнению?','Легко ли меняете ваше настроение?','Любите ли вы убеждать других, навязывать свои взгляды?','Ваши движения:','Вы сильно беспокоитесь о возможных неприятностях:','В затруднительных случаях вы:'],
    firstAnswers = ['Немного близких друзей','C занимательным сюжетом','Опоздание','Остро переживаете','Быстро, легко','Да','Да','Молчаливым(ой)','Откровенен(на)','Да','Говорить','Да','Да','Да','Да','Да','Да','Быстры','Часто','Спешите обратиться за помощью к другим'],
    secondAnswers = ['Большую товарищескую компанию','Раскрывающие переживания героев','Ошибки','Не испытываете острых переживаний','Медленно, осторожно','Нет','Нет','Разговорчивым(ой)','Скрытен(на)','Нет','Слушать','Нет','Нет','Нет','Нет','Нет','Нет','Замедлены','Редко','Не любите обращаться за помощью'],
    personalityDescrArr = ['Экстраверты легки в общении, высокий уровень агрессивности, имеют тенденцию к лидерству, любят быть в центре внимания, легко завязывают контакты, импульсивны, открыты и контактны, среди контактов могут быть и полезные; судят о людях по внешности, не заглядывают внутрь; холерики, сангвиники.',
                        'Амбиверты склонны в разных ситуациях проявлять себя по-разному – они могут легко абстрагироваться от внешней среды и всецело погружаться в собственные мысли, могут быть превосходными лидерами и ораторами, которые готовы вести за собой толпу, комфортно чувствовать себя на сцене в лучах прожекторов и чутко реагировать на личные события в жизни окружающих. В зависимости от ситуации амбиверты могут выбирать модель поведения, при этом не прилагая сверхусилий: они будут чувствовать себя комфортно при любом сценарии.',
                        'Интроверты направлены на мир собственных переживаний, мало контактны, молчаливы, с трудом заводят новые знакомства, не любят рисковать, тяжело переживают разрыв старых связей, нет вариантов проигрыша и выигрыша, высокий уровень тревожности и ригидности; флегматики, меланхолики.'],
    maxExtravAnswers = ['b','a','b','b','a','b','a','b','a','b','a','b','a','b','a','a','a','a','b','a'];
let extravPoints = 0;
let userNumber = 0;
let pType = '';

app.use(express.static(path.join(rootDir, 'public'))); 

app.use(express.urlencoded({extended: true}));

console.log('app running on port 3000...');

fs.writeFile('results.txt', '', err => {
    if (err) {
      console.error(err);
      return;
    }
});

app.use('/results', (req, res) => {
    if (Object.values(req.body).length == 20) {
        for (let i = 0; i < Object.values(req.body).length; i++ ) {
            if (Object.values(req.body)[i] == maxExtravAnswers[i]) {
                extravPoints++;
            }
        }
        extravPoints = extravPoints * 5;
        if (extravPoints >= 66) {
            pType = 'Экстраверт';
            res.render('results', {personalityType: pType, personalityDescr: personalityDescrArr[0]});
        } else if ((extravPoints >= 36) && (extravPoints < 66)) {
            pType = 'Амбиверт';
            res.render('results', {personalityType: pType, personalityDescr: personalityDescrArr[1]});
        } else if ((extravPoints <= 35)) {
            pType = 'Интроверт';
            res.render('results', {personalityType: pType, personalityDescr: personalityDescrArr[2]});
        }
        fs.appendFile('results.txt', userNumber+') '+ pType + ', баллы: ' + extravPoints + ', ответы: ' + Object.values(req.body) + '\r\n', err => {
            if (err) {
              console.error(err);
              return;
            }
        });
        extravPoints = 0;
        res.end();
    } else {
        extravPoints = 0;
        res.redirect('/');
        res.end();
    }
});

app.use('/test', (req, res) => {
    extravPoints = 0;
    res.render('test', { qH: questions, r1L: firstAnswers, r2L: secondAnswers});
    res.end();
});

app.use('/', (req, res) => {
    userNumber++;
    extravPoints = 0;
    res.render('index');
    res.end();
});

app.listen(3000);