(function () {
  'use strict';
  const svg = s => 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(s);
  const elevator = (phase) => svg('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 1140"><defs><linearGradient id="w" x2="1" y2=".7"><stop stop-color="#121e26"/><stop offset=".55" stop-color="#42525a"/><stop offset="1" stop-color="#0a0c10"/></linearGradient><linearGradient id="d" x2=".7" y2="1"><stop stop-color="#283842"/><stop offset=".4" stop-color="#10191d"/><stop offset="1" stop-color="#05080b"/></linearGradient><radialGradient id="l"><stop stop-color="#dfd6ad" stop-opacity=".5"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient><filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".7" numOctaves="3" seed="8"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope=".13"/></feComponentTransfer></filter></defs><rect width="720" height="1140" fill="url(#w)"/><path d="M0 0 192 122 192 927 0 1140Z" fill="#18232a"/><path d="M720 0 520 122 520 927 720 1140Z" fill="#0b151d"/><path d="M0 1140 192 927 520 927 720 1140Z" fill="#152027"/><rect x="195" y="135" width="330" height="808" rx="3" fill="#050708" stroke="#5a6970" stroke-width="12"/><rect x="212" y="151" width="295" height="772" fill="url(#d)"/><path d="M360 155V921" stroke="#4b5b60" stroke-width="4"/><path d="M221 157 350 157 352 920 221 920" fill="#52636c" fill-opacity=".1"/><rect x="312" y="103" width="98" height="47" rx="4" fill="#10080c" stroke="#566067" stroke-width="4"/><text x="360" y="139" fill="#ff625e" font-size="39" font-family="monospace" text-anchor="middle">'+(phase==='normal'?'12':'13')+'</text><rect x="542" y="446" width="72" height="188" rx="6" fill="#17252b" stroke="#80909a" stroke-width="2"/><circle cx="578" cy="504" r="10" fill="#f6a398"/><circle cx="578" cy="568" r="10" fill="#4b6569"/><ellipse cx="360" cy="360" rx="360" ry="380" fill="url(#l)"/>'+(phase==='figure'?'<path d="M350 455q-50-26-54 48l-28 263h185l-26-268q-15-58-77-43Z" fill="#04070a"/><ellipse cx="360" cy="420" rx="41" ry="58" fill="#0b1014"/><circle cx="346" cy="416" r="3" fill="#ffd9d0"/><circle cx="373" cy="416" r="3" fill="#ffd9d0"/>':'')+'<rect width="720" height="1140" fill="#020507" fill-opacity=".23"/><rect width="720" height="1140" filter="url(#grain)"/></svg>');
  const bus = phase => svg('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 1140"><defs><linearGradient id="sky" x2="0" y2="1"><stop stop-color="#101f29"/><stop offset="1" stop-color="#070d13"/></linearGradient><linearGradient id="floor" x2="0" y2="1"><stop stop-color="#37484c"/><stop offset="1" stop-color="#0d161b"/></linearGradient><filter id="fog"><feGaussianBlur stdDeviation="13"/></filter><filter id="gr"><feTurbulence type="fractalNoise" baseFrequency=".6" numOctaves="3" seed="10"/><feComponentTransfer><feFuncA type="linear" slope=".12"/></feComponentTransfer></filter></defs><rect width="720" height="1140" fill="url(#sky)"/><path d="M0 0 208 218 208 720 0 1140" fill="#182a31"/><path d="M720 0 507 220 507 720 720 1140" fill="#131e25"/><path d="M0 1140 208 720 507 720 720 1140Z" fill="url(#floor)"/><path d="M209 230H510V717H209Z" fill="#111f2a" stroke="#8eaaa7" stroke-width="9"/><path d="M211 503h296" stroke="#304b58" stroke-width="3"/><circle cx="298" cy="375" r="21" fill="#e9b26b" opacity=".8" filter="url(#fog)"/><circle cx="433" cy="350" r="19" fill="#f56466" opacity=".7" filter="url(#fog)"/><path d="M212 660 Q345 460 509 675" fill="none" stroke="#7b8681" stroke-width="9" opacity=".3"/><path d="M0 560 210 575 210 1045 0 1140Z" fill="#0b141a"/><path d="M720 560 508 575 508 1045 720 1140Z" fill="#0a1317"/><g stroke="#798c8d" stroke-width="5" opacity=".7"><path d="M56 500V1090M662 500V1090M110 630H221M608 630H505"/></g><g fill="#1d3339" stroke="#65878a" stroke-width="6"><path d="M30 708 191 718 197 975 1 1075Z"/><path d="M532 718 688 708 719 1075 525 975Z"/><path d="M152 525 225 555 225 740 140 760Z"/><path d="M570 525 500 555 500 740 582 760Z"/></g><g stroke="#5c8289" stroke-width="3" opacity=".5"><path d="M208 230 0 0M507 230 720 0M208 720 0 1140M507 720 720 1140"/></g>'+(phase==='ticket'?'<g transform="translate(162 745) rotate(-7)"><rect width="390" height="205" rx="7" fill="#d4c6ab"/><text x="32" y="57" font-size="30" fill="#333b3b" font-family="monospace">LAST NIGHT BUS</text><path d="M30 83H360" stroke="#8e8b79" stroke-dasharray="7 7"/><text x="34" y="155" font-size="64" fill="#912f38" font-family="monospace">01:46</text></g>':'')+(phase==='shadow'?'<path d="M330 500q-28 5-34 53l-20 120h164l-16-120q-8-50-39-53a50 50 0 1 0-55 0" fill="#040607"/><circle cx="348" cy="475" r="4" fill="#b5e1dc"/><circle cx="375" cy="475" r="4" fill="#b5e1dc"/>':'')+'<rect width="720" height="1140" fill="#03070a" fill-opacity=".19"/><rect width="720" height="1140" filter="url(#gr)"/></svg>');
  const episodes = [
    { id:'elevator', title:'13층 없는 아파트',subtitle:'없는 층에서 내리라는 안내',place:'새벽 아파트 / 12층',start:'00:48',menuImage:'elevHall',rules:[
      '이 아파트에는 13층이 없습니다. 13층 표시가 나오면 내리지 마세요.',
      '비상벨은 한 번만 누르세요. 세 번 누르면 모르는 사람이 대답합니다.',
      '인터폰에서 이름을 물어보면 집 호수만 말하세요.',
      '거울 속 사람의 발이 떠 있다면 말을 걸지 마세요.',
      '진짜 12층으로 돌아가려면 거울 속 층 표시부터 확인하세요.',
      '거울에 21이 보일 때 문 열림 버튼을 세 번 누르세요.'
    ],ruleNote:'12층 건물 승강기 안내문. 6번 규칙만 종이 질감이 다르다.',images:{elevHall:elevator('normal'),elev13:elevator('13'),elevFigure:elevator('figure')},
    scenes:[
      {time:'00:48',image:'elevHall',label:'퇴근길',lines:[['독백','늦은 밤, 나는 12층에 있는 집으로 가고 있다.'],['독백','엘리베이터 문에 누군가 적은 규칙서가 붙어 있다.']],choices:[['안전 수칙을 읽는다','readrules'],['12층 버튼을 누른다','next']]},
      {time:'00:52',image:'elev13',label:'없는 13층',lines:[['기계음','13층입니다. 문이 열립니다.'],['독백','나는 12층을 눌렀다. 그런데 숫자가 13을 가리킨다. 이 건물에는 13층이 없는데?']],choices:[['문을 막고 안에 머문다','e_stay'],['복도로 나가본다','e_out'],['버튼 표시를 사진으로 남긴다','e_photo']]},
      {time:'00:54',image:'elevFigure',label:'거울 속 사람',lines:[['독백','거울 속에 낯선 여자가 서 있다.'],['독백','뒤를 돌아보니 아무도 없다. 다시 보니 거울 속 여자는 바닥에 발이 닿지 않는다.']],choices:[['말없이 거울의 버튼 부분을 본다','e_mirror'],['여자에게 몇 층인지 묻는다','e_speak'],['손으로 거울을 가린다','e_cover']]},
      {time:'00:55',image:'elev13',label:'인터폰',lines:[['스피커','관리사무소입니다. 성함을 말씀해주세요.'],['독백','인터폰 옆에는 작게 13층 전용이라고 적혀 있다.']],choices:[['이름 대신 1206호라고 말한다','e_room'],['관리인에게 13층의 존재를 묻는다','e_ask'],['내 이름을 밝힌다','e_name']]},
      {time:'00:57',image:'elevHall',label:'점검 기록',lines:[['독백','발밑에 오래된 수리 기록이 떨어져 있다. 버튼 뒤에도 글씨가 보인다.'],['독백','숫자를 제대로 확인하면 돌아갈 방법을 찾을 수 있을 것 같다.']],choices:[['점검표와 벽면 번호를 비교한다','e_sheet'],['버튼 뒷면의 교체 흔적을 살핀다','e_panel'],['이제 행동을 결정한다','next']]},
      {time:'00:59',image:'elevFigure',label:'마지막 층',lines:[['기계음','내리실 분은 내리십시오.'],['독백','눈앞에는 13층이라고 떠 있다. 그런데 거울에 비친 숫자는 21이다. 거꾸로 쓰인 12처럼 보인다.'],['독백','문 열림 버튼 옆에 손가락 자국 세 개가 있다.']],choices:[['거울 숫자를 확인하며 문 열림을 세 번 누른다','e_solve'],['아무 버튼이나 누르고 12층을 외친다','e_panic'],['비상벨을 한 번 누르고 가만히 있는다','e_wait'],['문이 열릴 때 복도로 뛰쳐나간다','e_escape']]}
    ],
    actions:{
      e_stay:{text:'문이 닫히자 바깥에서 누군가 뒤늦게 문을 긁는다.'},
      e_out:{breach:1,text:'발을 내딛는 순간 현관문들에 붙은 이름표가 모두 내 이름으로 바뀐다.'},
      e_photo:{flag:'photo',text:'화면 속 표시에는 13이 아니라 뒤집힌 12가 찍혀 있다.'},
      e_mirror:{flag:'mirror',text:'거울의 21은 12를 거꾸로 보여준다. 비상구 표시도 거꾸로 적혀 있다.'},
      e_speak:{breach:1,text:'거울 속 여자가 대답한다. “당신은 벌써 내렸잖아요.”'},
      e_cover:{text:'손바닥을 떼자 거울 안에만 버튼이 하나 더 생겨 있다.'},
      e_room:{flag:'room',text:'스피커가 끊긴다. 잠시 뒤 ‘12층’ 안내등이 희미하게 켜진다.'},
      e_ask:{text:'“입주자 명단에는 당신밖에 없습니다.” 전화가 저절로 끊긴다.'},
      e_name:{breach:1,text:'모든 집 현관에서 동시에 내 이름을 부르는 소리가 들린다.'},
      e_sheet:{flag:'inspection',modal:'수리 기록: 「13층 표시가 뜨더라도 복도로 나가지 마세요. 거울에 21이 보일 때가 진짜 12층입니다.」'},
      e_panel:{flag:'panel',modal:'버튼 뒤에 글씨가 있다. 「거울에 21이 보이면 문 열림 버튼을 세 번 누르세요. 그러면 진짜 12층으로 돌아갑니다.」'},
      e_solve:{solve:true,requires:['mirror','inspection','panel'],success:'truth',fail:'stuck'},
      e_panic:{ending:'stuck'},e_wait:{ending:'safe'},e_escape:{ending:'lost'}
    },
    endings:{
      truth:{tag:'ENDING 03 / 진상',title:'12층으로 돌아오다',image:'elevHall',text:'세 번. 문 열림 버튼을 누르는 사이 13이 12로 뒤집힌다.\n\n문이 열린다. 진짜 12층이다.\n\n집 앞에는 어제 실종된 이웃이 남긴 편지가 있다.\n「그 엘리베이터엔 문이 두 개야. 돌아오는 쪽을 잘 골랐네.」'},
      safe:{tag:'ENDING 01 / 생존',title:'비상 정지',image:'elevHall',text:'비상벨을 한 번 눌렀다.\n\n한참 뒤 아파트 경비원이 문을 열어준다. 거울 속 여자는 여전히 남아 있다.\n\n경비원은 말한다. “저분은 아직 못 나왔어요.”'},
      stuck:{tag:'ENDING 02 / 실패',title:'반복되는 층',image:'elev13',text:'딩동. 13층입니다.\n\n딩동. 13층입니다.\n\n딩동. 13층입니다.\n\n숫자는 바뀌지 않는데 내 몸은 한 층씩 늙어간다.'},
      lost:{tag:'ENDING 04 / 실종',title:'현관문 없는 복도',image:'elevFigure',text:'복도로 뛰어나온다.\n\n엘리베이터 문이 닫힌다. 복도 양쪽 어디에도 출구는 없다.\n\n멀리서 내 목소리로 12층을 눌러달라는 소리가 들린다.'}
    }
  },
  { id:'lastbus', title:'막차 안내방송',subtitle:'이번 정류장은 어제입니다',place:'심야버스 / 00번 노선',start:'01:40',menuImage:'nightBus',rules:[
    '버스 번호가 0으로 바뀌면 당장 내리지 마세요.',
    '버스 안 방송보다 내 승차권의 시간을 믿으세요.',
    '이름표가 있는 빨간 좌석에는 앉지 마세요.',
    '버스 방송에서 내 이름을 불러도 대답하지 마세요.',
    '같은 정류장 이름을 두 번 들어도 바로 내리지 마세요.',
    '같은 정류장 안내가 세 번째 나오면 기사 옆 종을 한 번 치세요.'
  ],ruleNote:'막차의 승객 안내문. 맨 마지막 문장에는 도장 자국이 남아 있다.',images:{nightBus:bus('normal'),busTicket:bus('ticket'),busShadow:bus('shadow')},
  scenes:[
    {time:'01:40',image:'nightBus',label:'막차',lines:[['독백','비 오는 새벽. 마지막 버스에 탔다. 손님은 나까지 세 명뿐이다.'],['독백','버스 앞쪽에 이상한 안내문이 붙어 있다.']],choices:[['규칙서를 읽어본다','readrules'],['빈자리로 걸어간다','next']]},
    {time:'01:42',image:'busShadow',label:'비어 있는 자리',lines:[['독백','버스에는 빨간 좌석 하나만 비어 있다.'],['승객','“여긴 원래 누가 앉아요. 서 계세요.”'],['독백','그런데 그 자리에 내 이름표가 붙어 있다.']],choices:[['서서 손잡이를 잡는다','b_stand'],['빨간 좌석에 앉는다','b_sit'],['이름표를 가까이서 살핀다','b_nameplate']]},
    {time:'01:44',image:'busTicket',label:'어긋난 시간',lines:[['기계음','다음 정류장은 중앙시장.'],['독백','밖에는 정류장이 없다. 그런데 내 승차권에는 새벽 1시 46분이라고 찍혀 있다.'],['독백','지금은 1시 44분. 버스 안 시계는 멈춰 있다.']],choices:[['승차권 시간을 기억한다','b_ticket'],['모니터의 00:00을 믿는다','b_screen'],['운전기사에게 현재 정류장을 묻는다','b_driver']]},
    {time:'01:46',image:'busShadow',label:'내 이름의 방송',lines:[['안내방송','다음 승객. 김...'],['독백','방송이 정확히 내 이름을 부른다.'],['안내방송','뒤에 계신 승객님. 내려야 합니다.']],choices:[['끝까지 침묵한다','b_silent'],['네, 저요! 하고 대답한다','b_answer'],['이름을 부르는 방송을 녹음한다','b_record']]},
    {time:'01:48',image:'nightBus',label:'반복되는 정류장',lines:[['안내방송','이번 정류장은 중앙시장입니다.'],['독백','벌써 두 번째로 같은 정류장을 말하고 있다.'],['독백','기사 옆에 작은 종이 있다. 종 아래에는 글씨가 적혀 있다.']],choices:[['노선표의 운행 시간을 확인한다','b_route'],['기사석 위 종의 모양을 확인한다','b_bell'],['바로 내려버린다','b_exit'],['계속 타고 마지막 결정을 내린다','next']]},
    {time:'01:50',image:'busShadow',label:'세 번째 안내',lines:[['안내방송','중앙시장, 세 번째 안내입니다.'],['독백','같은 정류장 안내가 세 번째 나왔다. 창밖에도 아까 본 가게가 또 지나간다.'],['독백','종을 쳐야 하는 걸까? 아니면 가만히 있어야 할까?']],choices:[['시간표를 확인하고 기사석 종을 한 번 친다','b_solve'],['버스가 멈추자 앞문으로 내린다','b_front'],['다음 역까지 조용히 버틴다','b_wait'],['빨간 좌석에 앉아 몸을 숨긴다','b_hide']]}
  ],actions:{
    b_stand:{text:'출발하자 좌석의 안전벨트만 혼자 채워진다.'},
    b_sit:{breach:1,text:'앉은 순간 기사님이 뒤를 보며 말한다. “그 자리는 원래 당신 자리였군요.”'},
    b_nameplate:{flag:'nameplate',text:'좌석 아래 날짜는 내일. 이름표 뒤에는 ‘하차하지 못한 사람’이라고 쓰여 있다.'},
    b_ticket:{flag:'ticket',text:'승차권 날짜가 오늘보다 하루 빠르다. 방송 시각도 맞지 않는다.'},
    b_screen:{breach:1,text:'모니터가 나를 향해 검은 화면으로 바뀌고, 화면 속 내가 먼저 눈을 감는다.'},
    b_driver:{text:'기사는 입술을 움직이지 않은 채 대답한다. “아직 종이 안 울렸습니다.”'},
    b_silent:{text:'방송은 내 이름을 세 번 부르더니 다른 승객의 이름으로 바뀐다.'},
    b_answer:{breach:1,text:'“확인했습니다.” 버스의 앞문이 잠기고 모든 승객이 나를 돌아본다.'},
    b_record:{flag:'broadcast',text:'녹음에는 내 이름 대신 ‘하차하지 않은 사람’이라고 들린다.'},
    b_route:{flag:'route',modal:'버스 운행표 뒤쪽에 적혀 있다. 「같은 안내가 세 번째 나올 때 종을 한 번 치면 원래 길로 돌아갑니다.」'},
    b_bell:{flag:'bell',modal:'종 아래에 적혀 있다. 「딱 한 번만 치세요. 두 번 치면 버스가 다시 출발합니다.」'},
    b_exit:{ending:'lost'},
    b_solve:{solve:true,requires:['ticket','route','bell'],success:'truth',fail:'stuck'},
    b_front:{ending:'lost'},b_wait:{ending:'safe'},b_hide:{ending:'stuck'}
  },endings:{
    truth:{tag:'ENDING 03 / 진상',title:'진짜 종점',image:'nightBus',text:'땡.\n\n종이 한 번 울리자 안내방송이 멈춘다. 기사가 처음으로 뒤를 돌아본다.\n\n“승객님은 오늘 버스 사람이 아니네요.”\n\n비가 그친다. 버스 번호가 다시 원래대로 돌아왔다. 창밖은 집 앞 정류장이다.'},
    safe:{tag:'ENDING 01 / 생존',title:'낯선 종점',image:'nightBus',text:'한참을 기다리자 버스가 차고지에 멈춘다.\n\n기사님은 내리라고 손짓한다.\n\n나는 무사히 돌아왔지만 다음 날 승차 기록에는 빈 좌석 하나만 찍혀 있다.'},
    lost:{tag:'ENDING 02 / 실종',title:'없는 정류장',image:'busShadow',text:'발을 내딛는 순간 도로가 사라진다.\n\n뒤를 돌아보면 버스 안에서 내가 빨간 좌석에 앉아 있다.\n\n안내방송이 흘러나온다.\n“한 분 더 탑승하셨습니다.”'},
    stuck:{tag:'ENDING 04 / 반복',title:'다시 첫 정류장',image:'busTicket',text:'승차권이 저절로 한 장 더 출력된다.\n\n출발 시간은 01:40.\n\n나는 이미 세 번이나 이 버스를 탔다.'}
  }}
 ];
  window.NAPOLITAN_EPISODES = episodes;
})();
