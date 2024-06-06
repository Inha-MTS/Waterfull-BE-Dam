export interface LoginUserDto {
  type: 'face' | 'card';
  id?: number;
  image?: string;
}
