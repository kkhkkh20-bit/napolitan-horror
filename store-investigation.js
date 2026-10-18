/* Scene-specific investigation design for Episode 1. No network dependencies. */
(function(){
'use strict';
const spots={
  0:[{id:'ruleink',label:'덧쓴 잉크',x:60,y:38,flag:'ink',title:'젖어 있는 여섯 번째 문장',text:'종이의 앞면은 오래되어 누렇게 바랬다. 그런데 6번 조항 위의 잉크만 아직 손가락에 묻는다.\n\n뒷면에는 작게 적혀 있다.\n「한서윤 / 02:24 / 창고 내부 근무자」\n\n왜 누군가 창고를 확인하지 못하게 막는 걸까?',kind:'paper'}],
  1:[{id:'pos',label:'결제 기록',x:56,y:39,flag:'posProof',title:'일치하지 않는 지불',text:'POS에는 결제 방식이 카드로 기록돼 있다. 승인 번호까지 정상이다.\n\n하지만 손님이 들고 있는 지폐의 일련번호는 매장의 폐기 보고서에 적혀 있다.\n\n지폐가 존재해서는 안 되는 시간이다.',kind:'receipt'}],
  2:[{id:'camera2',label:'2번 채널',x:54,y:35,flag:'cameraProof',title:'설치되지 않은 카메라',text:'카메라 배선표에는 1번만 존재한다. 그런데 2번 채널은 02:24의 미래 화면을 송출 중이다.\n\n화면 속 계산대 아래에는 아무도 없다. 대신 창고 문 안쪽에서 손 하나가 세 번 움직인다.\n\n이 영상은 현재의 장면이 아니다.',kind:'screen'}],
  3:[{id:'caller',label:'발신 기록',x:56,y:39,flag:'callerProof',title:'존재하지 않는 내선',text:'발신 번호는 07호점 점장실 내선이다.\n\n전화기 점검표에는 「3년 전 철거」라고 적혀 있다. 통화 연결음이 울리는 사이 수화기 안쪽에서 누군가 숨을 쉰다.',kind:'screen'}],
  4:[{id:'reflection',label:'유리 반사',x:62,y:38,flag:'mirror',title:'거울이 보여 주는 것',text:'냉장고 유리에 비친 계산대 아래는 텅 비어 있다.\n\n하지만 창고 문틈에는 사람의 손이 붙어 있다. 손가락은 세 번 움직이고, 잠시 멈춘다.\n\n직접 몸을 숙이지 않아도 볼 수 있었다.',kind:'glass'}],
  5:[{id:'footprints',label:'젖지 않은 신발',x:47,y:34,flag:'childProof',title:'아이의 발자국',text:'문에서 아이가 선 자리까지 바닥은 마른 채다.\n\n그런데 문 앞 매트에는 바깥에서 들어온 신발 자국이 아니라, 안쪽에서 나가는 작은 발자국이 찍혀 있다.',kind:'photo'}],
  6:[
    {id:'receipt',label:'영수증',x:26,y:36,flag:'receipt',title:'출력되지 않은 영수증',text:'결제 시간 02:24. 담당자: 한서윤.\n\n뒷면의 손글씨:\n「나는 계산대 아래에 없어. 내가 있는 곳은 창고야.\n다른 나에게 이름을 말하지 마.\n문 안에서 세 번 두드리면 대답해 줘.」',kind:'receipt'},
    {id:'stock',label:'문 아래 흰 선',x:72,y:36,flag:'stock',title:'창고 문의 안전장치',text:'문손잡이 옆에는 비상 해제 스위치가 있다. 문은 안쪽에서 열 수 없는 구조다.\n\n문 아래에 긁힌 자국 세 개. 방금도 똑같이 세 번 두드리는 소리가 들렸다.',kind:'door'},
    {id:'forgery',label:'작업 지시서',x:51,y:22,flag:'forgedProof',title:'6번 규칙의 출처',text:'창고 문틀 뒤에 정식 작업 지시서가 붙어 있다.\n\n「긴급 구조 요청이 들리면 비상 해제 스위치를 눌러 근무자를 대피시킬 것」\n\n아까 읽은 6번 조항은 누군가 새 종이에 덧쓴 문장이었다. 같은 붉은 잉크가 여기에도 묻어 있다.',kind:'paper'}
  ],
  7:[{id:'knock',label:'세 번의 노크',x:56,y:33,flag:'knockProof',title:'문 안팎의 신호',text:'내가 세 번 두드리자 안쪽에서도 똑같이 세 번 돌아온다.\n\n반면 계산대 아래 목소리는 언제나 두 번만 두드렸다.\n\n창고 문 안에 있는 사람과 계산대 아래의 존재는 다르다.',kind:'door'}]
};
const flagInfo={
 ink:['01:58','젖은 잉크와 02:24 근무 기록'],
 posProof:['02:06','카드 결제 기록과 불가능한 지폐'],
 cameraProof:['02:11','없는 CCTV 2번의 미래 화면'],
 callerProof:['02:14','3년 전에 없어진 전화 내선'],
 mirror:['02:17','계산대 아래는 비었고 창고 문에는 손이 있다'],
 childProof:['02:22','아이의 발자국이 매장 안에서 바깥으로 향함'],
 receipt:['02:24','창고 안 근무자가 남긴 영수증'],
 stock:['02:24','창고 문 옆의 비상 해제 스위치'],
 forgedProof:['02:24','정식 작업 지시서와 위조된 6번 규칙'],
 knockProof:['02:26','안쪽에서 돌아오는 세 번의 신호']
};
window.STORE_INVESTIGATION={
 hotspots:spots,flagInfo,required:['receipt','stock','forgedProof','mirror'],
 goodEndingHint:'진상 결말을 위해서는 창고 문과 영수증, 덧쓴 규칙, 유리 속 모습이 서로 맞는지 확인해야 합니다.'
};
})();