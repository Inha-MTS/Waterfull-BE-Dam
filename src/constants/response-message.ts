export const responseMessage = {
  USER_ALREADY_EXIST: '이미 존재하는 유저입니다',
  CREATE_USER_SUCCESS: '유저 생성 성공',
  REGISTER_FACE_ID_SUCCESS: '얼굴 등록 성공',
  LOGIN_USER_SUCCESS: '로그인 성공',
  get AXIOS_ERRORS() {
    return {
      400: '잘못된 이미지',
      404: this.USER_NOT_FOUND,
      500: 'Axios 에러',
    };
  },
  INTERNAL_SERVER_ERROR: '서버 내부 에러',
  USER_NOT_FOUND: '유저를 찾을 수 없습니다',
  GET_USER_SUCCESS: '유저 조회 성공',
  GET_MAJOR_LIST_SUCCESS: '전공 리스트 조회 성공',
  ADD_USER_POINT_SUCCESS: '포인트 적립 성공',
  GET_BOTTLE_CATEGORY_SUCCESS: '텀블러 카테고리 조회 성공',
  NEED_NEW_BOTTLE_IMAGE: '텀블러 이미지 재촬영 필요',
};
