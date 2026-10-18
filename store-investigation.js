/* Scene-specific investigation design for Episode 1. No network dependencies. */
(function(){
'use strict';
const spots={
  0:[{id:'ruleink',label:'덧쓴 잉크',x:60,y:38,flag:'ink',title:'누군가 규칙을 고쳤다',text:'다른 규칙은 오래된 글씨다. 그런데 6번만 방금 쓴 것처럼 잉크가 묻어난다.\n\n종이 뒷면에 「한서윤, 창고 근무」라고 적혀 있다.\n\n누군가 한서윤을 찾지 못하게 이 규칙을 바꾼 걸까?',kind:'paper'}],
  1:[{id:'pos',label:'결제 기록',x:56,y:39,flag:'posProof',title:'이 손님은 돈을 낸 적이 없다',text:'계산 기록에는 카드로 결제했다고 나온다. 손님이 건넸다는 현금은 어디에도 없다.\n\n지금 거스름돈을 주면, 받지도 않은 돈을 돌려주는 셈이다.',kind:'receipt'}],
  2:[{id:'camera2',label:'2번 채널',x:54,y:35,flag:'cameraProof',title:'없는 카메라에 사람이 찍혔다',text:'가게에 카메라는 한 대뿐이다. 그런데 2번 화면이 켜졌다.\n\n화면에는 아직 오지 않은 02시 24분이 찍혀 있다. 계산대 아래는 비어 있고, 창고 문 뒤에서 누군가 세 번 두드린다.\n\n이상한 사람은 계산대 아래가 아니라 창고에 있는 걸까?',kind:'screen'}],
  3:[{id:'caller',label:'발신 기록',x:56,y:39,flag:'callerProof',title:'점장 전화가 아닌 것 같다',text:'전화기에 뜬 번호는 예전 점장실 번호다.\n\n그 방의 전화선은 3년 전에 끊어졌다고 한다. 그렇다면 지금 전화한 사람은 누구일까?',kind:'screen'}],
  4:[{id:'reflection',label:'유리 반사',x:62,y:38,flag:'mirror',title:'계산대 아래는 비어 있다',text:'냉장고 유리로 슬쩍 봤다. 계산대 아래에는 아무도 없다.\n\n대신 창고 문 아래로 손이 보인다. 세 번 두드리고 멈춘다.\n\n아래에서 나를 부르는 목소리는 거짓말을 하고 있다.',kind:'glass'}],
  5:[{id:'footprints',label:'젖지 않은 신발',x:47,y:34,flag:'childProof',title:'아이의 발자국은 이상하다',text:'밖에는 비가 온다. 그런데 아이의 신발은 마르다.\n\n문 앞 발자국도 밖에서 들어온 것이 아니다. 가게 안에서 밖으로 나간 흔적이다.\n\n저 아이는 어디서 나타난 걸까?',kind:'photo'}],
  6:[
    {id:'receipt',label:'영수증',x:26,y:36,flag:'receipt',title:'창고 안에서 남긴 쪽지',text:'영수증 뒷면에 누가 급하게 쓴 글씨가 있다.\n\n「나는 창고에 갇혔어. 계산대 아래 목소리를 믿지 마. 창고 문을 세 번 두드려 줘.」\n\n끝에는 전 근무자 한서윤의 이름이 적혀 있다.',kind:'receipt'},
    {id:'stock',label:'문 아래 흰 선',x:72,y:36,flag:'stock',title:'창고 문은 밖에서 열 수 있다',text:'창고 문은 안쪽에서 열리지 않는다.\n\n문 바깥쪽에 작은 비상 버튼이 보인다. 그 버튼을 누르면 갇힌 사람을 꺼낼 수 있다.',kind:'door'},
    {id:'forgery',label:'작업 지시서',x:51,y:22,flag:'forgedProof',title:'진짜 규칙은 따로 있었다',text:'창고 문 옆에 원래 규칙이 붙어 있다.\n\n「창고에 갇힌 사람이 있으면 비상 버튼을 눌러 구할 것.」\n\n내가 읽은 규칙서 6번은 반대로 적혀 있다. 누군가 일부러 고친 것이다.',kind:'paper'}
  ],
  7:[{id:'knock',label:'세 번의 노크',x:56,y:33,flag:'knockProof',title:'창고에서 세 번, 계산대에서는 두 번',text:'창고 안에서 세 번, 계산대 아래에서는 두 번 노크한다.\n\n서로 다른 존재다. 창고 안에 진짜 사람이 있는 게 분명하다.',kind:'door'}]
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