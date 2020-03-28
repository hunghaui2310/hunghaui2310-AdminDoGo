export class CommnentModel {
  id: number;
  userId: number;
  productId: number;
  blogId: number;
  content: string;
  status: number;
  createDate: string;
  userName: string;

  // tslint:disable-next-line:max-line-length
  constructor(id?: number, userId?: number, productId?: number, blogId?: number, content?: string, status?: number, createDate?: string, userName?: string) {
    this.id = id;
    this.userId = userId;
    this.productId = productId;
    this.blogId = blogId;
    this.content = content;
    this.status = status;
    this.createDate = createDate;
    this.userName = userName;
  }
}
