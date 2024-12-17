# Multi Stock Management

## 프로젝트 소개

여러 증권사의 주식 투자 내역을 통합 관리할 수 있는 웹 애플리케이션입니다.

### 주요 기능

- **주식 거래 등록**: 국내/해외 주식 거래 내역을 등록하고 관리
- **통계 분석**: 
  - 국가별/증권사별/종목별 투자 현황 분석
  - 차트와 리스트를 통한 직관적인 자산 분포 확인
- **데이터 관리**: 
  - Excel/JSON 형식의 데이터 가져오기/내보내기 지원
  - 국가/증권사/종목 마스터 데이터 관리

## 기술 스택

- **Frontend Framework**: React + TypeScript
- **Build Tool**: Vite
- **UI Framework**: shadcn/ui
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Data Processing**: xlsx

## 로컬 개발 환경 설정

Node.js & npm이 설치되어 있어야 합니다. ([nvm을 통한 설치 가이드](https://github.com/nvm-sh/nvm#installing-and-updating))

```sh
# 1. 저장소 복제
git clone <YOUR_GIT_URL>

# 2. 프로젝트 디렉토리로 이동
cd <YOUR_PROJECT_NAME>

# 3. 의존성 패키지 설치
npm install

# 4. 개발 서버 실행
npm run dev
```

## 데이터 저장 방식

- 모든 데이터는 브라우저의 LocalStorage에 저장됩니다
- Excel/JSON 형식으로 데이터를 내보내고 가져올 수 있습니다

## 프로젝트 구조

```
src/
├── components/         # UI 컴포넌트
│   ├── stock/         # 주식 관련 컴포넌트
│   ├── statistics/    # 통계 관련 컴포넌트
│   ├── settings/      # 설정 관련 컴포넌트
│   └── ui/            # 공통 UI 컴포넌트
├── lib/               # 유틸리티 함수
├── types/             # TypeScript 타입 정의
└── pages/             # 페이지 컴포넌트
```

## 배포

[Lovable](https://lovable.dev/projects/b42ea64d-5231-4d44-824e-93e489f19c4d)을 통해 간단하게 배포할 수 있습니다.
Share -> Publish 버튼을 클릭하세요.

## 커스텀 도메인

현재는 커스텀 도메인을 직접 지원하지 않습니다. 
필요한 경우 Netlify를 통한 배포를 권장합니다. 
자세한 내용은 [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/) 문서를 참조하세요.

## 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.
