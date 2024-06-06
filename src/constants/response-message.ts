export const responseMessage = {
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
};
