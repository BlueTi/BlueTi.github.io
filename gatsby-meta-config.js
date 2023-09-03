module.exports = {
  title: `blueti.github.io`,
  description: `재호의 개발일기`,
  language: `ko`, // `ko`, `en` => currently support versions for Korean and English
  siteUrl: `https://blueti.github.io`,
  ogImage: `/og-image.png`, // Path to your in the 'static' folder
  comments: {
    utterances: {
      repo: ``, // `zoomkoding/zoomkoding-gatsby-blog`,
    },
  },
  ga: '0', // Google Analytics Tracking ID
  author: {
    name: `이재호`,
    bio: {
      role: `개발자`,
      description: ['Spring', 'Node.js', 'Android'],
      thumbnail: 'sample.png', // Path to the image in the 'asset' folder
    },
    social: {
      github: `https://github.com/BlueTi`,
      linkedIn: ``,
      email: `dlwp142@gmail.com`,
    },
  },

  // metadata for About Page
  about: {
    timestamps: [
      // =====       [Timestamp Sample and Structure]      =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!) =====
      {
        date: '',
        activity: '',
        links: {
          github: '',
          post: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
      // ========================================================
      // ========================================================
      {
        date: '11.03 ~ 15.03',
        activity: '한국교통대 컴퓨터정보공학 졸업',
      },
      {
        date: '14.07 ~ 14.11',
        activity:
          '롯데정보통신 실무중심형 자바안드로이드 전문가 양성과정(JAVA기초, ORACLE DB, JSP, SPRING Boot)',
      },
      {
        date: '16.07 ~ 16.10',
        activity:
          '에듀앤텍 전자정부 클라우드 플랫폼 개발자 양성 과정(클라우드 서비스 개요, 클라우드 파운드리, 전자정부 클라우드 플랫폼 프로젝트, VMWare vsphere를 이용한 클라우드 시스템 구축, Pivotal Web Service를 이용한 클라우드 시스템 관리)',
      },
      {
        date: '18.07 ~ 19.07',
        activity: '고라니닷컴 재직',
      },
      {
        date: '20.09 ~ 20.10',
        activity:
          'SD아카데미 인공지능(AI)서비스를 개발을 위한 딥러닝 기술구현 데이터 엔지니어 양성과정(SpringBoot 웹서버 개발,머신러닝)',
      },
      {
        date: '20.09 ~ 20.10',
        activity:
          '솔트룩스 최신 인공지능 기반의 실무형 SW전문가 양성과정(이미지,자연어,음성 AI 이해 및 대표적인 모델 실행)',
      },
      {
        date: '21.02 ~ 21.08',
        activity:
          '엔코아플레이데이터 (스마트웹&콘텐츠개발) 스마트금융 AI 자산관리 HybridApp 개발자 양성 과정(Spring MVC,Mybatis 웹 개발 Vue.js 프론트 개발 python ML 교육)',
      },
      {
        date: '21.08 ~ 23.01',
        activity: '에프앤 알앤디 재직',
      },
      {
        date: '23.02 ~ 19.07',
        activity: '코드크레인 재직',
      },
      {
        date: '23.07 ~ ',
        activity: '비버웍스 재직',
      },
    ],

    projects: [
      // =====        [Project Sample and Structure]        =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!)  =====
      {
        title: '',
        description: '',
        techStack: ['', ''],
        thumbnailUrl: '',
        links: {
          post: '',
          github: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
      // ========================================================
      // ========================================================
      {
        title: '고라니닷컴',
        description: `
          - 스프링부트 백엔드 + 바닐라 자바스크립트 웹 ERP 구축
          - 이미지 특징 추출을 이용한 AI 이미지 매칭 개발
          - node.js express,websocket을 이용한 React native 크로스플랫폼 앱 개발
        `,
        techStack: ['javascript', 'Spring', 'Java', 'python', 'mongoDB', 'react-naitve'],
        thumbnailUrl: '',
        links: {
          post: '',
          github: '',
          demo: '',
        },
      },
      {
        title: '에프앤알앤디',
        description: `
          - 대한통운 물류창고 관리 안드로이드 PDA 어플 개발, 기존 Spring API 서버에 API 추가 작업, Jenkins 안드로이드 빌드 서버 구축 및 관리(java,android,spring,oracle)
          - OCR 오픈소스 웹소켓 서버 개발(python)
          - 제일제당 MES 개발 지원(javascript, smartux, java, mssql)
        `,
        techStack: ['Android', 'SpringMVC', 'Java', 'Oracle', 'Jenkins', 'Python', 'MyBatis'],
        thumbnailUrl: '',
        links: {
          post: '',
          github: '',
          demo: '',
        },
      },
      {
        title: '코드크레인',
        description: `
          - 치과 쇼핑몰 asp.net 유지보수, 리뉴얼 작업 진행
          - SI 프로젝트 node.js 서버 개발
          - node-express -> nestJs 이전 작업
        `,
        techStack: [
          'asp.net',
          'node.js',
          'nestJs',
          'mysql',
          'javascript',
          'typescript',
          'C#',
          'AWS',
          'MSSQL',
        ],
        thumbnailUrl: '',
        links: {
          post: '',
          github: '',
          demo: '',
        },
      },
    ],
  },
};
