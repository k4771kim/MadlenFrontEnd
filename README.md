# Madlen - 내일 도착하는 편지

### Develop by 김보균

 - React-Native, BackEnd : 김보균


####내일 도착하는 편지 마들렌####

- 이 어플리케이션은 전화번호부에 있는 친구들 정보를 기반으로 친구들에게 전송 후 24시간 뒤 도착하는 편지를 발송하는 어플리케이션이다. 편지가 발송되면 친구가 마들렌 회원이라면 Push 메세지가, 비회원이라면 MMS 메세지가 가도록 되어있다.  

- IOS App Store [Link][1]
- Android Play Store [Link][2]

- 다운로드는 가능하지만 지금 MMS 선불충전 요금이 없어서(...회사사정) 기존 로그인 된 회원 외에는 회원가입 및 로그인이 불가능한 상태
 
### Dependency

- react : 16.2.0
- react-native : 0.53.0
- react-native-navigation(wix) : 1.1.370
- redux : 3.7.2
- react-redux : 5.0.6
- redux-thunk : 2.2.0
- react-native-image-crop-picker(native) : 0.19.3
- realm : 2.2.7
- moment : 2.20.1
- native-base : 2.3.7
- react-native-vector-icons : 4.5.0
- react-native-fcm : 10.0.3
- lottie-react-native : 2.2.7
- moment : 2.20.1


> ** 블라블라 **
>
> 입사해서 처음으로 앱스토에 출시에 성공한 어플리케이션.
>
> 입사 후 퇴사까지 총 4개의 프로젝트를 했는데, 그중 두 프로젝트는 출시가 목적이 아닌(투자 유치용) 프로젝트였고, <br>한 프로젝트는 완성단계에서 회사 사정상 스탑되었다(그게 영영이 될지는 몰랐었다 그때는)
>
> 이 프로젝트가 나에게 꽤 의미있는 이유를 생각해보자면
>
> 1. 처음으로 프론트엔드, 백엔드의 모든 설계, 개발을 맡았다. <br>지금까지 한 프로젝트는 최소 두명의 개발자가 함께한 프로젝트였다.
> 2. React Native로 출시단계까지 간 첫번째 어플리케이션이다. (특히 IOS 앱 스토어에 출시는 처음) 
> 3. 추후 유지보수(인수인계를 생각하여) 디자인 패턴과 버전관리에 매우 신경쓰면서 개발했다.<br>이전의 프로젝트들에서도 신경을 쓰지 않았다는 것은 아니지만, 유지보수를 할 사람이 내가 아닌 다른사람이라고 생각하니 신경이 많이 쓰였 던 것 같다. React 경험이 있는 사람이면 충분히 이해할 수 있도록 설계했다.
> 4. 오픈소스 라이브러리 사용에 많은 선택이 필요했다. React Native 특성상 Native 기반의 기술을 사용할 것인지, JS 기반의 기술을 사용할 것인지에 대한 고민을 많이 했다. 개발중에도 많은 컨퍼런스에 참여하면서 많은 정보를 얻으려고 노력함.



'Madlen' the  React Native application(2017. 04)

[1]: https://itunes.apple.com/us/app/madlen/id1359592022?mt=8	"Apple Store"
[2]: https://play.google.com/store/apps/details?id=com.madlen	"Google Play Store"
